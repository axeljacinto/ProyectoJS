import { ForbiddenError, AuthenticationError } from '../errors/AppError.js';

export function requierePermiso(permiso) {
  return (req, res, next) => {
    if (!req.usuario) {
      return next(new AuthenticationError('Usuario no autenticado'));
    }

    if (!req.usuario.tienePermiso(permiso)) {
      return next(new ForbiddenError(`Permiso denegado: requiere '${permiso}'`));
    }

    next();
  };
}

