import { LearnovateLogo } from "@/components/icons/Logo";
import { getFourRandomExamples } from "@/db/chatExamples";
import { useChatExist } from "@/hooks/useChatExist";

import { InitialMessages } from "./initialMessages";

const CHAT_EXAMPLES = getFourRandomExamples();

export const NewChat = () => {
  const chatExist = useChatExist();

  if (chatExist) return null;

  return (
    <div className="flex-grow flex flex-col items-center justify-end py-2 gap-4 px-4 lg:px-8">
      <div className="flex-grow flex flex-col items-center justify-center py-8">
        <span className="p-2 bg-white w-fit rounded-full" title="Learnovate">
          <LearnovateLogo className="h-8 w-8" />
        </span>
        <h1 className="text-white text-2xl font-bold mt-4">How can I help you today?</h1>
      </div>
      <div className="w-full h-auto max-w-3xl grid grid-cols-2 gap-y-2 gap-x-4">
        {CHAT_EXAMPLES.map((example, idx) => (
          <InitialMessages key={example.title} {...example} duration={(idx + 4) * 100} />
        ))}
      </div>
    </div>
  );
};
