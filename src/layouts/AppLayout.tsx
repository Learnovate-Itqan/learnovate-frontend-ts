import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { z } from "zod";

import { useGetData } from "@/hooks/useApi";
import { setUser } from "@/redux/slices/authSlice";
import { userSchema } from "@/schemas/userSchema";

export function AppLayout() {
  const dispatch = useDispatch();
  const { data } = useGetData("/me");
  const { user, authStatus }: { user: z.infer<typeof userSchema> | undefined; authStatus: boolean } = data?.data || {
    user: undefined,
    authStatus: false,
  };
  if (!authStatus) {
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
