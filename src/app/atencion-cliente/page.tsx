import type { Metadata } from "next";
import Link from "next/link";
import { prestashop } from "@/lib/prestashop";

export const metadata: Metadata = {
  title: "Atención al Cliente",
};

const HELP_TOPICS = [
  {
    title: "Pedidos y envíos",
    lines: ["Seguimiento, plazos de entrega, costes"],
    href: "/envios-devoluciones",
  },
  {
    title: "Devoluciones y cambios",
    lines: ["Política de devoluciones, cómo devolver"],
    href: "/envios-devoluciones",
  },
  {
    title: "Estado del pedido",
    lines: ["Revisa tu pedido en tiempo real"],
    href: "/pedidos",
  },
  {
    title: "Preguntas frecuentes",
    lines: ["Respuestas a las dudas más comunes"],
    href: "/faq",
  },
];

const QUICK_LINKS = [
  { label: "Guía de tallas", href: "/guia-tallas" },
  { label: "Materiales", href: "/materiales" },
  { label: "Cuidado del calzado", href: "/cuidado-calzado" },
  { label: "Nuestras tiendas", href: "/tiendas" },
  { label: "Mi cuenta", href: "/cuenta" },
  { label: "Contacto", href: "/contacto" },
];

export default async function AtencionClientePage() {
  let cms;
  try {
    cms = await prestashop.getHomepageContent();
  } catch {
    cms = null;
  }
  const cfg = cms?.config;

  const phone = cfg?.cs_phone ?? "660 132 049";
  const email = cfg?.cs_email ?? "tienda@chetto.es";
  const hoursWeekday = cfg?.cs_hours_weekday ?? "Lunes-Viernes 9:00-18:00h";
  const hoursSaturday = cfg?.cs_hours_saturday ?? "Sábados 10:00-14:00h";
  const chatAvailability = cfg?.cs_hours_weekday
    ? `Disponible ${cfg.cs_hours_weekday}`
    : "Disponible Lun-Vie 9-18h";
  const phoneHours = cfg?.cs_hours_weekday
    ? cfg.cs_hours_weekday
    : "Lun-Vie 9:00-18:00h";
  const commitmentDesc =
    cfg?.cs_commitment_desc ??
    "Trabajamos cada día para ofrecerte la mejor experiencia de compra y soporte.";

  const telHref = `tel:${phone.replace(/\s/g, "")}`;

  return (
    <div className="min-h-screen bg-[#fdfcfb] font-['Inter']">
      <div className="mx-auto max-w-[1354px] px-6 pt-12 pb-20">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-[14px] text-[#6b6b6b] hover:text-[#2d2d2d]"
        >
          ← Volver
        </Link>
        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#f0ede8]">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden
            >
              <path
                d="M3 11v2a4 4 0 0 0 4 4h1M21 11v2a4 4 0 0 1-4 4h-1M7 11V9a5 5 0 0 1 10 0v2"
                stroke="#8b7e6a"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <rect
                x="2"
                y="10"
                width="6"
                height="8"
                rx="2"
                stroke="#8b7e6a"
                strokeWidth="2"
              />
              <rect
                x="16"
                y="10"
                width="6"
                height="8"
                rx="2"
                stroke="#8b7e6a"
                strokeWidth="2"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-[36px] font-semibold leading-[44px] tracking-[-0.75px] text-[#2d2d2d]">
              Atención al Cliente
            </h1>
            <p className="mt-1 max-w-[560px] text-[16px] leading-6 tracking-[-0.31px] text-[#6b6b6b]">
              Estamos aquí para ayudarte. Elige cómo quieres contactarnos o
              consulta los recursos rápidos.
            </p>
          </div>
        </div>

        <section className="mt-14">
          <h2 className="text-center text-[30px] font-medium leading-9 tracking-[0.4px] text-[#2d2d2d]">
            ¿Cómo prefieres contactar?
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="flex flex-col rounded-2xl bg-[#f7f6f4] p-8">
              <h3 className="text-[18px] font-medium text-[#2d2d2d]">
                Chat en vivo
              </h3>
              <p className="mt-2 text-[14px] leading-[22px] text-[#6b6b6b]">
                Habla con nuestro equipo ahora
              </p>
              <p className="mt-3 text-[14px] text-[#c4b5a0]">
                {chatAvailability}
              </p>
              <Link
                href="/contacto"
                className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-[#2d2d2d] px-6 text-[15px] font-medium text-white hover:opacity-90"
              >
                Iniciar chat
              </Link>
            </div>
            <div className="flex flex-col rounded-2xl bg-[#f7f6f4] p-8">
              <h3 className="text-[18px] font-medium text-[#2d2d2d]">
                Teléfono
              </h3>
              <p className="mt-2 text-[20px] font-semibold text-[#c4b5a0]">
                {phone}
              </p>
              <p className="mt-2 text-[14px] text-[#6b6b6b]">{phoneHours}</p>
              <a
                href={telHref}
                className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-[#2d2d2d] px-6 text-[15px] font-medium text-white hover:opacity-90"
              >
                Llamar ahora
              </a>
            </div>
            <div className="flex flex-col rounded-2xl bg-[#f7f6f4] p-8">
              <h3 className="text-[18px] font-medium text-[#2d2d2d]">Email</h3>
              <p className="mt-2 text-[16px] font-medium text-[#2d2d2d]">
                {email}
              </p>
              <p className="mt-2 text-[14px] text-[#6b6b6b]">
                Respuesta en 24h
              </p>
              <a
                href={`mailto:${email}`}
                className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-[#2d2d2d] px-6 text-[15px] font-medium text-white hover:opacity-90"
              >
                Enviar email
              </a>
            </div>
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-center text-[30px] font-medium leading-9 tracking-[0.4px] text-[#2d2d2d]">
            ¿En qué podemos ayudarte?
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {HELP_TOPICS.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="rounded-2xl border border-[#e8e6e3] bg-white p-8 transition-colors hover:border-[#c4b5a0]/40"
              >
                <h3 className="text-[18px] font-medium text-[#2d2d2d]">
                  {item.title}
                </h3>
                {item.lines.map((line) => (
                  <p
                    key={line}
                    className="mt-2 text-[14px] leading-[22px] text-[#6b6b6b]"
                  >
                    {line}
                  </p>
                ))}
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-center text-[30px] font-medium leading-9 tracking-[0.4px] text-[#2d2d2d]">
            Horario de atención
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-[#e8e6e3] bg-white p-8">
              <ul className="flex flex-col gap-4 text-[15px] leading-6 text-[#6b6b6b]">
                <li>
                  <span className="font-medium text-[#2d2d2d]">
                    {hoursWeekday}
                  </span>
                </li>
                <li>
                  <span className="font-medium text-[#2d2d2d]">
                    {hoursSaturday}
                  </span>
                </li>
                <li>
                  <span className="font-medium text-[#2d2d2d]">
                    Domingos y festivos
                  </span>
                  <span className="block text-[#6b6b6b]">Cerrado</span>
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border border-[#e8e6e3] bg-[#f7f6f4] p-8">
              <h3 className="text-[18px] font-medium text-[#2d2d2d]">
                Fuera de horario
              </h3>
              <p className="mt-3 text-[14px] leading-[22px] text-[#6b6b6b]">
                Si nos escribes fuera de nuestro horario, te responderemos en
                cuanto volvamos. Mientras tanto, quizá encuentres respuesta en
                nuestras preguntas frecuentes.
              </p>
              <Link
                href="/faq"
                className="mt-6 inline-flex text-[15px] font-medium text-[#c4b5a0] underline-offset-4 hover:underline"
              >
                Ver preguntas frecuentes
              </Link>
            </div>
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-center text-[30px] font-medium leading-9 tracking-[0.4px] text-[#2d2d2d]">
            Enlaces rápidos
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {QUICK_LINKS.map((pill) => (
              <Link
                key={pill.href}
                href={pill.href}
                className="inline-flex rounded-full border border-[#e8e6e3] bg-white px-5 py-2.5 text-[14px] font-medium text-[#2d2d2d] transition-colors hover:border-[#c4b5a0] hover:text-[#c4b5a0]"
              >
                {pill.label}
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-[#c4b5a0] to-[#a89584] px-8 py-12 text-center sm:px-12">
            <h2 className="text-[28px] font-medium leading-9 text-white sm:text-[30px]">
              Nuestro compromiso contigo
            </h2>
            <p className="mx-auto mt-4 max-w-[560px] text-[15px] leading-[24px] text-white/90">
              {commitmentDesc}
            </p>
            <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
              <div>
                <p className="text-[36px] font-semibold text-white">24h</p>
                <p className="mt-1 text-[14px] text-white/80">
                  Tiempo medio de respuesta
                </p>
              </div>
              <div>
                <p className="text-[36px] font-semibold text-white">98%</p>
                <p className="mt-1 text-[14px] text-white/80">
                  Clientes satisfechos
                </p>
              </div>
              <div>
                <p className="text-[36px] font-semibold text-white">5★</p>
                <p className="mt-1 text-[14px] text-white/80">
                  Valoración media
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
