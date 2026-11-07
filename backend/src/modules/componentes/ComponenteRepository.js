import { BaseRepository } from '../../core/BaseRepository.js';
import { prisma } from '../../config/prisma.js';
import { ComponenteFactory } from './ComponenteFactory.js';
import { Prisma } from '@prisma/client';

export class ComponenteRepository extends BaseRepository {
  hidratar(row) {
    if (!row) return null;
    return ComponenteFactory.crear(row.tipo, {
      ...row,
      precio: Number(row.precio),
      especificaciones: row.especificaciones,
      marca: row.marca,
      categoria: row.categoria,
    });
  }

  aPersistencia(comp) {
    return {
      sku: comp.sku,
      nombre: comp.nombre,
      descripcion: comp.descripcion,
      tipo: comp.tipo,
      marcaId: comp.marcaId,
      categoriaId: comp.categoriaId,
      precio: new Prisma.Decimal(comp.precio),
      moneda: comp.moneda,
      stock: comp.stock,
      stockMinimo: comp.stockMinimo,
      garantiaMeses: comp.garantiaMeses,
      imagenUrl: comp.imagenUrl,
      especificaciones: comp.obtenerEspecificaciones(),
      activo: comp.activo,
      creadoPorId: comp.creadoPorId,
    };
  }

  async buscarPorId(id) {
    const row = await prisma.componente.findUnique({
      where: { id: Number(id) },
      include: {
        marca: true,
        categoria: true,
      },
    });
    return this.hidratar(row);
  }

  async buscarPorSku(sku) {
    const row = await prisma.componente.findUnique({
      where: { sku: sku.toUpperCase().trim() },
      include: {
        marca: true,
        categoria: true,
      },
    });
    return this.hidratar(row);
  }

  async guardar(comp) {
    const row = await prisma.componente.create({
      data: this.aPersistencia(comp),
      include: {
        marca: true,
        categoria: true,
      },
    });
    return this.hidratar(row);
  }

  async actualizar(id, comp) {
    const row = await prisma.componente.update({
      where: { id: Number(id) },
      data: this.aPersistencia(comp),
      include: {
        marca: true,
        categoria: true,
      },
    });
    return this.hidratar(row);
  }

  async desactivar(id) {
    const row = await prisma.componente.update({
      where: { id: Number(id) },
      data: { activo: false },
    });
    return this.hidratar(row);
  }

  async listar({
    pagina = 1,
    limite = 20,
    categoria,
    marca,
    precioMin,
    precioMax,
    q,
    orden = 'id_desc',
    soloActivos = true,
  }) {
    const where = {};

    if (soloActivos) {
      where.activo = true;
    }

    if (categoria) {
      // Soporta filtrar por slug o por ID de categoría
      if (!isNaN(Number(categoria))) {
        where.categoriaId = Number(categoria);
      } else {
        where.categoria = { slug: categoria.toLowerCase() };
      }
    }

    if (marca) {
      if (!isNaN(Number(marca))) {
        where.marcaId = Number(marca);
      } else {
        where.marca = { nombre: { contains: marca, mode: 'insensitive' } };
      }
    }

    if (precioMin !== undefined || precioMax !== undefined) {
      where.precio = {};
      if (precioMin !== undefined) where.precio.gte = new Prisma.Decimal(precioMin);
      if (precioMax !== undefined) where.precio.lte = new Prisma.Decimal(precioMax);
    }

    if (q) {
      where.OR = [
        { nombre: { contains: q, mode: 'insensitive' } },
        { sku: { contains: q, mode: 'insensitive' } },
        { descripcion: { contains: q, mode: 'insensitive' } },
      ];
    }

    let orderBy = { id: 'desc' };
    if (orden === 'precio_asc') orderBy = { precio: 'asc' };
    if (orden === 'precio_desc') orderBy = { precio: 'desc' };
    if (orden === 'nombre_asc') orderBy = { nombre: 'asc' };

    const skip = (pagina - 1) * limite;

    const [rows, total] = await Promise.all([
      prisma.componente.findMany({
        where,
        skip,
        take: limite,
        orderBy,
        include: {
          marca: true,
          categoria: true,
        },
      }),
      prisma.componente.count({ where }),
    ]);

    return {
      componentes: rows.map(r => this.hidratar(r)),
      total,
      pagina,
      totalPaginas: Math.ceil(total / limite),
    };
  }
}

