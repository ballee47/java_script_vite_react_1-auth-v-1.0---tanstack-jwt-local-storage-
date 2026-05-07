// src/guards/ProtectedRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { useMe } from "@/features/auth/hooks/useAuthQueries";
import { tokenStorage } from "@/infra/storage/localStorage";

export default function ProtectedRoute() {

  const { isLoading, isError } = useMe();

  // ─────────────────────────────────────────
  // 1. no token at all — redirect immediately
  // ─────────────────────────────────────────
  if (!tokenStorage.hasAccessToken()) {
    return <Navigate to="/login" replace />;
  }

  // ─────────────────────────────────────────
  // 2. token exists but still fetching user
  // ─────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <p className="text-white text-lg">Loading...</p>
      </div>
    );
  }

  // ─────────────────────────────────────────
  // 3. token exists but user fetch failed
  //    (token is invalid/expired & refresh failed)
  // ─────────────────────────────────────────
  if (isError) {
    return <Navigate to="/login" replace />;
  }

  // ─────────────────────────────────────────
  // 4. authenticated — render the page
  // ─────────────────────────────────────────
  return <Outlet />;
}