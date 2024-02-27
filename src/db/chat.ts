import { v4 as uuid } from "uuid";

import { db } from "@/db";

export const initialReservedMessage = async (title: string, message: string) => {
  try {
    const chatID = uuid();
    await db.chatTitle.add({ id: chatID, title, time: Date.now() });
    await db.chat.add({ id: chatID, role: "user", parts: message, time: Date.now() });
    return chatID;
  } catch (error) {
    console.error(error);
  }
};

export const deleteChat = async (chatID: string) => {
  try {
    await db.chatTitle.delete(chatID);
    await db.chat.delete(chatID);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
