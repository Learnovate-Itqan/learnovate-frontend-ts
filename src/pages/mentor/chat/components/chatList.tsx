import { CHAT_LIST } from "@/db/chatList";

import { LearnovateChat } from "./AI/learnovateChat";
import { ChatItem } from "./chatItem";

export const ChatList = () => {
  return (
    <ul className="overflow-y-auto min-w-max max-h-[calc(100svh-10rem)] no-scrollbar space-y-1">
      <LearnovateChat />
      {CHAT_LIST.map((person) => (
        <ChatItem key={person.id} {...person} />
      ))}
    </ul>
  );
};
