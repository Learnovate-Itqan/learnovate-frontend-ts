import React, { createContext, useContext } from "react";

type RoomContextValues = null;
const RoomContext = createContext<RoomContextValues>(null);
export default function RoomProvider({ children }: { children: React.ReactNode }) {
  return <RoomContext.Provider value={null}>{children}</RoomContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useRoom() {
  return useContext(RoomContext);
}
