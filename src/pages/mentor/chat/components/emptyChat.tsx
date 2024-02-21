import { Chat } from "@/components/icons/chat.js";
import { useGetParam } from "@/hooks/useGetParam";

export const EmptyChat = () => {
  const source = useGetParam("source");

  if (source) return null;

  return (
    <section className="flex-grow flex flex-col justify-center items-center gap-4">
      <Chat className="w-3/4 md:w-1/2 text-neutral-400" />
      <span className="text-xl md:text-2xl font-bold text-center">Select a chat to start messaging</span>
    </section>
  );
};
