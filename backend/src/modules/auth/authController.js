import { AuthService } from './authService.js';
import { ENV } from '../../config/env.js';

const authService = new AuthService();

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: ENV.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: 2 * 60 * 60 * 1000, // 2 horas
};

export async function registro(req, res, next) {
  try {
    const { usuario, token } = await authService.registrar(req.body);

    res.cookie('jwt', token, COOKIE_OPTIONS);

    res.status(201).json({
      ok: true,
      data: {
        usuario: usuario.toPublicJSON(),
        token, // También se envía para clientes que opten por Bearer en memoria
      },
      mensaje: 'Usuario registrado exitosamente',
    });
  } catch (error) {
    next(error);
  }
}

export async function login(req, res, next) {
  try {
    const { usuario, token } = await authService.login(req.body);

    res.cookie('jwt', token, COOKIE_OPTIONS);

    res.json({
      ok: true,
      data: {
        usuario: usuario.toPublicJSON(),
        token,
      },
      mensaje: 'Inicio de sesión exitoso',
    });
  } catch (error) {
    next(error);
  }
}

export async function logout(req, res, next) {
  try {
    res.clearCookie('jwt', COOKIE_OPTIONS);
    res.json({
      ok: true,
      mensaje: 'Sesión cerrada correctamente',
    });
  } catch (error) {
    next(error);
  }
}

export async function perfil(req, res, next) {
  try {
    res.json({
      ok: true,
      data: req.usuario.toPublicJSON(),
    });
  } catch (error) {
    next(error);
  }
}

