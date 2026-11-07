export class AppError extends Error {
  constructor(mensaje, statusCode = 500, codigo = 'ERROR_SERVIDOR', detalles = []) {
    super(mensaje);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.codigo = codigo;
    this.detalles = detalles;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(mensaje = 'Error de validación en los datos', detalles = []) {
    super(mensaje, 400, 'VALIDACION', detalles);
  }
}

export class AuthenticationError extends AppError {
  constructor(mensaje = 'No autenticado o credenciales inválidas') {
    super(mensaje, 401, 'AUTENTICACION');
  }
}

export class ForbiddenError extends AppError {
  constructor(mensaje = 'No tienes permiso para realizar esta acción') {
    super(mensaje, 403, 'PROHIBIDO');
  }
}

export class NotFoundError extends AppError {
  constructor(mensaje = 'Recurso no encontrado') {
    super(mensaje, 404, 'NO_ENCONTRADO');
  }
}

export class ConflictError extends AppError {
  constructor(mensaje = 'Conflicto con un recurso existente') {
    super(mensaje, 409, 'CONFLICTO');
  }
}

