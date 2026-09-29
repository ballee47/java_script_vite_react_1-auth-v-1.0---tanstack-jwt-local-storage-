import CategoryCard from "../components/CategoryCard";
import { useCategories } from "../hooks/useCategories";

export default function CategoriesPage() {
  const { data: categories = [], error, isLoading } = useCategories();

  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-10">
      <h1 className="text-3xl font-bold text-slate-900">Categories</h1>
      <p className="mt-2 text-slate-600">Browse products by category.</p>

      {isLoading && <p className="mt-8 text-slate-600">Loading categories...</p>}
      {error && <p className="mt-8 text-red-600">Could not load categories.</p>}
      {!isLoading && !error && categories.length === 0 && (
        <p className="mt-8 text-slate-600">No categories found.</p>
      )}
      {!isLoading && !error && categories.length > 0 && (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      )}
    </section>
  );
}
