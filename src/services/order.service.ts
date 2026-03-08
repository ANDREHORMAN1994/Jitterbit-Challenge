import { findOrderById, createOrder } from '@/repositories/order.repository.js';
import { mapOrderPayload } from '@/utils/formatData.js';
import { OrderBody } from '@/validators/order.validator.js';
import ErrorMessage from '@/utils/ErrorMessage.js';
import { StatusCodes } from 'http-status-codes';

export const createOrderService = async (payload: OrderBody) => {
  const orderData = mapOrderPayload(payload);
  const orderAlreadyExists = await findOrderById(orderData.orderId);

  if (orderAlreadyExists) {
    throw new ErrorMessage(StatusCodes.CONFLICT, 'Order with this ID already exists');
  }

  return await createOrder(orderData);
};
