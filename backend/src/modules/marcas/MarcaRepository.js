import { BaseRepository } from '../../core/BaseRepository.js';
import { prisma } from '../../config/prisma.js';
import { Marca } from './Marca.js';

export class MarcaRepository extends BaseRepository {
  hidratar(row) {
    if (!row) return null;
    return new Marca(row);
  }

  aPersistencia(marca) {
    return {
      nombre: marca.nombre,
      paisOrigen: marca.paisOrigen,
      sitioWeb: marca.sitioWeb,
      logoUrl: marca.logoUrl,
      activa: marca.activa,
    };
  }

  async listar({ soloActivas = true } = {}) {
    const where = soloActivas ? { activa: true } : {};
    const rows = await prisma.marca.findMany({
      where,
      orderBy: { nombre: 'asc' },
    });
    return rows.map(r => this.hidratar(r));
  }

  async buscarPorId(id) {
    const row = await prisma.marca.findUnique({
      where: { id: Number(id) },
    });
    return this.hidratar(row);
  }

  async buscarPorNombre(nombre) {
    const row = await prisma.marca.findUnique({
      where: { nombre: nombre.trim() },
    });
    return this.hidratar(row);
  }

  async guardar(marca) {
    const row = await prisma.marca.create({
      data: this.aPersistencia(marca),
    });
    return this.hidratar(row);
  }

  async actualizar(id, marca) {
    const row = await prisma.marca.update({
      where: { id: Number(id) },
      data: this.aPersistencia(marca),
    });
    return this.hidratar(row);
  }

  async desactivar(id) {
    const row = await prisma.marca.update({
      where: { id: Number(id) },
      data: { activa: false },
    });
    return this.hidratar(row);
  }
}

