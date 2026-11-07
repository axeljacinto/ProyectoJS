import { Router } from 'express';
import { verificarToken } from '../../core/middlewares/verificarToken.js';
import { requierePermiso } from '../../core/middlewares/requierePermiso.js';
import { validar } from '../../core/middlewares/validar.js';
import { PERMISOS } from '../../core/permisos.js';
import { listar, obtener, crear, actualizar, eliminar } from './categoriasController.js';
import { crearCategoriaSchema, editarCategoriaSchema } from './categorias.schemas.js';

const router = Router();

// Rutas públicas (alimenta la escena 3D y los filtros del catálogo)
router.get('/', listar);
router.get('/:id', obtener);

// Rutas administrativas protegidas
router.post(
  '/',
  verificarToken,
  requierePermiso(PERMISOS.CATEGORIA_GESTIONAR),
  validar(crearCategoriaSchema, 'body'),
  crear
);

router.patch(
  '/:id',
  verificarToken,
  requierePermiso(PERMISOS.CATEGORIA_GESTIONAR),
  validar(editarCategoriaSchema, 'body'),
  actualizar
);

router.delete(
  '/:id',
  verificarToken,
  requierePermiso(PERMISOS.CATEGORIA_GESTIONAR),
  eliminar
);

export default router;

