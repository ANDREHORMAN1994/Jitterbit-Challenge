import type { Request, Response, NextFunction } from 'express';
import { validateOrderBody, validateOrderIdParam } from '@/validators/order.validator.js';
import service from '@/services/order.service.js';
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

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedData = validateOrderBody.parse(req.body);

    const order = await service.createOrder(validatedData);
    const response = formatResult(order);

    res.status(StatusCodes.CREATED).json(response);
  } catch (error) {
    next(error);
  }
};

const listAllOrders = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const orders = await service.listAllOrders();
    const response = orders.map(formatResult);

    res.status(StatusCodes.OK).json(response);
  } catch (error) {
    next(error);
  }
};

const findOrderById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = validateOrderIdParam.parse(req.params);
    const order = await service.findOrderById(id);
    const response = formatResult(order);

    res.status(StatusCodes.OK).json(response);
  } catch (error) {
    next(error);
  }
};

export default {
  createOrder,
  listAllOrders,
  findOrderById,
};
