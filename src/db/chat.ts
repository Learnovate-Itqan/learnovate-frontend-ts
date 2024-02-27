import { v4 as uuid } from "uuid";

import { db } from "@/db";

export const initializeChat = async (title: string, message: string) => {
  try {
    const chatID = uuid();
    const time = Date.now();
    await db.chatTitle.add({ id: chatID, title, time });
    await db.chat.add({ chatID, role: "user", parts: message, time });
    return chatID;
  } catch (error) {
    console.error(error);
  }
};

export const sendMessage = async (chatID: string, role: "user" | "model", message: string) => {
  try {
    await db.chat.add({ chatID, role, parts: message, time: Date.now() });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const deleteChat = async (chatID: string) => {
  try {
    await db.chatTitle.delete(chatID);
    await db.chat.where("chatID").equals(chatID).delete();
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getChatByID = async (chatID: string | null) => {
  if (!chatID) return;
  // return all the chat data and sort it by time
  try {
    const chat = await db.chat.where("chatID").equals(chatID).sortBy("time");
    // check if empty
    if (!chat.length) return;
    return chat;
  } catch (error) {
    console.error(error);
  }
};
