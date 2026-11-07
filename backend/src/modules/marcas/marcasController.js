import { MarcasService } from './marcasService.js';

const service = new MarcasService();

export async function listar(req, res, next) {
  try {
    const soloActivas = req.query.todas !== 'true';
    const marcas = await service.listar(soloActivas);
    res.json({
      ok: true,
      data: marcas.map(m => m.toJSON()),
    });
  } catch (error) {
    next(error);
  }
}

export async function obtener(req, res, next) {
  try {
    const marca = await service.obtenerPorId(req.params.id);
    res.json({
      ok: true,
      data: marca.toJSON(),
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
      mensaje: 'Marca creada exitosamente',
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
      mensaje: 'Marca actualizada exitosamente',
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
      mensaje: 'Marca desactivada exitosamente (borrado lógico)',
    });
  } catch (error) {
    next(error);
  }
}

