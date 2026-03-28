import CategoryCard from "@/components/ui/CategoryCard";
import type { Category } from "@/types";

interface CategoriesGridProps {
  categories: Category[];
}

export default function CategoriesGrid({ categories }: CategoriesGridProps) {
  return (
    <section className="pt-12 pb-0">
      <div className="mx-auto max-w-[1354px] px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}
