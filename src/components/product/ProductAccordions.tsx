"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface ProductAccordionsProps {
  description: string;
  materials: string;
  care: string;
}

export default function ProductAccordions({ description, materials, care }: ProductAccordionsProps) {
  const [open, setOpen] = useState<number | null>(0);

  const sections = [
    { title: "Descripción", content: description },
    { title: "Materiales", content: materials },
    { title: "Limpieza y Cuidado", content: care },
  ];

  return (
    <div className="divide-y divide-[#e8e6e3] border-t border-[#e8e6e3]">
      {sections.map((section, i) => (
        <div key={i}>
          <button
            type="button"
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-center justify-between py-5"
          >
            <span className="font-['Inter'] text-[16px] font-medium leading-6 tracking-[-0.31px] text-[#2d2d2d]">
              {section.title}
            </span>
            <ChevronDown
              className={`size-5 text-[#6b6b6b] transition-transform ${open === i ? "rotate-180" : ""}`}
            />
          </button>
          {open === i && (
            <div className="pb-5">
              <p className="font-['Inter'] text-[14px] font-normal leading-[22px] tracking-[-0.15px] text-[#6b6b6b]">
                {section.content}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
