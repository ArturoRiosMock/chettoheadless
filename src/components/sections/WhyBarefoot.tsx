import Image from "next/image";
import {
  Sprout,
  Heart,
  Footprints,
  Shield,
  Waves,
  ArrowDownToLine,
  Maximize,
} from "lucide-react";
import Button from "@/components/ui/Button";
import { WHY_BAREFOOT_CARDS } from "@/data/mock";

const ICON_MAP: Record<string, React.ElementType> = {
  Sprout,
  Heart,
  Footprints,
  Shield,
};

const FEATURES = [
  {
    icon: Waves,
    title: "Suela Flexible",
    description:
      "Permite el movimiento natural del pie en todas direcciones.",
  },
  {
    icon: ArrowDownToLine,
    title: "Drop Cero",
    description:
      "Sin desnivel entre talón y puntera para una pisada natural.",
  },
  {
    icon: Maximize,
    title: "Horma Amplia",
    description:
      "Espacio suficiente para que los dedos se muevan libremente.",
  },
];

export default function WhyBarefoot() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-[1354px] px-6">
        {/* Hero row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative">
            <div className="overflow-hidden rounded-3xl aspect-[3/2]">
              <Image
                src="https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=621&h=400&fit=crop"
                alt="Niños caminando descalzos"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-2xl bg-brand-100" />
          </div>

          {/* Text */}
          <div>
            <span className="inline-block rounded-full bg-neutral-100 px-4 py-2 text-xs font-medium text-neutral-700">
              ¿Por qué Barefoot?
            </span>
            <h2 className="mt-6 text-4xl font-bold text-neutral-950 leading-tight">
              Calzado que respeta el
              <br />
              movimiento natural
            </h2>
            <p className="mt-4 text-neutral-500 leading-relaxed">
              El calzado barefoot está diseñado para imitar la sensación de
              caminar descalzo, ofreciendo la protección necesaria mientras
              permite que el pie funcione de forma natural.
            </p>

            <div className="mt-8 space-y-4">
              {FEATURES.map((feature) => (
                <div key={feature.title} className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-neutral-100">
                    <feature.icon className="h-6 w-6 text-neutral-700" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-neutral-950">
                      {feature.title}
                    </h3>
                    <p className="mt-0.5 text-sm text-neutral-500">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_BAREFOOT_CARDS.map((card) => {
            const Icon = ICON_MAP[card.icon];
            return (
              <div
                key={card.id}
                className="text-center rounded-2xl border border-neutral-200 p-8 hover:shadow-lg transition-shadow"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-neutral-100">
                  <Icon className="h-8 w-8 text-neutral-700" />
                </div>
                <h3 className="mt-6 text-lg font-semibold text-neutral-950">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm text-neutral-500 leading-relaxed">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-16 rounded-3xl bg-neutral-950 p-12 text-center">
          <h3 className="text-2xl font-bold text-white">
            ¿Tienes dudas sobre el calzado barefoot?
          </h3>
          <p className="mt-3 text-neutral-400">
            Nuestro equipo está aquí para ayudarte a encontrar el calzado
            perfecto para tus hijos.
          </p>
          <div className="mt-8">
            <Button href="/contacto" variant="secondary" size="lg">
              Hablar con un Experto
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
