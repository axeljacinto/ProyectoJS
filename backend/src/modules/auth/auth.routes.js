import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { validar } from '../../core/middlewares/validar.js';
import { verificarToken } from '../../core/middlewares/verificarToken.js';
import { registro, login, logout, perfil } from './authController.js';
import { registroSchema, loginSchema } from './auth.schemas.js';

const router = Router();

// Rate limiter específico para prevenir ataques de fuerza bruta en login
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 10, // Máximo 10 peticiones por IP en la ventana de tiempo
  message: {
    ok: false,
    error: {
      codigo: 'DEMASIADAS_PETICIONES',
      mensaje: 'Demasiados intentos de inicio de sesión desde esta IP. Intente de nuevo en 15 minutos.',
    },
  },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post('/registro', validar(registroSchema, 'body'), registro);
router.post('/login', loginLimiter, validar(loginSchema, 'body'), login);
router.post('/logout', verificarToken, logout);
router.get('/perfil', verificarToken, perfil);

export default router;

