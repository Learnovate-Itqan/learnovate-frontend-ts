import { z } from "zod";

export const courseSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  publishTime: z.string(),
  description: z.string(),
  keywords: z.array(z.string()),
  image: z.string().url(),
  progress: z.number(),
  estimatedTime: z.number(),
  noChapters: z.number(),
  noStudentsEnrolled: z.number(),
  rating: z.number(),
  cLevel: z.literal("beginner").or(z.literal("intermediate")).or(z.literal("hard")),
  cLink: z.string(),
  trackID: z.string().uuid(),
  trackName: z.string(),
  price: z.number(),
  publisher: z.object({
    id: z.string().uuid(),
    name: z.string(),
    image: z.string().url(),
  }),
});
