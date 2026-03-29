import type { Metadata } from "next";
import Link from "next/link";
import { SlidersHorizontal, ChevronDown } from "lucide-react";
import CmsImage from "@/components/ui/CmsImage";
import { prestashop } from "@/lib/prestashop";

const COLLECTION_NAMES: Record<string, string> = {
  novedades: "Novedades",
  botas: "Botas",
  sneakers: "Sneakers",
  sandalias: "Sandalias",
  casual: "Casual / Classic",
  ofertas: "Ofertas",
};

const MOCK_COLLECTION_PRODUCTS: Record<string, { name: string; price: number; image: string; slug: string }[]> = {
  botas: [
    { name: "Bota Maroon", price: 64.95, image: "/images/collections/bota-maroon.jpg", slug: "bota-maroon" },
    { name: "Bota Kaki", price: 64.95, image: "/images/collections/bota-kaki.jpg", slug: "bota-kaki" },
  ],
  sneakers: [
    { name: "Sneaker Kaki Kids", price: 54.95, image: "/images/products/sneaker-kaki-kids.png", slug: "sneaker-kaki-kids" },
    { name: "Sneaker Maroon", price: 54.95, image: "/images/products/sneaker-maroon.png", slug: "sneaker-maroon" },
    { name: "Sneaker Light Pink", price: 54.95, image: "/images/products/sneaker-light-pink.png", slug: "sneaker-light-pink" },
  ],
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const name = COLLECTION_NAMES[slug] || slug;
  return {
    title: `${name} - Calzado Barefoot`,
    description: `Descubre nuestra colección de ${name.toLowerCase()} barefoot para niños. Calzado respetuoso con el desarrollo natural del pie.`,
  };
}

export default async function CollectionPage({ params }: PageProps) {
  const { slug } = await params;
  const collectionName = COLLECTION_NAMES[slug] || slug;

  let cms;
  try {
    cms = await prestashop.getHomepageContent();
  } catch {
    cms = null;
  }

  const cfg = cms?.config;
  const products = MOCK_COLLECTION_PRODUCTS[slug] || [];

  const ctaTitle = cfg?.collection_cta_title || "¿Primera vez con calzado barefoot?";
  const ctaDescription = cfg?.collection_cta_description || "Descubre nuestra guía completa sobre cómo elegir el zapato barefoot perfecto para tu hijo";
  const ctaButtonText = cfg?.collection_cta_text || "Ver Guía Barefoot";
  const ctaButtonLink = cfg?.collection_cta_link || "/porque-barefoot";

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
          <span className="font-['Inter'] text-[14px] leading-5 text-[#6b6b6b]">/</span>
          <span className="font-['Inter'] text-[14px] font-normal leading-5 tracking-[-0.15px] text-[#2d2d2d]">
            {collectionName}
          </span>
        </nav>

        {/* Toolbar */}
        <div className="mt-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="flex h-[38px] items-center gap-2 rounded-full border border-[#e8e6e3] px-[17px]"
            >
              <SlidersHorizontal className="size-5 text-[#0a0a0a]" />
              <span className="font-['Inter'] text-[14px] font-medium leading-5 tracking-[-0.15px] text-[#0a0a0a]">
                Filtros
              </span>
            </button>
            <span className="font-['Inter'] text-[14px] font-normal leading-5 tracking-[-0.15px] text-[#6b6b6b]">
              {products.length} producto{products.length !== 1 ? "s" : ""}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-['Inter'] text-[14px] font-normal leading-5 tracking-[-0.15px] text-[#6b6b6b]">
              Ordenar por:
            </span>
            <button
              type="button"
              className="flex h-[38px] items-center gap-2 rounded-full border border-[#e8e6e3] px-[17px]"
            >
              <span className="font-['Inter'] text-[14px] font-medium leading-5 tracking-[-0.15px] text-[#0a0a0a]">
                relevancia
              </span>
              <ChevronDown className="size-4 text-[#0a0a0a]" />
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="mt-[32px] grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
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
                <p className="mt-2 font-['Inter'] text-[16px] font-normal leading-6 tracking-[-0.31px] text-[#2d2d2d]">
                  {product.price.toFixed(2).replace(".", ",")}€
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty state */}
        {products.length === 0 && (
          <div className="py-24 text-center">
            <p className="font-['Inter'] text-[18px] text-[#6b6b6b]">
              No hay productos en esta colección todavía.
            </p>
            <Link
              href="/"
              className="mt-4 inline-block font-['Inter'] text-[16px] font-medium text-[#c4b5a0] underline"
            >
              Volver al inicio
            </Link>
          </div>
        )}

        {/* CTA Banner */}
        <div className="mt-16 mb-16 overflow-hidden rounded-3xl bg-gradient-to-b from-[#c4b5a0] to-[#a89584] px-12 py-12 text-center">
          <h3 className="font-['Inter'] text-[30px] font-medium leading-9 tracking-[0.4px] text-white">
            {ctaTitle}
          </h3>
          <p className="mx-auto mt-4 max-w-[672px] font-['Inter'] text-[16px] font-normal leading-6 tracking-[-0.31px] text-white/90">
            {ctaDescription}
          </p>
          <a
            href={ctaButtonLink}
            className="mt-6 inline-flex h-14 items-center justify-center rounded-full bg-white px-8 font-['Inter'] text-[16px] font-medium leading-6 tracking-[-0.31px] text-[#2d2d2d] transition-opacity hover:opacity-90"
          >
            {ctaButtonText}
          </a>
        </div>
      </div>
    </div>
  );
}
