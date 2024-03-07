import Peer from "peerjs";
import React, { createContext, useContext, useEffect, useReducer, useState } from "react";
import { useSelector } from "react-redux";
import { v4 } from "uuid";

import { usePeerConnection } from "@/hooks/usePeerConnection";
import { addAllPeers, addPeerName, addPeerStream, removePeer } from "@/reducers/peersActions";
import { PeerState, peersReducer } from "@/reducers/peersReducer";
import { addAllScreenPeers, addScreenPeer, addScreenPeerName, removeScreenPeer } from "@/reducers/screenPeerActions";
import { ScreenPeerState, screenPeersReducer } from "@/reducers/screenPeerReducer";
import { RootState } from "@/redux/store";
import { socket } from "@/socket";

type RoomContextValues = {
  myPeer: Peer;
  myStream: MediaStream;
  peers: PeerState;
  shareScreenPeers: ScreenPeerState;
  shareScreen: () => void;
};
const RoomContext = createContext<RoomContextValues>({
  myPeer: new Peer(),
  myStream: new MediaStream(),
  peers: {},
  shareScreenPeers: {},
  shareScreen: () => {},
});
export default function RoomProvider({ children }: { children: React.ReactNode }) {
  const userName = useSelector((state: RootState) => state.auth.name);
  const { myPeer, myStream, userId } = usePeerConnection();
  const [screenStream, setScreenStream] = useState<MediaStream>();
  const [shareScreenPeer, setShareScreenPeer] = useState<Peer>();
  const [peers, peersDispatcher] = useReducer(peersReducer, {});
  const [shareScreenPeers, dispatchShareScreenPeers] = useReducer(screenPeersReducer, {});

  //   function to stop the screen sharing
  function closeShareScreen(sharingPeer: Peer) {
    if (!userId) return;
    if (sharingPeer) {
      // stop the screen sharing in case closing it from the browser prompt
      shareScreenPeers[userId]?.stream?.getTracks().forEach((track) => track.stop());

      // remove and destroy the connection
      dispatchShareScreenPeers(removeScreenPeer(userId));
      sharingPeer.destroy();
      setShareScreenPeer(undefined);
      setScreenStream(undefined);
      socket.emit("stop-share-screen", { userId });
    }
  }

  function shareScreen() {
    if (!userId) return;
    // check if the user is streaming his screen, if so close the stream
    if (shareScreenPeer) {
      closeShareScreen(shareScreenPeer);
      return;
    }
    // create a new peer connection for streaming the screen
    const shareScreenId = v4();
    const sharingScreenPeer = new Peer(shareScreenId);
    setShareScreenPeer(sharingScreenPeer);
    // get the screen stream
    navigator.mediaDevices.getDisplayMedia({}).then((stream) => {
      // store the stream
      setScreenStream(stream);
      dispatchShareScreenPeers(addScreenPeer(userId, shareScreenId, stream));
      //   call each peer in the room to share the stream
      Object.keys(peers).forEach((peerId) => {
        if (peerId === myPeer?.id) return;
        sharingScreenPeer?.call(peerId, stream, {
          metadata: { callerName: userName, isSharingScreen: true, userId },
        });
      });

      //   add eventlistener to be triggered in the end of the stream
      stream.getVideoTracks()[0].onended = () => {
        closeShareScreen(sharingScreenPeer);
      };
      socket.emit("share-screen", { shareScreenId, userId, userName });
    });
  }

  useEffect(() => {
    // add listener to get-users after joining room
    function getUsers({ users, screensSharing }: { users: PeerState; screensSharing: ScreenPeerState }) {
      dispatchShareScreenPeers(addAllScreenPeers(screensSharing));
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

      if (screenStream === undefined) return;
      shareScreenPeer?.call(userId, screenStream, {
        metadata: { callerName: userName, isSharingScreen: true },
      });
    });

    // add listener for call
    myPeer.on("call", (call) => {
      const { isSharingScreen, callerName, userId: streamerId } = call.metadata;
      //   check if the call is screen sharing
      if (isSharingScreen) {
        call.answer();
        call.on("stream", (userVideoStream) => {
          dispatchShareScreenPeers(addScreenPeer(streamerId, call.peer, userVideoStream));
          dispatchShareScreenPeers(addScreenPeerName(streamerId, callerName));
        });
        call.on("close", () => {
          dispatchShareScreenPeers(removeScreenPeer(streamerId));
        });
        return;
      }
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
  }, [myPeer, myStream, userName, screenStream, shareScreenPeer]);

  return (
    <RoomContext.Provider
      value={{
        myPeer: myPeer || new Peer(),
        myStream: myStream || new MediaStream(),
        peers,
        shareScreen,
        shareScreenPeers,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useRoom() {
  return useContext(RoomContext);
}
