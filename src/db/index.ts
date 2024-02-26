import Dexie, { Table } from "dexie";
import { z } from "zod";

export const Chat = z.object({
  id: z.string(),
  role: z.union([z.literal("user"), z.literal("model")]),
  parts: z.string(),
  time: z.union([z.number(), z.string()]),
});

export const ChatTitle = z.object({
  id: z.string(),
  title: z.string(),
});

export class DexieDB extends Dexie {
  chat!: Table<z.infer<typeof Chat>>;

  constructor() {
    super("Learnovate");
    this.version(1).stores({
      chat: "id, role, parts, time",
      chatTitle: "id, title",
    });
  }
}

export const db = new DexieDB();
