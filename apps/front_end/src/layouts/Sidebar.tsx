import { Link } from "react-router-dom"

type SidebarProps = {
  open: boolean
}

export default function Sidebar({ open }: SidebarProps) {
  return (
    <>
      {/* SIDEBAR */}
      <div
        className={`
          fixed top-0 left-0 h-full w-[260px]
          bg-gradient-to-b from-slate-900 to-slate-950 text-white p-5 z-[1000]
          shadow-2xl transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <h2 className="mb-6 text-xl font-bold tracking-wide">
          📦 Dashboard
        </h2>

        <nav className="flex flex-col gap-3">

          <Link
            to="/"
            className="px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition"
          >
            🏠 Home
          </Link>

          <Link
            to="/products"
            className="px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition"
          >
            🛍 Products
          </Link>

          <Link
            to="/cart"
            className="px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition"
          >
            🛒 Cart
          </Link>

        </nav>
      </div>
    </>
  )
}