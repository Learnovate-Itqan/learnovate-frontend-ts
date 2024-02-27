import { useLiveQuery } from "dexie-react-hooks";

import { getChatByID } from "@/db/chat";
import { useGetParam } from "@/hooks/useParamHelpers";

import { Message } from "./message";

export const MessagesContainer = () => {
  const idParam = useGetParam("id");
  const chat = useLiveQuery(() => getChatByID(idParam), [idParam]);

  if (!chat) return null;
  return (
    <div className="flex-grow flex flex-col items-center justify-end py-2 gap-4 px-4 lg:px-8 text-white">
      <ul className="w-full max-w-3xl space-y-4">
        {chat.map((message) => (
          <>
            <Message key={message.id} role={message.role} text={message.parts} />
            <Message key={message.time} role={message.role} text={message.parts} />
          </>
        ))}
      </ul>
    </div>
  );
};
