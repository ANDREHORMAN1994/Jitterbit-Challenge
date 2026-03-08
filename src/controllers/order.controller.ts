import type { Request, Response, NextFunction } from 'express';
import { validateOrderBody } from '@/validators/order.validator.js';
import { createOrderService } from '@/services/order.service.js';
import { StatusCodes } from 'http-status-codes';

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedData = validateOrderBody.parse(req.body);

    const order = await createOrderService(validatedData);

    res.status(StatusCodes.CREATED).json({
      ...order,
      items: order.items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      })),
    });
  } catch (error) {
    next(error);
  }
};
