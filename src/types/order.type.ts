export type OrderItem = {
  productId: number;
  quantity: number;
  price: number;
};

export type Order = {
  orderId: string;
  value: number;
  creationDate: Date;
  items: OrderItem[];
};
