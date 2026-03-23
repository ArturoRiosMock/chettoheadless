import Image from "next/image";
import Link from "next/link";
import Badge from "./Badge";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  showColors?: boolean;
}

export default function ProductCard({ product, showColors = true }: ProductCardProps) {
  return (
    <Link href={`/producto/${product.slug}`} className="group block">
      <div className="relative overflow-hidden rounded-xl bg-neutral-100 aspect-[3/4]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
        {product.badge && (
          <div className="absolute top-4 left-4">
            <Badge variant="new">{product.badge}</Badge>
          </div>
        )}
        {product.discount && (
          <div className="absolute top-4 left-4">
            <Badge variant="discount">{product.discount}</Badge>
          </div>
        )}
      </div>
      <div className="mt-4">
        <h3 className="text-base font-semibold text-neutral-950 group-hover:text-brand-600 transition-colors">
          {product.name}
        </h3>
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-base font-semibold">
              {product.price.toFixed(2).replace(".", ",")}€
            </span>
            {product.originalPrice && (
              <span className="text-sm text-neutral-500 line-through">
                {product.originalPrice.toFixed(2).replace(".", ",")}€
              </span>
            )}
          </div>
          {showColors && product.colors && (
            <span className="text-xs text-neutral-500">
              {product.colors} colores
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
