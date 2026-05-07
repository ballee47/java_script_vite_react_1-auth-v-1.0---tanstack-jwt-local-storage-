// src/routes/index.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import ProtectedRoute from "@/guards/ProtectedRoute";
import GuestRoute from "@/guards/GuestRoute";

import { HomePage } from "@/features/home";
import LoginPage from "@/features/auth/pages/LoginPage";
import SignupPage from "@/features/auth/pages/SignupPage";
import ProductPage from "@/features/products/pages/ProductPage";
import DashboardPage from "@/features/dashboard/pages/DashboardPage";

export function AppRoutes() {
  return (
    <Routes>

      {/* ─────────────────────────────────────
          PUBLIC ROUTES — anyone can access
      ───────────────────────────────────── */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductPage />} />
      </Route>

      {/* ─────────────────────────────────────
          GUEST ROUTES — only logged OUT users
          logged in → redirected to /
      ───────────────────────────────────── */}
      <Route element={<GuestRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Route>

      {/* ─────────────────────────────────────
          PROTECTED ROUTES — only logged IN users
          logged out → redirected to /login
      ───────────────────────────────────── */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>
      </Route>

      {/* fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
  );
}