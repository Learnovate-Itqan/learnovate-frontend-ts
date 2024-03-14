import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { VideoStreamPlayer } from "./VideoStreamPlayer";

export function MeetingMember({ memberId, stream }: { memberId: string; stream?: MediaStream }) {
  if (!memberId) return null;

  if (stream?.getTracks().find((track) => track.kind === "video")?.enabled) {
    return (
      <div className=" relative max-h-fit gap-3 overflow-hidden bg-[#222C54] text-white rounded-md w-full">
        <VideoStreamPlayer className=" w-full  object-cover" stream={stream} autoPlay muted playsInline />
        <span className=" absolute bottom-2 left-2">{memberId}</span>
      </div>
    );
  }
  return (
    <div className=" p-10 flex flex-col max-h-96 justify-center items-center gap-3 grow overflow-hidden bg-[#222C54] text-white rounded-md w-full">
      <Avatar className="w-24 h-24">
        <AvatarImage src={"https://avatars.githubusercontent.com/u/47269252?v=4"} title={memberId} alt={memberId} />
        <AvatarFallback className=" bg-royal-blue text-lg">{memberId?.slice(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
      <span>{memberId}</span>
    </div>
  );
}
