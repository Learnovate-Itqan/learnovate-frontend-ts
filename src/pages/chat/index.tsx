import { MessageBox } from "./components/messageBox";
import { SideBar } from "./components/side";

export const ChatPage = () => {
  return (
    <div className="bg-dark-navy h-svh w-full flex">
      <SideBar />
      <div className="flex-grow h-full overflow-hidden flex flex-col">
        <div className="flex-grow"></div>
        <MessageBox />
      </div>
    </div>
  );
};
