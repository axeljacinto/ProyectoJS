import { AppError } from '../errors/AppError.js';
import { ZodError } from 'zod';

export function manejoErrores(err, req, res, next) {
  // Manejo de errores de Zod
  if (err instanceof ZodError) {
    const detalles = err.errors.map(e => ({
      campo: e.path.join('.'),
      mensaje: e.message,
    }));

    return res.status(400).json({
      ok: false,
      error: {
        codigo: 'VALIDACION',
        mensaje: 'Los datos enviados no cumplen el formato requerido',
        detalles,
      },
    });
  }

  // Manejo de errores controlados de dominio / aplicación
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      ok: false,
      error: {
        codigo: err.codigo,
        mensaje: err.message,
        detalles: err.detalles || [],
      },
    });
  }

  // Errores no controlados
  console.error('[Unhandled Error]', err);
  return res.status(500).json({
    ok: false,
    error: {
      codigo: 'ERROR_SERVIDOR',
      mensaje: 'Ocurrió un error interno en el servidor',
      detalles: process.env.NODE_ENV === 'development' ? [err.message] : [],
    },
  });
}

