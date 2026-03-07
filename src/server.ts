import 'dotenv/config';
import { StatusCodes } from 'http-status-codes';
import { prisma } from '@/lib/prisma.js';
import app from '@/app.js';

const PORT = process.env.PORT || 3000;

// Basic endpoint to verify server is running
app.get('/', (_req, res) => {
  res.status(StatusCodes.OK).send('Hello, World!!!');
});

// Heath check endpoint to verify database connectivity
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
