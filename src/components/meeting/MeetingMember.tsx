import { useSelector } from "react-redux";

import { useRoom } from "@/contexts/RoomContext";
import { RootState } from "@/redux/store";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { VideoStreamPlayer } from "./VideoStreamPlayer";

export function MeetingMember({ memberId }: { memberId: string }) {
  const userId = useSelector((state: RootState) => state.auth?.id);
  const { myStream, peers } = useRoom();
  if (!memberId) return null;
  if (memberId === userId) return <VideoStreamPlayer stream={myStream} className="" muted autoPlay playsInline />;
  if (peers[memberId]?.stream) {
    return <VideoStreamPlayer stream={peers[memberId].stream || new MediaStream()} className="" autoPlay playsInline />;
  }
  return (
    <div className=" p-10 flex flex-col justify-center items-center gap-3 grow overflow-hidden bg-[#222C54] text-white rounded-md w-full">
      <Avatar className="w-24 h-24">
        <AvatarImage src={"https://avatars.githubusercontent.com/u/47269252?v=4"} title={memberId} alt={memberId} />
        <AvatarFallback className=" bg-royal-blue text-lg">{memberId?.slice(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
      <span>{memberId}</span>
    </div>
  );
}
