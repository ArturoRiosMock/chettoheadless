"use client";

import { useState } from "react";
import Image from "next/image";
import CmsImage from "@/components/ui/CmsImage";
import type { BarefootFeature } from "@/types";

interface BarefootEducationProps {
  features: BarefootFeature[];
  limitations: string[];
  barefootBenefits: string[];
  badge: string;
  title: string;
  titleHighlight?: string;
  description: string;
  image: string;
  labels: string[];
  tradBadge: string;
  tradTitle: string;
  bfBadge: string;
  bfTitle: string;
}

const LABEL_STYLES = [
  { dot: "bg-[#6b6b6b]", className: "left-4 top-[33%] opacity-30" },
  { dot: "bg-[#8b8b8b]", className: "right-4 top-[47%]" },
  { dot: "bg-[#c4b5a0]", className: "left-1/2 -translate-x-1/2 bottom-4 opacity-30" },
];

export default function BarefootEducation({
  features,
  limitations,
  barefootBenefits,
  badge,
  title,
  titleHighlight = "calzado barefoot",
  description,
  image,
  labels,
  tradBadge,
  tradTitle,
  bfBadge,
  bfTitle,
}: BarefootEducationProps) {
  const [activeFeature, setActiveFeature] = useState(features[0]?.id ?? 1);

  const activeIndex = Math.max(
    0,
    features.findIndex((f) => f.id === activeFeature)
  );

  const titleParts = title.split(titleHighlight);
  const hasHighlight = titleParts.length > 1;

  return (
    <section className="bg-white pt-[80px]">
      <div className="mx-auto max-w-[1354px] px-6">
        {/* Header */}
        <div className="mx-auto text-center">
          <span className="inline-flex items-center rounded-full bg-[#f7f6f4] px-5 py-2 text-sm leading-[20px] tracking-[-0.15px] text-[#6b6b6b]">
            {badge}
          </span>
          <h2 className="mx-auto mt-[16px] text-[48px] font-medium leading-[48px] tracking-[0.35px]">
            {hasHighlight ? (
              <>
                <span className="text-[#2d2d2d]">{titleParts[0]}</span>
                <br />
                <span className="text-[#c4b5a0]">{titleHighlight}</span>
                {titleParts[1] && (
                  <span className="text-[#2d2d2d]">{titleParts[1]}</span>
                )}
              </>
            ) : (
              <span className="text-[#2d2d2d]">{title}</span>
            )}
          </h2>
          <p className="mx-auto mt-[16px] max-w-[629px] text-[18px] font-normal leading-[28px] tracking-[-0.44px] text-[#6b6b6b]">
            {description}
          </p>
        </div>

        {/* Main content: image + accordions */}
        <div className="mt-[64px] grid grid-cols-1 items-start gap-16 lg:grid-cols-2">
          {/* Left: Image card + pagination */}
          <div className="flex flex-col gap-6">
            <div className="relative h-[466px] w-full overflow-hidden rounded-3xl bg-gradient-to-b from-[#f7f6f4] to-[#eae7e1]">
              {/* Decorative blurred circles */}
              <div
                className="pointer-events-none absolute right-4 top-4 size-[139px] rounded-full bg-[rgba(196,181,160,0.2)] opacity-35 blur-[40px]"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute bottom-8 left-4 size-[117px] rounded-full bg-[rgba(232,230,227,0.5)] opacity-35 blur-[40px]"
                aria-hidden
              />

              {/* Shoe image */}
              <div className="absolute inset-8">
                {image ? (
                  <CmsImage
                    src={image}
                    alt="Zapato barefoot vista superior y suela"
                    fill
                    className="object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.15)]"
                    sizes="(max-width: 1024px) 100vw, 557px"
                  />
                ) : (
                  <Image
                    src="/images/barefoot/shoe-top-sole.png"
                    alt="Zapato barefoot vista superior y suela"
                    fill
                    className="object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.15)]"
                    sizes="(max-width: 1024px) 100vw, 557px"
                  />
                )}
              </div>

              {/* Measurement line */}
              <div className="pointer-events-none absolute left-1/2 top-1/2 w-[278px] -translate-x-1/2" aria-hidden>
                <div className="relative h-[2px] bg-[#8b8b8b]">
                  <div className="absolute -left-[6px] -top-[5px] size-3 rounded-full bg-[#8b8b8b]" />
                  <div className="absolute -right-[4px] -top-[3px] size-2 rounded-full bg-[#8b8b8b]" />
                </div>
              </div>

              {/* Floating labels */}
              {labels.slice(0, 3).map((label, i) => {
                const style = LABEL_STYLES[i];
                return (
                  <div
                    key={label}
                    className={`absolute flex h-8 items-center gap-2 rounded-full bg-[rgba(255,255,255,0.9)] px-4 shadow-md ${style.className}`}
                  >
                    <span className={`size-2 shrink-0 rounded-full ${style.dot}`} />
                    <span className="text-xs font-normal text-[#2d2d2d]">{label}</span>
                  </div>
                );
              })}
            </div>

            {/* Pagination dots */}
            <div className="flex items-center justify-center gap-3">
              {features.slice(0, 3).map((f, i) => (
                <button
                  key={f.id}
                  type="button"
                  aria-label={`Ver característica ${i + 1}`}
                  onClick={() => setActiveFeature(f.id)}
                  className={`rounded-full transition-all ${
                    i === activeIndex
                      ? "h-2 w-8 bg-[#c4b5a0]"
                      : "size-2 bg-[#e8e6e3]"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Right: Feature accordions */}
          <div className="flex flex-col gap-6">
            {features.map((feature) => {
              const isActive = activeFeature === feature.id;
              return (
                <button
                  key={feature.id}
                  type="button"
                  onClick={() => setActiveFeature(feature.id)}
                  className={`w-full rounded-2xl border-2 p-6 text-left transition-all ${
                    isActive
                      ? "border-[#c4b5a0] bg-gradient-to-b from-[#f7f6f4] to-white shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1),0px_4px_6px_0px_rgba(0,0,0,0.1)]"
                      : "border-[#e8e6e3] bg-white"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div
                      className={`flex size-14 shrink-0 items-center justify-center rounded-[14px] ${
                        isActive ? "bg-[#c4b5a0]" : "bg-[#f7f6f4]"
                      }`}
                    >
                      <Image
                        src={
                          isActive
                            ? "/images/barefoot/icon-check-active.svg"
                            : "/images/barefoot/icon-check.svg"
                        }
                        alt=""
                        width={28}
                        height={28}
                        aria-hidden
                      />
                    </div>
                    {/* Content */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <h3
                          className={`text-[20px] font-medium leading-[28px] tracking-[-0.45px] ${
                            isActive ? "text-[#2d2d2d]" : "text-[#6b6b6b]"
                          }`}
                        >
                          {feature.title}
                        </h3>
                        <span
                          className={`text-base font-medium tracking-[-0.31px] text-[#c4b5a0] transition-transform ${
                            isActive ? "rotate-90" : ""
                          }`}
                          aria-hidden
                        >
                          →
                        </span>
                      </div>
                      <p className="mt-1 text-sm font-medium leading-[20px] tracking-[-0.15px] text-[#8b8b8b]">
                        {feature.shortDescription}
                      </p>
                      {isActive && feature.longDescription && (
                        <p className="mt-4 border-t border-[#e8e6e3] pt-3 text-sm font-medium leading-[22.75px] tracking-[-0.15px] text-[#6b6b6b]">
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

        {/* Comparison cards */}
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Traditional */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#e8e6e3] to-[#d4d2cf] p-8 pt-16">
            <span className="absolute right-4 top-4 inline-flex items-center rounded-full bg-[#c4b5a0] px-3 py-1 text-xs font-normal text-white">
              {tradBadge}
            </span>
            <h3 className="text-[20px] font-medium leading-[28px] tracking-[-0.45px] text-[#2d2d2d]">
              {tradTitle}
            </h3>
            <ul className="mt-6 flex flex-col gap-3">
              {limitations.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="shrink-0 text-sm tracking-[-0.15px] text-[#8b6f47]" aria-hidden>
                    ✗
                  </span>
                  <span className="text-sm leading-[20px] tracking-[-0.15px] text-[#6b6b6b]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Barefoot */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#c4b5a0] to-[#a89584] p-8 pt-16">
            <span className="absolute right-4 top-4 inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-xs font-normal text-white">
              {bfBadge}
            </span>
            <h3 className="text-[20px] font-medium leading-[28px] tracking-[-0.45px] text-white">
              {bfTitle}
            </h3>
            <ul className="mt-6 flex flex-col gap-3">
              {barefootBenefits.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Image
                    src="/images/barefoot/icon-benefit-check.svg"
                    alt=""
                    width={16}
                    height={16}
                    className="mt-0.5 shrink-0"
                    aria-hidden
                  />
                  <span className="text-sm leading-[20px] tracking-[-0.15px] text-white">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
