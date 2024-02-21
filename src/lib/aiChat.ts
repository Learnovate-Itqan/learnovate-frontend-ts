import { GoogleGenerativeAI, InputContent } from "@google/generative-ai";

export const startChat = (history?: InputContent[]) => {
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  return model.startChat({ history: history });
};
