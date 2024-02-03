import { z } from "zod";

export const trackSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  subtitle: z.string(),
  description: z.string(),
  image: z.string().url(),
  progress: z.number(),
  estimatedTime: z.number(),
  noStudentsEnrolled: z.number(),
  keywords: z.array(z.string()),
});
