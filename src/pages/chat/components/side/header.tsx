import { HiChatBubbleBottomCenterText } from "react-icons/hi2";
import { Link } from "react-router-dom";

import { LearnovateLogo } from "@/components/icons/Logo";

export const SideHeader = () => {
  return (
    <header className="flex justify-between gap-4">
      <Link to="/" className="flex items-center gap-2" title="Learnovate">
        <LearnovateLogo className="w-8 h-8" />
        <span className="text-white text-xl font-bold -translate-y-0.5">Learnovate</span>
      </Link>
      <button
        type="button"
        title="new chat"
        className="p-2 rounded-full transition-colors duration-300 hover:bg-royal-blue"
      >
        <HiChatBubbleBottomCenterText className="text-white text-xl" />
      </button>
    </header>
  );
};
