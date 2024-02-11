import { TiPin } from "react-icons/ti";
import { v4 as uuid } from "uuid";

import mentor from "@/assets/mentors/Abdelrahman-Awad.webp";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { ChatItem, TChat } from "./chatItem";

const CREATE_CHAT_LIST = (count: number): TChat[] => {
  const chatList = [];
  for (let i = 0; i < count; i++) {
    const chat = {
      id: uuid(),
      name: "Abdelrahman Awad",
      message:
        "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      time: "18:00",
      imgSrc: mentor,
    };
    chatList.push({ ...chat });
  }
  return chatList;
};

export const LearnovateChat = () => {
  return (
    <li className="relative hover:bg-royal-blue/20 transition-colors rounded-md px-2 duration-200 ease-cubic">
      <button type="button" className="w-full flex items-center gap-x-2 py-2">
        <Avatar className="bg-[#222C54] w-14 h-14">
          <AvatarImage
            src="https://s3-alpha-sig.figma.com/img/66d8/9ac3/f451c4cb0f308ad8a38d1210738690ac?Expires=1708300800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=kBmd4JH3KmxKNltwOLhkNB-FqISflPZDVC66qIwh02Q4S-nTYxq16z0yk0RUlNV9r1Q-xSj5ewuUQvAnQglYGjJYBtw4gycAz~Ukwt-uM9Fa~iLZ~4MxJaBUFI~HhiufNgNuQ5cww4cSz6Zp0kdOQ5dvAe3N3ZcruW3fa1Wx1I1Z7tkbZ1RBHDZe0BQBGVTtslQlO1oTuxa278HtQ-rwyP8iARrR8YsN5IV5Ta4y0NOZ56cpM9tfOBK84vcW8iO1u6WXNxTkg0MgM6Vt2Vacm0f3533S3XXnduF9N6WqrBU-Z2XV1zZNxhgKQwjME0eq7NwkY8iLW4mLvRWnOJhyIQ__"
            alt="Learnovate Assistant"
            title="Learnovate Assistant"
          />
          <AvatarFallback>"LA"</AvatarFallback>
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

export const ChatList = () => {
  const chatList = CREATE_CHAT_LIST(12);

  return (
    <ul className="overflow-y-auto max-h-[calc(100vh-145px)] no-scrollbar space-y-1">
      <LearnovateChat />
      {chatList.map((person) => (
        <ChatItem key={person.id} {...person} />
      ))}
    </ul>
  );
};
