import { z } from 'zod';

export const registroSchema = z.object({
  nombre: z.string().min(2, 'El nombre debe tener al menos 2 caracteres').trim(),
  apellido: z.string().min(2, 'El apellido debe tener al menos 2 caracteres').trim(),
  email: z.string().email('Debe ser un correo electrónico válido').toLowerCase().trim(),
  password: z.string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .regex(/[A-Z]/, 'La contraseña debe contener al menos una mayúscula')
    .regex(/[0-9]/, 'La contraseña debe contener al menos un número'),
});

export const loginSchema = z.object({
  email: z.string().email('Formato de correo no válido').toLowerCase().trim(),
  password: z.string().min(1, 'La contraseña es obligatoria'),
});

