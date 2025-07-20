import zod from 'zod';

export const signUpSchema = zod.object({
  username: zod.string().min(3, "Username must be at least 3 characters long"),
  email: zod.string().email("Invalid email address"),
  password: zod.string().min(6, "Password must be at least 6 characters long"),
});

export const signInSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(6, "Password must be at least 6 characters long"),
});

