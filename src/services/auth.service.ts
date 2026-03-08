import { SignJWT, jwtVerify } from 'jose';
import { StatusCodes } from 'http-status-codes';
import type { LoginBody } from '@/validators/auth.validator.js';
import ErrorMessage from '@/utils/ErrorMessage.js';

const getAuthConfig = () => {
  const username = process.env.AUTH_USERNAME;
  const password = process.env.AUTH_PASSWORD;
  const secret = process.env.JWT_SECRET;
  const expiresIn = process.env.JWT_EXPIRES_IN ?? '1h';

  if (!username || !password || !secret) {
    throw new ErrorMessage(
      StatusCodes.INTERNAL_SERVER_ERROR,
      'Authentication environment variables are not configured',
    );
  }

  return {
    username,
    password,
    expiresIn,
    secret: new TextEncoder().encode(secret),
  };
};

const generateToken = async ({ username, password }: LoginBody) => {
  const authConfig = getAuthConfig();

  if (username !== authConfig.username || password !== authConfig.password) {
    throw new ErrorMessage(StatusCodes.UNAUTHORIZED, 'Invalid credentials');
  }

  return new SignJWT({ sub: username })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(authConfig.expiresIn)
    .sign(authConfig.secret);
};

const verifyToken = async (token: string) => {
  const authConfig = getAuthConfig();

  return jwtVerify(token, authConfig.secret);
};

export default {
  generateToken,
  verifyToken,
};
