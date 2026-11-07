import { Router } from 'express';
import { verificarToken } from '../../core/middlewares/verificarToken.js';
import { requierePermiso } from '../../core/middlewares/requierePermiso.js';
import { validar } from '../../core/middlewares/validar.js';
import { PERMISOS } from '../../core/permisos.js';
import { listar, obtener, crear, actualizar, eliminar } from './componentesController.js';
import {
  crearComponenteSchema,
  editarComponenteSchema,
  listarComponentesQuerySchema,
} from './componentes.schemas.js';

const router = Router();

// Rutas públicas de consulta
router.get('/', validar(listarComponentesQuerySchema, 'query'), listar);
router.get('/:id', obtener);

// Creación: Vendedor y Admin
router.post(
  '/',
  verificarToken,
  requierePermiso(PERMISOS.COMPONENTE_CREAR),
  validar(crearComponenteSchema, 'body'),
  crear
);

// Edición: Vendedor y Admin
router.patch(
  '/:id',
  verificarToken,
  requierePermiso(PERMISOS.COMPONENTE_EDITAR),
  validar(editarComponenteSchema, 'body'),
  actualizar
);

// Eliminación lógica: Solo Admin
router.delete(
  '/:id',
  verificarToken,
  requierePermiso(PERMISOS.COMPONENTE_ELIMINAR),
  eliminar
);

export default router;

