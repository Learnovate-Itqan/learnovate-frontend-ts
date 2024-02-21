import { clsx } from "clsx";
import { useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useSearchParams } from "react-router-dom";

import { useGetParam } from "@/hooks/useGetParam";

import { NewAIChat } from "./AI/newChat";
import { UserAvatar } from "./userAvatar";

type TChatHeader = {
  title: string;
  image?: string;
};

export const ChatHeader = ({ title, image }: TChatHeader) => {
  const [open, setOpen] = useState(false);
  const isAI = useGetParam("source") === "ai";
  const [, setSearchParams] = useSearchParams();

  const handleMenu = () => setOpen((prev) => !prev);
  const handleBack = () => setSearchParams(undefined);

  return (
    <header className="flex items-center justify-between gap-4 h-16 w-full bg-dark-navy text-white px-4 py-3">
      <div className="flex items-center gap-2 select-none" title={title}>
        <button type="button" className="text-2xl md:hidden" title="Go Back" onClick={handleBack}>
          <IoMdArrowRoundBack />
        </button>
        <UserAvatar name={title} image={image} className="bg-[#222C54] w-10 h-10" />
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
      <div className="relative">
        <button type="button" className="space-y-1 px-2" onClick={handleMenu} title="Chat Settings">
          <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
          <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
          <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
        </button>
        <aside
          className={clsx(
            "absolute end-0 top-8 px-4 z-40 rounded bg-white shadow-md border-gray-200 overflow-hidden transition-all duration-200 ease-cubic",
            {
              border: open,
              "h-0": !open,
              "h-16 py-3": open && isAI,
            }
          )}
        >
          <NewAIChat setOpen={setOpen} />
        </aside>
      </div>
    </header>
  );
};
