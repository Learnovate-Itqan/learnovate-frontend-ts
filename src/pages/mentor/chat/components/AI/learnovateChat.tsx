import { TiPin } from "react-icons/ti";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";

import learnovateAI from "@/assets/mentors/learnovateAI.webp";
import { setChatSelect } from "@/redux/slices/aiChatSlice";

import { UserAvatar } from "../userAvatar";

export const LearnovateChat = () => {
  const dispatch = useDispatch();
  const [, setSearchParams] = useSearchParams();

  const handleAISelection = () => {
    setSearchParams({ source: "ai" });
    dispatch(setChatSelect(true));
  };

  return (
    <li
      onClick={handleAISelection}
      className="relative hover:bg-royal-blue/20 transition-colors rounded-md px-2 duration-200 ease-cubic"
    >
      <button type="button" className="w-full flex items-center gap-x-2 py-2">
        <UserAvatar name="Learnovate Assistant" image={learnovateAI} className="bg-[#222C54] w-14 h-14" />
        <div className="flex flex-col items-start justify-center text-start">
          <h3 className="text-white font-bold">Learnovate AI Assistant</h3>
        </div>
      </button>
      <span className="absolute top-1/2 -translate-y-1/2 end-1.5 text-neutral-400 text-sm">
        <TiPin className="text-neutral-400 text-2xl" />
      </span>
    </li>
  );
};
