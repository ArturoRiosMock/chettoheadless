import {
  Truck,
  RotateCcw,
  ShieldCheck,
  CreditCard,
  Heart,
  Star,
  Package,
  Clock,
  Award,
  Zap,
  Gift,
  ThumbsUp,
} from "lucide-react";
import type { Benefit } from "@/types";

const ICON_MAP: Record<string, React.ElementType> = {
  Truck,
  RotateCcw,
  ShieldCheck,
  CreditCard,
  Heart,
  Star,
  Package,
  Clock,
  Award,
  Zap,
  Gift,
  ThumbsUp,
};

interface BenefitsBarProps {
  benefits: Benefit[];
}

export default function BenefitsBar({ benefits }: BenefitsBarProps) {
  return (
    <section className="bg-white py-[33px] md:flex md:h-[114px] md:items-center md:py-0">
      <div className="mx-auto w-full max-w-[1354px] px-6">
        <div className="grid grid-cols-2 gap-x-6 gap-y-6 md:grid-cols-4 md:gap-x-0 md:gap-y-0">
          {benefits.map((benefit) => {
            const Icon = ICON_MAP[benefit.icon] || ShieldCheck;
            return (
              <div
                key={benefit.id}
                className="flex min-h-12 items-center gap-4 md:min-h-12"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center">
                  <Icon className="h-6 w-6 shrink-0" aria-hidden />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-medium leading-[20px] tracking-[0.5px] text-neutral-950">
                    {benefit.title}
                  </h3>
                  <p className="text-xs leading-[16px] text-[#6b6b6b]">
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
