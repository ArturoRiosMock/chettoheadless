import type { Metadata } from "next";
import Link from "next/link";
import CmsImage from "@/components/ui/CmsImage";

export const metadata: Metadata = {
  title: "Colecciones - Calzado Barefoot para Niños",
  description:
    "Explora todas nuestras colecciones de calzado barefoot para niños: botas, sneakers, sandalias, casual y más.",
};

const COLLECTIONS = [
  {
    slug: "novedades",
    name: "Novedades",
    description: "Lo último en calzado barefoot",
    image: "/images/products/sneaker-kaki-kids.png",
  },
  {
    slug: "botas",
    name: "Botas / Botines",
    description: "Protección y flexibilidad",
    image: "/images/collections/bota-maroon.jpg",
  },
  {
    slug: "sneakers",
    name: "Sneakers",
    description: "Versatilidad diaria",
    image: "/images/products/sneaker-maroon.png",
  },
  {
    slug: "sandalias",
    name: "Sandalias",
    description: "Para el verano",
    image: "/images/cat-sandalias-figma.png",
  },
  {
    slug: "casual",
    name: "Casual / Classic",
    description: "Estilo clásico",
    image: "/images/cat-casual-figma.png",
  },
  {
    slug: "ofertas",
    name: "Ofertas",
    description: "Los mejores precios",
    image: "/images/products/sneaker-light-pink.png",
  },
];

export default function CollectionsIndex() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-[1354px] px-6">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 pt-12" aria-label="Breadcrumb">
          <Link
            href="/"
            className="font-['Inter'] text-[16px] font-medium leading-6 tracking-[-0.31px] text-[#6b6b6b] transition-colors hover:text-[#2d2d2d]"
          >
            Inicio
          </Link>
          <span className="font-['Inter'] text-[14px] leading-5 text-[#6b6b6b]">
            /
          </span>
          <span className="font-['Inter'] text-[14px] font-normal leading-5 tracking-[-0.15px] text-[#2d2d2d]">
            Colecciones
          </span>
        </nav>

        <h1 className="mt-10 font-['Inter'] text-[36px] font-semibold leading-[44px] tracking-[-0.75px] text-[#2d2d2d]">
          Nuestras Colecciones
        </h1>
        <p className="mt-2 font-['Inter'] text-[16px] font-normal leading-6 tracking-[-0.31px] text-[#6b6b6b]">
          Encuentra el calzado barefoot perfecto para cada ocasión
        </p>

        {/* Collections Grid */}
        <div className="mt-12 mb-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {COLLECTIONS.map((collection) => (
            <Link
              key={collection.slug}
              href={`/colecciones/${collection.slug}`}
              className="group relative overflow-hidden rounded-2xl bg-[#f7f6f4]"
            >
              <div className="relative aspect-[4/3]">
                <CmsImage
                  src={collection.image}
                  alt={collection.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="font-['Inter'] text-[24px] font-medium leading-8 tracking-[0.07px] text-white">
                    {collection.name}
                  </h3>
                  <p className="mt-1 font-['Inter'] text-[14px] font-normal leading-5 tracking-[-0.15px] text-white/80">
                    {collection.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
