import { useState } from "react";
import CartDropdown from "./CartDropdown";

export default function CartIcon() {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(prev => !prev);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="relative">

      {/* ICON */}
      <div
        onClick={handleToggle}
        className="relative cursor-pointer text-3xl p-2 rounded-xl bg-white/10 hover:bg-white/20 transition"
      >
        🛒

        {/* optional pulse dot when open */}
        <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
      </div>

      {/* DROPDOWN */}
      {open && (
        <CartDropdown onClose={handleClose} />
      )}

    </div>
  );
}