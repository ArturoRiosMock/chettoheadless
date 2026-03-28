import Link from "next/link";
import ProductCard from "@/components/ui/ProductCard";
import type { Product } from "@/types";

interface FeaturedProductsProps {
  products: Product[];
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
}

export default function FeaturedProducts({
  products,
  title = "Productos Destacados",
  subtitle = "Lo mejor de nuestra colección barefoot",
  ctaText = "Ver Todo",
  ctaLink = "/colecciones",
}: FeaturedProductsProps) {
  return (
    <section className="bg-white pt-[64px]">
      <div className="mx-auto max-w-[1354px] px-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <h2 className="text-[30px] font-medium leading-[36px] tracking-[0.40px] text-[#2d2d2d]">
              {title}
            </h2>
            <p className="text-base font-normal leading-[24px] tracking-[-0.31px] text-[#6b6b6b]">
              {subtitle}
            </p>
          </div>
          {ctaText && ctaLink ? (
            <Link
              href={ctaLink}
              className="flex h-[48px] shrink-0 items-center gap-2 rounded-full border-2 border-[#2d2d2d] px-6 text-sm font-medium leading-[20px] tracking-[-0.15px] text-[#2d2d2d]"
            >
              {ctaText}
              <span aria-hidden>→</span>
            </Link>
          ) : null}
        </div>

        <div className="mt-8 grid grid-cols-2 gap-8 md:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
