import { z } from 'zod';

export const loginSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'El usuario debe tener al menos 3 caracteres' })
    .max(20, { message: 'El usuario no puede superar los 20 caracteres' }),
  password: z
    .string()
    .min(6, { message: 'La contraseña debe tener al menos 6 caracteres' }),
});

// Extraemos el tipo automáticamente gracias a TypeScript y Zod
export type LoginFormInputs = z.infer<typeof loginSchema>;