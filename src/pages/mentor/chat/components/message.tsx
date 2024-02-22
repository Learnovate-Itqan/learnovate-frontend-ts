import { clsx } from "clsx";

import { DateToAMAndPM } from "@/utils/dateToTime";

import { RenderMarkDown } from "./renderMarkDown";
import { UserAvatar } from "./userAvatar";

type TMessage = {
  role: "user" | "model" | "other";
  text: string;
  image?: string;
  name: string;
  time?: number | string;
};

export const Message = ({ role, text, image, name, time }: TMessage) => {
  const isUser = role === "user" ? true : false;

  return (
    <div
      className={clsx("w-full flex items-end gap-x-2", {
        "justify-end": isUser,
        "justify-start": !isUser,
      })}
    >
      {!isUser && <UserAvatar className="bg-[#222C54] w-8 h-8 xs:w-10 xs:h-10" name={name} image={image} />}
      <div
        className={clsx("overflow-hidden lg:max-w-3xl flex flex-col py-1.5 px-2.5 relative", {
          "bg-dark-navy text-white rounded-s-3xl rounded-t-3xl ms-12": isUser,
          "bg-gray-200 text-dark-navy rounded-e-3xl rounded-t-3xl": !isUser,
          "py-2 px-4": time,
        })}
      >
        <span>{role === "model" ? <RenderMarkDown content={text} /> : <pre className="whitespace-pre-wrap">{text.trim()}</pre>}</span>
        {time && <span className="text-[0.7rem] mt-1">{DateToAMAndPM(time)}</span>}
      </div>
    </div>
  );
};
