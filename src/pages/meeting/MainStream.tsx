import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { MeetingMember } from "@/components/meeting/MeetingMember";
import { VideoStreamPlayer } from "@/components/meeting/VideoStreamPlayer";
import { useRoom } from "@/contexts/RoomContext";
import { changeMainStream } from "@/redux/slices/meetingSlice";
import { RootState } from "@/redux/store";
import { socket } from "@/socket";

export default function MainStream() {
  const { peers, shareScreenPeers } = useRoom();
  const myId = useSelector((state: RootState) => state.auth?.id);
  const mainStream = useSelector((state: RootState) => state.meeting.mainStream);
  const dispatch = useDispatch();
  const currentMainStream = mainStream?.isSharingScreen
    ? Object.values(shareScreenPeers).find((peer) => peer.userId === mainStream?.userId)?.stream
    : Object.values(peers).find((peer) => peer.userId === mainStream?.userId)?.stream;

  useEffect(() => {
    socket.on("camera-status-changed", ({ userId, isCameraEnabled }) => {
      if (userId !== mainStream?.userId || isCameraEnabled) return;
      dispatch(changeMainStream(null));
    });
  }, [mainStream?.userId, dispatch]);

  if (!currentMainStream)
    return (
      <div className=" flex gap-3 justify-center h-full items-center p-20  ">
        <MeetingMember className="grow" memberId={"you"} />
        {Object.keys(peers).map((userId) => {
          if (myId === userId) return null;
          return <MeetingMember key={userId} memberId={peers[userId].userId} />;
        })}
        {Object.keys(shareScreenPeers).map((userId) => {
          return (
            <MeetingMember
              key={userId}
              isSharingScreen={true}
              memberId={shareScreenPeers[userId].userId === myId ? "you" : shareScreenPeers[userId].userId}
            />
          );
        })}
      </div>
    );

  return (
    <VideoStreamPlayer
      className="absolute aspect-video z-10 inset-0  h-dvh w-full  "
      stream={currentMainStream}
      muted
      autoPlay
      playsInline
    />
  );
}
