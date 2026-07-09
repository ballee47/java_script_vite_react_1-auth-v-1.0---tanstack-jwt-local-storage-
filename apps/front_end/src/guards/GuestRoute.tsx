// src/guards/GuestRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { tokenStorage } from "../infra/storage/services/TokenStorageService";
export default function GuestRoute() {

  // if already logged in — redirect away from login/signup
  if (tokenStorage.hasAccessToken()) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}