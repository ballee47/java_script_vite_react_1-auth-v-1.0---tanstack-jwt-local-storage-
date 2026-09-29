import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "@/features/auth/hooks/useAuth";

export default function GuestRoute() {
  const { isAuthenticated, isLoadingAuth } = useAuth();

  if (isLoadingAuth) {
    return null;
  }

  return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
}
