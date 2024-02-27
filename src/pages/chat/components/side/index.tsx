import { SideHeader } from "./header";
import { MessagesList } from "./messagesList";

export const SideBar = () => {
  return (
    <aside className="h-svh overflow-y-hidden min-w-64 bg-[#0c1028] ps-2 py-4 space-y-6">
      <SideHeader />
      <MessagesList />
    </aside>
  );
};
