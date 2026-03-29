import Link from "next/link";
import CmsImage from "@/components/ui/CmsImage";

interface RelatedProductsProps {
  title: string;
  subtitle: string;
}

const RELATED = [
  { name: "Bota Maroon Kids", price: 64.95, image: "/images/collections/bota-maroon.jpg", slug: "bota-maroon-kids" },
  { name: "Sneaker Rosa Kids", price: 54.95, image: "/images/product/sneaker-rosa-kids.jpg", slug: "sneaker-rosa-kids" },
  { name: "Sneaker Grey Kids", price: 54.95, image: "/images/products/sneaker-maroon.png", slug: "sneaker-grey-kids" },
  { name: "Sneaker Beige Kids", price: 54.95, image: "/images/product/sneaker-beige-kids.jpg", slug: "sneaker-beige-kids" },
];

export default function RelatedProducts({ title, subtitle }: RelatedProductsProps) {
  return (
    <section className="bg-white pb-16">
      <div className="mx-auto max-w-[1354px] px-6">
        <h2 className="font-['Inter'] text-[30px] font-medium leading-9 tracking-[0.4px] text-[#2d2d2d]">
          {title}
        </h2>
        <p className="mt-2 font-['Inter'] text-[16px] font-normal leading-6 tracking-[-0.31px] text-[#6b6b6b]">
          {subtitle}
        </p>

        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {RELATED.map((product) => (
            <Link
              key={product.slug}
              href={`/producto/${product.slug}`}
              className="group flex flex-col gap-4"
            >
              <div className="relative aspect-[302/403] overflow-hidden rounded-2xl bg-[#f7f6f4]">
                <CmsImage
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div>
                <h3 className="font-['Inter'] text-[18px] font-medium leading-[27px] tracking-[-0.44px] text-[#2d2d2d]">
                  {product.name}
                </h3>
                <p className="mt-1 font-['Inter'] text-[16px] font-normal leading-6 tracking-[-0.31px] text-[#2d2d2d]">
                  {product.price.toFixed(2).replace(".", ",")}€
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
