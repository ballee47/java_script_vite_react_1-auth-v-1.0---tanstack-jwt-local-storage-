// src/features/home/pages/HomePage.tsx
import Hero from "@/shared/components/Hero"
import heroImage from "@/assets/hero.jpg"
import { useProducts } from "@/features/products/hooks/useProducts"
import { env } from "@/config/env"

type Product = {
  id: number
  name: string
  price: number
  image?: string
}

// ✅ local fallback — no external request, never fails
const FALLBACK_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'%3E%3Crect width='300' height='200' fill='%23e2e8f0'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%2394a3b8' font-size='14'%3ENo Image%3C/text%3E%3C/svg%3E"

export default function HomePage() {
  const { data: products, isLoading, error } = useProducts()

  return (
    <div className="w-full">

      {/* HERO */}
      <Hero backgroundImage={heroImage}>
        <h1 className="text-4xl md:text-6xl font-roboto font-semibold text-gray-900 mb-4 tracking-tight leading-tight">
          Welcome to SaaS App
        </h1>
        <p className="text-lg md:text-xl text-gray-900 max-w-xl leading-relaxed">
          Build something powerful and scalable 🚀
        </p>
      </Hero>

      {/* PRODUCTS SECTION */}
      <section className="p-6">

        <h2 className="text-2xl font-bold mb-6">
          Featured Products
        </h2>

        {/* LOADING */}
        {isLoading && (
          <p className="text-gray-600">Loading products...</p>
        )}

        {/* ERROR */}
        {error && (
          <p className="text-red-500">Failed to load products.</p>
        )}

        {/* EMPTY */}
        {!isLoading && !error && products?.length === 0 && (
          <p className="text-gray-500">No products found.</p>
        )}

        {/* GRID */}
        {!isLoading && !error && products && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

            {products.map((product: Product) => {

              // ✅ fixed — no more via.placeholder.com
              const imageUrl = product.image?.startsWith("http")
                ? product.image
                : product.image
                  ? `${env.API_BASE_URL}${product.image}`
                  : FALLBACK_IMAGE // ✅ local svg fallback

              return (
                <div
                  key={product.id}
                  className="border rounded-xl p-4 shadow hover:shadow-lg transition bg-white"
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
                  <h3 className="text-lg font-semibold">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 font-medium">
                    ${product.price}
                  </p>
                </div>
              )
            })}

          </div>
        )}

      </section>
    </div>
  )
}