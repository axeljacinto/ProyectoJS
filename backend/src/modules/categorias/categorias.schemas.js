import { z } from 'zod';

export const crearCategoriaSchema = z.object({
  nombre: z.string().min(2, 'El nombre debe tener al menos 2 caracteres').trim(),
  slug: z.string().min(2).regex(/^[a-z0-9-]+$/, 'El slug solo debe contener minúsculas, números y guiones').trim(),
  descripcion: z.string().optional(),
  orden: z.coerce.number().int().default(0),
});

export const editarCategoriaSchema = crearCategoriaSchema.partial();

