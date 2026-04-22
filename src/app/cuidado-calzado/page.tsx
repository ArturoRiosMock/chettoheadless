import type { Metadata } from "next";
import Link from "next/link";
import { prestashop } from "@/lib/prestashop";
import CmsStackedBlocks from "@/components/cms/CmsStackedBlocks";

export const metadata: Metadata = {
  title: "Cuidado del Calzado - Calzado Barefoot",
  description: "Con el cuidado adecuado, tus zapatos barefoot durarán más tiempo y mantendrán todas sus propiedades. Guía completa de limpieza y mantenimiento.",
};

const CLEANING_STEPS = [
  "Retira el polvo y suciedad con un cepillo suave y seco",
  "Utiliza un paño ligeramente húmedo para manchas superficiales",
  "Para cuero, usa productos específicos de limpieza para cuero natural",
  "Nunca uses productos químicos agresivos o lejía",
  "Limpia después de cada uso en condiciones húmedas o embarradas",
];

const DRYING_STEPS = [
  "Seca el calzado a temperatura ambiente, nunca cerca de radiadores",
  "Rellena con papel de periódico para absorber humedad y mantener la forma",
  "Cambia el papel cada 2-3 horas hasta que estén completamente secos",
  "No expongas al sol directo durante largos periodos",
  "Deja secar completamente antes de volver a usar",
];

const RECOMMENDED = [
  "Limpia regularmente con productos naturales",
  "Seca a temperatura ambiente",
  "Usa hormas o papel para mantener la forma",
  "Aplica cera protectora regularmente",
  "Revisa el estado de las suelas periódicamente",
];

const AVOID = [
  "Nunca laves en lavadora",
  "No uses secadoras ni radiadores",
  "Evita productos químicos agresivos",
  "No guardes húmedos o mojados",
  "No expongas a altas temperaturas",
];

export default async function CuidadoCalzadoPage() {
  let cms;
  try {
    cms = await prestashop.getCachedHomepageContent();
  } catch {
    cms = null;
  }
  const cfg = cms?.config;
  const cmsBlocks = cms?.page_blocks?.cuidado ?? [];

  const introTitle = cfg?.care_intro_title || "Cuida tus zapatos, cuidan de tus hijos";
  const introDesc = cfg?.care_intro_desc || "El calzado barefoot está fabricado con materiales naturales de alta calidad que requieren un mantenimiento específico. Siguiendo estos sencillos consejos, prolongarás la vida útil de tus zapatos y mantendrás sus propiedades barefoot intactas.";
  const repairTitle = cfg?.care_repair_title || "Servicio de reparación";
  const repairDesc = cfg?.care_repair_desc || "¿Tus zapatos necesitan una reparación? Ofrecemos servicio de reparación profesional para prolongar la vida útil de tu calzado barefoot.";
  const proTip = cfg?.care_pro_tip || "Si tus hijos usan los zapatos en condiciones húmedas frecuentemente, te recomendamos tener dos pares y alternarlos. Esto permite que cada par se seque completamente entre usos, prolongando significativamente su vida útil y manteniendo la salud de sus pies.";

  return (
    <div className="bg-[#fdfcfb]">
      {/* Header */}
      <div className="mx-auto max-w-[1354px] px-6 pt-12">
        <Link href="/" className="inline-flex items-center gap-1 font-['Inter'] text-[14px] text-[#6b6b6b] hover:text-[#2d2d2d]">← Volver</Link>
        <div className="mt-6 flex items-center gap-4">
          <div className="flex size-12 items-center justify-center rounded-full bg-[#f0ede8]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 3a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm2 12h-4v-1h1v-4h-1v-1h3v5h1v1Z" fill="#8b7e6a"/></svg>
          </div>
          <div>
            <h1 className="font-['Inter'] text-[36px] font-semibold leading-[44px] tracking-[-0.75px] text-[#2d2d2d]">Cuidado del Calzado</h1>
            <p className="mt-1 max-w-[500px] font-['Inter'] text-[16px] leading-6 tracking-[-0.31px] text-[#6b6b6b]">
              Con el cuidado adecuado, tus zapatos barefoot durarán más tiempo y mantendrán todas sus propiedades.
            </p>
          </div>
        </div>
      </div>

      {cmsBlocks.length > 0 ? (
        <section className="mt-10">
          <div className="mx-auto max-w-[1354px] px-6">
            <CmsStackedBlocks blocks={cmsBlocks} />
          </div>
        </section>
      ) : null}

      {/* Intro */}
      <section className="mt-16 bg-white py-16">
        <div className="mx-auto max-w-[1354px] px-6 text-center">
          <h2 className="font-['Inter'] text-[30px] font-medium leading-9 text-[#2d2d2d]">{introTitle}</h2>
          <p className="mx-auto mt-4 max-w-[700px] font-['Inter'] text-[16px] leading-[26px] text-[#6b6b6b]">{introDesc}</p>
        </div>
      </section>

      {/* Step by Step Guide */}
      <section className="py-16">
        <div className="mx-auto max-w-[1354px] px-6">
          <h2 className="text-center font-['Inter'] text-[30px] font-medium leading-9 text-[#2d2d2d]">Guía de cuidado paso a paso</h2>
          <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="rounded-2xl border border-[#e8e6e3] bg-white p-8">
              <h3 className="font-['Inter'] text-[20px] font-medium text-[#2d2d2d]">Limpieza regular</h3>
              <ul className="mt-6 flex flex-col gap-3">
                {CLEANING_STEPS.map((s, i) => (
                  <li key={i} className="flex items-start gap-3 font-['Inter'] text-[14px] leading-[22px] text-[#6b6b6b]">
                    <span className="mt-1 text-[#c4b5a0]">•</span>{s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-[#e8e6e3] bg-white p-8">
              <h3 className="font-['Inter'] text-[20px] font-medium text-[#2d2d2d]">Secado correcto</h3>
              <ul className="mt-6 flex flex-col gap-3">
                {DRYING_STEPS.map((s, i) => (
                  <li key={i} className="flex items-start gap-3 font-['Inter'] text-[14px] leading-[22px] text-[#6b6b6b]">
                    <span className="mt-1 text-[#c4b5a0]">•</span>{s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Maintenance + Storage */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-[1354px] px-6 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-[#e8e6e3] p-8">
            <h3 className="font-['Inter'] text-[20px] font-medium text-[#2d2d2d]">Mantenimiento del cuero</h3>
            <ul className="mt-4 flex flex-col gap-2 font-['Inter'] text-[14px] leading-[22px] text-[#6b6b6b]">
              <li>• Aplica cera o crema nutritiva para cuero cada 2-3 meses</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-[#e8e6e3] p-8">
            <h3 className="font-['Inter'] text-[20px] font-medium text-[#2d2d2d]">Almacenamiento</h3>
            <ul className="mt-4 flex flex-col gap-2 font-['Inter'] text-[14px] leading-[22px] text-[#6b6b6b]">
              <li>• Guarda en un lugar seco y ventilado</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Do & Don't */}
      <section className="py-16">
        <div className="mx-auto max-w-[1354px] px-6">
          <h2 className="text-center font-['Inter'] text-[30px] font-medium leading-9 text-[#2d2d2d]">Qué hacer y qué evitar</h2>
          <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="rounded-2xl border border-[#e8e6e3] bg-white p-8">
              <div className="flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M16.667 5 7.5 14.167 3.333 10" stroke="#4caf50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <h3 className="font-['Inter'] text-[20px] font-medium text-[#2d2d2d]">Recomendado</h3>
              </div>
              <ul className="mt-6 flex flex-col gap-3">
                {RECOMMENDED.map((r, i) => (
                  <li key={i} className="flex items-start gap-3 font-['Inter'] text-[14px] leading-[22px] text-[#6b6b6b]">
                    <span className="text-[#4caf50]">✓</span>{r}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-[#e8e6e3] bg-white p-8">
              <div className="flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="m15 5-10 10M5 5l10 10" stroke="#e57373" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <h3 className="font-['Inter'] text-[20px] font-medium text-[#2d2d2d]">Evitar</h3>
              </div>
              <ul className="mt-6 flex flex-col gap-3">
                {AVOID.map((a, i) => (
                  <li key={i} className="flex items-start gap-3 font-['Inter'] text-[14px] leading-[22px] text-[#6b6b6b]">
                    <span className="text-[#e57373]">✕</span>{a}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Repair Service */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-[852px] px-6 text-center">
          <h2 className="font-['Inter'] text-[30px] font-medium leading-9 text-[#2d2d2d]">{repairTitle}</h2>
          <p className="mx-auto mt-4 max-w-[500px] font-['Inter'] text-[16px] leading-[26px] text-[#6b6b6b]">{repairDesc}</p>
          <Link href="/contacto" className="mt-6 inline-flex h-14 items-center rounded-full bg-[#c4b5a0] px-8 font-['Inter'] text-[16px] font-medium text-white hover:bg-[#a89584]">
            Solicitar reparación
          </Link>
        </div>
      </section>

      {/* Pro Tip */}
      <section className="py-16">
        <div className="mx-auto max-w-[852px] px-6">
          <div className="overflow-hidden rounded-3xl bg-gradient-to-b from-[#c4b5a0] to-[#a89584] px-12 py-12 text-center">
            <h3 className="font-['Inter'] text-[30px] font-medium leading-9 text-white">Consejo profesional</h3>
            <p className="mx-auto mt-4 max-w-[600px] font-['Inter'] text-[16px] leading-[26px] text-white/85">{proTip}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
