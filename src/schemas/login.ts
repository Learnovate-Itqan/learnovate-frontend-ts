import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "email can not be empty").email("invalid email address"),
  password: z.string().min(1, "password can not be empty"),
  rememberMe: z.boolean().optional(),
});

export const loginResponseSchema = z.object({
  accessToken: z.string(),
  data: z.object({
    email: z.string().email(),
    id: z.string().uuid(),
    name: z.string(),
  }),
});
