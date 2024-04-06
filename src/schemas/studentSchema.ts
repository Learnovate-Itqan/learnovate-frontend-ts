import { z } from "zod";

import { sessionSchema } from "./sessionSchema";
import { userSchema } from "./userSchema";

export const studentSchema = z.object({
  id: z.string().uuid(),
  studentID: z.string().uuid(),
  linkedIn: z.string().nullable(),
  gitHub: z.string().nullable(),
  facebook: z.string().nullable(),
  twitter: z.string().nullable(),
  levelOfStudent: z.string(),
  user: userSchema,
  tracks: z.array(z.object({ title: z.string(), id: z.string().uuid(), progress: z.number() })),
  sessions: z.array(sessionSchema),
});
