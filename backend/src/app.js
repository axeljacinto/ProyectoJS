import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { ENV } from './config/env.js';
import { manejoErrores } from './core/middlewares/manejoErrores.js';
import { NotFoundError } from './core/errors/AppError.js';

// Importación de rutas
import authRoutes from './modules/auth/auth.routes.js';
import usuariosRoutes from './modules/usuarios/usuarios.routes.js';
import categoriasRoutes from './modules/categorias/categorias.routes.js';
import marcasRoutes from './modules/marcas/marcas.routes.js';
import componentesRoutes from './modules/componentes/componentes.routes.js';

export const app = express();

// Seguridad HTTP
app.use(helmet());
app.use(cors({
  origin: ENV.FRONTEND_URL,
  credentials: true,
}));

// Parsers
app.use(express.json({ limit: '15kb' }));
app.use(express.urlencoded({ extended: true, limit: '15kb' }));
app.use(cookieParser());

// Healthcheck
app.get('/health', (req, res) => {
  res.json({ ok: true, status: 'online', timestamp: new Date() });
});

// Rutas de API v1
const API_PREFIX = '/api/v1';
app.use(`${API_PREFIX}/auth`, authRoutes);
app.use(`${API_PREFIX}/usuarios`, usuariosRoutes);
app.use(`${API_PREFIX}/categorias`, categoriasRoutes);
app.use(`${API_PREFIX}/marcas`, marcasRoutes);
app.use(`${API_PREFIX}/componentes`, componentesRoutes);

// Manejo de ruta no encontrada
app.use((req, res, next) => {
  next(new NotFoundError(`Ruta no encontrada: ${req.method} ${req.originalUrl}`));
});

// Middleware global de manejo de errores
app.use(manejoErrores);

