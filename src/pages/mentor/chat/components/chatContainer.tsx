import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { v4 } from "uuid";

import learnovateAI from "@/assets/mentors/learnovateAI.webp";
import { RootState } from "@/redux/store.js";

import { ChatHeader } from "./chatHeader";
import { Message } from "./message";
import { MessageBox } from "./messageBox";

export const ChatContainer = () => {
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const aiChat = useSelector((state: RootState) => state.aiChat);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [aiChat.chat]);

  if (!aiChat.select) return null;
  return (
    <section className="overflow-y-auto flex flex-col flex-grow max-h-screen bg-gray-200 border-t border-t-gray-600">
      <ChatHeader title="Learnovate AI" image={learnovateAI} />
      <div
        ref={chatContainerRef}
        className="max-h-[calc(100%-8rem)] h-[calc(100%-8rem)] w-full bg-white overflow-y-auto"
      >
        <div className="w-full p-4 space-y-2">
          {aiChat.chat.map((message) => (
            <Message role={message.role} text={message.parts} key={v4()} />
          ))}
        </div>
      </div>
      <MessageBox />
    </section>
  );
};
