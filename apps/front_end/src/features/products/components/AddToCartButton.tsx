import {Product}  from "../types/product";

interface Props {
  product: Product;
}

export default function AddToCartButton({
  product,
}: Props) {
  const handleAdd = () => {
    console.log("Added:", product);
  };

  return (
    <button
      onClick={handleAdd}
      className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
    >
      Add To Cart
    </button>
  );
}