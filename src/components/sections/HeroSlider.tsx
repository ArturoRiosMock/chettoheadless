"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { HERO_SLIDES } from "@/data/mock";
import "swiper/css";
import "swiper/css/pagination";

export default function HeroSlider() {
  return (
    <section className="relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation={{
          prevEl: ".hero-prev",
          nextEl: ".hero-next",
        }}
        pagination={{
          clickable: true,
          el: ".hero-pagination",
          bulletClass: "inline-block h-2 w-2 rounded-full bg-white/50 cursor-pointer transition-all",
          bulletActiveClass: "!w-8 !bg-white",
        }}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        loop
        className="h-[600px]"
      >
        {HERO_SLIDES.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-full">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute inset-0 flex items-center">
                <div className="mx-auto max-w-[1354px] w-full px-6">
                  <div className="max-w-xl">
                    <span className="inline-block rounded-full bg-white/20 backdrop-blur-sm px-4 py-2 text-xs font-medium text-white">
                      {slide.badge}
                    </span>
                    <p className="mt-4 text-sm text-white/80">
                      {slide.subtitle}
                    </p>
                    <h1 className="mt-2 text-5xl font-black text-white leading-tight">
                      {slide.title}
                    </h1>
                    <p className="mt-4 text-lg text-white/80">
                      {slide.description}
                    </p>
                    <div className="mt-8">
                      <Button href={slide.ctaLink} size="lg" className="gap-2">
                        {slide.cta}
                        <ArrowRight className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        type="button"
        className="hero-prev absolute left-4 top-1/2 z-10 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/40 transition-colors"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        type="button"
        className="hero-next absolute right-4 top-1/2 z-10 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/40 transition-colors"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <div className="hero-pagination absolute bottom-6 left-1/2 z-10 -translate-x-1/2 flex items-center gap-2" />
    </section>
  );
}
