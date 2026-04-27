import { useEffect, useState } from "react"
import Hero from "@/shared/components/Hero"
import heroImage from "@/assets/hero.jpg"
import { getProducts } from "@/features/products/services/productService"

type Product = {
  id: number
  name: string
  price: number
  image?: string
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts()
        setProducts(data)
      } catch (error) {
        console.log("Error loading products:", error)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

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

        {loading ? (
          <p className="text-gray-600">Loading products...</p>
        ) : products.length === 0 ? (
          <p className="text-gray-500">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

            {products.map((product) => (
              <div
                key={product.id}   // ✅ FIXED (Django uses id)
                className="border rounded-xl p-4 shadow hover:shadow-lg transition bg-white"
              >
                <img
                  src={product.image || "https://via.placeholder.com/300"}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded-lg mb-3"
                />

                <h3 className="text-lg font-semibold">
                  {product.name}
                </h3>

                <p className="text-gray-600 font-medium">
                  ${product.price}
                </p>
              </div>
            ))}

          </div>
        )}
      </section>
    </div>
  )
}