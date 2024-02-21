import { GoogleGenerativeAI, InputContent } from "@google/generative-ai";

export const startChat = () => {
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const history: InputContent[] = JSON.parse(sessionStorage.getItem("ai") || "[]");
  return model.startChat({ history });
};
