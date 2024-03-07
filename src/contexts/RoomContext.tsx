import Peer from "peerjs";
import React, { createContext, useContext, useEffect, useReducer } from "react";

import { usePeerConnection } from "@/hooks/usePeerConnection";
import { addAllPeers, removePeer } from "@/reducers/peersActions";
import { PeerState, peersReducer } from "@/reducers/peersReducer";
import { socket } from "@/socket";

type RoomContextValues = {
  myPeer: Peer;
  myStream: MediaStream;
  peers: PeerState;
};
const RoomContext = createContext<RoomContextValues>({
  myPeer: new Peer(),
  myStream: new MediaStream(),
  peers: {},
});
export default function RoomProvider({ children }: { children: React.ReactNode }) {
  const { myPeer, myStream } = usePeerConnection();
  const [peers, peersDispatcher] = useReducer(peersReducer, {});

  useEffect(() => {
    // add listener to get-users after joining room
    function getUsers({ users }: { users: PeerState }) {
      peersDispatcher(addAllPeers(users));
    }
    socket.on("get-users", getUsers);

    // add listener to remove disconnected user
    function removeDisconnectedUser({ userId }: { userId: string }) {
      console.log("user disconnected", userId);
      peersDispatcher(removePeer(userId));
    }
    socket.on("user-disconnected", removeDisconnectedUser);

    // cleanup
    return () => {
      socket.off("get-users");
      socket.off("user-disconnected");
    };
  }, []);

  return (
    <RoomContext.Provider value={{ myPeer: myPeer || new Peer(), myStream: myStream || new MediaStream(), peers }}>
      {children}
    </RoomContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useRoom() {
  return useContext(RoomContext);
}
