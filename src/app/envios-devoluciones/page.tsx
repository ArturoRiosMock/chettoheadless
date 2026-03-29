import type { Metadata } from "next";
import Link from "next/link";
import { prestashop } from "@/lib/prestashop";

export const metadata: Metadata = {
  title: "Envíos y Devoluciones - Calzado Barefoot",
  description: "Información completa sobre nuestras opciones de envío, plazos y costes de entrega. Envío gratis en pedidos superiores a 60€.",
};

const SHIPPING_OPTIONS = [
  { price: "4,95€", name: "Envío Estándar", time: "3-5 días laborables", desc: "Entrega en tu dirección, de lunes a viernes." },
  { price: "9,95€", name: "Envío Express", time: "24-48h", desc: "Envío urgente en 1-2 días laborables." },
  { price: "Gratis", name: "Recogida en tienda", time: "2-3 días laborables", desc: "Recoge en nuestra tienda de las Tablas." },
];

const TARIFFS = [
  { region: "España Peninsular", std: "3-5 días", stdPrice: "4,95€", exp: "24-48h", expPrice: "9,95€" },
  { region: "Islas Baleares", std: "4-7 días", stdPrice: "6,95€", exp: "3-4 días", expPrice: "14,95€" },
  { region: "Islas Canarias", std: "7-10 días", stdPrice: "12,95€", exp: "5-7 días", expPrice: "19,95€" },
  { region: "Ceuta y Melilla", std: "7-10 días", stdPrice: "12,95€", exp: "5-7 días", expPrice: "19,95€" },
];

const STEPS = [
  "Pedido confirmado",
  "Preparando envío",
  "En tránsito",
  "En reparto",
  "Entregado",
];

export default async function EnviosPage() {
  let cms;
  try { cms = await prestashop.getHomepageContent(); } catch { cms = null; }
  const cfg = cms?.config;

  const freeBanner = cfg?.env_free_text || "Envío Gratis en pedidos superiores a 60€";
  const freeSub = cfg?.env_free_sub || "Para España Peninsular, válido para envío estándar";
  const intTitle = cfg?.env_int_title || "¿Envíos internacionales?";
  const intDesc = cfg?.env_int_desc || "Actualmente solo realizamos envíos dentro de España. Estamos trabajando para ofrecer envíos a Europa próximamente. Suscríbete a nuestra newsletter para enterarte cuando esté disponible.";
  const ctaTitle = cfg?.env_cta_title || "¿Necesitas más información?";
  const ctaDesc = cfg?.env_cta_desc || "Nuestro equipo de atención al cliente está disponible para resolver tus dudas";

  return (
    <div className="bg-[#fdfcfb]">
      {/* Header */}
      <div className="mx-auto max-w-[1354px] px-6 pt-12">
        <Link href="/" className="inline-flex items-center gap-1 font-['Inter'] text-[14px] text-[#6b6b6b] hover:text-[#2d2d2d]">← Volver</Link>
        <div className="mt-6 flex items-center gap-4">
          <div className="flex size-12 items-center justify-center rounded-full bg-[#f0ede8]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M16 3H1v13h15V3Z" stroke="#8b7e6a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M16 8h4l3 3v5h-7V8Z" stroke="#8b7e6a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="5.5" cy="18.5" r="2.5" stroke="#8b7e6a" strokeWidth="2"/><circle cx="18.5" cy="18.5" r="2.5" stroke="#8b7e6a" strokeWidth="2"/></svg>
          </div>
          <div>
            <h1 className="font-['Inter'] text-[36px] font-semibold leading-[44px] tracking-[-0.75px] text-[#2d2d2d]">Envíos y Devoluciones</h1>
            <p className="mt-1 max-w-[500px] font-['Inter'] text-[16px] leading-6 tracking-[-0.31px] text-[#6b6b6b]">Información completa sobre nuestras opciones de envío, plazos y costes de entrega.</p>
          </div>
        </div>
      </div>

      {/* Free Shipping Banner */}
      <section className="mt-12">
        <div className="mx-auto max-w-[1354px] px-6">
          <div className="rounded-2xl bg-[#2d2d2d] px-8 py-8 text-center">
            <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-white/10">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2"/><path d="M2 12h20M12 2a15 15 0 0 1 4 10 15 15 0 0 1-4 10 15 15 0 0 1-4-10A15 15 0 0 1 12 2Z" stroke="white" strokeWidth="2"/></svg>
            </div>
            <h2 className="mt-4 font-['Inter'] text-[24px] font-medium leading-8 text-white">{freeBanner}</h2>
            <p className="mt-2 font-['Inter'] text-[14px] leading-5 text-white/60">{freeSub}</p>
          </div>
        </div>
      </section>

      {/* Shipping Options */}
      <section className="mt-16">
        <div className="mx-auto max-w-[1354px] px-6">
          <h2 className="text-center font-['Inter'] text-[30px] font-medium leading-9 tracking-[0.4px] text-[#2d2d2d]">Opciones de envío</h2>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {SHIPPING_OPTIONS.map((opt, i) => (
              <div key={i} className="rounded-2xl border border-[#e8e6e3] bg-white p-8">
                <p className="font-['Inter'] text-[24px] font-semibold text-[#c4b5a0]">{opt.price}</p>
                <h3 className="mt-3 font-['Inter'] text-[18px] font-medium text-[#2d2d2d]">{opt.name}</h3>
                <p className="mt-1 font-['Inter'] text-[14px] text-[#6b6b6b]">{opt.time}</p>
                <p className="mt-3 font-['Inter'] text-[14px] leading-[22px] text-[#6b6b6b]">{opt.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tariffs */}
      <section className="mt-16">
        <div className="mx-auto max-w-[1354px] px-6">
          <h2 className="text-center font-['Inter'] text-[30px] font-medium leading-9 tracking-[0.4px] text-[#2d2d2d]">Tarifas por región</h2>
          <div className="mt-10 overflow-hidden rounded-2xl border border-[#e8e6e3]">
            <table className="w-full">
              <thead className="bg-[#f7f6f4]">
                <tr>
                  <th className="px-6 py-4 text-left font-['Inter'] text-[14px] font-medium text-[#2d2d2d]">Región</th>
                  <th className="px-6 py-4 text-left font-['Inter'] text-[14px] font-medium text-[#2d2d2d]">Envío Estándar</th>
                  <th className="px-6 py-4 text-left font-['Inter'] text-[14px] font-medium text-[#2d2d2d]">Coste Estándar</th>
                  <th className="px-6 py-4 text-left font-['Inter'] text-[14px] font-medium text-[#2d2d2d]">Envío Express</th>
                  <th className="px-6 py-4 text-left font-['Inter'] text-[14px] font-medium text-[#2d2d2d]">Coste Express</th>
                </tr>
              </thead>
              <tbody>
                {TARIFFS.map((t, i) => (
                  <tr key={i} className="border-t border-[#e8e6e3]">
                    <td className="px-6 py-4 font-['Inter'] text-[14px] font-medium text-[#2d2d2d]">{t.region}</td>
                    <td className="px-6 py-4 font-['Inter'] text-[14px] text-[#6b6b6b]">{t.std}</td>
                    <td className="px-6 py-4 font-['Inter'] text-[14px] text-[#6b6b6b]">{t.stdPrice}</td>
                    <td className="px-6 py-4 font-['Inter'] text-[14px] text-[#6b6b6b]">{t.exp}</td>
                    <td className="px-6 py-4 font-['Inter'] text-[14px] text-[#6b6b6b]">{t.expPrice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Tracking */}
      <section className="mt-16 bg-white py-16">
        <div className="mx-auto max-w-[1354px] px-6">
          <h2 className="text-center font-['Inter'] text-[30px] font-medium leading-9 text-[#2d2d2d]">Seguimiento de tu pedido</h2>
          <p className="mx-auto mt-4 max-w-[600px] text-center font-['Inter'] text-[16px] leading-6 text-[#6b6b6b]">
            Una vez procesado tu pedido, recibirás un email con el número de seguimiento. Podrás seguir tu paquete en tiempo real durante todo el proceso.
          </p>
          <div className="mt-12 flex items-center justify-between">
            {STEPS.map((step, i) => (
              <div key={i} className="flex flex-col items-center gap-3">
                <div className="flex size-12 items-center justify-center rounded-full border-2 border-[#c4b5a0] font-['Inter'] text-[16px] font-medium text-[#c4b5a0]">
                  {i + 1}
                </div>
                <span className="font-['Inter'] text-[12px] font-medium text-[#6b6b6b]">{step}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Info Cards */}
      <section className="py-16">
        <div className="mx-auto max-w-[1354px] px-6 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-[#e8e6e3] bg-white p-8">
            <h3 className="font-['Inter'] text-[20px] font-medium text-[#2d2d2d]">Zonas de entrega</h3>
            <ul className="mt-4 flex flex-col gap-2 font-['Inter'] text-[14px] leading-[22px] text-[#6b6b6b]">
              <li>• Realizamos entregas en toda España</li>
              <li>• No entregamos en apartados de correos</li>
              <li>• Se requiere firma al recibir el pedido</li>
              <li>• Horario de entrega: 8:00 - 20:00h</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-[#e8e6e3] bg-white p-8">
            <h3 className="font-['Inter'] text-[20px] font-medium text-[#2d2d2d]">Información adicional</h3>
            <ul className="mt-4 flex flex-col gap-2 font-['Inter'] text-[14px] leading-[22px] text-[#6b6b6b]">
              <li>• Los plazos empiezan desde el envío del pedido</li>
              <li>• Preparación del pedido: 24-48h laborables</li>
              <li>• Los festivos pueden afectar los plazos</li>
              <li>• IVA incluido en todos los precios</li>
            </ul>
          </div>
        </div>
      </section>

      {/* International Banner */}
      <section className="pb-16">
        <div className="mx-auto max-w-[852px] px-6">
          <div className="overflow-hidden rounded-3xl bg-gradient-to-b from-[#c4b5a0] to-[#a89584] px-12 py-12 text-center">
            <h3 className="font-['Inter'] text-[30px] font-medium leading-9 text-white">{intTitle}</h3>
            <p className="mx-auto mt-4 max-w-[500px] font-['Inter'] text-[16px] leading-[26px] text-white/85">{intDesc}</p>
            <Link href="/#newsletter" className="mt-6 inline-flex h-14 items-center rounded-full bg-white px-8 font-['Inter'] text-[16px] font-medium text-[#2d2d2d] hover:opacity-90">
              Suscribirme
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-[1354px] px-6 text-center">
          <h2 className="font-['Inter'] text-[30px] font-medium leading-9 text-[#2d2d2d]">{ctaTitle}</h2>
          <p className="mx-auto mt-3 max-w-[500px] font-['Inter'] text-[16px] leading-6 text-[#6b6b6b]">{ctaDesc}</p>
          <Link href="/contacto" className="mt-6 inline-flex h-14 items-center rounded-full bg-[#c4b5a0] px-8 font-['Inter'] text-[16px] font-medium text-white hover:bg-[#a89584]">
            Contactar soporte
          </Link>
        </div>
      </section>
    </div>
  );
}
