import type { Request, Response, NextFunction } from 'express';
import { validateOrderBody } from '@/validators/order.validator.js';
import { createOrderService, listOrdersService } from '@/services/order.service.js';
import { StatusCodes } from 'http-status-codes';
import { Order } from '@/types/order.type.js';

const formatResult = (order: Order) => ({
  ...order,
  items: order.items.map((item) => ({
    productId: item.productId,
    quantity: item.quantity,
    price: item.price,
  })),
});

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedData = validateOrderBody.parse(req.body);

    const order = await createOrderService(validatedData);
    const response = formatResult(order);

    res.status(StatusCodes.CREATED).json(response);
  } catch (error) {
    next(error);
  }
};

export const listOrders = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const orders = await listOrdersService();
    const response = orders.map(formatResult);

    res.status(StatusCodes.OK).json(response);
  } catch (error) {
    next(error);
  }
};
