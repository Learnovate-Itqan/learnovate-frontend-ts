import { z } from "zod";

import { sessionSchema } from "./sessionSchema";
import { userSchema } from "./userSchema";

export const MentorAvailabilitySchema = z.object({
  id: z.string().uuid(),
  mentorID: z.string().uuid(),
  date: z.date(),
  startTime: z.number(),
  endTime: z.number(),
  isBooked: z.boolean(),
});

export const mentorSchema = z.object({
  id: z.string().uuid(),
  mentorID: z.string().uuid(),
  noStudents: z.number(),
  pricePerHour: z.number(),
  rating: z.number(),
  title: z.string(),
  about: z.string(),
  experience: z.number(),
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
  location: z.string(),
  timeZones: z.string(),
  user: userSchema,
  track: z.object({ name: z.string(), id: z.string().uuid() }),
  availability: z.array(MentorAvailabilitySchema),
  sessions: z.array(sessionSchema),
});

export const BasicInfoFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }).max(100, { message: "Name is too long" }),
  title: z.string().min(1, { message: "Title is required" }).max(100, { message: "Title is too long" }),
  bio: z.string().min(1, { message: "Bio is required" }).max(1000, { message: "Bio is too long" }),
  price: z.string().min(1, { message: "Price is required" }).max(3, { message: "Price is too high" }),
});

export const ProSectionSchema = z.object({
  workExp: z
    .string()
    .min(1, { message: "Work experience is required" })
    .max(1000, { message: "Work experience is too long" }),
  education: z.string().min(1, { message: "Education is required" }).max(100, { message: "Education is too long" }),
  experience: z.string().min(1, { message: "Experience is required" }).max(1000, { message: "Experience is too long" }),
  location: z.string().min(1, { message: "Location is required" }).max(100, { message: "Location is too long" }),
});

export const SocialMediaSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .max(100, { message: "Email is too long" })
    .email({ message: "Invalid email" }),
  linkedIn: z
    .string()
    .min(1, { message: "LinkedIn is required" })
    .max(100, { message: "LinkedIn is too long" })
    .url({ message: "Invalid URL" }),
  gitHub: z
    .string()
    .min(1, { message: "GitHub is required" })
    .max(100, { message: "GitHub is too long" })
    .url({ message: "Invalid URL" }),
  x: z
    .string()
    .min(1, { message: "x is required" })
    .max(100, { message: "x is too long" })
    .url({ message: "Invalid URL" }),
});
