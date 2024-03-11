import { MeetingMember } from "@/components/meeting/MeetingMember";
import { useRoom } from "@/contexts/RoomContext";

export function MeetingMembers() {
  const { peers } = useRoom();
  return (
    <div className=" flex flex-col gap-3 grow m-2 mb-0  scrollbar">
      {Object.keys(peers).map((userId) => (
        <MeetingMember key={userId} memberId={peers[userId].userId} />
      ))}
    </div>
  );
}
