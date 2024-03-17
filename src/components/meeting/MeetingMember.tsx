import { useEffect, useRef, useState } from "react";
import { RiMicOffFill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { twMerge } from "tailwind-merge";

import { useRoom } from "@/contexts/RoomContext";
import { changeMainStream } from "@/redux/slices/meetingSlice";
import { socket } from "@/socket";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { VideoStreamPlayer } from "./VideoStreamPlayer";

export function MeetingMember({
  memberId,
  stream,
  isSharingScreen = false,
  className = "",
}: {
  className?: string;
  memberId: string;
  stream?: MediaStream;
  isSharingScreen?: boolean;
}) {
  const isMe = memberId === "you";
  const { isMicEnabled: isMyMicEnabled, isCameraEnabled: isMyCameraEnabled } = useRoom();
  const [isUserMicEnable, setIsUserMicEnable] = useState(false);
  const [isUserCameraEnable, setIsUserCameraEnable] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const dispatcher = useDispatch();

  // if the user is sharing screen then the camera is enabled
  // if the user is me then the camera state is the state of my camera
  const isCameraEnable = isSharingScreen ? true : isMe ? isMyCameraEnabled : isUserCameraEnable;
  const isMicEnable = isMe ? isMyMicEnabled : isUserMicEnable;
  function handleMemberClick() {
    if (isMe || !isCameraEnable) return;
    dispatcher(changeMainStream({ userId: memberId, isSharingScreen }));
  }

  useEffect(() => {
    if (isMe) return;
    socket.on("camera-status-changed", ({ userId, isCameraEnabled }) => {
      if (userId !== memberId) return;
      setIsUserCameraEnable(isCameraEnabled);
    });
    socket.on("mic-status-changed", ({ userId, isMicEnabled }) => {
      if (userId !== memberId) return;
      setIsUserMicEnable(isMicEnabled);
    });
    return () => {
      socket.off("camera-status-changed");
      socket.off("mic-status-changed");
    };
  }, [memberId, isMe]);

  useEffect(() => {
    if (stream && audioRef.current) {
      audioRef.current.srcObject = stream;
    }
  }, [stream]);

  if (!memberId) return null;

  return (
    <div
      className={twMerge(
        " relative flex  grow gap-3 overflow-hidden bg-[#222C54] text-white rounded-md w-full cursor-pointer",
        className
      )}
      onClick={handleMemberClick}
    >
      {(isCameraEnable || isSharingScreen) && stream?.getTracks().find((track) => track.kind === "video")?.enabled ? (
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
