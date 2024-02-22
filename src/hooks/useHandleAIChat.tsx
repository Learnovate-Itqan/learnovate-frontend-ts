import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { useDispatch } from "react-redux";
import { z } from "zod";

import { startChat } from "@/lib/aiChat";
import { setAIError, setAILoadMessages, setAIMessages, setAITyping, setNewAIChat } from "@/redux/slices/aiChatSlice";
import { aiChatSchema } from "@/schemas/aiChat";

type TForm =
  | UseFormReturn<
      {
        text: string;
        image?: string | undefined;
      },
      unknown,
      undefined
    >
  | undefined;

type TMessage = z.infer<typeof aiChatSchema>;

export const useHandleAIChat = (form?: TForm) => {
  const dispatch = useDispatch();
  const aiChat = startChat();

  const aiChatHandler = {
    mutateMessage: async (message: string) => {
      if (!form) return;
      const userMessage: TMessage = { role: "user", parts: message, time: new Date() };
      dispatch(setAIMessages(userMessage));
      form.reset();
      dispatch(setAITyping(true));
      try {
        const result = await aiChat.sendMessage(message);
        const response = result.response;
        const text = response.text();
        dispatch(setAITyping(false));
        const aiMessage: TMessage = { role: "model", parts: text, time: new Date() };
        dispatch(setAIMessages(aiMessage));
        const history: z.infer<typeof aiChatSchema>[] = JSON.parse(sessionStorage.getItem("ai") || "[]");
        sessionStorage.setItem("ai", JSON.stringify([...history, userMessage, aiMessage]));
      } catch (error) {
        const timer = setTimeout(() => {
          dispatch(setAITyping(false));
          dispatch(setAIError("Something went wrong, please try again later"));
        }, 1000);
        return () => clearTimeout(timer);
      }
    },
    clear: () => {
      dispatch(setNewAIChat());
      sessionStorage.removeItem("ai");
    },
  };

  useEffect(() => {
    const history: z.infer<typeof aiChatSchema>[] = JSON.parse(sessionStorage.getItem("ai") || "[]");
    dispatch(setAILoadMessages(history));
  }, [dispatch]);

  return aiChatHandler;
};
