import { Navbar } from "@/layouts/Navbar";

import { ChatContainer } from "./components/chatContainer.js";
import { ChatList } from "./components/chatList";
import { EmptyChat } from "./components/emptyChat.js";
import { Search } from "./components/search";

export const MentorChatPage = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="flex h-[calc(100vh-4.6rem)] lg:h-[calc(100vh-4.6rem)]">
        <aside className="bg-dark-navy w-[24rem] min-w-max py-2.5 px-4 space-y-4">
          <Search />
          <ChatList />
        </aside>
        <EmptyChat />
        <ChatContainer />
      </main>
    </>
  );
};
