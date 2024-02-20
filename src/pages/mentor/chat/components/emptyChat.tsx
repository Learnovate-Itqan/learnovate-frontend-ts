import { useSelector } from "react-redux";

import { Chat } from "@/components/icons/chat.js";
import { RootState } from "@/redux/store.js";

export const EmptyChat = () => {
  const aiChat = useSelector((state: RootState) => state.aiChat);

  if (aiChat.select) return null;

  return (
    <section className="flex-grow flex flex-col justify-center items-center gap-4">
      <Chat className="w-3/4 md:w-1/2 text-neutral-400" />
      <span className="text-xl md:text-2xl font-bold text-center">Select a chat to start messaging</span>
    </section>
  );
};
