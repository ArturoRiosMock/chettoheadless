"use client";

import Link from "next/link";
import { Search, User, Heart, ShoppingBag } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="border-b border-neutral-200 bg-white">
      <div className="mx-auto max-w-[1354px] px-6 flex items-center justify-between h-[96px]">
        <Link href="/" className="shrink-0">
          <span className="text-3xl font-black tracking-tight text-neutral-950">
            CHETTO
          </span>
        </Link>

        <div className="relative mx-8 flex-1 max-w-[672px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
          <input
            type="text"
            placeholder="Buscar zapatos barefoot, botas, sneakers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full border border-neutral-200 bg-neutral-50 py-3 pl-12 pr-4 text-sm text-neutral-950 placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none transition-colors"
          />
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/cuenta"
            className="flex items-center gap-2 text-sm text-neutral-700 hover:text-neutral-950 transition-colors"
          >
            <User className="h-5 w-5" />
            <span className="hidden md:inline">Cuenta</span>
          </Link>
          <Link href="/favoritos" className="relative text-neutral-700 hover:text-neutral-950 transition-colors">
            <Heart className="h-6 w-6" />
            <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-neutral-950 text-[10px] font-medium text-white">
              0
            </span>
          </Link>
          <Link href="/carrito" className="relative text-neutral-700 hover:text-neutral-950 transition-colors">
            <ShoppingBag className="h-6 w-6" />
            <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-neutral-950 text-[10px] font-medium text-white">
              0
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
