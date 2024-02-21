import { createSlice } from "@reduxjs/toolkit";
import { z } from "zod";

import { aiAssistantSchema, aiChatSchema } from "@/schemas/aiChat";

const initialState: z.infer<typeof aiAssistantSchema> = {
  chat: [],
  select: false,
  typing: false,
  error: undefined,
};

export const aiChatSlice = createSlice({
  name: "aiChat",
  initialState,
  reducers: {
    setAIMessages: (state, action: { payload: z.infer<typeof aiChatSchema> }) => {
      return { ...state, chat: [...state.chat, action.payload] };
    },
    setAILoadMessages: (state, action: { payload: z.infer<typeof aiChatSchema>[] }) => {
      return { ...state, chat: action.payload };
    },
    setAIChatSelect: (state, action: { payload: boolean }) => {
      return { ...state, select: action.payload };
    },
    setAITyping: (state, action: { payload: boolean }) => {
      return { ...state, typing: action.payload };
    },
    setAIError: (state, action: { payload: string | undefined }) => {
      return { ...state, error: action.payload };
    },
    setNewAIChat: () => {
      return { ...initialState };
    },
  },
});

export const { setAIMessages, setAILoadMessages, setAIChatSelect, setAITyping, setAIError, setNewAIChat } =
  aiChatSlice.actions;
export const aiChatReducer = aiChatSlice.reducer;
