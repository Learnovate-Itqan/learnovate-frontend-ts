import { clsx } from "clsx";

import { useGetParam } from "@/hooks/useGetParam.js";

import { ChatSection } from "./chatSection";
import { EmptyChat } from "./emptyChat";

export const ChatContainer = () => {
  const sourceParam = useGetParam("source");

  return (
    <div
      className={clsx(
        "absolute md:static top-0 w-full h-full flex flex-col flex-grow max-h-screen border-t border-t-gray-600 transition-all duration-200 ease-cubic",
        {
          "-left-full": !sourceParam,
          "left-0": sourceParam,
        }
      )}
    >
      <EmptyChat />
      <ChatSection />
    </div>
  );
};
