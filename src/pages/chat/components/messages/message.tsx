import learnovateAI from "@/assets/learnovateAI.webp";

import { UserAvatar } from "../userAvatar";

type TMessage = {
  role: "user" | "model";
  image?: string;
  text: string;
};

export const Message = ({ role, text, image }: TMessage) => {
  const isModel = role === "model";
  const name = isModel ? "Learnovate Assistant" : "You";

  return (
    <li className="flex flex-col gap-2">
      <div className="flex items-center gap-2 select-none">
        <UserAvatar image={isModel ? learnovateAI : image} name={name} className="w-8 h-8" />
        <span className="text-lg font-bold">{name}</span>
      </div>
      <div className="flex flex-col gap-1">
        <span>{text}</span>
      </div>
    </li>
  );
};
