import { zodResolver } from "@hookform/resolvers/zod";
import { MouseEvent } from "react";
import { useForm } from "react-hook-form";
import { FaMicrophone } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { IoSend } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";

import { useOnlineStatus } from "@/hooks/useOnlineStatus";
import { startChat } from "@/lib/aiChat";
import { setError, setMessages, setTyping } from "@/redux/slices/aiChatSlice";
import { RootState } from "@/redux/store";
import { messageBoxSchema } from "@/schemas/messageBox";

type TMessageBox = {
  sound?: boolean;
  ai?: boolean;
};

export const MessageBox = ({ sound, ai }: TMessageBox) => {
  const dispatch = useDispatch();
  const { error } = useSelector((state: RootState) => state.aiChat);
  const form = useForm<z.infer<typeof messageBoxSchema>>({
    resolver: zodResolver(messageBoxSchema),
    defaultValues: { text: "", image: "" },
  });
  const online = useOnlineStatus();
  const aiChat = startChat();
  const text = form.watch("text");

  const handleMessage = async (data: z.infer<typeof messageBoxSchema>) => {
    if (data.text) {
      dispatch(setMessages({ role: "user", parts: data.text }));
      form.reset();
      dispatch(setTyping(true));
      try {
        const result = await aiChat.sendMessage(data.text);
        console.log("Result", result);
        const response = result.response;
        const text = response.text();
        dispatch(setTyping(false));
        dispatch(setMessages({ role: "model", parts: text }));
      } catch (error) {
        const timer = setTimeout(() => {
          dispatch(setTyping(false));
          dispatch(setError("Something went wrong, please try again later"));
          console.log("Error", error);
        }, 1000);
        return () => clearTimeout(timer);
      }
    }
  };

  const handleSendSound = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    console.log("Send Sound");
  };

  if (error) return null;
  if (!online)
    return (
      <div className="w-full h-16 flex items-center justify-center bg-dark-navy">
        <p className="text-white md:text-xl text-center">You are offline</p>
      </div>
    );

  return (
    <form onSubmit={form.handleSubmit(handleMessage)}>
      <div className="w-full h-16 bg-white flex items-center gap-2 px-4">
        {!ai && (
          <div className="rounded-full">
            <label htmlFor="image">
              <span>
                <FaPlus className="text-xl text-dark-navy" title="add image" />
              </span>
              <input {...form.register("image")} type="file" id="image" className="hidden" accept="image/*" />
            </label>
          </div>
        )}
        <div className="w-full">
          <input
            {...form.register("text")}
            autoComplete="off"
            type="text"
            className="w-full px-4 h-10 rounded-full bg-gray-100 border-none focus:outline-none focus:ring-1 focus:ring-dark-navy"
            placeholder="Write Something..."
          />
        </div>
        <div>
          {text && (
            <button type="submit" className="text-white flex items-center justify-center bg-dark-navy p-2 rounded-full">
              <IoSend className="text-xl" title="Send Message" />
            </button>
          )}
          {!sound && !text && (
            <button
              type="submit"
              className="text-white flex items-center justify-center disabled:bg-dark-navy/40 disabled:cursor-not-allowed p-2 rounded-full"
              disabled
            >
              <IoSend className="text-xl" title="Send Message" />
            </button>
          )}
          {sound && !text && (
            <button
              type="button"
              onClick={handleSendSound}
              className="text-white flex items-center justify-center bg-dark-navy p-2 rounded-full"
            >
              <FaMicrophone className="text-xl" title="Send Voice" />
            </button>
          )}
        </div>
      </div>
    </form>
  );
};
