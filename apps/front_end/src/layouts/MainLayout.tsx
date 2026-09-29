import { useState } from "react";
import { Outlet } from "react-router-dom";

import Footer from "./Footer";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Navbar setOpen={setSidebarOpen} />
      <Sidebar open={sidebarOpen} />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
