import { Navbar } from "@/layouts/Navbar";

import { ChatList } from "./components/chatList";
import { Search } from "./components/search";

export const MentorChatPage = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="flex h-[calc(100vh-78.8px)] lg:h-[calc(100vh-69.737px)]">
        <aside className="bg-dark-navy w-[24rem] py-2.5 px-4 space-y-4">
          <Search />
          <ChatList />
        </aside>
        <section className="flex-grow flex justify-center items-center">
          <h2 className="text-2xl font-bold text-center">Select a chat to start messaging</h2>
        </section>
      </main>
    </>
  );
};
