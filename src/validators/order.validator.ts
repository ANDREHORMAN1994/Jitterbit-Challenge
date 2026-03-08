import { z } from 'zod';

export const validateOrderBody = z
  .object({
    numeroPedido: z.string().min(1, 'numeroPedido is required'),
    valorTotal: z.number().positive('valorTotal must be greater than 0'),
    dataCriacao: z.string().min(1, 'dataCriacao is required'),
    items: z
      .array(
        z.object({
          idItem: z.string().min(1, 'idItem is required'),
          quantidadeItem: z.number().int().positive('quantidadeItem must be greater than 0'),
          valorItem: z.number().positive('valorItem must be greater than 0'),
        }),
      )
      .min(1, 'items must contain at least one item'),
  })
  .refine((data) => new Set(data.items.map((item) => item.idItem)).size === data.items.length, {
    message: 'items contains duplicated idItem',
    path: ['items'],
  });

export type OrderBody = z.infer<typeof validateOrderBody>;

export const validateOrderIdParam = z.object({
  id: z.string().min(1, 'id parameter is required'),
});

export type OrderIdParam = z.infer<typeof validateOrderIdParam>;
