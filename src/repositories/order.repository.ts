import { prisma } from '@/lib/prisma.js';
import { Order } from '@/types/order.type.js';

export const findOrderById = async (orderId: string) => {
  return await prisma.order.findUnique({
    where: { orderId },
    include: { items: true },
  });
};

export const createOrder = async (orderData: Order) => {
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
