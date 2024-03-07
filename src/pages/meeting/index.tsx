import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { VideoStreamPlayer } from "@/components/meeting/VideoStreamPlayer";
import { useRoom } from "@/contexts/RoomContext";
import { RootState } from "@/redux/store";
import { socket } from "@/socket";

export function Meeting() {
  const { id: roomId } = useParams();
  const { myStream, myPeer, peers, shareScreen, shareScreenPeers } = useRoom();
  const userName = useSelector((state: RootState) => state.auth?.name);

  useEffect(() => {
    if (!(myPeer.id && myStream && roomId && userName)) return;
    socket.emit("join-room", { roomId, userId: myPeer.id, userName });

    return () => {
      socket.off("join-room");
    };
  }, [myPeer, myStream, roomId, userName]);
  return (
    <div>
      <VideoStreamPlayer stream={myStream} />
      {myPeer && <p>Peer ID: {myPeer.id}</p>}
      <button onClick={shareScreen}>Share Screen</button>
      {Object.keys(peers).map((peerId) => {
        if (peerId === myPeer.id) return null;
        if (!peers[peerId].stream) return null;
        return <VideoStreamPlayer key={peerId} stream={peers[peerId].stream || new MediaStream()} />;
      })}
      {Object.keys(shareScreenPeers).map((peerId) => {
        if (!shareScreenPeers[peerId].stream) return null;
        return <VideoStreamPlayer key={peerId} stream={shareScreenPeers[peerId].stream || new MediaStream()} />;
      })}
    </div>
  );
}
