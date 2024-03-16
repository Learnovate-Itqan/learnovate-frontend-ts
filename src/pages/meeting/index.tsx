import { useEffect } from "react";
import { TiVideo } from "react-icons/ti";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { useRoom } from "@/contexts/RoomContext";
import { RootState } from "@/redux/store";
import { socket } from "@/socket";

import MainStream from "./MainStream";
import { MeetingControllers } from "./MeetingControllers";
import { MeetingSidebar } from "./MeetingSidebar";

export function Meeting() {
  const { id: roomId } = useParams();
  const { myStream, myPeer } = useRoom();
  const userName = useSelector((state: RootState) => state.auth?.name);
  const userId = useSelector((state: RootState) => state.auth?.id);

  useEffect(() => {
    if (!(myPeer.id && myStream && roomId && userName)) return;
    socket.emit("join-room", { roomId, peerId: myPeer.id, userName, userId });

    return () => {
      socket.off("join-room");
    };
  }, [myPeer, myStream, roomId, userName, userId]);

  return (
    <section className="flex bg-black/85">
      <main className="relative w-full h-dvh overflow-hidden">
        <MainStream />
        <h1 className=" absolute top-3 left-5 right-5 flex   justify-start gap-2 items-center text-white z-20 bg-dark-navy/70 p-3  rounded-lg">
          <TiVideo className="inline-block mr-2 w-6 h-6 text-royal-blue" />
          <span>Meeting with Kareem</span>
        </h1>
        <MeetingControllers />
      </main>
      <MeetingSidebar />
    </section>
  );
}
