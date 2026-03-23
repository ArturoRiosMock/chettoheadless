import { Star } from "lucide-react";
import type { Testimonial } from "@/types";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="rounded-2xl border border-neutral-200 p-6 h-full flex flex-col">
      <div className="flex gap-1">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star
            key={i}
            className="h-4 w-4 fill-amber-400 text-amber-400"
          />
        ))}
      </div>
      <p className="mt-4 text-sm text-neutral-600 leading-relaxed flex-1">
        {testimonial.text}
      </p>
      <div className="mt-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-950 text-white text-sm font-semibold">
          {testimonial.initial}
        </div>
        <div>
          <p className="text-sm font-medium text-neutral-950">
            {testimonial.name}
          </p>
          <p className="text-xs text-neutral-500">{testimonial.location}</p>
        </div>
      </div>
    </div>
  );
}
