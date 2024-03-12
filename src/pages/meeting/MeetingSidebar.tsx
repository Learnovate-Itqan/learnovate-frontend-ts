import { BsChatDotsFill } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import { changeAsideVariant } from "@/redux/slices/meetingSlice";
import { RootState } from "@/redux/store";

import { MeetingChat } from "./MeetingChat";
import { MeetingMembers } from "./MeetingMembers";

export function MeetingSidebar() {
  const { asideVariant, isAsideOpen } = useSelector((state: RootState) => state.meeting);
  const dispatcher = useDispatch();
  return (
    <aside
      className={` w-[450px] h-screen flex flex-col justify-evenly gap-2 bg-dark-navy overflow-hidden transition-[max-width]  ${isAsideOpen ? " max-w-full " : " max-w-0"}`}
    >
      {asideVariant === "CHAT" ? <MeetingChat /> : <MeetingMembers />}

      <footer className="bg-[#222c54] grid grid-cols-2 m-2 rounded-md p-1 overflow-hidden">
        <button
          className={`p-3 flex justify-center transition-colors rounded-md text-zinc-300 hover:text-zinc-400 ${!(asideVariant === "CHAT") && "bg-royal-blue/20"}`}
          onClick={() => dispatcher(changeAsideVariant("MEMBERS"))}
        >
          <FaUsers className="w-6 h-6 " />
        </button>
        <button
          className={`p-3 flex justify-center transition-colors rounded-md text-zinc-300 hover:text-zinc-400 ${asideVariant === "CHAT" && "bg-royal-blue/20"}`}
          onClick={() => dispatcher(changeAsideVariant("CHAT"))}
        >
          <BsChatDotsFill className="w-6 h-6 " />
        </button>
      </footer>
    </aside>
  );
}
