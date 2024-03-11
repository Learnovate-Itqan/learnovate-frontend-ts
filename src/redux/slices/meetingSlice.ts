import { createSlice } from "@reduxjs/toolkit";

type stateType = {
  isAsideOpen: boolean;
  asideVariant: "MEMBERS" | "CHAT";
};

const initialState: stateType = {
  isAsideOpen: false,
  asideVariant: "MEMBERS",
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
  },
});

export const { toggleAside, closeAside, changeAsideVariant } = meetingSlice.actions;
export const meetingReducer = meetingSlice.reducer;
