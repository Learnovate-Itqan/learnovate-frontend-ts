import { useSelector } from "react-redux";

import { MeetingMember } from "@/components/meeting/MeetingMember";
import { useRoom } from "@/contexts/RoomContext";
import { RootState } from "@/redux/store";

export function MeetingMembers() {
  const { peers, myStream, shareScreenPeers } = useRoom();
  const myId = useSelector((state: RootState) => state.auth?.id);
  return (
    <div className=" flex flex-col gap-3 grow m-2 mb-0 max-h-[calc(100dvh-90px)] overflow-y-auto overflow-x-hidden scrollbar">
      <MeetingMember memberId={"you"} stream={myStream} />
      {Object.keys(peers).map((userId) => {
        if (myId === userId) return null;
        return <MeetingMember key={userId} memberId={peers[userId].userId} stream={peers[userId].stream} />;
      })}
      {Object.keys(shareScreenPeers).map((userId) => {
        return (
          <MeetingMember
            key={userId}
            memberId={shareScreenPeers[userId].userId === myId ? "you" : shareScreenPeers[userId].userId}
            stream={shareScreenPeers[userId].stream}
          />
        );
      })}
    </div>
  );
}
