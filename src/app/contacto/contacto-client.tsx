"use client";

import Link from "next/link";
import { useState } from "react";

type ContactoClientProps = {
  phone: string;
  email: string;
};

function digitsOnly(s: string) {
  return s.replace(/\D/g, "");
}

export function ContactoClient({ phone, email }: ContactoClientProps) {
  const [sent, setSent] = useState(false);
  const telHref = `tel:+34${digitsOnly(phone).replace(/^34/, "")}`;
  const waHref = `https://wa.me/34${digitsOnly(phone).replace(/^34/, "")}`;

  return (
    <div className="min-h-screen bg-[#fdfcfb] font-['Inter'] pb-20">
      <div className="mx-auto max-w-[1354px] px-6 pt-12">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-[14px] text-[#6b6b6b] hover:text-[#2d2d2d]"
        >
          ← Volver
        </Link>
        <div className="mt-6 flex items-center gap-4">
          <div className="flex size-12 items-center justify-center rounded-full bg-[#f0ede8]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2Z"
                stroke="#8b7e6a"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="m22 6-10 7L2 6"
                stroke="#8b7e6a"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-[36px] font-semibold leading-[44px] tracking-[-0.75px] text-[#2d2d2d]">
              Contacto
            </h1>
            <p className="mt-1 max-w-[640px] text-[16px] leading-6 tracking-[-0.31px] text-[#6b6b6b]">
              ¿Tienes alguna pregunta? Estamos aquí para ayudarte. Contacta con nosotros por tu canal
              preferido.
            </p>
          </div>
        </div>
      </div>

      <section className="mx-auto mt-12 max-w-[1354px] px-6">
        <h2 className="text-[30px] font-medium leading-9 tracking-[0.4px] text-[#2d2d2d]">
          Formas de contacto
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-[#e8e6e3] bg-[#f7f6f4] p-8">
            <div className="flex size-10 items-center justify-center rounded-full bg-white">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z"
                  stroke="#c4b5a0"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className="mt-4 text-[18px] font-medium text-[#2d2d2d]">Teléfono</h3>
            <a href={telHref} className="mt-2 block text-[16px] text-[#c4b5a0] hover:underline">
              {phone}
            </a>
            <p className="mt-2 text-[14px] text-[#6b6b6b]">Lun-Vie 9:00-18:00h</p>
          </div>

          <div className="rounded-2xl border border-[#e8e6e3] bg-[#f7f6f4] p-8">
            <div className="flex size-10 items-center justify-center rounded-full bg-white">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2Z"
                  stroke="#c4b5a0"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="m22 6-10 7L2 6"
                  stroke="#c4b5a0"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className="mt-4 text-[18px] font-medium text-[#2d2d2d]">Email</h3>
            <a href={`mailto:${email}`} className="mt-2 block text-[16px] text-[#c4b5a0] hover:underline">
              {email}
            </a>
            <p className="mt-2 text-[14px] text-[#6b6b6b]">Respuesta en 24h</p>
          </div>

          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl border border-transparent bg-[#25D366] p-8 text-white transition hover:opacity-95"
          >
            <div className="flex size-10 items-center justify-center rounded-full bg-white/20">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.881 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </div>
            <h3 className="mt-4 text-[18px] font-medium text-white">WhatsApp</h3>
            <p className="mt-2 text-[16px] text-white/95">{phone}</p>
            <p className="mt-2 text-[14px] text-white/80">Chat en directo</p>
          </a>
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-[1354px] px-6">
        <h2 className="text-[30px] font-medium leading-9 tracking-[0.4px] text-[#2d2d2d]">
          Envíanos un mensaje
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_340px]">
          <form
            className="space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <div>
              <label htmlFor="contact-name" className="mb-2 block text-[14px] font-medium text-[#2d2d2d]">
                Nombre completo<span className="text-[#c4b5a0]">*</span>
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                required
                autoComplete="name"
                className="h-[52px] w-full rounded-xl border border-[#e8e6e3] bg-white px-4 text-[#2d2d2d] outline-none focus:border-[#c4b5a0]"
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="mb-2 block text-[14px] font-medium text-[#2d2d2d]">
                Email<span className="text-[#c4b5a0]">*</span>
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="h-[52px] w-full rounded-xl border border-[#e8e6e3] bg-white px-4 text-[#2d2d2d] outline-none focus:border-[#c4b5a0]"
              />
            </div>
            <div>
              <label htmlFor="contact-tel" className="mb-2 block text-[14px] font-medium text-[#2d2d2d]">
                Teléfono
              </label>
              <input
                id="contact-tel"
                name="phone"
                type="tel"
                autoComplete="tel"
                className="h-[52px] w-full rounded-xl border border-[#e8e6e3] bg-white px-4 text-[#2d2d2d] outline-none focus:border-[#c4b5a0]"
              />
            </div>
            <div>
              <label htmlFor="contact-subject" className="mb-2 block text-[14px] font-medium text-[#2d2d2d]">
                Asunto<span className="text-[#c4b5a0]">*</span>
              </label>
              <input
                id="contact-subject"
                name="subject"
                type="text"
                required
                className="h-[52px] w-full rounded-xl border border-[#e8e6e3] bg-white px-4 text-[#2d2d2d] outline-none focus:border-[#c4b5a0]"
              />
            </div>
            <div>
              <label htmlFor="contact-message" className="mb-2 block text-[14px] font-medium text-[#2d2d2d]">
                Mensaje<span className="text-[#c4b5a0]">*</span>
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={4}
                className="h-[120px] w-full resize-y rounded-xl border border-[#e8e6e3] bg-white px-4 py-3 text-[#2d2d2d] outline-none focus:border-[#c4b5a0]"
              />
            </div>
            <button
              type="submit"
              className="h-[52px] rounded-xl bg-[#c4b5a0] px-8 font-medium text-white transition hover:opacity-90"
            >
              Enviar mensaje
            </button>
            {sent ? (
              <p className="text-[14px] text-[#6b6b6b]" role="status">
                Gracias. Nos pondremos en contacto contigo pronto.
              </p>
            ) : null}
          </form>

          <aside className="space-y-6">
            <div className="rounded-2xl border border-[#e8e6e3] bg-white p-8">
              <h3 className="text-[18px] font-medium text-[#2d2d2d]">Horario de atención</h3>
              <ul className="mt-4 space-y-3 text-[14px] text-[#6b6b6b]">
                <li className="flex justify-between gap-4">
                  <span>Lunes-Viernes</span>
                  <span className="text-right text-[#2d2d2d]">9:00-18:00h</span>
                </li>
                <li className="flex justify-between gap-4">
                  <span>Sábados</span>
                  <span className="text-right text-[#2d2d2d]">10:00-14:00h</span>
                </li>
                <li className="flex justify-between gap-4">
                  <span>Domingos</span>
                  <span className="text-right text-[#2d2d2d]">Cerrado</span>
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border border-[#e8e6e3] bg-[#f7f6f4] p-8">
              <h3 className="text-[18px] font-medium text-[#2d2d2d]">¿Necesitas ayuda inmediata?</h3>
              <p className="mt-2 text-[14px] leading-[22px] text-[#6b6b6b]">
                Consulta las preguntas frecuentes para resolver dudas al instante.
              </p>
              <Link
                href="/faq"
                className="mt-4 inline-block text-[14px] font-medium text-[#c4b5a0] hover:underline"
              >
                Ir a preguntas frecuentes
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
