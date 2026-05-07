// src/features/dashboard/pages/DashboardPage.tsx
import { useEffect, useState } from "react";
import { useDashboard } from "../hooks/useDashboard";
import { useAuth } from "@/features/auth/hooks/useAuth"; // ✅ correct path

export default function DashboardPage() {
  const { user } = useAuth(); // ✅ now works correctly
  const { data, loading } = useDashboard();
  const [index, setIndex] = useState(0);

  // rotate hero images
  useEffect(() => {
    if (!data?.heroImages?.length) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % data.heroImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [data]);

  if (loading || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* HERO SECTION */}
      <div className="relative h-[60vh] flex items-center justify-center overflow-hidden">

        {/* rotating background image */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-700"
          style={{
            backgroundImage: `url(${data.heroImages[index]})`,
          }}
        />

        {/* dark overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* glow effects */}
        <div className="absolute inset-0">
          <div className="absolute w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] top-[-120px] left-[-120px]" />
          <div className="absolute w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] bottom-[-120px] right-[-120px]" />
        </div>

        {/* HERO TEXT */}
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl font-bold">
            {/* ✅ user?.username from useAuth, fallback to data.user */}
            Welcome back, {user?.username || data.user}
          </h1>
          <p className="text-white/60 mt-3">
            Here is your dashboard overview
          </p>
        </div>
      </div>

      {/* STATS SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8">
        <div className="bg-white/10 p-6 rounded-xl">
          💰 Revenue: ${data.stats.revenue}
        </div>
        <div className="bg-white/10 p-6 rounded-xl">
          📦 Orders: {data.stats.orders}
        </div>
        <div className="bg-white/10 p-6 rounded-xl">
          👤 Users: {data.stats.users}
        </div>
      </div>

      {/* PRODUCTS SECTION */}
      <div className="px-8 pb-12">
        <h2 className="text-xl mb-4 font-semibold">
          Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.products.map((p) => (
            <div
              key={p.id}
              className="bg-white/10 p-6 rounded-xl hover:bg-white/15 transition"
            >
              <h3 className="font-semibold">{p.name}</h3>
              <p className="text-white/60">{p.price}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}