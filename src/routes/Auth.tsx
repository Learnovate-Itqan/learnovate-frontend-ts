import { useAuthStatus } from "@/hooks/useAuthStatus";
import { Navigate, Outlet } from "react-router-dom";

export function AuthRoutes() {
  const authStatus = useAuthStatus();
  if (authStatus) return <Navigate to="/" replace />;
  return <Outlet />;
}
