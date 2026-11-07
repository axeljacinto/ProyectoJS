import { UsuariosService } from './usuariosService.js';

const service = new UsuariosService();

export async function listar(req, res, next) {
  try {
    const { usuarios, total, pagina, totalPaginas } = await service.listarUsuarios(req.query);
    res.json({
      ok: true,
      data: usuarios.map(u => u.toPublicJSON()),
      meta: { pagina, total, totalPaginas },
    });
  } catch (error) {
    next(error);
  }
}

export async function cambiarRol(req, res, next) {
  try {
    const { id } = req.params;
    const { rol } = req.body;
    const usuarioActualizado = await service.cambiarRol(id, rol);
    res.json({
      ok: true,
      data: usuarioActualizado.toPublicJSON(),
      mensaje: 'Rol actualizado exitosamente',
    });
  } catch (error) {
    next(error);
  }
}

