import express from 'express';
import orderRouter from '@/routes/order.routes.js';
import { errorMiddleware } from '@/middlewares/error.middleware.js';

const app = express();

app.use(express.json());

app.use(orderRouter);

app.use(errorMiddleware);

export default app;
