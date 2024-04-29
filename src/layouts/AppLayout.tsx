import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";

import { useGetData } from "@/hooks/useApi";
import { setUser } from "@/redux/slices/authSlice";

export function AppLayout() {
  const dispatch = useDispatch();
  const { data: response } = useGetData("/nav");
  const { user: data } = response?.data || {};
  const { loggedIn: authStatus, data: user } = data || {};
  if (authStatus === false) {
    localStorage.removeItem("token");
  }
  if (authStatus && user) {
    dispatch(setUser({ ...user, authStatus }));
  }

  return (
    <main className="grid relative min-h-dvh">
      <Outlet />
    </main>
  );
}
