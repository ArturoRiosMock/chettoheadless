import CmsImage from "@/components/ui/CmsImage";
import Link from "next/link";
import type { Category } from "@/types";

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={`/colecciones/${category.slug}`}
      className="group relative block aspect-[3/4] w-full overflow-hidden rounded-2xl"
    >
      {category.image ? (
        <CmsImage
          src={category.image}
          alt={category.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      ) : (
        <div className="absolute inset-0 bg-neutral-300" aria-hidden />
      )}

      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent px-6 pb-6 pt-6 text-center">
        <h3 className="text-center text-[24px] font-medium leading-[32px] text-white">
          {category.name}
        </h3>
        <p className="mt-1 text-center text-sm leading-[20px] text-white/90">
          {category.description}
        </p>
      </div>

      <span className="absolute right-4 top-4 inline-flex rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-neutral-950">
        Ver más →
      </span>
    </Link>
  );
}
