import type { Metadata } from "next";
import Link from "next/link";
import { prestashop } from "@/lib/prestashop";
import FaqClient from "@/components/faq/FaqClient";
import { FAQ_FALLBACK } from "@/data/faq-fallback";
import type { FaqCategoryApi } from "@/types";

export const metadata: Metadata = {
  title: "Preguntas Frecuentes - FAQ",
  description:
    "Resolvemos tus dudas sobre pedidos, envíos, devoluciones, tallas, productos barefoot y pagos en Chetto Kids.",
};

export default async function FaqPage() {
  let cms;
  try {
    cms = await prestashop.getCachedHomepageContent();
  } catch {
    cms = null;
  }
  const cfg = cms?.config;

  const apiCats = cms?.faq_categories;
  const categories: FaqCategoryApi[] =
    apiCats && apiCats.length > 0
      ? apiCats
      : FAQ_FALLBACK.map((c) => ({
          category: c.category,
          items: c.items.map((it, i) => ({
            id: i,
            question: it.question,
            answer: it.answer,
          })),
        }));

  const ctaTitle = cfg?.faq_cta_title || "¿No encuentras lo que buscas?";
  const ctaDesc =
    cfg?.faq_cta_desc || "Nuestro equipo de atención al cliente estará encantado de ayudarte";
  const ctaButtonText = cfg?.faq_cta_button || "Contactar con nosotros";

  return (
    <div className="bg-[#fdfcfb]">
      <div className="mx-auto max-w-[1354px] px-6 pb-16 pt-12">
        <FaqClient categories={categories} />

        <div className="mt-16 overflow-hidden rounded-3xl bg-gradient-to-b from-[#c4b5a0] to-[#a89584] px-12 py-12 text-center">
          <h3 className="font-['Inter'] text-[30px] font-medium leading-9 tracking-[0.4px] text-white">
            {ctaTitle}
          </h3>
          <p className="mx-auto mt-3 max-w-[500px] font-['Inter'] text-[16px] font-normal leading-6 tracking-[-0.31px] text-white/80">
            {ctaDesc}
          </p>
          <Link
            href="/contacto"
            className="mt-6 inline-flex h-14 items-center justify-center rounded-full bg-white px-8 font-['Inter'] text-[16px] font-medium leading-6 tracking-[-0.31px] text-[#2d2d2d] transition-opacity hover:opacity-90"
          >
            {ctaButtonText}
          </Link>
        </div>
      </div>
    </div>
  );
}
