import { useSelector } from "react-redux";

import { RootState } from "@/redux/store";

import { UserAvatar } from "../userAvatar";

type TAIErrorMessage = {
  image?: string;
  name: string;
};

export const AIErrorMessage = ({ image, name }: TAIErrorMessage) => {
  const { error } = useSelector((state: RootState) => state.aiChat);

  if (!error) return null;

  return (
    <div className="px-4 w-full flex items-end gap-x-2 justify-start">
      <UserAvatar className="bg-[#222C54] w-10 h-10 border-2 border-red-500" name={name} image={image} />
      <div className="py-4 ps-2.5 pe-4 max-w-3xl bg-gray-200 text-red-500 border-2 border-red-500 rounded-e-3xl rounded-t-3xl">
        {error}
      </div>
    </div>
  );
};
