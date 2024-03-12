import { MeetingMember } from "@/components/meeting/MeetingMember";
import { useRoom } from "@/contexts/RoomContext";

export function MeetingMembers() {
  const { peers } = useRoom();
  return (
    <div className=" flex flex-col gap-3 grow m-2 mb-0 max-h-[calc(100dvh-90px)] overflow-y-auto overflow-x-hidden scrollbar">
      {Object.keys(peers).map((userId) => (
        <MeetingMember key={userId} memberId={peers[userId].userId} />
      ))}
    </div>
  );
}
