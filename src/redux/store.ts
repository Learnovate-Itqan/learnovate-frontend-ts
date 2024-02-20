import { configureStore } from "@reduxjs/toolkit";

import { aiChatReducer } from "./slices/aiChatSlice";
import { authReducer } from "./slices/authSlice";
import { navReducer } from "./slices/navSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    nav: navReducer,
    aiChat: aiChatReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
