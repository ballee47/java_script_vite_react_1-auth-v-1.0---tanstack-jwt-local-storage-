import { Navigate, Outlet } from "react-router-dom";
import { useMe } from "@/features/auth/hooks/useAuthQueries";

export default function ProtectedRoute() {
  const { isLoading, isError, data } = useMe();

  // loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <p className="text-white text-lg">Loading...</p>
      </div>
    );
  }

  // not authenticated
  if (isError || !data) {
    return <Navigate to="/login" replace />;
  }

  // authenticated
  return <Outlet />;
}