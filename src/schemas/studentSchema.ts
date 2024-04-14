import { z } from "zod";

import { imageSchema } from "./imageSchema";
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

export const studentBasicInfoFormSchema = z.object({
  image: imageSchema.optional(),
  name: z.string().min(1, { message: "Name is required" }).max(100, { message: "Name is too long" }),
  email: z
    .string()
    .email({ message: "Invalid email" })
    .min(1, { message: "Email is required" })
    .max(100, { message: "Email is too long" }),
  mobileNumber: z.string().max(100, { message: "Mobile number is too long" }),
  dateOfBirth: z.date(),
  country: z.string().max(100, { message: "Country is too long" }),
  city: z.string().max(100, { message: "City is too long" }),
  education: z.string().max(100, { message: "Education is too long" }),
  gradYear: z.number(),
});
