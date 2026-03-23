import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";
import Button from "@/components/ui/Button";
import type { Product } from "@/types";

interface FeaturedProductsProps {
  products: Product[];
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
}

export default function FeaturedProducts({
  products,
  title,
  subtitle,
  ctaText,
  ctaLink,
}: FeaturedProductsProps) {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-[1354px] px-6">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold text-neutral-950">{title}</h2>
            <p className="mt-2 text-neutral-500">{subtitle}</p>
          </div>
          <Button href={ctaLink} variant="outline" className="gap-2">
            {ctaText}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
