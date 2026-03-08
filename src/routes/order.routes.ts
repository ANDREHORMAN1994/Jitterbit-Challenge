import { Router } from 'express';
import controller from '@/controllers/order.controller.js';

const orderRouter = Router();

orderRouter.post('/order', controller.createOrder);
orderRouter.get('/order/list', controller.listAllOrders);
orderRouter.get('/order/:id', controller.findOrderById);
orderRouter.patch('/order/:id', controller.updateOrderById);

export default orderRouter;
