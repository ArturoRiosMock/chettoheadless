"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/data/mock";

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="border-b border-neutral-200 bg-white">
      <div className="mx-auto max-w-[1354px] px-6">
        <ul className="flex items-center justify-center gap-1 h-14">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`relative px-4 py-4 text-sm font-medium transition-colors ${
                    isActive
                      ? "text-neutral-950"
                      : "text-neutral-600 hover:text-neutral-950"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-full bg-neutral-950 rounded-full" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
