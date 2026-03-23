"use client";

import { useState } from "react";
import CmsImage from "@/components/ui/CmsImage";
import {
  Waves,
  ArrowDownToLine,
  Maximize,
  ArrowRight,
  Check,
  X,
} from "lucide-react";
import type { BarefootFeature } from "@/types";

const ICON_MAP: Record<string, React.ElementType> = {
  Waves,
  ArrowDownToLine,
  Maximize,
};

interface BarefootEducationProps {
  features: BarefootFeature[];
  limitations: string[];
  barefootBenefits: string[];
  badge: string;
  title: string;
  description: string;
  image: string;
  labels: string[];
  tradBadge: string;
  tradTitle: string;
  bfBadge: string;
  bfTitle: string;
}

export default function BarefootEducation({
  features,
  limitations,
  barefootBenefits,
  badge,
  title,
  description,
  image,
  labels,
  tradBadge,
  tradTitle,
  bfBadge,
  bfTitle,
}: BarefootEducationProps) {
  const [activeFeature, setActiveFeature] = useState(features[0]?.id ?? 1);

  return (
    <section className="py-20 bg-neutral-50">
      <div className="mx-auto max-w-[1354px] px-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-block rounded-full bg-neutral-200 px-4 py-2 text-xs font-medium text-neutral-700">
            {badge}
          </span>
          <h2 className="mt-6 text-4xl font-bold text-neutral-950 leading-tight">
            {title}
          </h2>
          <p className="mt-4 text-neutral-500 leading-relaxed">{description}</p>
        </div>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative bg-white rounded-3xl p-8 shadow-sm">
            <div className="relative aspect-square max-w-md mx-auto">
              {image ? (
                <CmsImage
                  src={image}
                  alt="Zapato barefoot vista detalle"
                  fill
                  className="object-contain"
                />
              ) : (
                <div className="h-full w-full bg-neutral-200 rounded-xl" />
              )}
              {labels[0] && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-neutral-950 text-white px-3 py-1.5 rounded-full text-xs">
                  <span className="h-2 w-2 rounded-full bg-brand-400" />
                  {labels[0]}
                </div>
              )}
              {labels[1] && (
                <div className="absolute top-1/2 right-0 flex items-center gap-2 bg-neutral-950 text-white px-3 py-1.5 rounded-full text-xs">
                  <span className="h-2 w-2 rounded-full bg-brand-400" />
                  {labels[1]}
                </div>
              )}
              {labels[2] && (
                <div className="absolute top-1/3 left-0 flex items-center gap-2 bg-neutral-950 text-white px-3 py-1.5 rounded-full text-xs">
                  <span className="h-2 w-2 rounded-full bg-brand-400" />
                  {labels[2]}
                </div>
              )}
            </div>
            <div className="mt-4 flex items-center justify-center gap-2">
              <span className="h-2 w-2 rounded-full bg-neutral-300" />
              <span className="h-2 w-8 rounded-full bg-neutral-950" />
              <span className="h-2 w-2 rounded-full bg-neutral-300" />
            </div>
          </div>

          <div className="space-y-4">
            {features.map((feature) => {
              const Icon = ICON_MAP[feature.icon] || Waves;
              const isActive = activeFeature === feature.id;
              return (
                <button
                  key={feature.id}
                  type="button"
                  onClick={() => setActiveFeature(feature.id)}
                  className={`w-full text-left rounded-2xl border p-6 transition-all ${
                    isActive
                      ? "border-neutral-950 bg-white shadow-sm"
                      : "border-neutral-200 bg-white hover:border-neutral-300"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${
                        isActive
                          ? "bg-neutral-950 text-white"
                          : "bg-neutral-100 text-neutral-600"
                      }`}
                    >
                      <Icon className="h-7 w-7" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-neutral-950">
                          {feature.title}
                        </h3>
                        <ArrowRight
                          className={`h-5 w-5 text-neutral-400 transition-transform ${
                            isActive ? "rotate-90" : ""
                          }`}
                        />
                      </div>
                      <p className="mt-1 text-sm text-neutral-500">
                        {feature.shortDescription}
                      </p>
                      {isActive && feature.longDescription && (
                        <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
                          {feature.longDescription}
                        </p>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl bg-white border border-neutral-200 p-8">
            <span className="inline-block rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600">
              {tradBadge}
            </span>
            <h3 className="mt-8 text-xl font-semibold text-neutral-950">
              {tradTitle}
            </h3>
            <ul className="mt-6 space-y-4">
              {limitations.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <X className="mt-0.5 h-4 w-4 text-red-500 shrink-0" />
                  <span className="text-sm text-neutral-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl bg-neutral-950 text-white p-8">
            <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white">
              {bfBadge}
            </span>
            <h3 className="mt-8 text-xl font-semibold">{bfTitle}</h3>
            <ul className="mt-6 space-y-4">
              {barefootBenefits.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-4 w-4 text-green-400 shrink-0" />
                  <span className="text-sm text-neutral-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
