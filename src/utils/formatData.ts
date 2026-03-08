import { Order } from '@/types/order.type.js';
import { OrderBody } from '@/validators/order.validator.js';

export function mapOrderPayload(payload: OrderBody): Order {
  return {
    orderId: payload.numeroPedido,
    value: payload.valorTotal,
    creationDate: new Date(payload.dataCriacao),
    items: payload.items.map((item) => ({
      productId: Number(item.idItem),
      quantity: item.quantidadeItem,
      price: item.valorItem,
    })),
  };
}
