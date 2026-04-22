"use client";

import { useState, useMemo } from "react";
import { ChevronDown, Search } from "lucide-react";
import type { FaqCategoryApi } from "@/types";

function stripHtml(s: string) {
  return s.replace(/<[^>]*>/g, " ");
}

function FaqAnswer({ htmlOrText }: { htmlOrText: string }) {
  const looksLikeHtml = /<\/?[a-z][\s\S]*>/i.test(htmlOrText);
  if (looksLikeHtml) {
    return (
      <div
        className="font-['Inter'] text-[16px] font-normal leading-[26px] tracking-[-0.31px] text-[#2d2d2d]/70 [&_a]:text-[#8b7e6a] [&_a]:underline [&_p+p]:mt-2"
        dangerouslySetInnerHTML={{ __html: htmlOrText }}
      />
    );
  }
  return (
    <p className="font-['Inter'] text-[16px] font-normal leading-[26px] tracking-[-0.31px] text-[#2d2d2d]/70">
      {htmlOrText}
    </p>
  );
}

interface FaqClientProps {
  categories: FaqCategoryApi[];
}

export default function FaqClient({ categories }: FaqClientProps) {
  const [activeTab, setActiveTab] = useState("Todos");
  const [openIndex, setOpenIndex] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const tabs = ["Todos", ...categories.map((c) => c.category)];

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return categories
      .filter((cat) => activeTab === "Todos" || cat.category === activeTab)
      .map((cat) => ({
        ...cat,
        items: q
          ? cat.items.filter((item) => {
              const a = `${item.question} ${stripHtml(item.answer)}`.toLowerCase();
              return a.includes(q);
            })
          : cat.items,
      }))
      .filter((cat) => cat.items.length > 0);
  }, [categories, activeTab, search]);

  return (
    <>
      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => { setActiveTab(tab); setOpenIndex(null); }}
            className={`rounded-full px-5 py-2.5 font-['Inter'] text-[14px] font-medium leading-5 tracking-[-0.15px] transition-colors ${
              activeTab === tab
                ? "bg-[#2d2d2d] text-white"
                : "bg-transparent text-[#6b6b6b] hover:bg-[#f7f6f4]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative mt-8">
        <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-[#6b6b6b]" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar en preguntas frecuentes..."
          className="h-[52px] w-full rounded-2xl border border-[rgba(196,181,160,0.3)] bg-white pl-12 pr-4 font-['Inter'] text-[16px] text-[#2d2d2d] outline-none placeholder:text-[#a0a0a0] focus:border-[#c4b5a0]"
        />
      </div>

      {/* FAQ Sections */}
      <div className="mt-10 flex flex-col gap-12">
        {filtered.map((cat) => (
          <div key={cat.category}>
            <h2 className="font-['Inter'] text-[24px] font-medium leading-8 tracking-[0.07px] text-[#2d2d2d]">
              {cat.category}
            </h2>
            <div className="mt-6 flex flex-col gap-4">
              {cat.items.map((item) => {
                const key =
                  item.id != null
                    ? `faq-${item.id}`
                    : `${cat.category}-${item.question}`;
                const isOpen = openIndex === key;
                return (
                  <div
                    key={key}
                    className="overflow-hidden rounded-2xl border border-[rgba(196,181,160,0.2)]"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : key)}
                      className="flex w-full items-center justify-between px-6 py-5"
                    >
                      <span className="text-left font-['Inter'] text-[18px] font-medium leading-7 tracking-[-0.44px] text-[#2d2d2d]">
                        {item.question}
                      </span>
                      <ChevronDown
                        className={`ml-4 size-5 shrink-0 text-[#6b6b6b] transition-transform ${isOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-6">
                        <FaqAnswer htmlOrText={item.answer} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <p className="py-12 text-center font-['Inter'] text-[18px] text-[#6b6b6b]">
            No se encontraron resultados para &quot;{search}&quot;
          </p>
        )}
      </div>
    </>
  );
}
