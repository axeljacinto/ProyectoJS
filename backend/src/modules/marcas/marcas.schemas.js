import { z } from 'zod';

export const crearMarcaSchema = z.object({
  nombre: z.string().min(2, 'El nombre debe tener al menos 2 caracteres').trim(),
  paisOrigen: z.string().optional(),
  sitioWeb: z.string().url('Debe ser una URL válida').optional().or(z.literal('')),
  logoUrl: z.string().url('Debe ser una URL válida').optional().or(z.literal('')),
});

export const editarMarcaSchema = crearMarcaSchema.partial();

