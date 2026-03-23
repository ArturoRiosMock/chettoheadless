import CmsImage from "@/components/ui/CmsImage";
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
import type { WhyBarefootCard, ContentBlock } from "@/types";

const ICON_MAP: Record<string, React.ElementType> = {
  Sprout,
  Heart,
  Footprints,
  Shield,
  Waves,
  ArrowDownToLine,
  Maximize,
};

interface WhyBarefootProps {
  cards: WhyBarefootCard[];
  features: ContentBlock[];
  badge: string;
  title: string;
  description: string;
  image: string;
  ctaTitle: string;
  ctaDescription: string;
  ctaText: string;
  ctaLink: string;
}

export default function WhyBarefoot({
  cards,
  features,
  badge,
  title,
  description,
  image,
  ctaTitle,
  ctaDescription,
  ctaText,
  ctaLink,
}: WhyBarefootProps) {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-[1354px] px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="overflow-hidden rounded-3xl aspect-[3/2]">
              {image ? (
                <CmsImage
                  src={image}
                  alt="Niños caminando descalzos"
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="h-full w-full bg-neutral-200" />
              )}
            </div>
            <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-2xl bg-brand-100" />
          </div>

          <div>
            <span className="inline-block rounded-full bg-neutral-100 px-4 py-2 text-xs font-medium text-neutral-700">
              {badge}
            </span>
            <h2 className="mt-6 text-4xl font-bold text-neutral-950 leading-tight">
              {title}
            </h2>
            <p className="mt-4 text-neutral-500 leading-relaxed">
              {description}
            </p>

            <div className="mt-8 space-y-4">
              {features.map((feature) => {
                const Icon = ICON_MAP[feature.icon || "Waves"] || Waves;
                return (
                  <div key={feature.id} className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-neutral-100">
                      <Icon className="h-6 w-6 text-neutral-700" />
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
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => {
            const Icon = ICON_MAP[card.icon] || Heart;
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

        <div className="mt-16 rounded-3xl bg-neutral-950 p-12 text-center">
          <h3 className="text-2xl font-bold text-white">{ctaTitle}</h3>
          <p className="mt-3 text-neutral-400">{ctaDescription}</p>
          <div className="mt-8">
            <Button href={ctaLink} variant="secondary" size="lg">
              {ctaText}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
