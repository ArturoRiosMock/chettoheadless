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
      className="group relative block overflow-hidden rounded-2xl aspect-[3/4]"
    >
      {category.image ? (
        <CmsImage
          src={category.image}
          alt={category.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      ) : (
        <div className="h-full w-full bg-neutral-300" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
      <div className="absolute top-4 right-4">
        <span className="inline-flex items-center px-3 py-1 text-xs font-medium text-neutral-950 bg-white rounded-full">
          Ver más →
        </span>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
        <h3 className="text-2xl font-bold text-white">{category.name}</h3>
        <p className="mt-1 text-sm text-white/80">{category.description}</p>
      </div>
    </Link>
  );
}
