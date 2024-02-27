import { initialReservedMessage } from "@/db/chat";
import { useGetParam, useSetParam } from "@/hooks/useParamHelpers";

type TInitialMessages = {
  title: string;
  description: string;
  message: string;
};

export const InitialMessages = ({ title, description, message }: TInitialMessages) => {
  const id = useGetParam("id");
  const setParam = useSetParam();

  const handleClick = async () => {
    if (id) return;
    const chatID = await initialReservedMessage(title, message);
    if (chatID) {
      setParam({ param: "id", value: chatID });
    }
  };

  return (
    <button
      type="button"
      className="select-none text-start flex flex-col border border-royal-blue/40 transition-colors duration-100 ease-cubic hover:bg-white/5 text-white rounded-xl py-2 px-4 w-full h-full"
      onClick={handleClick}
    >
      <span className="text-sm font-semibold">{title}</span>
      <span className="text-sm text-gray-400 max-w-xs text-balance">{description}</span>
    </button>
  );
};
