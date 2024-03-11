import { createSlice } from "@reduxjs/toolkit";
import { z } from "zod";

import { userSchema } from "@/schemas/userSchema";

const initialState: z.infer<typeof userSchema> = {
  id: "",
  name: "",
  email: "",
  authStatus: !!localStorage.getItem("accessToken"),
  role: undefined,
  image:
    "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: { payload: z.infer<typeof userSchema> }) => {
      return { ...state, ...action.payload };
    },
    resetUser: (state) => {
      return { ...state, ...initialState };
    },
  },
});

export const { setUser, resetUser } = authSlice.actions;
export const authReducer = authSlice.reducer;
