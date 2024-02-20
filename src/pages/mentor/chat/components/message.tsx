import { clsx } from "clsx";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { RenderMarkDown } from "./renderMarkDown";

type TMessage = {
  role: "user" | "model" | "other";
  text: string;
  image?: string;
};

export const Message = ({ role, text, image }: TMessage) => {
  const isUser = role === "user" ? true : false;
  return (
    <div
      className={clsx("w-full flex items-end gap-x-2", {
        "justify-end": isUser,
        "justify-start": !isUser,
      })}
    >
      {!isUser && (
        <Avatar className="bg-[#222C54] w-10 h-10">
          <AvatarImage src={image} alt={role} title={role} />
          <AvatarFallback>{role.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
      )}
      <div
        className={clsx("py-1.5 px-2.5 max-w-3xl", {
          "bg-dark-navy text-white rounded-s-3xl rounded-t-3xl": isUser,
          "bg-gray-200 text-dark-navy rounded-e-3xl rounded-t-3xl": !isUser,
        })}
      >
        {role === "model" ? <RenderMarkDown content={text} /> : text}
      </div>
    </div>
  );
};
