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

export const useHandleAIChat = (form: TForm) => {
  const dispatch = useDispatch();
  const aiChat = startChat();

  const aiChatHandler = {
    mutateMessage: async (message: string) => {
      if (!form) return;
      dispatch(setAIMessages({ role: "user", parts: message }));
      form.reset();
      dispatch(setAITyping(true));
      try {
        const result = await aiChat.sendMessage(message);
        const response = result.response;
        const text = response.text();
        dispatch(setAITyping(false));
        dispatch(setAIMessages({ role: "model", parts: text }));
        const history: z.infer<typeof aiChatSchema>[] = JSON.parse(sessionStorage.getItem("ai") || "[]");
        sessionStorage.setItem(
          "ai",
          JSON.stringify([...history, { role: "user", parts: message }, { role: "model", parts: text }])
        );
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
    },
  };

  useEffect(() => {
    const history: z.infer<typeof aiChatSchema>[] = JSON.parse(sessionStorage.getItem("ai") || "[]");
    dispatch(setAILoadMessages(history));
  }, [dispatch]);

  return aiChatHandler;
};
