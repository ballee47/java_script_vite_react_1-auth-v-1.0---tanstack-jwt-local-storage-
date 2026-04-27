import { NavLink, useNavigate } from "react-router-dom"
import { useState, useEffect, useRef } from "react"
import { useAuth } from "@/features/auth/app/AuthProvider"
import { CartIcon } from "@/features/cart"

type NavbarProps = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Navbar({ setOpen }: NavbarProps) {
  const navigate = useNavigate()
  const { user, isAuthenticated, logout } = useAuth()

  const [openUserMenu, setOpenUserMenu] = useState(false)
  const [search, setSearch] = useState("")
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenUserMenu(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-white px-4 py-2 rounded-lg text-[18px] font-medium transition-all duration-200 
    ${isActive ? "bg-white/20" : "hover:bg-white/20"}`

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
  }

  const handleLogout = () => {
    logout()
    setOpenUserMenu(false)
    navigate("/login", { replace: true })
  }

  return (
    <div className="h-[70px] flex items-center justify-between px-8 text-white shadow-lg bg-gradient-to-r from-slate-800 to-slate-900">

      {/* LEFT */}
      <div className="flex items-center gap-5">
        <div
          onClick={() => setOpen(prev => !prev)}
          className="cursor-pointer flex flex-col gap-1.5"
        >
          <span className="w-6 h-[3px] bg-white" />
          <span className="w-6 h-[3px] bg-white" />
          <span className="w-6 h-[3px] bg-white" />
        </div>

        <div className="font-bold text-xl tracking-wide">
          🛒 SaaS Store
        </div>
      </div>

      {/* CENTER */}
      <div className="flex items-center gap-4">

        <NavLink to="/" className={linkClass}>
          Home
        </NavLink>

        <NavLink to="/products" className={linkClass}>
          Products
        </NavLink>

        <form onSubmit={handleSearch} className="ml-4">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="px-3 py-2 rounded-lg text-black w-48 focus:w-64 transition-all duration-300 outline-none"
          />
        </form>

      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">

        {/* CART ICON (only when logged in) */}
        {isAuthenticated && (
          <div className="cursor-pointer">
            <CartIcon />
          </div>
        )}

        {!isAuthenticated ? (
          <>
            <NavLink to="/login" className={linkClass}>
              Sign In
            </NavLink>

            <NavLink to="/signup" className={linkClass}>
              Sign Up
            </NavLink>
          </>
        ) : (
          <div className="relative" ref={menuRef}>

            <div
              onClick={() => setOpenUserMenu(prev => !prev)}
              className="cursor-pointer px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md font-semibold text-[18px]"
            >
              👤 {user || "User"}
            </div>

            <div
              className={`absolute right-0 top-[60px] w-64 bg-white text-black rounded-xl shadow-2xl p-4 z-[999]
              transition-all duration-200
              ${openUserMenu
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 -translate-y-2 pointer-events-none"
              }`}
            >
              <div className="mb-3">
                <div className="font-bold text-[16px]">
                  {user}
                </div>
              </div>

              <hr className="my-3" />

              <button
                onClick={handleLogout}
                className="w-full py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  )
}