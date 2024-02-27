import { useChatExist } from "@/hooks/useChatExist";

import { Message } from "./message";

export const MessagesContainer = () => {
  const chatExist = useChatExist();

  if (!chatExist) return null;

  return (
    <ul className="flex-grow w-full pt-8 space-y-4 pe-2 chat-scrollbar text-white max-h-[calc(100svh-6rem)] overflow-y-auto">
      {chatExist.map((message) => (
        <Message key={message.time} role={message.role} text={message.parts} />
      ))}
    </ul>
  );
};
