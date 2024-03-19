import { BsChatDotsFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { useDispatch } from "react-redux";

import { useRoom } from "@/contexts/RoomContext";
import { toggleAside } from "@/redux/slices/meetingSlice";

export default function MeetingSmallScreensHeader() {
  const { peers } = useRoom();
  const dispatcher = useDispatch();

  return (
    <header className=" p-2 rounded-b-md md:hidden bg-dark-navy flex justify-between">
      <button
        className={`px-3 flex justify-center transition-colors rounded-md text-zinc-300 hover:text-zinc-400 `}
        onClick={() => dispatcher(toggleAside())}
      >
        <BsChatDotsFill className="w-6 h-6 " />
      </button>
      <div className=" text-zinc-300 flex justify-center items-center font-semibold gap-1 text-lg ">
        <FaUser className="w-5 h-5 text-zinc-300" />
        {Object.keys(peers).length}
      </div>
    </header>
  );
}
