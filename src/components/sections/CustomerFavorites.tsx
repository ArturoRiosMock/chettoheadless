"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";
import Button from "@/components/ui/Button";
import { FAVORITE_PRODUCTS } from "@/data/mock";
import "swiper/css";

export default function CustomerFavorites() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-[1354px] px-6">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold text-neutral-950">
              Los favoritos de nuestros clientes
            </h2>
            <p className="mt-2 text-neutral-500">
              Hasta 27% de descuento en calzado barefoot seleccionado
            </p>
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
            {FAVORITE_PRODUCTS.map((product) => (
              <SwiperSlide key={product.id}>
                <ProductCard product={product} showColors={false} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="mt-10 text-center">
          <Button href="/ofertas" variant="outline" size="lg">
            Ver Todas las Ofertas
          </Button>
        </div>
      </div>
    </section>
  );
}
