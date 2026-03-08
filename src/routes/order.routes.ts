import { Router } from 'express';
import { createOrder, listOrders } from '@/controllers/order.controller.js';

const orderRouter = Router();

orderRouter.post('/order', createOrder);
orderRouter.get('/order/list', listOrders);

export default orderRouter;
