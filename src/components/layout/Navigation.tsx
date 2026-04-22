"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/data/mock";
import type { NavItemApi } from "@/types";

interface NavigationProps {
  items?: NavItemApi[];
}

export default function Navigation({ items }: NavigationProps) {
  const pathname = usePathname();
  const nav = items?.length ? items : NAV_ITEMS.map((item, i) => ({ id: i, ...item }));

  return (
    <nav className="h-14 bg-white">
      <div className="mx-auto flex h-14 max-w-[1354px] px-6">
        <ul className="flex h-full w-full items-stretch justify-center gap-8">
          {nav.map((item) => {
            const isActive = pathname === item.href;
            const key = "id" in item && item.id != null ? String(item.id) : item.href;
            return (
              <li key={key} className="flex h-full">
                <Link
                  href={item.href}
                  className="flex h-full min-h-14 flex-col text-sm font-medium tracking-[0.1996px] text-[#2d2d2d]"
                >
                  <span className="flex flex-1 items-center justify-center">
                    {item.label}
                  </span>
                  <span
                    className={`h-[2px] w-full shrink-0 ${
                      isActive ? "bg-[#c4b5a0]" : "bg-transparent"
                    }`}
                    aria-hidden
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
