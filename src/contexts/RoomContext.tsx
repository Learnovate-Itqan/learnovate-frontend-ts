import Peer from "peerjs";
import React, { createContext, useContext, useEffect, useReducer } from "react";
import { useSelector } from "react-redux";

import { usePeerConnection } from "@/hooks/usePeerConnection";
import { addAllPeers, addPeerName, addPeerStream, removePeer } from "@/reducers/peersActions";
import { PeerState, peersReducer } from "@/reducers/peersReducer";
import { RootState } from "@/redux/store";
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
  const userName = useSelector((state: RootState) => state.auth.name);
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

  useEffect(() => {
    // if myPeer or myStream is not available return
    if (!myPeer || !myStream) return;

    // add listener for new user joined
    socket.on("new-user-joined", ({ userId, userName: name }: { userId: string; userName: string }) => {
      console.log("new user joined", userId);
      const call = myPeer.call(userId, myStream, {
        metadata: { callerName: userName, isSharingScreen: false },
      });
      console.log("calling new user", call);
      // add listener for streams from the new user
      call.on("stream", (userVideoStream) => {
        peersDispatcher(addPeerStream(userId, userVideoStream));
      });
      // store the new user's name
      peersDispatcher(addPeerName(userId, name));
    });

    // add listener for call
    myPeer.on("call", (call) => {
      const { callerName } = call.metadata;
      // answer the call and send my stream
      console.log("answering call", call);
      //   store caller's name
      peersDispatcher(addPeerName(call.peer, callerName));
      call.answer(myStream);
      // add listener for streams from the caller peer
      call.on("stream", (userVideoStream) => {
        peersDispatcher(addPeerStream(call.peer, userVideoStream));
      });
    });

    // cleanup
    return () => {
      socket.off("new-user-joined");
      myPeer.off("call");
    };
  }, [myPeer, myStream, userName]);

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
