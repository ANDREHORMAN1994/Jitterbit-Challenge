import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocument } from '@/config/swagger.js';
import authRouter from '@/routes/auth.routes.js';
import orderRouter from '@/routes/order.routes.js';
import { errorMiddleware } from '@/middlewares/error.middleware.js';

const app = express();

app.use(express.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(authRouter);
app.use(orderRouter);

app.use(errorMiddleware);

export default app;
