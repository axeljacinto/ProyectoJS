import { Router } from 'express';
import { verificarToken } from '../../core/middlewares/verificarToken.js';
import { requierePermiso } from '../../core/middlewares/requierePermiso.js';
import { validar } from '../../core/middlewares/validar.js';
import { PERMISOS } from '../../core/permisos.js';
import { listar, obtener, crear, actualizar, eliminar } from './marcasController.js';
import { crearMarcaSchema, editarMarcaSchema } from './marcas.schemas.js';

const router = Router();

// Rutas públicas
router.get('/', listar);
router.get('/:id', obtener);

// Rutas protegidas (solo ADMIN)
router.post(
  '/',
  verificarToken,
  requierePermiso(PERMISOS.MARCA_GESTIONAR),
  validar(crearMarcaSchema, 'body'),
  crear
);

router.patch(
  '/:id',
  verificarToken,
  requierePermiso(PERMISOS.MARCA_GESTIONAR),
  validar(editarMarcaSchema, 'body'),
  actualizar
);

router.delete(
  '/:id',
  verificarToken,
  requierePermiso(PERMISOS.MARCA_GESTIONAR),
  eliminar
);

export default router;

