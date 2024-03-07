import { VideoStreamPlayer } from "@/components/meeting/VideoStreamPlayer";
import { useRoom } from "@/contexts/RoomContext";

export function Meeting() {
  const { myStream, myPeer } = useRoom();
  return (
    <div>
      <VideoStreamPlayer stream={myStream} />
      {myPeer && <p>Peer ID: {myPeer.id}</p>}
    </div>
  );
}
