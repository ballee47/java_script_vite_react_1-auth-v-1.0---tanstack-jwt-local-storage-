// src/features/products/pages/ProductPage.tsx

import { useState } from "react";
import Hero from "@/shared/components/Hero";
import { useProducts } from "../features/products/hooks/useProducts";
import ProductGrid from "../features/products/components/ProductGrid";
import ProductDetails from "../features/products/components/ProductDetails";
import { Product } from "@/features/products/types/product";

export default function ProductPage() {
  const {
    data: products = [],
    isLoading,
    error,
  } = useProducts();

  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);

  return (
    <div className="min-h-screen bg-slate-900">

      <Hero backgroundImage="https://res.cloudinary.com/dos573rav/image/upload/v1776948049/login_trfkmw.jpg">

        <div className="py-16 text-center">

          <h1 className="text-4xl font-bold text-white">
            Explore Products
          </h1>

          <p className="mt-3 text-white/60">
            Discover amazing items from our store.
          </p>

        </div>

      </Hero>

      <section className="px-6 py-10">

        {isLoading && (

          <p className="text-center text-white">

            Loading products...

          </p>

        )}

        {error && (

          <p className="text-center text-red-500">

            Failed to load products.

          </p>

        )}

        {!isLoading &&
          !error &&
          products.length === 0 && (

            <p className="text-center text-white/60">

              No products found.

            </p>

          )}

        {!isLoading &&
          !error &&
          products.length > 0 && (

            selectedProduct ? (

              <ProductDetails
                product={selectedProduct}
                onBack={() => setSelectedProduct(null)}
              />

            ) : (

              <ProductGrid
                products={products}
                onSelect={setSelectedProduct}
              />

            )

          )}

      </section>

    </div>
  );
}