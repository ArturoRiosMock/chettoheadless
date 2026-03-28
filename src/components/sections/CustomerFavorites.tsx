"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";
import type { Product } from "@/types";
import "swiper/css";

interface CustomerFavoritesProps {
  products: Product[];
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
}

export default function CustomerFavorites({
  products,
  title,
  subtitle,
  ctaText,
  ctaLink,
}: CustomerFavoritesProps) {
  return (
    <section className="py-[64px]">
      <div className="mx-auto max-w-[1354px] px-6">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h2 className="text-[28px] font-medium leading-[36px] tracking-[0.07px] text-[#2d2d2d]">
              {title}
            </h2>
            <p className="mt-2 text-base font-normal tracking-[-0.31px] text-[#6b6b6b]">
              {subtitle}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              aria-label="Anterior"
              className="favorites-prev flex size-10 items-center justify-center rounded-full border border-[#e8e6e3] text-[#2d2d2d] transition-colors hover:bg-[#f7f6f4]"
            >
              <ChevronLeft className="size-5" aria-hidden />
            </button>
            <button
              type="button"
              aria-label="Siguiente"
              className="favorites-next flex size-10 items-center justify-center rounded-full border border-[#e8e6e3] text-[#2d2d2d] transition-colors hover:bg-[#f7f6f4]"
            >
              <ChevronRight className="size-5" aria-hidden />
            </button>
          </div>
        </div>

        <div className="mt-[100px]">
          <Swiper
            modules={[Navigation]}
            navigation={{
              prevEl: ".favorites-prev",
              nextEl: ".favorites-next",
            }}
            spaceBetween={24}
            slidesPerView="auto"
            watchOverflow
          >
            {products.map((product) => (
              <SwiperSlide key={product.id} className="!w-[280px]">
                <ProductCard product={product} showColors={false} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="mt-[48px] flex justify-center">
          <Link
            href={ctaLink}
            className="inline-flex h-[48px] items-center justify-center rounded-full border border-[#2d2d2d] px-8 text-base font-medium text-[#2d2d2d] transition-colors hover:bg-[#f7f6f4]"
          >
            {ctaText}
          </Link>
        </div>
      </div>
    </section>
  );
}
