import { z } from 'zod';

const orderItemSchema = z.object({
  idItem: z.string().min(1, 'idItem is required'),
  quantidadeItem: z.number().int().positive('quantidadeItem must be greater than 0'),
  valorItem: z.number().positive('valorItem must be greater than 0'),
});

const hasUniqueItemIds = (items: Array<{ idItem: string }>) =>
  new Set(items.map((item) => item.idItem)).size === items.length;

export const validateOrderBody = z
  .object({
    numeroPedido: z.string().min(1, 'numeroPedido is required'),
    valorTotal: z.number().positive('valorTotal must be greater than 0'),
    dataCriacao: z.string().min(1, 'dataCriacao is required'),
    items: z.array(orderItemSchema).min(1, 'items must contain at least one item'),
  })
  .refine((data) => hasUniqueItemIds(data.items), {
    message: 'items contains duplicated idItem',
    path: ['items'],
  });

export type OrderBody = z.infer<typeof validateOrderBody>;

export const validateUpdateOrderBody = z
  .object({
    valorTotal: z.number().positive('valorTotal must be greater than 0').optional(),
    dataCriacao: z.string().min(1, 'dataCriacao is required').optional(),
    items: z.array(orderItemSchema).min(1, 'items must contain at least one item').optional(),
  })
  .refine((data) => data.items === undefined || hasUniqueItemIds(data.items), {
    message: 'items contains duplicated idItem',
    path: ['items'],
  });

export type UpdateOrderBody = z.infer<typeof validateUpdateOrderBody>;

export const validateOrderIdParam = z.object({
  id: z.string().min(1, 'id parameter is required'),
});

export type OrderIdParam = z.infer<typeof validateOrderIdParam>;
