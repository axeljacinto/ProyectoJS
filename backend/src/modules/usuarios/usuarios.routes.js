import { Router } from 'express';
import { verificarToken } from '../../core/middlewares/verificarToken.js';
import { requierePermiso } from '../../core/middlewares/requierePermiso.js';
import { validar } from '../../core/middlewares/validar.js';
import { PERMISOS } from '../../core/permisos.js';
import { listar, cambiarRol } from './usuariosController.js';
import { cambiarRolSchema, listarUsuariosQuerySchema } from './usuarios.schemas.js';

const router = Router();

// Todas las rutas de usuarios requieren autenticación y permiso de gestión de usuarios (solo ADMIN)
router.use(verificarToken);
router.use(requierePermiso(PERMISOS.USUARIO_GESTIONAR));

router.get('/', validar(listarUsuariosQuerySchema, 'query'), listar);
router.patch('/:id/rol', validar(cambiarRolSchema, 'body'), cambiarRol);

export default router;

