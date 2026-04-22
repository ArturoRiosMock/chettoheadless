import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";
import { prestashop } from "@/lib/prestashop";
import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import ProductAccordions from "@/components/product/ProductAccordions";
import PackOffer from "@/components/product/PackOffer";
import ProductReviews from "@/components/product/ProductReviews";
import RelatedProducts from "@/components/product/RelatedProducts";
import type { PdpProductView } from "@/types";

const MOCK_PRODUCTS: Record<
  string,
  {
    name: string;
    price: number;
    category: string;
    categorySlug: string;
    description: string;
    images: string[];
    colors: { name: string; hex: string; image: string }[];
    materials: string;
    care: string;
    newsletterPrice?: number;
  }
> = {
  "lejan-one-kids": {
    name: "Lejan One® Kids",
    price: 60.0,
    newsletterPrice: 54.0,
    category: "Sneakers",
    categorySlug: "sneakers",
    description:
      "Lejan One® Kids - Mint. El calzado respetuoso que combina Salud, Cuidado y Estilo. Desarrollado bajo la supervisión del podólogo infantil Lejancitos, para asegurar que los pies de los más pequeños crezcan como si fueran descalzos.",
    images: ["/images/product/lejan-one-mint.jpg", "/images/product/lejan-one-side.jpg"],
    colors: [
      { name: "Mint", hex: "#b4d4c3", image: "/images/product/lejan-one-mint.jpg" },
      { name: "Beige", hex: "#e8dcc8", image: "/images/product/lejan-one-mint.jpg" },
      { name: "Orange", hex: "#e89b6b", image: "/images/product/lejan-one-mint.jpg" },
      { name: "Green", hex: "#5a7a5e", image: "/images/product/lejan-one-mint.jpg" },
      { name: "Grey", hex: "#a0a0a0", image: "/images/product/lejan-one-mint.jpg" },
      { name: "Black", hex: "#2d2d2d", image: "/images/product/lejan-one-mint.jpg" },
      { name: "Brown", hex: "#8b6f47", image: "/images/product/lejan-one-mint.jpg" },
      { name: "Pink", hex: "#f4c4d0", image: "/images/product/lejan-one-mint.jpg" },
    ],
    materials:
      "Exterior: Piel natural de primera calidad. Interior: Forro de algodón orgánico transpirable. Suela: Caucho natural flexible de 3.5mm.",
    care: "Limpiar con un paño húmedo. No usar productos químicos agresivos. Dejar secar a temperatura ambiente. Aplicar crema nutritiva para piel cada 2-3 meses.",
  },
};

function mockToPdp(slug: string): PdpProductView {
  const m = MOCK_PRODUCTS[slug] || MOCK_PRODUCTS["lejan-one-kids"];
  return {
    id: 0,
    name: m.name,
    slug,
    price: m.price,
    description: m.description,
    shortDescription: m.description.slice(0, 200),
    images: m.images,
    colors: m.colors,
    sizeVariants: [{ idProductAttribute: 0, label: "Única" }],
    materials: m.materials,
    care: m.care,
    categoryName: m.category,
    categorySlug: m.categorySlug,
    newsletterPrice: m.newsletterPrice,
  };
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = true;

const loadPdp = cache(async (slug: string) => {
  try {
    return await prestashop.resolveProductPage(slug);
  } catch {
    return null;
  }
});

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  let name = slug;
  const p = await loadPdp(slug);
  if (p) {
    name = p.name;
  } else {
    const m = MOCK_PRODUCTS[slug];
    if (m) {
      name = m.name;
    }
  }
  return {
    title: `${name} - Calzado Barefoot`,
    description: `Compra ${name}. Calzado barefoot respetuoso para niños.`,
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;

  const fromPs = await loadPdp(slug);
  let product: PdpProductView;
  let marketingHtml = "";

  if (fromPs) {
    product = fromPs;
    marketingHtml = await prestashop.getProductOverlayHtml(fromPs.id);
  } else if (MOCK_PRODUCTS[slug]) {
    product = mockToPdp(slug);
  } else {
    notFound();
  }

  let cms;
  try {
    cms = await prestashop.getCachedHomepageContent();
  } catch {
    cms = null;
  }
  const cfg = cms?.config;

  const shippingIcons = [
    { label: cfg?.pdp_shipping_1 || "Envío gratis y rápido entre 24-48h", icon: "truck" },
    { label: cfg?.pdp_shipping_2 || "Sólo sobre pedido y unidades limitadas", icon: "clock" },
    { label: cfg?.pdp_shipping_3 || "Cambios y devoluciones gratis 30 días", icon: "refresh" },
    { label: cfg?.pdp_shipping_4 || "Compra segura con SSL 256bits", icon: "shield" },
    { label: cfg?.pdp_shipping_5 || "Pago en hasta en 3 cuotas sin intereses", icon: "card" },
  ];

  const packTitle = cfg?.pdp_pack_title || "Oferta Pack con Descuento";
  const packDesc = cfg?.pdp_pack_desc || "Combina y ahorra un 15% comprando estos productos juntos";
  const relatedTitle = cfg?.pdp_related_title || "También te puede interesar";
  const relatedSubtitle = cfg?.pdp_related_subtitle || "Descubre más opciones de calzado barefoot";

  const mockRef = MOCK_PRODUCTS[slug];
  const newsletterPrice = product.newsletterPrice ?? mockRef?.newsletterPrice;

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-[1354px] px-6">
        <nav className="flex items-center gap-2 pt-12" aria-label="Breadcrumb">
          <Link
            href="/"
            className="font-['Inter'] text-[16px] font-medium leading-6 tracking-[-0.31px] text-[#6b6b6b] hover:text-[#2d2d2d]"
          >
            Inicio
          </Link>
          <span className="text-[14px] text-[#6b6b6b]">/</span>
          <Link
            href={`/colecciones/${product.categorySlug}`}
            className="font-['Inter'] text-[16px] font-medium leading-6 tracking-[-0.31px] text-[#6b6b6b] hover:text-[#2d2d2d]"
          >
            {product.categoryName}
          </Link>
          <span className="text-[14px] text-[#6b6b6b]">/</span>
          <span className="font-['Inter'] text-[14px] leading-5 tracking-[-0.15px] text-[#2d2d2d]">
            {product.name}
          </span>
        </nav>

        <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_500px]">
          <ProductGallery images={product.images} name={product.name} />
          <ProductInfo
            productId={product.id}
            name={product.name}
            price={product.price}
            newsletterPrice={newsletterPrice}
            colors={product.colors}
            sizeVariants={product.sizeVariants}
            shippingIcons={shippingIcons}
          />
        </div>

        <div
          className="mt-6 max-w-[500px] ml-auto mr-0 lg:pr-0"
          style={{ width: "500px", marginLeft: "auto" }}
        >
          <ProductAccordions
            description={product.description}
            materials={product.materials}
            care={product.care}
          />
          {marketingHtml ? (
            <div
              className="mt-8 border-t border-[#e8e6e3] pt-6 font-['Inter'] text-[14px] leading-[22px] text-[#6b6b6b] [&_a]:text-[#8b7e6a] [&_p+p]:mt-2"
              dangerouslySetInnerHTML={{ __html: marketingHtml }}
            />
          ) : null}
        </div>
      </div>

      <PackOffer title={packTitle} description={packDesc} />

      <ProductReviews />

      <RelatedProducts title={relatedTitle} subtitle={relatedSubtitle} />
    </div>
  );
}
