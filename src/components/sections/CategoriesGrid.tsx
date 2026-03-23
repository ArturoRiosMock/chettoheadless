import CategoryCard from "@/components/ui/CategoryCard";
import { CATEGORIES } from "@/data/mock";

export default function CategoriesGrid() {
  return (
    <section className="py-12">
      <div className="mx-auto max-w-[1354px] px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CATEGORIES.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}
