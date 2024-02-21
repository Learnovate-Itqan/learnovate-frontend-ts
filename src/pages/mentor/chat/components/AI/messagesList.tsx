import { useSelector } from "react-redux";
import { v4 as uuid } from "uuid";

import { RootState } from "@/redux/store.js";

import { Message } from "../message";

type TAIMessagesList = {
  receiverName: string;
  receiverImage?: string;
};

export const AIMessagesList = ({ receiverName, receiverImage }: TAIMessagesList) => {
  const chat = useSelector((state: RootState) => state.aiChat.chat);

  return (
    <div className="w-full p-4 space-y-2">
      {chat.map((message) => (
        <Message role={message.role} text={message.parts} key={uuid()} image={receiverImage} name={receiverName} />
      ))}
    </div>
  );
};
