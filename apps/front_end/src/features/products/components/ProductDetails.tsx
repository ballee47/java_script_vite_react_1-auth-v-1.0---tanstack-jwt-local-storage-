import { Product } from "../types/product";
import AddToCartButton from "./AddToCartButton";

interface Props {
  product: Product;
  onBack: () => void;
}

export default function ProductDetails({
  product,
  onBack,
}: Props) {
  return (
    <div className="max-w-6xl mx-auto">

      <button
        onClick={onBack}
        className="mb-6 text-white"
      >
        ← Back
      </button>

      <div className="grid md:grid-cols-2 gap-10">

        <img
          src={product.image}
          alt={product.name}
          className="w-full rounded-2xl"
        />

        <div>

          <h1 className="text-4xl font-bold text-white">
            {product.name}
          </h1>

          <p className="text-2xl mt-4 text-green-400">
            ${product.price}
          </p>

          <p className="mt-6 text-white/70">
            This is an amazing product from our store.
          </p>

          <AddToCartButton
            product={product}
          />

        </div>

      </div>

    </div>
  );
}