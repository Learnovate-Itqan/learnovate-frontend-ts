import { useSearchParams } from "react-router-dom";

import { UserAvatar } from "./userAvatar";

export type TChat = {
  id: string;
  name: string;
  message: string;
  time: string;
  imgSrc?: string;
};

export const ChatItem = ({ id, name, message, time, imgSrc }: TChat) => {
  const [, setSearchParams] = useSearchParams();

  const handleChatSelection = (id: string) => {
    setSearchParams({ source: id });
  };

  return (
    <li className="relative hover:bg-royal-blue/20 transition-colors rounded-md px-2 duration-200 ease-cubic">
      <button type="button" onClick={() => handleChatSelection(id)} className="w-full flex items-center gap-x-2 py-2">
        <UserAvatar name={name} image={imgSrc} className="bg-[#222C54] w-14 h-14" />
        <div className="flex flex-col items-start justify-center text-start">
          <h3 className="text-white font-bold">{name.length > 16 ? `${name.slice(0, 16)}...` : name}</h3>
          <p className="text-zinc-300 text-sm leading-none" title={message}>
            {message.length > 30 ? `${message.slice(0, 30)}...` : message}
          </p>
        </div>
      </button>
      <span className="absolute top-1 end-1.5 text-neutral-400 text-sm">{time}</span>
    </li>
  );
};
