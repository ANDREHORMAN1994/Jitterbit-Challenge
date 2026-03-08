import { Router } from 'express';
import controller from '@/controllers/order.controller.js';
import { authMiddleware } from '@/middlewares/auth.middleware.js';

const orderRouter = Router();

orderRouter.post('/order', controller.createOrder);
orderRouter.get('/order/list', controller.listAllOrders);

// Applying authentication only to the following routes
orderRouter.get('/order/:id', authMiddleware, controller.findOrderById);
orderRouter.patch('/order/:id', authMiddleware, controller.updateOrderById);
orderRouter.delete('/order/:id', authMiddleware, controller.deleteOrderById);

export default orderRouter;
