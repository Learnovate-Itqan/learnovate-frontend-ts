import { z } from "zod";

export const userSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string().email(),
  authStatus: z.boolean(),
  role: z.union([z.literal("student"), z.literal("mentor"), z.literal(undefined)]),
  image: z.string().url(),
  age: z.union([z.number().int().positive(), z.null()]).optional(),
  dateOfBirth: z.union([z.date(), z.null()]).optional(),
  gender: z.union([z.literal("male"), z.literal("female"), z.null()]).optional(),
  country: z.union([z.string(), z.null()]).optional(),
  city: z.union([z.string(), z.null()]).optional(),
  bio: z.union([z.string(), z.null()]).optional(),
});
