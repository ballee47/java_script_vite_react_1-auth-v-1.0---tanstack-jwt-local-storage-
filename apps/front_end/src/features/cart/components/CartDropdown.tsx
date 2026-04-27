import { useEffect, useRef } from "react";
import { useCartStore } from "../store/cart.store";

type Props = {
  onClose: () => void;
};

export default function CartDropdown({ onClose }: Props) {
  const { items, removeItem, increaseQty, decreaseQty, clearCart } =
    useCartStore();

  const ref = useRef<HTMLDivElement>(null);

  // 🧠 CLICK OUTSIDE TO CLOSE
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const total = items.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );

  return (
    <div
      ref={ref}
      className="absolute right-0 mt-4 w-96 bg-white text-black rounded-3xl shadow-2xl p-6 z-50"
    >
      {/* HEADER */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-xl font-bold flex items-center gap-2">
          🛒 Cart
        </h3>

        <button
          onClick={onClose}
          className="text-gray-500 hover:text-black text-lg"
        >
          ✕
        </button>
      </div>

      {/* EMPTY */}
      {items.length === 0 ? (
        <p className="text-gray-500 text-sm text-center py-6">
          Your cart is empty
        </p>
      ) : (
        <div className="space-y-4">

          {/* ITEMS */}
          {items.map(item => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 rounded-2xl border bg-gray-50 hover:bg-gray-100 transition"
            >
              {/* LEFT */}
              <div>
                <p className="font-semibold text-base">
                  {item.name}
                </p>
                <p className="text-sm text-gray-500">
                  ${item.price}
                </p>
              </div>

              {/* CONTROLS */}
              <div className="flex items-center gap-2">

                <button
                  onClick={() => decreaseQty(item.id)}
                  className="w-9 h-9 rounded-lg bg-gray-200 hover:bg-gray-300 text-lg"
                >
                  -
                </button>

                <span className="w-6 text-center font-semibold">
                  {item.quantity}
                </span>

                <button
                  onClick={() => increaseQty(item.id)}
                  className="w-9 h-9 rounded-lg bg-gray-200 hover:bg-gray-300 text-lg"
                >
                  +
                </button>

                <button
                  onClick={() => removeItem(item.id)}
                  className="ml-2 text-red-500 hover:text-red-700 font-bold text-xl"
                >
                  ×
                </button>

              </div>
            </div>
          ))}

          {/* TOTAL */}
          <div className="flex justify-between pt-4 border-t font-bold text-lg">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          {/* CLEAR */}
          <button
            onClick={clearCart}
            className="w-full mt-3 py-3 rounded-2xl bg-red-500 text-white font-semibold hover:bg-red-600 transition"
          >
            Clear Cart
          </button>

        </div>
      )}
    </div>
  );
}