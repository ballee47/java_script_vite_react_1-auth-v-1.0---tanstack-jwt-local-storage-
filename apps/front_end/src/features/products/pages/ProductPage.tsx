import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";
import Hero from "@/shared/components/Hero";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-slate-900">

      {/* 🔥 HERO WITH CLOUDINARY BACKGROUND */}
      <Hero backgroundImage="https://res.cloudinary.com/dos573rav/image/upload/v1776948049/login_trfkmw.jpg">

        <div className="text-center py-16">

          <h1 className="text-4xl font-bold text-white">
            Explore Products
          </h1>

          <p className="text-white/60 mt-3">
            Discover amazing items from our store
          </p>

        </div>

      </Hero>

      {/* 📦 PRODUCTS SECTION */}
      <div className="px-6 py-10">

        {loading && (
          <p className="text-white text-center">Loading products...</p>
        )}

        {error && (
          <p className="text-red-500 text-center">{error}</p>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

            {products.map((product) => {

              const imageUrl = product.image?.startsWith("http")
                ? product.image
                : `http://localhost:8000${product.image}`;

              return (
                <div
                  key={product.id}
                  className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4"
                >

                  <img
                    src={imageUrl}
                    alt={product.name}
                    className="w-full h-40 object-cover rounded-lg mb-3"
                  />

                  <h2 className="text-white font-semibold">
                    {product.name}
                  </h2>

                  <p className="text-white/60">
                    ${product.price}
                  </p>

                </div>
              );
            })}

          </div>
        )}

      </div>
    </div>
  );
}