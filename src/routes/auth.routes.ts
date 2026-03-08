import { Router } from 'express';
import controller from '@/controllers/auth.controller.js';

const authRouter = Router();

authRouter.post('/auth/login', controller.login);

export default authRouter;
