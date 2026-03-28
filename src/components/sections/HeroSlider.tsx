"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import CmsImage from "@/components/ui/CmsImage";
import type { HeroSlide } from "@/types";
import "swiper/css";
import "swiper/css/pagination";

interface HeroSliderProps {
  slides: HeroSlide[];
}

export default function HeroSlider({ slides }: HeroSliderProps) {
  if (slides.length === 0) {
    return null;
  }

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
          bulletClass:
            "swiper-pagination-bullet !m-0 inline-block h-[8px] w-[8px] cursor-pointer rounded-full bg-[rgba(45,45,45,0.3)] !opacity-100 transition-[width,height,background-color] duration-300",
          bulletActiveClass:
            "swiper-pagination-bullet-active !w-[32px] !h-8 !rounded-full !bg-[#2d2d2d]",
        }}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        loop
        className="h-[600px]"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-full w-full overflow-hidden">
              <div className="absolute inset-0">
                {slide.image ? (
                  <CmsImage
                    src={slide.image}
                    alt={slide.title}
                    fill
                    className="object-cover opacity-75"
                    priority={index === 0}
                  />
                ) : (
                  <div className="h-full w-full bg-neutral-800 opacity-75" />
                )}
              </div>
              <div
                className="absolute inset-0 bg-gradient-to-r from-[rgba(0,0,0,0.6)] via-[rgba(0,0,0,0.4)] to-[rgba(0,0,0,0.2)]"
                aria-hidden
              />
              <div className="absolute inset-0 flex items-center">
                <div className="mx-auto w-full max-w-[1354px] px-6">
                  <div className="max-w-xl">
                    <span className="inline-block rounded-full bg-[rgba(255,255,255,0.9)] px-4 py-2 text-[14px] font-normal tracking-[-0.15px] text-[#6b6b6b]">
                      {slide.badge}
                    </span>
                    <p className="mt-4 text-[14px] font-normal uppercase italic tracking-[1.25px] text-[#c4b5a0]">
                      {slide.subtitle}
                    </p>
                    <h1 className="mt-2 text-[60px] font-medium leading-[75px] tracking-[0.26px] text-white">
                      {slide.title}
                    </h1>
                    <p className="mt-4 text-[18px] font-normal tracking-[-0.44px] text-[rgba(255,255,255,0.9)]">
                      {slide.description}
                    </p>
                    <div className="mt-8">
                      <a
                        href={slide.ctaLink}
                        className="inline-flex h-[56px] items-center justify-center gap-2 rounded-full bg-[#c4b5a0] px-8 text-[16px] font-medium text-white transition-opacity hover:opacity-90"
                      >
                        {slide.cta}
                        <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
                      </a>
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
        className="hero-prev absolute left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-[rgba(255,255,255,0.9)] shadow-lg text-[#2d2d2d] transition-opacity hover:opacity-90"
        aria-label="Diapositiva anterior"
      >
        <ChevronLeft className="h-6 w-6" strokeWidth={2} />
      </button>
      <button
        type="button"
        className="hero-next absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-[rgba(255,255,255,0.9)] shadow-lg text-[#2d2d2d] transition-opacity hover:opacity-90"
        aria-label="Diapositiva siguiente"
      >
        <ChevronRight className="h-6 w-6" strokeWidth={2} />
      </button>

      <div className="hero-pagination absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center justify-center gap-3" />
    </section>
  );
}
