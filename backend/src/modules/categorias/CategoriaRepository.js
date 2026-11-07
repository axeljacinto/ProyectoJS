import { BaseRepository } from '../../core/BaseRepository.js';
import { prisma } from '../../config/prisma.js';
import { Categoria } from './Categoria.js';

export class CategoriaRepository extends BaseRepository {
  hidratar(row) {
    if (!row) return null;
    return new Categoria(row);
  }

  aPersistencia(cat) {
    return {
      nombre: cat.nombre,
      slug: cat.slug,
      descripcion: cat.descripcion,
      orden: cat.orden,
      activa: cat.activa,
    };
  }

  async listar({ soloActivas = true } = {}) {
    const where = soloActivas ? { activa: true } : {};
    const rows = await prisma.categoria.findMany({
      where,
      orderBy: { orden: 'asc' },
    });
    return rows.map(r => this.hidratar(r));
  }

  async buscarPorId(id) {
    const row = await prisma.categoria.findUnique({
      where: { id: Number(id) },
    });
    return this.hidratar(row);
  }

  async buscarPorSlug(slug) {
    const row = await prisma.categoria.findUnique({
      where: { slug: slug.toLowerCase().trim() },
    });
    return this.hidratar(row);
  }

  async guardar(cat) {
    const row = await prisma.categoria.create({
      data: this.aPersistencia(cat),
    });
    return this.hidratar(row);
  }

  async actualizar(id, cat) {
    const row = await prisma.categoria.update({
      where: { id: Number(id) },
      data: this.aPersistencia(cat),
    });
    return this.hidratar(row);
  }

  async desactivar(id) {
    const row = await prisma.categoria.update({
      where: { id: Number(id) },
      data: { activa: false },
    });
    return this.hidratar(row);
  }
}

