import TestimonialCard from "@/components/ui/TestimonialCard";
import { TESTIMONIALS, STATS } from "@/data/mock";

export default function Testimonials() {
  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-[1354px] px-6">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-neutral-950">
            Familias Felices
          </h2>
          <p className="mt-2 text-neutral-500">
            Lo que dicen nuestros clientes sobre el calzado barefoot
          </p>
        </div>

        {/* Cards */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>

        {/* Stats */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {STATS.map((stat, i) => (
            <div key={stat.label} className="flex items-center gap-8 md:gap-16">
              <div className="text-center">
                <p className="text-3xl font-bold text-neutral-950">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-neutral-500">{stat.label}</p>
              </div>
              {i < STATS.length - 1 && (
                <div className="hidden md:block h-12 w-px bg-neutral-200" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
