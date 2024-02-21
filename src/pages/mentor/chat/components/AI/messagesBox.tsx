import learnovateAI from "@/assets/mentors/learnovateAI.webp";
import { useGetParam } from "@/hooks/useGetParam";

import { AIMessagesList } from "../AI/messagesList";
import { Typing } from "../typing";
import { AIErrorMessage } from "./aiErrorMessage";

export const AIMessagesBox = () => {
  const sourceParam = useGetParam("source");

  if (sourceParam !== "ai") return null;

  return (
    <>
      <AIMessagesList receiverName="Learnovate AI" receiverImage={learnovateAI} />
      <Typing name="Learnovate AI" image={learnovateAI} />
      <AIErrorMessage name="Learnovate AI" image={learnovateAI} />
    </>
  );
};
