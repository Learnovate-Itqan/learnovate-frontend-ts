import Peer from "peerjs";
import { useEffect, useState } from "react";
import { v4 } from "uuid";

export function usePeerConnection() {
  const [myPeer, setMyPeer] = useState<Peer>();
  const [myStream, setMyStream] = useState<MediaStream>();
  const [userId, setUserId] = useState<string>();
  const [isCameraEnabled, setIsCameraEnabled] = useState(true);
  const [isMicEnabled, setIsMicEnabled] = useState(true);
  useEffect(() => {
    // create a new peer connection to make calls and answer calls

    // generate a random user id to setup peer
    /* when I tried to get the user's id from localStorage or from a state in the user slice the peer connection broke so I generated the userId here and it seemed to be working*/
    const userId = v4();
    const peer = new Peer(userId);
    // store the user id and peer connection
    setUserId(userId);
    setMyPeer(peer);
  }, []);

  useEffect(() => {
    // get user media(camera and mic)
    try {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
        setMyStream(stream);
      });
    } catch (err) {
      console.error(err);
    }
  }, []);

  function toggleCamera() {
    if (!myStream) return;
    const videoTrack = myStream.getVideoTracks()[0];
    if (videoTrack) {
      videoTrack.enabled = !isCameraEnabled;
      setIsCameraEnabled(!isCameraEnabled);
    }
  }

  function toggleMic() {
    if (!myStream) return;
    const audioTrack = myStream.getTracks().find((track) => track.kind === "audio");
    if (audioTrack) {
      audioTrack.enabled = !isMicEnabled;
      setIsMicEnabled(!isMicEnabled);
    }
  }
  return { myPeer, myStream, userId, toggleCamera, toggleMic, isCameraEnabled, isMicEnabled };
}
