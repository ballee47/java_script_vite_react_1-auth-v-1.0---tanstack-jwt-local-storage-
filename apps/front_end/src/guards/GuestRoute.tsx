// src/guards/GuestRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
export default function GuestRoute() {

  // if already logged in — redirect away from login/signup
  if (localStorage.getItem("access_token")) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}