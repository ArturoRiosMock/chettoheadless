import CmsImage from "@/components/ui/CmsImage";
import Link from "next/link";
import type { ReactNode } from "react";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  showColors?: boolean;
}

function cardBadgeLabel(children: ReactNode) {
  return (
    <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-[#2d2d2d]">
      {children}
    </span>
  );
}

export default function ProductCard({ product, showColors = true }: ProductCardProps) {
  const pdpHref =
    product.prestashopProductId != null
      ? `/producto/${product.prestashopProductId}`
      : `/producto/${encodeURIComponent(product.slug)}`;

  return (
    <Link href={pdpHref} className="block">
      <div className="flex flex-col gap-4">
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[16px] bg-[#f7f6f4]">
          {product.image ? (
            <CmsImage
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          ) : (
            <div className="h-full w-full bg-[#f7f6f4]" />
          )}
          {(product.badge || product.discount) && (
            <div className="absolute left-4 top-4 flex flex-col gap-2">
              {product.badge && cardBadgeLabel(product.badge)}
              {product.discount && cardBadgeLabel(product.discount)}
            </div>
          )}
        </div>

        <div>
          <h3
            className="text-[18px] font-medium leading-[27px] tracking-[-0.44px] text-[#2d2d2d]"
          >
            {product.name}
          </h3>
          <div className="mt-2 flex items-center justify-between gap-2">
            <div className="flex min-w-0 shrink items-center">
              <span className="text-[16px] font-normal tracking-[-0.31px] text-[#2d2d2d]">
                {product.price.toFixed(2).replace(".", ",")}€
              </span>
              {product.originalPrice != null && (
                <span className="ml-2 text-xs leading-none text-[#6b6b6b] line-through">
                  {product.originalPrice.toFixed(2).replace(".", ",")}€
                </span>
              )}
            </div>
            {showColors && product.colors != null && product.colors > 0 && (
              <span className="flex-shrink-0 text-xs tracking-[0.05px] text-[#6b6b6b]">
                {product.colors} colores
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
