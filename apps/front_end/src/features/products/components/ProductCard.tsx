import { Product } from "../types/product";

interface Props {
  product: Product;
  onSelect: (product: Product) => void;
}

export default function ProductCard({
  product,
  onSelect,
}: Props) {
  return (
    <div
      onClick={() => onSelect(product)}
      className="cursor-pointer bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 hover:scale-105 transition"
    >
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-40 object-cover rounded-xl"
      />

      <h2 className="text-white mt-3 font-semibold">
        {product.name}
      </h2>

      <p className="text-white/60">
        ${product.price}
      </p>
    </div>
  );
}