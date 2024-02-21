import { createSlice } from "@reduxjs/toolkit";
import { z } from "zod";

import { aiAssistantSchema, aiChatSchema, aiErrorSchema } from "@/schemas/aiChat";

const initialState: z.infer<typeof aiAssistantSchema> = {
  chat: [],
  select: false,
  typing: false,
  error: { message: "", flag: false },
};

export const aiChatSlice = createSlice({
  name: "aiChat",
  initialState,
  reducers: {
    setMessages: (state, action: { payload: z.infer<typeof aiChatSchema> }) => {
      return { ...state, chat: [...state.chat, action.payload] };
    },
    setChatSelect: (state, action: { payload: boolean }) => {
      return { ...state, select: action.payload };
    },
    setTyping: (state, action: { payload: boolean }) => {
      return { ...state, typing: action.payload };
    },
    setError: (state, action: { payload: z.infer<typeof aiErrorSchema> }) => {
      return { ...state, error: action.payload };
    },
    setNewChat: () => {
      return { ...initialState };
    },
  },
});

export const { setMessages, setChatSelect, setTyping, setError, setNewChat } = aiChatSlice.actions;
export const aiChatReducer = aiChatSlice.reducer;
