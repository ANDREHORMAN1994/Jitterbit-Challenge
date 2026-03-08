import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import authService from '@/services/auth.service.js';

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        message: 'Missing bearer token',
      });
      return;
    }

    const token = authHeader.slice('Bearer '.length).trim();

    if (!token) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        message: 'Missing bearer token',
      });
      return;
    }

    await authService.verifyToken(token);
    next();
  } catch {
    res.status(StatusCodes.UNAUTHORIZED).json({
      message: 'Invalid or expired token',
    });
  }
};
