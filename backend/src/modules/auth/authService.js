import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { ENV } from '../../config/env.js';
import { AuthenticationError, ConflictError } from '../../core/errors/AppError.js';
import { UsuarioRepository } from '../usuarios/UsuarioRepository.js';
import { UsuarioFactory } from '../usuarios/UsuarioFactory.js';

export class AuthService {
  #usuarioRepo;

  constructor(usuarioRepo = new UsuarioRepository()) {
    this.#usuarioRepo = usuarioRepo;
  }

  async registrar({ nombre, apellido, email, password }) {
    const existente = await this.#usuarioRepo.buscarPorEmail(email);
    if (existente) {
      throw new ConflictError('El correo electrónico ya se encuentra registrado');
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Seguridad: El registro público SIEMPRE crea un CLIENTE
    const nuevoUsuario = UsuarioFactory.crear('CLIENTE', {
      nombre,
      apellido,
      email,
      passwordHash,
    });

    const guardado = await this.#usuarioRepo.guardar(nuevoUsuario);
    const token = this.#generarToken(guardado);

    return { usuario: guardado, token };
  }

  async login({ email, password }) {
    const usuario = await this.#usuarioRepo.buscarPorEmail(email);

    // Mensaje genérico para prevenir enumeración de usuarios
    if (!usuario) {
      throw new AuthenticationError('Credenciales inválidas');
    }

    // Verificar si la cuenta se encuentra inactiva
    if (!usuario.activo) {
      throw new AuthenticationError('Esta cuenta ha sido desactivada. Contacte con soporte.');
    }

    // Verificar si la cuenta está bloqueada temporalmente por fuerza bruta
    if (usuario.estaBloqueado()) {
      const tiempoRestanteMin = Math.ceil((usuario.bloqueadoHasta.getTime() - Date.now()) / (60 * 1000));
      throw new AuthenticationError(`Cuenta bloqueada temporalmente por múltiples intentos fallidos. Intente de nuevo en ${tiempoRestanteMin} minutos.`);
    }

    const passwordValido = await usuario.verificarPassword(password);
    if (!passwordValido) {
      usuario.registrarIntentoFallido();
      await this.#usuarioRepo.actualizar(usuario);
      throw new AuthenticationError('Credenciales inválidas');
    }

    // Login exitoso: registrar acceso y resetear intentos
    usuario.registrarAcceso();
    await this.#usuarioRepo.actualizar(usuario);

    const token = this.#generarToken(usuario);
    return { usuario, token };
  }

  #generarToken(usuario) {
    return jwt.sign(
      {
        sub: usuario.id,
        rol: usuario.rol,
      },
      ENV.JWT_SECRET,
      { expiresIn: ENV.JWT_EXPIRES_IN }
    );
  }
}

