import { clsx } from "clsx";
import { useSearchParams } from "react-router-dom";

import { TChat } from "@/db/chatList";
import { DateToAMAndPM } from "@/utils/dateToTime";

import { UserAvatar } from "./userAvatar";

export const ChatItem = ({ id, name, message, time, image, notRead }: TChat) => {
  const [, setSearchParams] = useSearchParams();

  const handleChatSelection = (id: string) => {
    setSearchParams({ source: id });
  };

  return (
    <li className="relative hover:bg-royal-blue/20 transition-colors rounded-md px-2 duration-200 ease-cubic">
      <button
        type="button"
        onClick={() => handleChatSelection(id)}
        className="w-full flex items-center justify-between gap-x-2 py-2"
      >
        <div className="w-full flex items-center gap-x-2">
          <UserAvatar name={name} image={image} className="bg-[#222C54] w-14 h-14" />
          <div className="flex flex-col items-start justify-center text-start">
            <h3 className="text-white font-bold">{name.length > 16 ? `${name.slice(0, 16)}...` : name}</h3>
            <p className="text-zinc-300 text-sm leading-none" title={message}>
              {message.length > 30 ? `${message.slice(0, 30)}...` : message}
            </p>
          </div>
        </div>
        {notRead && (
          <span className={clsx("bg-royal-blue mt-2 p-1 rounded-full flex items-center justify-center text-white text-xs font-bold",
            { "w-5 h-5": notRead <= 9, "w-6 h-6": notRead > 9}
          )}>
            {notRead}
          </span>
        )}
      </button>
      <span className="absolute top-1 end-1.5 text-neutral-400 text-sm">{DateToAMAndPM(time)}</span>
    </li>
  );
};
