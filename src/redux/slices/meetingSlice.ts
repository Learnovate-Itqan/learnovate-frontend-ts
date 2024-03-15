import { createSlice } from "@reduxjs/toolkit";

export type MainStreamType = {
  userId: string;
  isSharingScreen: boolean;
};

type stateType = {
  isAsideOpen: boolean;
  asideVariant: "MEMBERS" | "CHAT";
  mainStream: MainStreamType | null;
};

const initialState: stateType = {
  isAsideOpen: false,
  asideVariant: "MEMBERS",
  mainStream: null,
};

const meetingSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    toggleAside: (state) => {
      state.isAsideOpen = !state.isAsideOpen;
    },
    closeAside: (state) => {
      state.isAsideOpen = false;
    },
    changeAsideVariant: (state, action) => {
      state.asideVariant = action.payload;
    },
    changeMainStream: (state, action) => {
      state.mainStream = action.payload;
    },
  },
});

export const { toggleAside, closeAside, changeAsideVariant, changeMainStream } = meetingSlice.actions;
export const meetingReducer = meetingSlice.reducer;
