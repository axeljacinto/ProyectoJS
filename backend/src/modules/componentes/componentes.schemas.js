import { z } from 'zod';

export const crearComponenteSchema = z.object({
  sku: z.string().min(3).max(30).trim(),
  nombre: z.string().min(3).max(150).trim(),
  descripcion: z.string().optional(),
  tipo: z.enum([
    'Procesador',
    'PlacaMadre',
    'MemoriaRam',
    'TarjetaGrafica',
    'Almacenamiento',
    'FuenteDePoder',
    'Gabinete',
    'Refrigeracion',
  ]),
  marcaId: z.coerce.number().int().positive(),
  categoriaId: z.coerce.number().int().positive(),
  precio: z.coerce.number().positive('El precio debe ser mayor a 0'),
  moneda: z.string().default('USD'),
  stock: z.coerce.number().int().min(0, 'El stock no puede ser negativo').default(0),
  stockMinimo: z.coerce.number().int().min(0).default(5),
  garantiaMeses: z.coerce.number().int().min(0).default(12),
  imagenUrl: z.string().url('Debe ser una URL válida').optional().or(z.literal('')),
  especificaciones: z.record(z.any()).default({}),
});

export const editarComponenteSchema = crearComponenteSchema.partial();

export const listarComponentesQuerySchema = z.object({
  pagina: z.coerce.number().int().positive().default(1),
  limite: z.coerce.number().int().positive().max(100).default(20),
  categoria: z.string().optional(),
  marca: z.string().optional(),
  precioMin: z.coerce.number().positive().optional(),
  precioMax: z.coerce.number().positive().optional(),
  q: z.string().optional(),
  orden: z.enum(['id_desc', 'precio_asc', 'precio_desc', 'nombre_asc']).default('id_desc'),
});

