import learnovateAI from "@/assets/learnovateAI.webp";

import { UserAvatar } from "../userAvatar";
import { RenderMarkDown } from "./renderMarkDown";

type TMessage = {
  role: "user" | "model";
  image?: string;
  text: string;
};

export const Message = ({ role, text, image }: TMessage) => {
  const isModel = role === "model";
  const name = isModel ? "Learnovate Assistant" : "You";

  return (
    <li className="flex flex-col items-center gap-2 w-full px-4 lg:px-8">
      <div className="w-full max-w-3xl">
        <div className="flex items-center gap-2 select-none">
          <UserAvatar image={isModel ? learnovateAI : image} name={name} className="w-8 h-8" />
          <span className="text-lg font-bold">{name}</span>
        </div>
        <div className="flex flex-col gap-1 ps-10">
          <span>
            {isModel ? <RenderMarkDown content={text} /> : <pre className="whitespace-pre-wrap">{text.trim()}</pre>}
          </span>
        </div>
      </div>
    </li>
  );
};
