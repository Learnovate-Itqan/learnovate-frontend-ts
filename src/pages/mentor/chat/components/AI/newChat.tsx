import { IoIosAddCircle } from "react-icons/io";

import { Button } from "@/components/ui/button";
import { useGetParam } from "@/hooks/useGetParam";
import { useHandleAIChat } from "@/hooks/useHandleAIChat";

export const NewAIChat = ({ setOpen }: { setOpen: (open: boolean) => void }) => {
  const aiHandler = useHandleAIChat();
  const isAI = useGetParam("source") === "ai";

  const handleAIChat = () => {
    aiHandler.clear();
    setOpen(false);
  };

  if (!isAI) return null;

  return (
    <Button
      className="w-full flex items-center justify-center gap-x-2 text-xl"
      type="button"
      title="Start a new chat with AI"
      onClick={handleAIChat}
    >
      <IoIosAddCircle className="text-2xl" />
      <span>New Chat</span>
    </Button>
  );
};
