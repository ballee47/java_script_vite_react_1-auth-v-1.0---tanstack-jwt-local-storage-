// src/features/products/pages/ProductPage.tsx
import Hero from "@/shared/components/Hero";
import { useProducts } from "../hooks/useProducts";
import { env } from "@/config/env";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

// ✅ local fallback — no external request, never fails
const FALLBACK_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'%3E%3Crect width='300' height='200' fill='%231e293b'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%2394a3b8' font-size='14'%3ENo Image%3C/text%3E%3C/svg%3E"

export default function ProductPage() {
  const { data: products, isLoading, error } = useProducts();

  return (
    <div className="min-h-screen bg-slate-900">

      {/* HERO */}
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

      {/* PRODUCTS SECTION */}
      <div className="px-6 py-10">

        {/* LOADING */}
        {isLoading && (
          <p className="text-white text-center">
            Loading products...
          </p>
        )}

        {/* ERROR */}
        {error && (
          <p className="text-red-500 text-center">
            Failed to load products
          </p>
        )}

        {/* EMPTY */}
        {!isLoading && !error && products?.length === 0 && (
          <p className="text-white/60 text-center">
            No products found.
          </p>
        )}

        {/* GRID */}
        {!isLoading && !error && products && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

            {products.map((product: Product) => {

              // ✅ fallback to local SVG if no image
              const imageUrl = product.image?.startsWith("http")
                ? product.image
                : product.image
                  ? `${env.API_BASE_URL}${product.image}`
                  : FALLBACK_IMAGE // ✅ no more via.placeholder.com

              return (
                <div
                  key={product.id}
                  className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4"
                >
                  <img
                    src={imageUrl}
                    alt={product.name}
                    className="w-full h-40 object-cover rounded-lg mb-3"
                    onError={(e) => {
                      // ✅ if image fails to load — show fallback
                      e.currentTarget.src = FALLBACK_IMAGE;
                    }}
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