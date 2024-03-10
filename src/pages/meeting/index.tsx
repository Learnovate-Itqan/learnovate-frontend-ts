import { useEffect, useState } from "react";
import { BiSolidVideoOff } from "react-icons/bi";
import { BsArrowUpSquareFill, BsChatDotsFill } from "react-icons/bs";
import { FaCompressArrowsAlt, FaExpandArrowsAlt, FaUsers } from "react-icons/fa";
import { HiSpeakerWave } from "react-icons/hi2";
import { ImPhoneHangUp } from "react-icons/im";
import { IoMdSettings } from "react-icons/io";
import { RiMicOffFill } from "react-icons/ri";
import { TiVideo } from "react-icons/ti";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { z } from "zod";

import { VideoStreamPlayer } from "@/components/meeting/VideoStreamPlayer";
import { useRoom } from "@/contexts/RoomContext";
import { RootState } from "@/redux/store";
import { userSchema } from "@/schemas/userSchema";
import { socket } from "@/socket";

import { MeetingChat } from "./MeetingChat";
import { MeetingMembers } from "./MeetingMembers";

const USERS = [
  {
    id: "5",
    name: "Kareem",
    image: "https://avatars.githubusercontent.com/u/47269252?v=4",
  },
  {
    id: "6",
    name: "Kareem",
    image: "https://avatars.githubusercontent.com/u/47269252?v=4",
  },
];

export function Meeting() {
  const { id: roomId } = useParams();
  const { myStream, myPeer } = useRoom();
  const userName = useSelector((state: RootState) => state.auth?.name);
  const [asideState, setAsideState] = useState(false);
  const [chatState, setChatState] = useState(false);

  useEffect(() => {
    if (!(myPeer.id && myStream && roomId && userName)) return;
    socket.emit("join-room", { roomId, userId: myPeer.id, userName });

    return () => {
      socket.off("join-room");
    };
  }, [myPeer, myStream, roomId, userName]);
  return (
    <section className="flex">
      <main className="relative w-full h-dvh overflow-hidden">
        <VideoStreamPlayer
          className="absolute aspect-video z-10 inset-0  h-dvh w-full  bg-black/90 "
          stream={myStream}
          muted
          autoPlay
          playsInline
        />
        <h1 className=" absolute top-3 left-5 right-5 flex   justify-start gap-2 items-center text-white z-20 bg-dark-navy/70 p-3  rounded-lg">
          <TiVideo className="inline-block mr-2 w-6 h-6 text-royal-blue" />
          <span>Meeting with Kareem</span>
        </h1>
        <div className=" absolute bottom-10 flex z-20 gap-4 justify-center w-full items-center px-20">
          <button className="p-3 flex justify-center bg-dark-navy transition-colors rounded-full text-zinc-300 hover:text-zinc-400">
            <HiSpeakerWave className="w-6 h-6  " />
          </button>
          <div className="flex-1"></div>

          <button className="p-3 flex justify-center bg-dark-navy transition-colors rounded-full text-zinc-300 hover:text-zinc-400">
            <BsArrowUpSquareFill className="w-6 h-6  " />
          </button>
          <button className="p-3 flex justify-center bg-dark-navy transition-colors rounded-full text-zinc-300 hover:text-zinc-400">
            <RiMicOffFill className="w-6 h-6  " />
          </button>
          <button className="p-3 flex justify-center bg-red-500 transition-colors rounded-full hover:bg-red-600">
            <ImPhoneHangUp className="w-10 h-10 text-white" />
          </button>
          <button className="p-3 flex justify-center bg-dark-navy transition-colors rounded-full text-zinc-300 hover:text-zinc-400">
            <BiSolidVideoOff className="w-6 h-6  " />
          </button>
          <button className="p-3 flex justify-center bg-dark-navy transition-colors rounded-full text-zinc-300 hover:text-zinc-400">
            <IoMdSettings className="w-6 h-6  " />
          </button>
          <div className="flex-1"></div>
          <button
            className="p-3 flex justify-center bg-dark-navy transition-colors rounded-full text-zinc-300 hover:text-zinc-400"
            onClick={() => setAsideState((prev) => !prev)}
          >
            {!asideState ? <FaExpandArrowsAlt className="w-6 h-6  " /> : <FaCompressArrowsAlt className="w-6 h-6  " />}
          </button>
        </div>
      </main>
      <aside
        className={` w-[450px] h-screen flex flex-col justify-evenly gap-2 bg-dark-navy overflow-hidden transition-[max-width]  ${asideState ? " max-w-full " : " max-w-0"}`}
      >
        {chatState ? <MeetingChat /> : <MeetingMembers users={USERS as z.infer<typeof userSchema>[]} />}

        <footer className="bg-[#222c54] grid grid-cols-2 m-2 rounded-md p-1 overflow-hidden">
          <button
            className={`p-3 flex justify-center transition-colors rounded-md text-zinc-300 hover:text-zinc-400 ${!chatState && "bg-royal-blue/20"}`}
            onClick={() => setChatState(false)}
          >
            <FaUsers className="w-6 h-6 " />
          </button>
          <button
            className={`p-3 flex justify-center transition-colors rounded-md text-zinc-300 hover:text-zinc-400 ${chatState && "bg-royal-blue/20"}`}
            onClick={() => setChatState(true)}
          >
            <BsChatDotsFill className="w-6 h-6 " />
          </button>
        </footer>
      </aside>
    </section>
  );
}
