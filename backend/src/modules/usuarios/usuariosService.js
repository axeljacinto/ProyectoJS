import { NotFoundError } from '../../core/errors/AppError.js';
import { UsuarioRepository } from './UsuarioRepository.js';

export class UsuariosService {
  #usuarioRepo;

  constructor(usuarioRepo = new UsuarioRepository()) {
    this.#usuarioRepo = usuarioRepo;
  }

  async listarUsuarios(opciones) {
    return this.#usuarioRepo.listar(opciones);
  }

  async cambiarRol(id, nuevoRol) {
    const usuario = await this.#usuarioRepo.buscarPorId(id);
    if (!usuario) {
      throw new NotFoundError('Usuario no encontrado');
    }

    // Se actualiza en persistencia con el nuevo rol
    const actualizado = await this.#usuarioRepo.actualizar({
      ...usuario,
      id: usuario.id,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      email: usuario.email,
      passwordHash: usuario.passwordHash,
      rol: nuevoRol,
      activo: usuario.activo,
      intentosFallidos: usuario.intentosFallidos,
      bloqueadoHasta: usuario.bloqueadoHasta,
      ultimoAcceso: usuario.ultimoAcceso,
    });

    return actualizado;
  }
}

