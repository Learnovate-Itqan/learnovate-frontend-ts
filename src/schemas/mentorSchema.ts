import { z } from "zod";

import { trackSchema } from "./trackSchema";
import { userSchema } from "./userSchema";

export const mentorSchema = z.object({
  id: z.string().uuid(),
  mentorID: z.string().uuid(),
  noStudents: z.number(),
  pricePerHour: z.number(),
  rating: z.number(),
  title: z.string(),
  about: z.string(),
  experience: z.string(),
  skills: z.array(z.string()),
  resume: z.string(),
  education: z.string(),
  workExperience: z.string(),
  linkedIn: z.string(),
  gitHub: z.string(),
  facebook: z.string(),
  twitter: z.string(),
  languages: z.array(z.string()),
  trackID: z.string().uuid(),
  user: userSchema,
  track: trackSchema,
});
