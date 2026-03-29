import Link from "next/link";
import CmsImage from "@/components/ui/CmsImage";

interface PackOfferProps {
  title: string;
  description: string;
}

const PACK_PRODUCTS = [
  { name: "Sneaker Kaki Kids", price: 54.95, image: "/images/products/sneaker-kaki-kids.png", badge: "Nuevo" },
  { name: "Bota Maroon Kids", price: 64.95, image: "/images/collections/bota-maroon.jpg", badge: "Nuevo" },
  { name: "Bota Kaki", price: 64.95, image: "/images/collections/bota-kaki.jpg" },
];

export default function PackOffer({ title, description }: PackOfferProps) {
  const totalOriginal = PACK_PRODUCTS.reduce((sum, p) => sum + p.price, 0);
  const totalPack = Math.round(totalOriginal * 0.85 * 100) / 100;

  return (
    <section className="mt-16 bg-[#f7f6f4] py-16">
      <div className="mx-auto max-w-[1354px] px-6">
        <div className="text-center">
          <h2 className="font-['Inter'] text-[30px] font-medium leading-9 tracking-[0.4px] text-[#2d2d2d]">
            {title}
          </h2>
          <p className="mt-2 font-['Inter'] text-[16px] font-normal leading-6 tracking-[-0.31px] text-[#6b6b6b]">
            {description}
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_1fr_1fr_auto_280px]">
          {PACK_PRODUCTS.map((product, i) => (
            <div key={i} className="flex flex-col items-center gap-3">
              <div className="relative aspect-square w-full max-w-[240px] overflow-hidden rounded-2xl bg-white">
                <CmsImage src={product.image} alt={product.name} fill className="object-cover" sizes="240px" />
              </div>
              <p className="font-['Inter'] text-[14px] font-medium leading-5 tracking-[-0.15px] text-[#2d2d2d]">
                {product.name}
              </p>
              <p className="font-['Inter'] text-[14px] leading-5 text-[#6b6b6b]">
                {product.price.toFixed(2).replace(".", ",")}€
              </p>
            </div>
          ))}

          <div className="hidden text-[32px] font-light text-[#c4b5a0] lg:block">=</div>

          <div className="flex flex-col items-center gap-4 rounded-3xl bg-white p-8 shadow-sm">
            <p className="font-['Inter'] text-[12px] font-medium uppercase tracking-widest text-[#c4b5a0]">
              Precio del pack
            </p>
            <p className="font-['Inter'] text-[36px] font-semibold leading-[44px] text-[#2d2d2d]">
              {totalPack.toFixed(2).replace(".", ",")}€
            </p>
            <p className="font-['Inter'] text-[14px] leading-5 text-[#6b6b6b] line-through">
              {totalOriginal.toFixed(2).replace(".", ",")}€
            </p>
            <Link
              href="/colecciones"
              className="mt-2 flex h-12 items-center justify-center rounded-full bg-[#2d2d2d] px-8 font-['Inter'] text-[14px] font-medium text-white transition-colors hover:bg-[#1a1a1a]"
            >
              VER PACK COMPLETO
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
