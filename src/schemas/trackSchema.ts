import { z } from "zod";

import { courseSchema } from "./courseSchema";
import { mentorSchema } from "./mentorSchema";

export const trackSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  subtitle: z.string(),
  description: z.string(),
  image: z.string().url(),
  progress: z.number(),
  estimatedTime: z.number(),
  noStudentsEnrolled: z.number(),
  keywords: z.array(z.string()),
  relatedTopics: z.array(z.string()),
  rating: z.number(),
  relatedCourses: z.array(courseSchema),
  relatedMentors: z.array(mentorSchema),
});
