import { BaseRepository } from '../../core/BaseRepository.js';
import { prisma } from '../../config/prisma.js';
import { UsuarioFactory } from './UsuarioFactory.js';

export class UsuarioRepository extends BaseRepository {
  hidratar(row) {
    if (!row) return null;
    return UsuarioFactory.crear(row.rol, row);
  }

  aPersistencia(usuario) {
    return {
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      email: usuario.email,
      passwordHash: usuario.passwordHash,
      rol: usuario.rol,
      activo: usuario.activo,
      intentosFallidos: usuario.intentosFallidos,
      bloqueadoHasta: usuario.bloqueadoHasta,
      ultimoAcceso: usuario.ultimoAcceso,
    };
  }

  async buscarPorId(id) {
    const row = await prisma.usuario.findUnique({
      where: { id: Number(id) },
    });
    return this.hidratar(row);
  }

  async buscarPorEmail(email) {
    const row = await prisma.usuario.findUnique({
      where: { email: email.toLowerCase().trim() },
    });
    return this.hidratar(row);
  }

  async guardar(usuario) {
    const data = this.aPersistencia(usuario);
    const row = await prisma.usuario.create({ data });
    return this.hidratar(row);
  }

  async actualizar(usuario) {
    const data = this.aPersistencia(usuario);
    const row = await prisma.usuario.update({
      where: { id: usuario.id },
      data,
    });
    return this.hidratar(row);
  }

  async listar({ pagina = 1, limite = 20 }) {
    const skip = (pagina - 1) * limite;
    const [rows, total] = await Promise.all([
      prisma.usuario.findMany({
        skip,
        take: limite,
        orderBy: { id: 'asc' },
      }),
      prisma.usuario.count(),
    ]);

    return {
      usuarios: rows.map(r => this.hidratar(r)),
      total,
      pagina,
      totalPaginas: Math.ceil(total / limite),
    };
  }
}

