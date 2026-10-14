
// src/features/home/pages/HomePage.tsx

import Hero from "@/shared/components/Hero"
import heroImage from "@/assets/hero.jpg"
import { useProducts } from "@/features/products/hooks/useProducts"
import { env } from "@/config/env"
import type { Product } from "@/features/products/types"

// Local fallback image; no external request required.
const FALLBACK_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'%3E%3Crect width='300' height='200' fill='%23e2e8f0'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%2394a3b8' font-size='14'%3ENo Image%3C/text%3E%3C/svg%3E"

function getImageUrl(image?: string | null): string {
  if (!image) {
    return FALLBACK_IMAGE
  }

  // Keep absolute image URLs unchanged.
  if (/^https?:\/\//i.test(image)) {
    return image
  }

  // Join the API base URL and relative image path safely.
  const baseUrl = env.API_BASE_URL.replace(/\/+$/, "")
  const imagePath = image.startsWith("/") ? image : `/${image}`

  return `${baseUrl}${imagePath}`
}

export default function HomePage() {
  const { data: products, isLoading, error } = useProducts()

  return (
    <div className="w-full">
      {/* HERO */}
      <Hero backgroundImage={heroImage}>
        <h1 className="mb-4 text-4xl font-roboto font-semibold leading-tight tracking-tight text-gray-900 md:text-6xl">
          Welcome to SaaS App
        </h1>

        <p className="max-w-xl text-lg leading-relaxed text-gray-900 md:text-xl">
          Build something powerful and scalable 🚀
        </p>
      </Hero>

      {/* PRODUCTS SECTION */}
      <section className="p-6">
        <h2 className="mb-6 text-2xl font-bold">
          Featured Products
        </h2>

        {/* LOADING */}
        {isLoading && (
          <p className="text-gray-600" role="status">
            Loading products...
          </p>
        )}

        {/* ERROR */}
        {!isLoading && error && (
          <p className="text-red-500" role="alert">
            Failed to load products. Please try again later.
          </p>
        )}

        {/* EMPTY */}
        {!isLoading &&
          !error &&
          products &&
          products.length === 0 && (
            <p className="text-gray-500">
              No products found.
            </p>
          )}

        {/* PRODUCT GRID */}
        {!isLoading &&
          !error &&
          products &&
          products.length > 0 && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
              {products.map((product: Product) => (
                <article
                  key={product.id}
                  className="rounded-xl border bg-white p-4 shadow transition hover:shadow-lg"
                >
                  <img
                    src={getImageUrl(product.image) }
                    alt={product.name}
                    loading="lazy"
                    className="mb-3 h-40 w-full rounded-lg object-cover"
                    onError={(event) => {
                      const img = event.currentTarget

                      // Avoid repeatedly handling a failed fallback image.
                      if (!img.src.endsWith(FALLBACK_IMAGE)) {
                        img.onerror = null
                        img.src = FALLBACK_IMAGE
                      }
                    }}
                  />

                  <h3 className="text-lg font-semibold">
                    {product.name}
                  </h3>

                  {product.category?.name && (
                    <p className="mt-1 text-sm text-gray-500">
                      {product.category.name}
                    </p>
                  )}

                  <p className="mt-2 font-medium text-gray-700">
                    ${Number(product.price).toFixed(2)}
                  </p>

                  {product.description && (
                    <p className="mt-2 line-clamp-2 text-sm text-gray-600">
                      {product.description}
                    </p>
                  )}

                  {typeof product.stock === "number" && (
                    <p className="mt-2 text-sm text-gray-500">
                      {product.stock > 0
                        ? `${product.stock} in stock`
                        : "Out of stock"}
                    </p>
                  )}
                </article>
              ))}
            </div>
          )}
      </section>
    </div>
  )
}
