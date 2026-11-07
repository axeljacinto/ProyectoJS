import { ComponentesService } from './componentesService.js';

const service = new ComponentesService();

export async function listar(req, res, next) {
  try {
    const { componentes, total, pagina, totalPaginas } = await service.listar(req.query);
    res.json({
      ok: true,
      data: componentes.map(c => c.toJSON()),
      meta: { pagina, total, totalPaginas },
    });
  } catch (error) {
    next(error);
  }
}

export async function obtener(req, res, next) {
  try {
    const comp = await service.obtenerPorId(req.params.id);
    res.json({
      ok: true,
      data: comp.toJSON(),
    });
  } catch (error) {
    next(error);
  }
}

export async function crear(req, res, next) {
  try {
    const nuevo = await service.crear(req.body, req.usuario?.id);
    res.status(201).json({
      ok: true,
      data: nuevo.toJSON(),
      mensaje: 'Componente creado exitosamente',
    });
  } catch (error) {
    next(error);
  }
}

export async function actualizar(req, res, next) {
  try {
    const actualizado = await service.actualizar(req.params.id, req.body);
    res.json({
      ok: true,
      data: actualizado.toJSON(),
      mensaje: 'Componente actualizado exitosamente',
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
      mensaje: 'Componente desactivado exitosamente (borrado lógico)',
    });
  } catch (error) {
    next(error);
  }
}

