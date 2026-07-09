import ProductCard from "./ProductCard";
import { Product } from "../types/product";

interface Props {
  products: Product[];
  onSelect: (product: Product) => void;
}

export default function ProductGrid({
  products,
  onSelect,
}: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onSelect={onSelect}
        />
      ))}

    </div>
  );
}