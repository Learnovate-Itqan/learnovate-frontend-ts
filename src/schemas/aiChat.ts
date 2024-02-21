import { z } from "zod";

export const aiChatSchema = z.object({
  role: z.union([z.literal("user"), z.literal("model"), z.literal("other")]),
  parts: z.string(),
});

export const aiErrorSchema = z.object({
  message: z.string(),
  flag: z.boolean(),
});

export const aiAssistantSchema = z.object({
  chat: z.array(aiChatSchema),
  select: z.boolean(),
  typing: z.boolean(),
  error: aiErrorSchema,
});
