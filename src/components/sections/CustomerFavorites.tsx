"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";
import Button from "@/components/ui/Button";
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
    <section className="py-16">
      <div className="mx-auto max-w-[1354px] px-6">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold text-neutral-950">{title}</h2>
            <p className="mt-2 text-neutral-500">{subtitle}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="favorites-prev flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 text-neutral-600 hover:bg-neutral-50 transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              className="favorites-next flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 text-neutral-600 hover:bg-neutral-50 transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="mt-10">
          <Swiper
            modules={[Navigation]}
            navigation={{
              prevEl: ".favorites-prev",
              nextEl: ".favorites-next",
            }}
            spaceBetween={24}
            slidesPerView={2}
            breakpoints={{
              640: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
              1280: { slidesPerView: 4.5 },
            }}
          >
            {products.map((product) => (
              <SwiperSlide key={product.id}>
                <ProductCard product={product} showColors={false} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="mt-10 text-center">
          <Button href={ctaLink} variant="outline" size="lg">
            {ctaText}
          </Button>
        </div>
      </div>
    </section>
  );
}
