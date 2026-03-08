import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import authService from '@/services/auth.service.js';
import { validateLoginBody } from '@/validators/auth.validator.js';

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = validateLoginBody.parse(req.body);
    const token = await authService.generateToken(payload);

    res.status(StatusCodes.OK).json({ token });
  } catch (error) {
    next(error);
  }
};

export default {
  login,
};
