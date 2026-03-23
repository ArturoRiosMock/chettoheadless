import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";
import Button from "@/components/ui/Button";
import { FEATURED_PRODUCTS } from "@/data/mock";

export default function FeaturedProducts() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-[1354px] px-6">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold text-neutral-950">
              Productos Destacados
            </h2>
            <p className="mt-2 text-neutral-500">
              Lo mejor de nuestra colección barefoot
            </p>
          </div>
          <Button href="/colecciones" variant="outline" className="gap-2">
            Ver Todo
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          {FEATURED_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
