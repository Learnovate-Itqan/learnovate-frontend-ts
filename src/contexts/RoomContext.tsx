import Peer from "peerjs";
import React, { createContext, useContext } from "react";

import { usePeerConnection } from "@/hooks/usePeerConnection";

type RoomContextValues = {
  myPeer: Peer;
  myStream: MediaStream;
};
const RoomContext = createContext<RoomContextValues>({
  myPeer: new Peer(),
  myStream: new MediaStream(),
});
export default function RoomProvider({ children }: { children: React.ReactNode }) {
  const { myPeer, myStream } = usePeerConnection();
  return (
    <RoomContext.Provider value={{ myPeer: myPeer || new Peer(), myStream: myStream || new MediaStream() }}>
      {children}
    </RoomContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useRoom() {
  return useContext(RoomContext);
}
