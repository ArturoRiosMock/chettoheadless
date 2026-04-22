"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";
import { useState, useTransition } from "react";
import { subscribeNewsletter } from "@/app/actions";
import { FOOTER_COLUMNS } from "@/data/mock";
import type { FooterColumn } from "@/types";

interface FooterProps {
  newsletterTitle?: string;
  newsletterDescription?: string;
  footerDescription?: string;
  phone?: string;
  email?: string;
  location?: string;
  footerColumns?: FooterColumn[];
  footerLogoUrl?: string;
}

export default function Footer({
  newsletterTitle = "Únete a la familia barefoot",
  newsletterDescription = "Recibe consejos, guías y ofertas exclusivas sobre calzado respetuoso",
  footerDescription = "Calzado respetuoso para el desarrollo natural de los pies de tus hijos. Diseñado con amor y respeto por la naturaleza.",
  phone = "660 132 049",
  email = "tienda@chetto.es",
  location = "Madrid, España",
  footerColumns,
  footerLogoUrl,
}: FooterProps) {
  const columns = footerColumns?.length ? footerColumns : FOOTER_COLUMNS;
  const [emailInput, setEmailInput] = useState("");
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;

    startTransition(async () => {
      const result = await subscribeNewsletter(emailInput);
      setMessage(result.message);
      if (result.success) setEmailInput("");
      setTimeout(() => setMessage(""), 4000);
    });
  };

  return (
    <footer className="bg-[#2d2d2d] text-white">
      {/* Newsletter */}
      <section
        aria-labelledby="footer-newsletter-heading"
        className="border-b border-[rgba(255,255,255,0.1)]"
      >
        <div className="mx-auto flex max-w-[1354px] flex-col items-stretch justify-center gap-8 px-6 py-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:py-16">
          <div className="shrink-0">
            <h2
              id="footer-newsletter-heading"
              className="font-['Inter'] text-[24px] font-medium leading-8 tracking-[0.07px] text-white"
            >
              {newsletterTitle}
            </h2>
            <p className="mt-2 font-['Inter'] text-[16px] font-normal leading-6 tracking-[-0.31px] text-[rgba(255,255,255,0.7)]">
              {newsletterDescription}
            </p>
          </div>
          <form
            className="flex w-full min-w-0 flex-col gap-3 sm:flex-row sm:items-center lg:max-w-[637px] lg:flex-1"
            onSubmit={handleSubmit}
          >
            <input
              type="email"
              name="newsletter-email"
              autoComplete="email"
              placeholder="Tu email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              required
              className="h-[58px] min-w-0 flex-1 rounded-full border border-[rgba(255,255,255,0.2)] bg-[rgba(255,255,255,0.1)] px-6 font-['Inter'] text-[16px] tracking-[-0.31px] text-white placeholder:text-[rgba(255,255,255,0.5)] focus:border-[rgba(255,255,255,0.35)] focus:outline-none focus:ring-1 focus:ring-[rgba(255,255,255,0.2)]"
            />
            <button
              type="submit"
              disabled={isPending}
              className="h-[58px] w-full shrink-0 rounded-full bg-[#c4b5a0] font-['Inter'] text-[16px] font-medium tracking-[-0.31px] text-white transition-opacity hover:opacity-90 disabled:opacity-60 sm:w-[153px]"
            >
              {isPending ? "..." : "Suscribirme"}
            </button>
          </form>
        </div>
        {message && (
          <div className="mx-auto max-w-[1354px] px-6 pb-4">
            <p className="text-sm text-[#c4b5a0]">{message}</p>
          </div>
        )}
      </section>

      {/* Main Footer */}
      <div className="border-b border-[rgba(255,255,255,0.1)] pt-16 pb-16">
        <div className="mx-auto grid max-w-[1354px] grid-cols-1 gap-12 px-6 md:grid-cols-2 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] lg:gap-12">
          {/* Brand Column */}
          <div>
            <Link href="/" className="inline-block">
              {footerLogoUrl ? (
                <Image
                  src={footerLogoUrl}
                  alt="Chetto - Barefoot Shoes"
                  width={95}
                  height={64}
                  className="h-16 w-auto object-contain"
                  unoptimized
                />
              ) : (
                <Image
                  src="/images/logo-chetto-footer.png"
                  alt="Chetto - Barefoot Shoes"
                  width={95}
                  height={64}
                  className="h-16 w-auto object-contain"
                />
              )}
            </Link>
            <p className="mt-6 max-w-[460px] font-['Inter'] text-[16px] font-normal leading-[26px] tracking-[-0.31px] text-[rgba(255,255,255,0.7)]">
              {footerDescription}
            </p>
            <address className="mt-6 flex flex-col gap-3 not-italic">
              <a
                href={`tel:+34${phone.replace(/\s/g, "")}`}
                className="flex items-center gap-3 font-['Inter'] text-[16px] leading-6 tracking-[-0.31px] text-[rgba(255,255,255,0.7)] transition-colors hover:text-white"
              >
                <Phone className="size-5 shrink-0" aria-hidden="true" />
                {phone}
              </a>
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-3 font-['Inter'] text-[16px] leading-6 tracking-[-0.31px] text-[rgba(255,255,255,0.7)] transition-colors hover:text-white"
              >
                <Mail className="size-5 shrink-0" aria-hidden="true" />
                {email}
              </a>
              <p className="flex items-center gap-3 font-['Inter'] text-[16px] leading-6 tracking-[-0.31px] text-[rgba(255,255,255,0.7)]">
                <MapPin className="size-5 shrink-0" aria-hidden="true" />
                {location}
              </p>
            </address>
          </div>

          {/* Link Columns */}
          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h3 className="font-['Inter'] text-[16px] font-medium leading-6 tracking-[-0.31px] text-white">
                {column.title}
              </h3>
              <ul className="mt-6 flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-['Inter'] text-[14px] font-medium leading-5 tracking-[-0.15px] text-[rgba(255,255,255,0.7)] transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mx-auto grid max-w-[1354px] grid-cols-1 items-center gap-4 px-6 py-4 md:grid-cols-3 md:gap-6">
        <p className="text-center font-['Inter'] text-[14px] leading-5 text-[rgba(255,255,255,0.5)] md:text-left">
          © 2026 Chetto Barefoot. Todos los derechos reservados.
        </p>
        <ul
          className="flex items-center justify-center gap-3 md:justify-self-center"
          aria-label="Redes sociales"
        >
          <li>
            <a
              href="https://facebook.com"
              aria-label="Facebook"
              className="flex size-10 items-center justify-center rounded-full bg-[rgba(255,255,255,0.1)] text-[rgba(255,255,255,0.7)] transition-colors hover:text-white"
            >
              <svg className="size-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
          </li>
          <li>
            <a
              href="https://instagram.com"
              aria-label="Instagram"
              className="flex size-10 items-center justify-center rounded-full bg-[rgba(255,255,255,0.1)] text-[rgba(255,255,255,0.7)] transition-colors hover:text-white"
            >
              <svg className="size-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
          </li>
          <li>
            <a
              href={`mailto:${email}`}
              aria-label="Contacto por correo"
              className="flex size-10 items-center justify-center rounded-full bg-[rgba(255,255,255,0.1)] text-[rgba(255,255,255,0.7)] transition-colors hover:text-white"
            >
              <Mail className="size-5" aria-hidden="true" />
            </a>
          </li>
        </ul>
        <nav
          aria-label="Legal"
          className="flex flex-wrap items-center justify-center gap-6 md:justify-end"
        >
          <Link href="/privacidad" className="text-sm text-[rgba(255,255,255,0.5)] transition-colors hover:text-white">
            Privacidad
          </Link>
          <Link href="/terminos" className="text-sm text-[rgba(255,255,255,0.5)] transition-colors hover:text-white">
            Términos
          </Link>
          <Link href="/cookies" className="text-sm text-[rgba(255,255,255,0.5)] transition-colors hover:text-white">
            Cookies
          </Link>
        </nav>
      </div>
    </footer>
  );
}
