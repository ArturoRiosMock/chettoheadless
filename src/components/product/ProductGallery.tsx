"use client";

import { useState } from "react";
import CmsImage from "@/components/ui/CmsImage";

interface ProductGalleryProps {
  images: string[];
  name: string;
}

export default function ProductGallery({ images, name }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-[#f7f6f4]">
        <CmsImage
          src={images[activeIndex] || images[0]}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 750px"
          priority
        />
      </div>
      {images.length > 1 && (
        <div className="flex gap-3">
          {images.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveIndex(i)}
              className={`relative h-[80px] w-[80px] shrink-0 overflow-hidden rounded-xl border-2 transition-colors ${
                i === activeIndex ? "border-[#2d2d2d]" : "border-[#e8e6e3]"
              }`}
            >
              <CmsImage
                src={img}
                alt={`${name} vista ${i + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
