"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface Faq {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  faqs: Faq[];
}

export default function BarefootFaqAccordion({ faqs }: FaqAccordionProps) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-4">
      {faqs.map((faq, i) => (
        <div key={i} className="overflow-hidden rounded-2xl border border-[#e8e6e3]">
          <button
            type="button"
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-center justify-between px-6 py-6"
          >
            <span className="text-left font-['Inter'] text-[16px] font-medium leading-6 tracking-[-0.31px] text-[#2d2d2d]">
              {faq.question}
            </span>
            <ChevronDown
              className={`ml-4 size-5 shrink-0 text-[#6b6b6b] transition-transform ${open === i ? "rotate-180" : ""}`}
            />
          </button>
          {open === i && (
            <div className="px-6 pb-6">
              <p className="font-['Inter'] text-[14px] font-normal leading-[22px] tracking-[-0.15px] text-[#6b6b6b]">
                {faq.answer}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
