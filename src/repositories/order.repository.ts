import { prisma } from '@/lib/prisma.js';
import { Order } from '@/types/order.type.js';

const createOrder = async (orderData: Order) => {
  return prisma.order.create({
    data: {
      orderId: orderData.orderId,
      value: orderData.value,
      creationDate: orderData.creationDate,
      items: {
        create: orderData.items,
      },
    },
    include: {
      items: true,
    },
  });
};

const listAllOrders = async () => {
  return prisma.order.findMany({
    include: {
      items: true,
    },
  });
};

const findOrderById = async (orderId: string) => {
  return await prisma.order.findUnique({
    where: { orderId },
    include: { items: true },
  });
};

const updateOrderById = async (orderId: string, orderData: Partial<Order>) => {
  return await prisma.order.update({
    where: { orderId },
    data: {
      ...(orderData.value !== undefined && { value: orderData.value }),
      ...(orderData.creationDate !== undefined && { creationDate: orderData.creationDate }),
      ...(orderData.items !== undefined && {
        items: {
          deleteMany: {},
          create: orderData.items,
        },
      }),
    },
    include: { items: true },
  });
};

const deleteOrderById = async (orderId: string) => {
  await prisma.order.delete({
    where: { orderId },
  });
};

export default {
  createOrder,
  listAllOrders,
  findOrderById,
  updateOrderById,
  deleteOrderById,
};
