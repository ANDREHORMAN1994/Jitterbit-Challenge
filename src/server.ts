import 'dotenv/config';
import express from 'express';
import { StatusCodes } from 'http-status-codes';
import { prisma } from '@/lib/prisma.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (_req, res) => {
  res.status(StatusCodes.OK).send('Hello, World!!!');
});

app.get('/health', async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    res.status(StatusCodes.OK).json({
      status: 'ok',
      message: 'Database connection successful',
    });
  } catch (error) {
    console.error('Database connection error:', error);

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 'error',
      message: 'Database connection failed',
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
