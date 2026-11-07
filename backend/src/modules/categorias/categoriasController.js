import { CategoriasService } from './categoriasService.js';

const service = new CategoriasService();

export async function listar(req, res, next) {
  try {
    const soloActivas = req.query.todas !== 'true';
    const categorias = await service.listar(soloActivas);
    res.json({
      ok: true,
      data: categorias.map(c => c.toJSON()),
    });
  } catch (error) {
    next(error);
  }
}

export async function obtener(req, res, next) {
  try {
    const categoria = await service.obtenerPorSlugOId(req.params.id);
    res.json({
      ok: true,
      data: categoria.toJSON(),
    });
  } catch (error) {
    next(error);
  }
}

export async function crear(req, res, next) {
  try {
    const nueva = await service.crear(req.body);
    res.status(201).json({
      ok: true,
      data: nueva.toJSON(),
      mensaje: 'Categoría creada exitosamente',
    });
  } catch (error) {
    next(error);
  }
}

export async function actualizar(req, res, next) {
  try {
    const actualizada = await service.actualizar(req.params.id, req.body);
    res.json({
      ok: true,
      data: actualizada.toJSON(),
      mensaje: 'Categoría actualizada exitosamente',
    });
  } catch (error) {
    next(error);
  }
}

export async function eliminar(req, res, next) {
  try {
    await service.eliminar(req.params.id);
    res.json({
      ok: true,
      mensaje: 'Categoría desactivada exitosamente (borrado lógico)',
    });
  } catch (error) {
    next(error);
  }
}

