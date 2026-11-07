import jwt from 'jsonwebtoken';
import { ENV } from '../../config/env.js';
import { AuthenticationError, ForbiddenError } from '../errors/AppError.js';
import { prisma } from '../../config/prisma.js';
import { UsuarioFactory } from '../../modules/usuarios/UsuarioFactory.js';

export async function verificarToken(req, res, next) {
  try {
    let token = req.cookies?.jwt;

    if (!token && req.headers.authorization?.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      throw new AuthenticationError('Token de autenticación no proporcionado');
    }

    const payload = jwt.verify(token, ENV.JWT_SECRET);

    // Confirmar que el usuario existe y sigue activo
    const userRow = await prisma.usuario.findUnique({
      where: { id: payload.sub },
    });

    if (!userRow || !userRow.activo) {
      throw new AuthenticationError('Usuario inexistente o inactivo');
    }

    // Hidratar instancia de clase POO
    req.usuario = UsuarioFactory.crear(userRow.rol, userRow);
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return next(new AuthenticationError('Token inválido o expirado'));
    }
    next(error);
  }
}

