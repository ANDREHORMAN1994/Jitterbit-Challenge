import repository from '@/repositories/order.repository.js';
import { mapOrderPayload, mapPartialOrderPayload } from '@/utils/formatData.js';
import { OrderBody, UpdateOrderBody } from '@/validators/order.validator.js';
import ErrorMessage from '@/utils/ErrorMessage.js';
import { StatusCodes } from 'http-status-codes';

const createOrder = async (payload: OrderBody) => {
  const orderData = mapOrderPayload(payload);
  const orderAlreadyExists = await repository.findOrderById(orderData.orderId);

  if (orderAlreadyExists) {
    throw new ErrorMessage(StatusCodes.CONFLICT, 'Order with this ID already exists');
  }

  return await repository.createOrder(orderData);
};

const listAllOrders = async () => {
  return await repository.listAllOrders();
};

const findOrderById = async (orderId: string) => {
  const order = await repository.findOrderById(orderId);

  if (!order) {
    throw new ErrorMessage(StatusCodes.NOT_FOUND, 'Order not found');
  }

  return order;
};

const updateOrderById = async (orderId: string, payload: UpdateOrderBody) => {
  const existingOrder = await repository.findOrderById(orderId);

  if (!existingOrder) {
    throw new ErrorMessage(StatusCodes.NOT_FOUND, 'Order not found');
  }

  const orderData = mapPartialOrderPayload(payload);

  return await repository.updateOrderById(orderId, orderData);
};

const deleteOrderById = async (orderId: string) => {
  const existingOrder = await repository.findOrderById(orderId);

  if (!existingOrder) {
    throw new ErrorMessage(StatusCodes.NOT_FOUND, 'Order not found');
  }

  await repository.deleteOrderById(orderId);
};

export default {
  createOrder,
  listAllOrders,
  findOrderById,
  updateOrderById,
  deleteOrderById,
};
