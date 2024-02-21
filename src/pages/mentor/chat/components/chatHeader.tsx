import { UserAvatar } from "./userAvatar";

type TChatHeader = {
  title: string;
  image?: string;
};

export const ChatHeader = ({ title, image }: TChatHeader) => {
  return (
    <header className="flex items-center justify-between gap-4 h-16 w-full bg-dark-navy text-white px-4 py-3">
      <div className="flex items-center gap-2 select-none" title={title}>
        <UserAvatar name={title} image={image} className="bg-[#222C54] w-10 h-10" />
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
      <div className="relative">
        <button type="button" className="space-y-1">
          <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
          <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
          <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
        </button>
      </div>
    </header>
  );
};
