"use client";

import { useState } from "react";
import CmsImage from "@/components/ui/CmsImage";

interface ShippingIcon {
  label: string;
  icon: string;
}

interface ProductColor {
  name: string;
  hex: string;
  image: string;
}

interface ProductInfoProps {
  name: string;
  price: number;
  newsletterPrice?: number;
  colors: ProductColor[];
  sizes: string[];
  shippingIcons: ShippingIcon[];
}

function ShippingIconSvg({ type }: { type: string }) {
  const cls = "size-5 text-[#6b6b6b]";
  switch (type) {
    case "truck":
      return (<svg className={cls} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.333 2.5H1.667v10.833h11.666V2.5Z" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/><path d="M13.333 6.667h3.334L18.333 10v3.333h-5V6.667Z" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/><circle cx="4.583" cy="15" r="1.667" stroke="currentColor" strokeWidth="1.25"/><circle cx="15.417" cy="15" r="1.667" stroke="currentColor" strokeWidth="1.25"/></svg>);
    case "clock":
      return (<svg className={cls} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.25"/><path d="M10 5.833V10l2.5 2.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/></svg>);
    case "refresh":
      return (<svg className={cls} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M.833 3.333v5h5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/><path d="M19.167 16.667v-5h-5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/><path d="M17.075 7.5a7.5 7.5 0 0 0-12.4-2.792L.833 8.333M19.167 11.667l-3.842 3.625A7.5 7.5 0 0 1 2.925 12.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/></svg>);
    case "shield":
      return (<svg className={cls} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 18.333s6.667-3.333 6.667-8.333V3.333L10 1.667 3.333 3.333V10c0 5 6.667 8.333 6.667 8.333Z" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/></svg>);
    case "card":
      return (<svg className={cls} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="1.667" y="3.333" width="16.667" height="13.333" rx="2" stroke="currentColor" strokeWidth="1.25"/><path d="M1.667 8.333h16.667" stroke="currentColor" strokeWidth="1.25"/></svg>);
    default:
      return null;
  }
}

export default function ProductInfo({ name, price, newsletterPrice, colors, sizes, shippingIcons }: ProductInfoProps) {
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");

  return (
    <div className="flex flex-col gap-6">
      {/* Name & Price */}
      <div>
        <h1 className="font-['Inter'] text-[30px] font-medium leading-9 tracking-[0.4px] text-[#2d2d2d]">
          {name}
        </h1>
        <p className="mt-3 font-['Inter'] text-[24px] font-normal leading-8 tracking-[0.07px] text-[#2d2d2d]">
          {price.toFixed(2).replace(".", ",")} €
        </p>
        {newsletterPrice && (
          <p className="mt-2 font-['Inter'] text-[14px] leading-5 tracking-[-0.15px] text-[#6b6b6b]">
            O {newsletterPrice.toFixed(2).replace(".", ",")} € si te{" "}
            <button type="button" className="font-medium underline">apuntas a la newsletter</button>
          </p>
        )}
      </div>

      {/* Color Selector */}
      <div className="flex flex-col gap-3">
        <p className="font-['Inter'] text-[14px] leading-5 tracking-[-0.15px] text-[#2d2d2d]">
          Color: <span className="text-[#6b6b6b]">{colors[selectedColor]?.name}</span>
        </p>
        <div className="flex flex-wrap gap-2">
          {colors.map((color, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setSelectedColor(i)}
              className={`relative size-14 overflow-hidden rounded-[10px] border-2 p-[2px] ${
                i === selectedColor ? "border-[#2d2d2d]" : "border-[#e8e6e3]"
              }`}
              style={{ backgroundColor: color.hex }}
              aria-label={`Color ${color.name}`}
            >
              <div className="relative size-full opacity-90 overflow-hidden rounded-lg">
                <CmsImage src={color.image} alt={color.name} fill className="object-cover" sizes="56px" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Size Selector */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="font-['Inter'] text-[14px] leading-5 tracking-[-0.15px] text-[#2d2d2d]">Talla</span>
          <button type="button" className="font-['Inter'] text-[12px] font-medium leading-4 text-[#6b6b6b] underline">
            Guía de tallas
          </button>
        </div>
        <select
          value={selectedSize}
          onChange={(e) => setSelectedSize(e.target.value)}
          className="h-[52px] w-full rounded-[10px] border-2 border-[#e8e6e3] bg-white px-4 font-['Inter'] text-[14px] text-[#2d2d2d] outline-none focus:border-[#2d2d2d]"
        >
          <option value="">Seleccionar talla</option>
          {sizes.map((size) => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>
      </div>

      {/* Add to Cart */}
      <div className="flex flex-col gap-3">
        <button
          type="button"
          className="flex h-14 w-full items-center justify-center rounded-full bg-[#2d2d2d] font-['Inter'] text-[16px] font-medium tracking-[-0.31px] text-white transition-colors hover:bg-[#1a1a1a]"
        >
          AÑADIR AL CARRITO
        </button>
        <button
          type="button"
          className="flex h-14 w-full items-center justify-center gap-2 rounded-full bg-black font-['Inter'] text-[16px] font-medium text-white"
        >
          Comprar con Apple Pay
        </button>
      </div>

      {/* Shipping Icons */}
      <div className="flex flex-wrap gap-x-4 gap-y-3 border-t border-[#e8e6e3] pt-6">
        {shippingIcons.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <ShippingIconSvg type={item.icon} />
            <span className="font-['Inter'] text-[12px] leading-4 text-[#6b6b6b]">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
