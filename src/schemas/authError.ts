import { z } from "zod";

export const authErrorSchema = z.array(
  z.object({
    msg: z.string(),
    type: z.string(),
    value: z.string(),
    location: z.string().optional(),
    path: z.string().optional(),
  })
);
