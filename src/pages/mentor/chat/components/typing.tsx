import { useSelector } from "react-redux";

import { LoadingDots } from "@/components/ui/loadingDots";
import { RootState } from "@/redux/store";

import { UserAvatar } from "./userAvatar";

type TMessage = {
  image?: string;
  name: string;
};

export const Typing = ({ image, name }: TMessage) => {
  const typing = useSelector((state: RootState) => state.aiChat.typing);

  if (!typing) return null;

  return (
    <div className="px-4 w-full flex items-end gap-x-2 justify-start">
      <UserAvatar className="bg-[#222C54] w-10 h-10" name={name} image={image} />
      <div className="py-4 ps-2.5 pe-4 max-w-3xl bg-gray-200 text-dark-navy rounded-e-3xl rounded-t-3xl">
        <LoadingDots className="w-2 h-2 bg-dark-navy" />
      </div>
    </div>
  );
};
