import { TiPin } from "react-icons/ti";
import { useDispatch } from "react-redux";

import learnovateAI from "@/assets/mentors/learnovateAI.webp";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { setChatSelect } from "@/redux/slices/aiChatSlice";

export const LearnovateChat = () => {
  const dispatch = useDispatch();

  // import { GoogleGenerativeAI } from "@google/generative-ai";
  // const [idx, setIdx] = useState(1);
  // const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_KEY);
  // const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  // const chat = model.startChat({
  //   history: [
  //     { role: "user", parts: MESSAGES[0] },
  //     { role: "model", parts: "Hello! My name is LearnovateAI Assistant. How can I help you today?" },
  //   ],
  // });

  // const handleClick = async () => {
  //   if (idx >= MESSAGES.length) return;
  //   const msg = MESSAGES[idx];
  //   console.log("user:", msg);
  //   const result = await chat.sendMessage(msg);
  //   const response = await result.response;
  //   const text = response.text();
  //   console.log("model:", text);
  //   setIdx((prev) => prev + 1);
  // };

  return (
    <li
      onClick={() => {
        dispatch(setChatSelect(true));
      }}
      className="relative hover:bg-royal-blue/20 transition-colors rounded-md px-2 duration-200 ease-cubic"
    >
      <button type="button" className="w-full flex items-center gap-x-2 py-2">
        <Avatar className="bg-[#222C54] w-14 h-14">
          <AvatarImage src={learnovateAI} alt="Learnovate Assistant" title="Learnovate Assistant" />
          <AvatarFallback>LA</AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-start justify-center text-start">
          <h3 className="text-white font-bold">Learnovate AI Assistant</h3>
        </div>
      </button>
      <span className="absolute top-1/2 -translate-y-1/2 end-1.5 text-neutral-400 text-sm">
        <TiPin className="text-neutral-400 text-2xl" />
      </span>
    </li>
  );
};
