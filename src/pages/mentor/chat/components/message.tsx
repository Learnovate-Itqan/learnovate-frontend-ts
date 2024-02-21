import { clsx } from "clsx";

import { RenderMarkDown } from "./renderMarkDown";
import { UserAvatar } from "./userAvatar";

type TMessage = {
  role: "user" | "model" | "other";
  text: string;
  image?: string;
  name: string;
};

export const Message = ({ role, text, image, name }: TMessage) => {
  const isUser = role === "user" ? true : false;
  return (
    <div
      className={clsx("w-full flex items-end gap-x-2", {
        "justify-end": isUser,
        "justify-start": !isUser,
      })}
    >
      {!isUser && <UserAvatar className="bg-[#222C54] w-10 h-10" name={name} image={image} />}
      <div
        className={clsx("py-1.5 px-2.5 max-w-3xl", {
          "bg-dark-navy text-white rounded-s-3xl rounded-t-3xl ms-12": isUser,
          "bg-gray-200 text-dark-navy rounded-e-3xl rounded-t-3xl": !isUser,
        })}
      >
        {role === "model" ? <RenderMarkDown content={text} /> : text}
      </div>
    </div>
  );
};
