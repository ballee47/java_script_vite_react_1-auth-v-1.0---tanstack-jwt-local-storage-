import { Routes, Route, Navigate } from "react-router-dom"
import MainLayout from "@/layouts/MainLayout"
import { HomePage } from "@/features/home"
import LoginPage from "@/features/auth/pages/LoginPage"
import ProductPage from "@/features/products/pages/ProductPage"
import DashboardPage from "@/features/dashboard/pages/DashboardPage";
import SignupPage from "@/features/auth/pages/SignupPage"




export function AppRoutes() {
  return (
    <Routes>
      {/* Layout wrapper */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductPage />} />
      <Route path="/dashboard" element={<DashboardPage />} /> 

        
      </Route>

      {/* standalone route (no layout) */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      
      {/* fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}