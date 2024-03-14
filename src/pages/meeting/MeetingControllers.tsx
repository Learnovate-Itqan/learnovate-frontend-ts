import { BiSolidVideoOff } from "react-icons/bi";
import { BsArrowUpSquareFill } from "react-icons/bs";
import { FaCompressArrowsAlt, FaExpandArrowsAlt } from "react-icons/fa";
import { HiSpeakerWave } from "react-icons/hi2";
import { ImPhoneHangUp } from "react-icons/im";
import { IoMdSettings } from "react-icons/io";
import { RiMicOffFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";

import { useRoom } from "@/contexts/RoomContext";
import { toggleAside } from "@/redux/slices/meetingSlice";
import { RootState } from "@/redux/store";

export function MeetingControllers() {
  const { shareScreen, screenStream } = useRoom();
  const isAsideOpen = useSelector((state: RootState) => state.meeting.isAsideOpen);
  const dispatcher = useDispatch();
  return (
    <div className=" absolute bottom-10 flex z-20 gap-4 justify-center w-full items-center px-20">
      <button className="p-3 flex justify-center bg-dark-navy transition-colors rounded-full text-zinc-300 hover:text-zinc-400">
        <HiSpeakerWave className="w-6 h-6  " />
      </button>
      <div className="flex-1"></div>

      <button
        className={`p-3 flex justify-center transition-colors rounded-full text-zinc-300 hover:text-zinc-400 ${screenStream ? " bg-red-700" : "bg-dark-navy"}`}
        onClick={shareScreen}
      >
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
        onClick={() => dispatcher(toggleAside())}
      >
        {!isAsideOpen ? <FaExpandArrowsAlt className="w-6 h-6  " /> : <FaCompressArrowsAlt className="w-6 h-6  " />}
      </button>
    </div>
  );
}
