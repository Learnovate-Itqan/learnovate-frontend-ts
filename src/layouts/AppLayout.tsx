import { Outlet } from "react-router-dom";

import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

export function AppLayout() {
  return (
    <main className="grid relative min-h-dvh">
      <Navbar />
      <Outlet />
      <Footer />
    </main>
  );
}
