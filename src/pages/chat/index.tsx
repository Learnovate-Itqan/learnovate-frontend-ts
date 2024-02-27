import { MessageBox } from "./components/messageBox";
import { MessagesContainer } from "./components/messages";
import { NewChat } from "./components/newChat";
import { SideBar } from "./components/side";

export const ChatPage = () => {
  return (
    <div className="bg-dark-navy h-svh w-full flex">
      <SideBar />
      <div className="flex-grow h-full overflow-hidden flex flex-col">
        <NewChat />
        <MessagesContainer />
        <MessageBox />
      </div>
    </div>
  );
};
