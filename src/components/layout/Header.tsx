"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, User, Heart, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";

type CartSessionJson = {
  cartId?: number | null;
  itemCount?: number;
  recoverUrl?: string;
};

const DEFAULT_PLACEHOLDER = "Buscar zapatos barefoot, botas, sneakers...";

interface HeaderProps {
  logoUrl?: string;
  searchPlaceholder?: string;
  logoAlt?: string;
}

export default function Header({
  logoUrl,
  searchPlaceholder = DEFAULT_PLACEHOLDER,
  logoAlt = "Chetto - Barefoot Shoes",
}: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItemCount, setCartItemCount] = useState(0);
  const [cartRecoverUrl, setCartRecoverUrl] = useState("");

  useEffect(() => {
    function loadCartSession() {
      void fetch("/api/cart/session", { credentials: "include" })
        .then((r) => r.json())
        .then((j: CartSessionJson) => {
          setCartItemCount(Number(j.itemCount) || 0);
          setCartRecoverUrl(typeof j.recoverUrl === "string" ? j.recoverUrl : "");
        })
        .catch(() => {});
    }
    loadCartSession();
    if (typeof window === "undefined") {
      return;
    }
    window.addEventListener("chetto:cart-updated", loadCartSession);
    return () => window.removeEventListener("chetto:cart-updated", loadCartSession);
  }, []);

  return (
    <header className="border-b border-neutral-200 bg-white shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1)]">
      <div className="mx-auto flex min-h-[113px] max-w-[1354px] flex-wrap items-center justify-between gap-x-4 gap-y-3 px-6 pt-4 pb-[17px] sm:h-[113px] sm:flex-nowrap sm:items-center sm:gap-6 lg:gap-8">
        <Link
          href="/"
          className="order-1 flex shrink-0 justify-center sm:justify-start"
        >
          {logoUrl ? (
            <Image
              src={logoUrl}
              alt={logoAlt}
              width={115}
              height={80}
              className="h-20 w-[115px] object-contain object-left"
              priority
              unoptimized
            />
          ) : (
            <Image
              src="/images/logo-chetto.png"
              alt={logoAlt}
              width={115}
              height={80}
              className="h-20 w-[115px] object-contain object-left"
              priority
            />
          )}
        </Link>

        <div className="relative order-3 w-full min-w-0 basis-full sm:order-2 sm:max-w-[672px] sm:flex-1 sm:basis-auto">
          <Search
            className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400"
            aria-hidden
          />
          <input
            type="search"
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-[46px] w-full rounded-full bg-neutral-50 pl-12 pr-4 text-sm font-normal text-[#0a0a0a] placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-200 focus:ring-offset-0"
          />
        </div>

        <nav
          className="order-2 flex shrink-0 items-center justify-end gap-5 sm:order-3 sm:gap-6"
          aria-label="Cuenta y carrito"
        >
          <Link
            href="/cuenta"
            className="flex items-center gap-2 text-sm font-medium text-[#0a0a0a] transition-opacity hover:opacity-80"
          >
            <User className="h-5 w-5 shrink-0" aria-hidden />
            <span className="whitespace-nowrap">Cuenta</span>
          </Link>
          <Link
            href="/favoritos"
            className="relative text-[#0a0a0a] transition-opacity hover:opacity-80"
            aria-label="Favoritos"
          >
            <Heart className="h-6 w-6" />
            <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-400 px-0.5 text-[10px] font-medium leading-none text-white">
              0
            </span>
          </Link>
          {cartRecoverUrl ? (
            <a
              href={cartRecoverUrl}
              className="relative text-[#0a0a0a] transition-opacity hover:opacity-80"
              aria-label="Carrito"
              rel="noopener noreferrer"
            >
              <ShoppingBag className="h-6 w-6" />
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-400 px-0.5 text-xs font-medium leading-none text-white">
                {cartItemCount}
              </span>
            </a>
          ) : (
            <Link
              href="/carrito"
              className="relative text-[#0a0a0a] transition-opacity hover:opacity-80"
              aria-label="Carrito"
            >
              <ShoppingBag className="h-6 w-6" />
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-400 px-0.5 text-xs font-medium leading-none text-white">
                {cartItemCount}
              </span>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
