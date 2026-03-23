"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Waves,
  ArrowDownToLine,
  Maximize,
  ArrowRight,
  Check,
  X,
} from "lucide-react";
import {
  BAREFOOT_FEATURES,
  LIMITATIONS,
  BAREFOOT_BENEFITS,
} from "@/data/mock";

const ICON_MAP: Record<string, React.ElementType> = {
  Waves,
  ArrowDownToLine,
  Maximize,
};

export default function BarefootEducation() {
  const [activeFeature, setActiveFeature] = useState(1);

  return (
    <section className="py-20 bg-neutral-50">
      <div className="mx-auto max-w-[1354px] px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-block rounded-full bg-neutral-200 px-4 py-2 text-xs font-medium text-neutral-700">
            Aprende sobre Barefoot
          </span>
          <h2 className="mt-6 text-4xl font-bold text-neutral-950 leading-tight">
            Las 3 claves del
            <br />
            <span className="text-brand-600">calzado barefoot</span>
          </h2>
          <p className="mt-4 text-neutral-500 leading-relaxed">
            Descubre qué hace que el calzado barefoot sea diferente y por qué es
            la mejor opción para el desarrollo de tus hijos.
          </p>
        </div>

        {/* Features + Image */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Interactive image */}
          <div className="relative bg-white rounded-3xl p-8 shadow-sm">
            <div className="relative aspect-square max-w-md mx-auto">
              <Image
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop"
                alt="Zapato barefoot vista detalle"
                fill
                className="object-contain"
              />
              {/* Annotation labels */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-neutral-950 text-white px-3 py-1.5 rounded-full text-xs">
                <span className="h-2 w-2 rounded-full bg-brand-400" />
                Flexible
              </div>
              <div className="absolute top-1/2 right-0 flex items-center gap-2 bg-neutral-950 text-white px-3 py-1.5 rounded-full text-xs">
                <span className="h-2 w-2 rounded-full bg-brand-400" />
                0mm Drop
              </div>
              <div className="absolute top-1/3 left-0 flex items-center gap-2 bg-neutral-950 text-white px-3 py-1.5 rounded-full text-xs">
                <span className="h-2 w-2 rounded-full bg-brand-400" />
                Horma Amplia
              </div>
            </div>
            {/* Pagination dots */}
            <div className="mt-4 flex items-center justify-center gap-2">
              <span className="h-2 w-2 rounded-full bg-neutral-300" />
              <span className="h-2 w-8 rounded-full bg-neutral-950" />
              <span className="h-2 w-2 rounded-full bg-neutral-300" />
            </div>
          </div>

          {/* Accordion */}
          <div className="space-y-4">
            {BAREFOOT_FEATURES.map((feature) => {
              const Icon = ICON_MAP[feature.icon];
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

        {/* Comparison */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Limitations */}
          <div className="rounded-2xl bg-white border border-neutral-200 p-8">
            <span className="inline-block rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600">
              Calzado Tradicional
            </span>
            <h3 className="mt-8 text-xl font-semibold text-neutral-950">
              Limitaciones
            </h3>
            <ul className="mt-6 space-y-4">
              {LIMITATIONS.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <X className="mt-0.5 h-4 w-4 text-red-500 shrink-0" />
                  <span className="text-sm text-neutral-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Benefits */}
          <div className="rounded-2xl bg-neutral-950 text-white p-8">
            <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white">
              Calzado Barefoot
            </span>
            <h3 className="mt-8 text-xl font-semibold">Beneficios</h3>
            <ul className="mt-6 space-y-4">
              {BAREFOOT_BENEFITS.map((item) => (
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
