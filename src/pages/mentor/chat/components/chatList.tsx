import { v4 as uuid } from "uuid";

import mentor from "@/assets/mentors/Abdelrahman-Awad.webp";

import { LearnovateChat } from "./AI/learnovateChat";
import { ChatItem, TChat } from "./chatItem";

const CREATE_CHAT_LIST = (count: number): TChat[] => {
  const chatList = [];
  for (let i = 0; i < count; i++) {
    const chat = {
      id: uuid(),
      name: "Abdelrahman Awad",
      message:
        "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      time: "18:00",
      imgSrc: mentor,
    };
    chatList.push({ ...chat });
  }
  return chatList;
};

export const ChatList = () => {
  const chatList = CREATE_CHAT_LIST(12);

  return (
    <ul className="overflow-y-auto min-w-max max-h-[calc(100svh-10rem)] no-scrollbar space-y-1">
      <LearnovateChat />
      {chatList.map((person) => (
        <ChatItem key={person.id} {...person} />
      ))}
    </ul>
  );
};
