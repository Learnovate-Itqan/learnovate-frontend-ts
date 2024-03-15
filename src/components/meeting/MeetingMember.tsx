import { useEffect, useRef, useState } from "react";
import { RiMicOffFill } from "react-icons/ri";

import { socket } from "@/socket";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { VideoStreamPlayer } from "./VideoStreamPlayer";

export function MeetingMember({ memberId, stream }: { memberId: string; stream?: MediaStream }) {
  const [isMicEnable, setIsMicEnable] = useState(false);
  const [isCameraEnable, setIsCameraEnable] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    socket.on("camera-status-changed", ({ userId, isCameraEnabled }) => {
      if (userId !== memberId) return;
      setIsCameraEnable(isCameraEnabled);
    });
    socket.on("mic-status-changed", ({ userId, isMicEnabled }) => {
      if (userId !== memberId) return;
      setIsMicEnable(isMicEnabled);
    });
  }, [memberId]);

  useEffect(() => {
    if (stream && audioRef.current) {
      audioRef.current.srcObject = stream;
    }
  }, [stream]);

  if (!memberId) return null;

  return (
    <div className=" relative flex  grow gap-3 overflow-hidden bg-[#222C54] text-white rounded-md w-full">
      {isCameraEnable && stream?.getTracks().find((track) => track.kind === "video")?.enabled ? (
        <VideoStreamPlayer
          className=" w-full aspect-video  object-contain "
          stream={stream}
          autoPlay
          muted
          playsInline
        />
      ) : (
        <BigUserAvatar memberId={memberId} />
      )}
      <audio className=" absolute opacity-0 -z-10" controls ref={audioRef}></audio>
      <p className=" flex gap-2 items-center text-zinc-200 absolute bottom-2 left-2 shadow-2xl shadow-dark-navy p-1 rounded-lg ">
        <span>{memberId}</span>
        {!isMicEnable && <RiMicOffFill size={14} />}
      </p>
    </div>
  );
}

function BigUserAvatar({ memberId }: { memberId: string }) {
  return (
    <div className=" p-10 flex flex-col max-h-96 justify-center w-full aspect-video items-center gap-3 grow overflow-hidden bg-[#222C54] text-white rounded-md">
      <Avatar className="w-24 h-24">
        <AvatarImage src={"https://avatars.githubusercontent.com/u/47269252?v=4"} title={memberId} alt={memberId} />
        <AvatarFallback className=" bg-royal-blue text-lg">{memberId?.slice(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
    </div>
  );
}
