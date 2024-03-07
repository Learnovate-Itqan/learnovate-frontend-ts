import Peer from "peerjs";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// import { v4 } from "uuid";
import { RootState } from "@/redux/store";

export function usePeerConnection() {
  const userId = useSelector((state: RootState) => state.auth.id);
  const [myPeer, setMyPeer] = useState<Peer>();
  const [myStream, setMyStream] = useState<MediaStream>();
  useEffect(() => {
    // create a new peer connection to make calls and answer calls

    // generate a random user id to setup peer
    /* when I tried to get the user's id from localStorage or from a state in the user context the peer connection broke so I generated the userId here and it seemed to be working*/
    // const userId = v4();
    const peer = new Peer(userId);
    // store the user id and peer connection
    // setUserId(userId);
    setMyPeer(peer);

    // get user media(camera and mic)
    try {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
        setMyStream(stream);
      });
    } catch (err) {
      console.error(err);
    }
  }, [userId]);
  return { myPeer, myStream };
}
