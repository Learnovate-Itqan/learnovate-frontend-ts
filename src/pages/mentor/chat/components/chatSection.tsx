import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import learnovateAI from "@/assets/mentors/learnovateAI.webp";
import { CHAT_LIST } from "@/db/chatList";
import { useGetParam } from "@/hooks/useGetParam";
import { RootState } from "@/redux/store.js";

import { AIMessagesBox } from "./AI/messagesBox";
import { ChatHeader, TChatHeader } from "./chatHeader";
import { MessageBox } from "./messageBox";

export const ChatSection = () => {
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const aiChat = useSelector((state: RootState) => state.aiChat);
  const [header, setHeader] = useState<TChatHeader | undefined>(undefined);
  const sourceParam = useGetParam("source");

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [aiChat.chat]);

  useEffect(() => {
    const person = CHAT_LIST.find((item) => item.id === sourceParam);
    if (sourceParam === "ai") {
      setHeader({ title: "Learnovate AI", image: learnovateAI });
    } else if (person) {
      setHeader({ title: person.name, image: person.image });
    }
  }, [sourceParam]);

  if (!sourceParam) return null;

  return (
    <section className="flex flex-col flex-grow h-full">
      {header && <ChatHeader {...header} />}
      <div
        ref={chatContainerRef}
        className="max-h-[calc(100%-9rem)] h-[calc(100%-9rem)] w-full bg-white overflow-y-auto"
      >
        <AIMessagesBox />
      </div>
      {sourceParam === "ai" && <MessageBox ai />}
      {sourceParam !== "ai" && <MessageBox sound />}
    </section>
  );
};
