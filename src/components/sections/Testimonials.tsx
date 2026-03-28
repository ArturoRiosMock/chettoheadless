"use client";

import { Fragment } from "react";
import TestimonialCard from "@/components/ui/TestimonialCard";
import type { Testimonial } from "@/types";

interface TestimonialsProps {
  testimonials: Testimonial[];
  stats: { value: string; label: string }[];
  title?: string;
  subtitle?: string;
}

export default function Testimonials({
  testimonials,
  stats,
  title = "Familias Felices",
  subtitle = "Lo que dicen nuestros clientes sobre el calzado barefoot",
}: TestimonialsProps) {
  return (
    <section className="bg-[#f7f6f4] pt-[80px]">
      <div className="mx-auto max-w-[1354px] px-6">
        {/* Header */}
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-center font-['Inter'] text-[36px] font-medium leading-[40px] tracking-[0.37px] text-[#2d2d2d]">
            {title}
          </h2>
          <p className="text-center font-['Inter'] text-[16px] font-normal leading-6 tracking-[-0.31px] text-[#6b6b6b]">
            {subtitle}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="mt-[48px] grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>

        {/* Stats Bar */}
        <div className="mt-[48px] border-t border-[#e8e6e3] py-8">
          <div className="flex flex-wrap items-center justify-center gap-y-6">
            {stats.map((stat, i) => (
              <Fragment key={stat.label}>
                {i > 0 && (
                  <div
                    className="mx-8 hidden h-12 w-px bg-[#e8e6e3] sm:block"
                    aria-hidden="true"
                  />
                )}
                <div className="w-full text-center sm:w-auto">
                  <p className="font-['Inter'] text-[30px] font-normal leading-9 tracking-[0.4px] text-[#2d2d2d]">
                    {stat.value}
                  </p>
                  <p className="mt-1 font-['Inter'] text-[14px] font-normal leading-5 tracking-[-0.15px] text-[#6b6b6b]">
                    {stat.label}
                  </p>
                </div>
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
