import { z } from 'zod';

export const cambiarRolSchema = z.object({
  rol: z.enum(['CLIENTE', 'VENDEDOR', 'ADMIN'], {
    errorMap: () => ({ message: 'El rol debe ser CLIENTE, VENDEDOR o ADMIN' }),
  }),
});

export const listarUsuariosQuerySchema = z.object({
  pagina: z.coerce.number().int().positive().default(1),
  limite: z.coerce.number().int().positive().max(100).default(20),
});

