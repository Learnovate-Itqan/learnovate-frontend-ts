import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";

import ScrollToTop from "@/components/ui/ScrollToTop";
import { useGetData } from "@/hooks/useApi";
import { setUser } from "@/redux/slices/authSlice";

import { LoadingPage } from "./LoadingPage";
import { Navbar } from "./Navbar";

export function AppLayout() {
  const dispatch = useDispatch();
  const { data: response } = useGetData("/nav");
  const { user: data } = response?.data || {};
  const { loggedIn: authStatus, data: user } = data || {};
  if (authStatus && user) {
    dispatch(setUser({ ...user, authStatus }));
  }
  if (!response) {
    return (
      <>
        <Navbar />
        <LoadingPage />
      </>
    );
  }
  return (
    <main className="grid relative min-h-dvh">
      <ScrollToTop />
      <Outlet />
    </main>
  );
}
