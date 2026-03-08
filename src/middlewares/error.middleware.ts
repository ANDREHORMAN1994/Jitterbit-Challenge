import type { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { StatusCodes } from 'http-status-codes';

export function errorMiddleware(error: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (error instanceof ZodError) {
    const missingBody =
      error.issues.length === 1 &&
      error.issues[0]?.code === 'invalid_type' &&
      error.issues[0]?.path.length === 0;

    if (missingBody) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Request body is required',
      });
    }

    return res.status(StatusCodes.BAD_REQUEST).json({
      message: 'Invalid request data',
      errors: error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      })),
    });
  }

  if (error instanceof Error && 'statusCode' in error) {
    return res.status(Number(error.statusCode)).json({
      message: error.message,
    });
  }

  if (error instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    message: 'Internal server error',
  });
}
