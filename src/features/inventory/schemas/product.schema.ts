import { z } from 'zod';

export const productSchema = z.object({
  code: z
    .string()
    .min(3, { message: 'El código debe tener al menos 3 caracteres' })
    .max(10, { message: 'El código no puede superar los 10 caracteres' }),
  name: z
    .string()
    .min(3, { message: 'El nombre es obligatorio y debe ser más descriptivo' }),
  description: z
    .string()
    .max(255, { message: 'La descripción no puede superar los 255 caracteres' })
    .optional()
    .or(z.literal('')),
  price: z
    .number({ message: 'El precio debe ser un número válido' })
    .positive({ message: 'El precio debe ser mayor a 0' }),
  stock: z
    .number({ message: 'El stock debe ser un número entero' })
    .int()
    .nonnegative({ message: 'El stock no puede ser negativo' }),
  minStock: z
    .number({ message: 'El stock mínimo debe ser un número' })
    .int()
    .nonnegative({ message: 'El stock mínimo no puede ser negativo' }),
  categoryId: z
    .number({ message: 'Selecciona una categoría válida' })
    .positive({ message: 'La categoría es requerida' }),
});

export type ProductFormInputs = z.infer<typeof productSchema>;