import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import learnovateAI from "@/assets/mentors/learnovateAI.webp";
import { useGetParam } from "@/hooks/useGetParam";
import { RootState } from "@/redux/store.js";

import { AIMessagesBox } from "./AI/messagesBox";
import { ChatHeader } from "./chatHeader";
import { MessageBox } from "./messageBox";

export const ChatSection = () => {
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const aiChat = useSelector((state: RootState) => state.aiChat);
  const sourceParam = useGetParam("source");

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [aiChat.chat]);

  if (!sourceParam) return null;

  return (
    <section className="flex flex-col flex-grow h-full">
      <ChatHeader title="Learnovate AI" image={learnovateAI} />
      <div
        ref={chatContainerRef}
        className="max-h-[calc(100%-8rem)] h-[calc(100%-8rem)] w-full bg-white overflow-y-auto"
      >
        <AIMessagesBox />
      </div>
      {sourceParam === "ai" && <MessageBox ai />}
      {sourceParam !== "ai" && <MessageBox sound />}
    </section>
  );
};
