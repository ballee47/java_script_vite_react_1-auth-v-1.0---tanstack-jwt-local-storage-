import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import Hero from "@/shared/components/Hero";
import heroImage from "@/assets/hero.jpg";
import { getProducts } from "@/features/products/services/productService";
export default function HomePage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data);
            }
            catch (error) {
                console.log("Error loading products:", error);
            }
            finally {
                setLoading(false);
            }
        };
        loadProducts();
    }, []);
    return (_jsxs("div", { className: "w-full", children: [_jsxs(Hero, { backgroundImage: heroImage, children: [_jsx("h1", { className: "text-4xl md:text-6xl font-roboto font-semibold text-gray-900 mb-4 tracking-tight leading-tight", children: "Welcome to SaaS App" }), _jsx("p", { className: "text-lg md:text-xl text-gray-900 max-w-xl leading-relaxed", children: "Build something powerful and scalable \uD83D\uDE80" })] }), _jsxs("section", { className: "p-6", children: [_jsx("h2", { className: "text-2xl font-bold mb-6", children: "Featured Products" }), loading ? (_jsx("p", { className: "text-gray-600", children: "Loading products..." })) : products.length === 0 ? (_jsx("p", { className: "text-gray-500", children: "No products found." })) : (_jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6", children: products.map((product) => (_jsxs("div", { className: "border rounded-xl p-4 shadow hover:shadow-lg transition bg-white", children: [_jsx("img", { src: product.image || "https://via.placeholder.com/300", alt: product.name, className: "w-full h-40 object-cover rounded-lg mb-3" }), _jsx("h3", { className: "text-lg font-semibold", children: product.name }), _jsxs("p", { className: "text-gray-600 font-medium", children: ["$", product.price] })] }, product._id))) }))] })] }));
}
