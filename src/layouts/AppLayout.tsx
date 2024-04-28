import { Outlet } from "react-router-dom";

export function AppLayout() {
  return (
    <main className="grid relative min-h-dvh">
      <Outlet />
    </main>
  );
}
