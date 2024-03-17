import Peer from "peerjs";
import React, { createContext, useContext, useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";

import { usePeerConnection } from "@/hooks/usePeerConnection";
import { addAllPeers, addPeer, addPeerStream, removePeer } from "@/reducers/peersActions";
import { PeerState, peersReducer } from "@/reducers/peersReducer";
import { addAllScreenPeers, addScreenPeer, addScreenPeerName, removeScreenPeer } from "@/reducers/screenPeerActions";
import { ScreenPeerState, screenPeersReducer } from "@/reducers/screenPeerReducer";
import { changeMainStream } from "@/redux/slices/meetingSlice";
import { RootState } from "@/redux/store";
import { socket } from "@/socket";

type RoomContextValues = {
  myPeer: Peer;
  myStream: MediaStream;
  screenStream: MediaStream | undefined;
  peers: PeerState;
  shareScreenPeers: ScreenPeerState;
  isCameraEnabled: boolean;
  isMicEnabled: boolean;
  shareScreen: () => void;
  toggleCamera?: () => void;
  toggleMic?: () => void;
  endCall?: () => void;
};
const RoomContext = createContext<RoomContextValues>({
  myPeer: new Peer(),
  myStream: new MediaStream(),
  peers: {},
  screenStream: new MediaStream(),
  shareScreenPeers: {},
  isCameraEnabled: true,
  isMicEnabled: true,
  shareScreen: () => {},
  toggleCamera: () => {},
  toggleMic: () => {},
  endCall: () => {},
});
export default function RoomProvider({ children }: { children: React.ReactNode }) {
  const { id: myId, name: userName } = useSelector((state: RootState) => state.auth);
  const { myPeer, myStream, toggleCamera, toggleMic, isCameraEnabled, isMicEnabled } = usePeerConnection();
  const [screenStream, setScreenStream] = useState<MediaStream>();
  const [shareScreenPeer, setShareScreenPeer] = useState<Peer>();
  const [peers, peersDispatcher] = useReducer(peersReducer, {});
  const [shareScreenPeers, dispatchShareScreenPeers] = useReducer(screenPeersReducer, {});
  const navigate = useNavigate();
  const mainStream = useSelector((state: RootState) => state.meeting.mainStream);
  const dispatch = useDispatch();
  //   function to stop the screen sharing
  function closeShareScreen(sharingPeer: Peer) {
    if (!myId) return;
    if (sharingPeer) {
      // stop the screen sharing in case closing it from the browser prompt
      shareScreenPeers[myId]?.stream?.getTracks().forEach((track) => track.stop());

      // remove and destroy the connection
      dispatchShareScreenPeers(removeScreenPeer(myId));
      sharingPeer.destroy();
      setShareScreenPeer(undefined);
      setScreenStream(undefined);
      socket.emit("stop-share-screen", { myId });
    }
  }

  function shareScreen() {
    if (!myId) return;
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
      dispatchShareScreenPeers(addScreenPeer(myId, shareScreenId, stream));
      //   call each peer in the room to share the stream
      Object.keys(peers).forEach((userId) => {
        if (userId === myId) return;
        const peerId = peers[userId].peerId;
        if (peerId) {
          sharingScreenPeer?.call(peerId, stream, {
            metadata: { callerName: userName, isSharingScreen: true, userId: myId },
          });
        }
      });

      //   add eventlistener to be triggered in the end of the stream
      stream.getVideoTracks()[0].onended = () => {
        closeShareScreen(sharingScreenPeer);
      };
      socket.emit("share-screen", { shareScreenId, myId, userName });
    });
  }

  function endCall() {
    if (!myPeer || !myStream) return;
    myPeer.destroy();
    myStream.getTracks().forEach((track) => track.stop());
    socket.close();
    navigate("/", { replace: true });
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
      if (userId === mainStream?.userId) {
        dispatch(changeMainStream(null));
      }
      peersDispatcher(removePeer(userId));
    }
    socket.on("user-disconnected", removeDisconnectedUser);

    // cleanup
    return () => {
      socket.off("get-users");
      socket.off("user-disconnected");
    };
  }, [dispatch, mainStream?.userId]);

  useEffect(() => {
    // if myPeer or myStream is not available return
    if (!myPeer || !myStream) return;

    // add listener for new user joined
    socket.on(
      "new-user-joined",
      ({ userId, userName: name, peerId }: { userId: string; userName: string; peerId: string }) => {
        let isCallReceived = false;
        console.log("new user joined", peerId);
        let call = myPeer.call(peerId, myStream, {
          metadata: { callerName: userName, isSharingScreen: false, userId: myId },
        });
        console.log("calling new user", call);
        // add listener for streams from the new user
        call.on("stream", (userVideoStream) => {
          isCallReceived = true;
          peersDispatcher(addPeerStream(userId, userVideoStream));
        });
        setTimeout(() => {
          if (!isCallReceived) {
            call = myPeer.call(peerId, myStream, {
              metadata: { callerName: userName, isSharingScreen: false, userId: myId },
            });
            console.log("calling new user again", call);
            call.on("stream", (userVideoStream) => {
              isCallReceived = true;
              peersDispatcher(addPeerStream(userId, userVideoStream));
            });
          }
        }, 1000);

        // store the new user's name
        peersDispatcher(addPeer(userId, name, peerId));

        if (screenStream === undefined) return;
        shareScreenPeer?.call(userId, screenStream, {
          metadata: { callerName: userName, isSharingScreen: true, userId: myId },
        });
      }
    );

    // add listener for call
    myPeer.on("call", (call) => {
      const { isSharingScreen, callerName, userId: callerId } = call.metadata;
      const callerPeerId = call.peer;
      //   check if the call is screen sharing
      if (isSharingScreen) {
        call.answer();
        call.on("stream", (userVideoStream) => {
          console.log("stream from caller", callerId);
          dispatchShareScreenPeers(addScreenPeer(callerId, callerPeerId, userVideoStream));
          dispatchShareScreenPeers(addScreenPeerName(callerId, callerName));
        });
        call.on("close", () => {
          if (callerId === mainStream?.userId) {
            dispatch(changeMainStream(null));
          }
          dispatchShareScreenPeers(removeScreenPeer(callerId));
        });
        return;
      }
      // answer the call and send my stream
      console.log("answering call", call);
      //   store caller's name
      peersDispatcher(addPeer(callerId, callerName, callerPeerId));
      call.answer(myStream);
      // add listener for streams from the caller peer
      call.on("stream", (userVideoStream) => {
        console.log("stream from caller", userVideoStream);
        peersDispatcher(addPeerStream(callerId, userVideoStream));
      });
    });

    // cleanup
    return () => {
      socket.off("new-user-joined");
      myPeer.off("call");
    };
  }, [myPeer, myStream, userName, screenStream, shareScreenPeer, myId, dispatch, mainStream]);

  return (
    <RoomContext.Provider
      value={{
        myPeer: myPeer || new Peer(),
        myStream: myStream || new MediaStream(),
        screenStream,
        peers,
        shareScreen,
        shareScreenPeers,
        toggleCamera,
        toggleMic,
        isCameraEnabled,
        isMicEnabled,
        endCall,
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
