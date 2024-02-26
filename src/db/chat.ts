import { v4 as uuid } from "uuid";

import { db } from "@/db";

export const initialReservedMessage = async (title: string, message: string) => {
  try {
    const chatID = uuid();
    await db.chatTitle.add({ id: chatID, title });
    await db.chat.add({ id: chatID, role: "user", parts: message, time: Date.now() });
    return chatID;
  } catch (error) {
    console.error(error);
  }
};
