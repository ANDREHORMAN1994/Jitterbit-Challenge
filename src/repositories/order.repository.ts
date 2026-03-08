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

export default {
  createOrder,
  listAllOrders,
  findOrderById,
};
