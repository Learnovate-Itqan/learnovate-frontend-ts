import { useChatExist } from "@/hooks/useChatExist";

import { Message } from "./message";

export const MessagesContainer = () => {
  const chatExist = useChatExist();

  if (!chatExist) return null;

  return (
    <div className="flex-grow flex flex-col items-center justify-end py-2 gap-4 px-4 lg:px-8 text-white">
      <ul className="w-full max-w-3xl space-y-4">
        {chatExist.map((message) => (
          <Message key={message.time} role={message.role} text={message.parts} />
        ))}
      </ul>
    </div>
  );
};
