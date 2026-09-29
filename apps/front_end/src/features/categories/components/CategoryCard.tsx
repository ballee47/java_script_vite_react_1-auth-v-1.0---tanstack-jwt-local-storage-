import type { Category } from "../types/categories.types";

type CategoryCardProps = {
  category: Category;
};

export default function CategoryCard({ category }: CategoryCardProps) {
  const title = category.name || category.type || "Unnamed category";

  return (
    <article className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      {category.image ? (
        <img src={category.image} alt={title} className="h-40 w-full object-cover" />
      ) : (
        <div className="flex h-40 items-center justify-center bg-slate-100 text-slate-500">
          No image
        </div>
      )}
      <div className="p-4">
        <h2 className="text-lg font-semibold capitalize text-slate-900">{title}</h2>
        {category.type && (
          <p className="mt-1 text-sm capitalize text-slate-500">{category.type}</p>
        )}
      </div>
    </article>
  );
}
