import { z } from 'zod';

export const validateLoginBody = z.object({
  username: z.string().min(1, 'username is required'),
  password: z.string().min(1, 'password is required'),
});

export type LoginBody = z.infer<typeof validateLoginBody>;
