import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useLiveQuery } from "dexie-react-hooks";
import { useEffect, useState } from "react";
import { KeyboardEvent } from "react";
import { useForm } from "react-hook-form";
import { IoIosArrowRoundUp } from "react-icons/io";
import useKeyBoardStatus from "use-detect-keyboard-open";
import { v4 as uuid } from "uuid";
import { z } from "zod";

import { getChatByID } from "@/db/chat";
import { initializeChat, sendMessage } from "@/db/chat";
import { useOnlineStatus } from "@/hooks/useOnlineStatus";
import { useGetParam, useSetParam } from "@/hooks/useParamHelpers";
import { generateTitle, startChat } from "@/lib/aiChat";
import { countLines } from "@/utils/text";

const messageBoxSchema = z.object({ text: z.string().min(1) });

export const MessageBox = () => {
  const [rows, setRows] = useState(1);
  const form = useForm<z.infer<typeof messageBoxSchema>>({
    resolver: zodResolver(messageBoxSchema),
    defaultValues: { text: "" },
  });
  const keyboardStatus = useKeyBoardStatus();
  const isOnline = useOnlineStatus();
  const idParam = useGetParam("id");
  const setParam = useSetParam();
  const chat = useLiveQuery(() => getChatByID(idParam), [idParam]);
  const model = startChat(chat || []);
  const chatTitle = generateTitle();
  const { isSubmitting } = form.formState;
  const text = form.watch("text");
  const isDisabled = isSubmitting || !form.formState.isValid;

  useEffect(() => {
    const lines = countLines(text);
    const limit = lines > 5 ? 5 : lines;
    setRows(limit);
  }, [text]);

  const handleEnter = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // check if the user is using desktop keyboard or mobile keyboard
    const isMobile = window.matchMedia("(pointer: coarse)").matches;
    if (isMobile) return;
    if (e.key === "Enter" && !e.shiftKey && !keyboardStatus) {
      e.preventDefault();
      form.handleSubmit(handleSendMessage)();
    }
  };

  const handleSendMessage = async (values: z.infer<typeof messageBoxSchema>) => {
    const { text } = values;
    const clearMessage = text.trim();
    const id = uuid();
    if (!idParam || !chat) {
      const title = await chatTitle(clearMessage);
      await initializeChat(id, title, clearMessage);
      setParam({ param: "id", value: id });
      const result = await model.sendMessage(clearMessage);
      const response = result.response;
      const text = response.text();
      await sendMessage(id, "model", text);
    }
    form.reset();
  };

  if (!isOnline) return null;

  return (
    <div className="flex flex-col items-center justify-end py-3 gap-1 text-white px-4 lg:px-8">
      <div className="w-full h-auto max-w-3xl">
        <form onSubmit={form.handleSubmit(handleSendMessage)}>
          <div className="w-full relative">
            <textarea
              {...form.register("text")}
              onKeyDown={handleEnter}
              disabled={isSubmitting}
              autoComplete="off"
              className="w-full bg-transparent h-auto border pe-14 border-royal-blue/40 focus:border-royal-blue/80 rounded-xl ps-4 no-scrollbar focus:outline-none resize-none py-3.5"
              rows={rows}
              placeholder="Message Learnovate assistant..."
            />
            <button
              type="submit"
              disabled={isDisabled}
              className="absolute bottom-4 end-4 w-8 h-8 rounded transition-colors duration-300 ease-cubic bg-white disabled:bg-white/20 flex justify-center items-center"
              title="Send message"
            >
              <IoIosArrowRoundUp
                className={clsx("text-2xl font-bold transition-colors duration-300 ease-cubic", {
                  "text-royal-blue": !isDisabled,
                  "text-white/40": isDisabled,
                })}
              />
            </button>
          </div>
        </form>
      </div>
      <span className="text-sm text-center text-balance">
        Learnovate assistant can make mistakes. Consider checking important information.
      </span>
    </div>
  );
};
