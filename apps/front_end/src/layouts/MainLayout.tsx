import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import Navbar from "@/layouts/Navbar";
import Footer from "./Footer";

export default function MainLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">

      {/* NAVBAR */}
      <Navbar setOpen={setOpen} />

      {/* SIDEBAR */}
      <div
        className={`
          fixed top-0 left-0 h-full w-[260px]
          bg-slate-900 text-white p-5 z-[1000]
          shadow-2xl transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <h2 className="mb-5 text-lg font-bold">📦 Dashboard</h2>

        {/* ✅ FIXED NAVIGATION (NO <a href>) */}
        <nav className="flex flex-col gap-3">
          <Link to="/" className="sidebar-link">🏠 Home</Link>
          <Link to="/products" className="sidebar-link">🛍 Products</Link>
          <Link to="/cart" className="sidebar-link">🛒 Cart</Link>
        </nav>
      </div>

      {/* OVERLAY */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 z-[999]"
        />
      )}

      {/* MAIN CONTENT */}
      <main className="flex-1 p-0">
        <Outlet />
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}