import { z } from "zod";

export const changePasswordSchema = z
  .object({
    oldPassword: z
      .string()
      .min(8, "password must be at least 8 characters")
      .max(64, "name can not exceed 64 characters"),
    newPassword: z
      .string()
      .min(8, "password must be at least 8 characters")
      .max(64, "name can not exceed 64 characters"),
    confirmPassword: z.string().min(1, "confirm password can not be empty"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "passwords do not match",
    path: ["confirmPassword"],
  });
