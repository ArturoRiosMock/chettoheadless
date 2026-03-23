import { Truck, RotateCcw, ShieldCheck, CreditCard } from "lucide-react";
import { BENEFITS } from "@/data/mock";

const ICON_MAP: Record<string, React.ElementType> = {
  Truck,
  RotateCcw,
  ShieldCheck,
  CreditCard,
};

export default function BenefitsBar() {
  return (
    <section className="border-b border-neutral-200 bg-neutral-50">
      <div className="mx-auto max-w-[1354px] px-6 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {BENEFITS.map((benefit) => {
            const Icon = ICON_MAP[benefit.icon];
            return (
              <div key={benefit.id} className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-neutral-950 text-white">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-neutral-950">
                    {benefit.title}
                  </h3>
                  <p className="text-xs text-neutral-500">
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
