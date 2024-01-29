import { createSlice } from "@reduxjs/toolkit";
import { z } from "zod";

import { userSchema } from "@/schemas/userSchema";

const initialState: z.infer<typeof userSchema> = {
  id: "",
  name: "",
  email: "",
  authStatus: !!localStorage.getItem("accessToken"),
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: { payload: z.infer<typeof userSchema> }) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.authStatus = action.payload.authStatus;
    },
  },
});

export const { setUser } = authSlice.actions;
export const authReducer = authSlice.reducer;
