import type { Metadata } from "next";
import Link from "next/link";
import { prestashop } from "@/lib/prestashop";

export const metadata: Metadata = {
  title: "Guía de Tallas - Calzado Barefoot",
  description:
    "Aprende a medir el pie de tu peque y consulta la tabla de tallas EU, UK y US para calzado barefoot infantil.",
};

const MEASURE_STEPS = [
  {
    title: "Coloca el pie",
    body:
      "Pon el pie descalzo sobre una hoja de papel blanco, apoyado en la pared. El talón debe estar contra la pared.",
  },
  {
    title: "Marca el dedo",
    body:
      "Marca con un lápiz el punto más largo del pie aproximadamente el dedo gordo. Mantén el lápiz perpendicularmente.",
  },
  {
    title: "Mide la distancia",
    body:
      "Mide desde la pared hasta la marca en centímetros, añade 12-15mm para el espacio de crecimiento",
  },
];

const BAREFOOT_TIPS = [
  "Deja entre 12 y 15 mm delante del dedo más largo para crecimiento y para que el pie se mueva sin rozar.",
  "El zapato no debe apretar a los lados: la horma barefoot es ancha y los dedos deben extenderse con libertad.",
  "Comprueba que el talón quede firme y que la suela sea flexible; el pie flexiona naturalmente al caminar.",
  "Mide siempre ambos pies y elige la talla según el pie más largo.",
  "Si dudas entre dos tallas, prefiere algo más holgado al frente siempre que el talón no se levante al andar.",
];

const SIZE_ROWS: { eu: number; uk: string; us: string; cm: string; age: string }[] = [
  { eu: 19, uk: "3", us: "4", cm: "11.5", age: "6-12 meses" },
  { eu: 20, uk: "3.5", us: "4.5", cm: "12.0", age: "9-15 meses" },
  { eu: 21, uk: "4.5", us: "5.5", cm: "12.5", age: "12-18 meses" },
  { eu: 22, uk: "5", us: "6", cm: "13.0", age: "15-21 meses" },
  { eu: 23, uk: "5.5", us: "7", cm: "14.0", age: "18-24 meses" },
  { eu: 24, uk: "7", us: "8", cm: "14.5", age: "2 años" },
  { eu: 25, uk: "7.5", us: "8.5", cm: "15.0", age: "2-3 años" },
  { eu: 26, uk: "8", us: "9", cm: "15.5", age: "2.5 años" },
  { eu: 27, uk: "9", us: "10", cm: "16.0", age: "3 años" },
  { eu: 28, uk: "10", us: "11", cm: "17.0", age: "3.5 años" },
  { eu: 29, uk: "11", us: "12", cm: "17.5", age: "4 años" },
  { eu: 30, uk: "12", us: "13", cm: "18.5", age: "4.5 años" },
  { eu: 31, uk: "12.5", us: "13.5", cm: "19.0", age: "5 años" },
  { eu: 32, uk: "13", us: "1", cm: "19.5", age: "6 años" },
  { eu: 33, uk: "1", us: "2", cm: "20.5", age: "6.5 años" },
  { eu: 34, uk: "2", us: "3", cm: "21.0", age: "7 años" },
  { eu: 35, uk: "2.5", us: "3.5", cm: "21.5", age: "7.5 años" },
  { eu: 36, uk: "3.5", us: "4.5", cm: "22.0", age: "8 años" },
];

export default async function GuiaTallasPage() {
  let cms;
  try {
    cms = await prestashop.getHomepageContent();
  } catch {
    cms = null;
  }
  const cfg = cms?.config;

  const ctaTitle = cfg?.sz_cta_title || "¿Necesitas ayuda con las tallas?";
  const ctaDesc =
    cfg?.sz_cta_desc ||
    "Nuestro equipo te orienta para elegir la talla adecuada según la medida del pie y el modelo.";
  const ctaButtonText = cfg?.sz_cta_button || "Contactar";

  return (
    <div className="bg-[#fdfcfb]">
      <div className="mx-auto max-w-[1354px] px-6 pt-12 pb-16">
        <Link
          href="/"
          className="inline-flex items-center gap-1 font-['Inter'] text-[14px] text-[#6b6b6b] hover:text-[#2d2d2d]"
        >
          ← Volver
        </Link>
        <div className="mt-6 flex items-center gap-4">
          <div className="flex size-12 items-center justify-center rounded-full bg-[#f0ede8]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M4 18h16v2H4v-2Zm2-4h2v3H6v-3Zm4 0h2v3h-2v-3Zm4 0h2v3h-2v-3Zm4 0h2v3h-2v-3ZM5 6h14a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1Zm1 2v3h12V8H6Z"
                fill="#8b7e6a"
              />
            </svg>
          </div>
          <div>
            <h1 className="font-['Inter'] text-[36px] font-semibold leading-[44px] tracking-[-0.75px] text-[#2d2d2d]">
              Guía de Tallas
            </h1>
            <p className="mt-1 max-w-[560px] font-['Inter'] text-[16px] leading-6 tracking-[-0.31px] text-[#6b6b6b]">
              Encuentra la talla perfecta para tu peque. El calzado barefoot debe quedar con espacio para el movimiento
              natural.
            </p>
          </div>
        </div>

        <section className="mt-16">
          <h2 className="font-['Inter'] text-[30px] font-medium leading-9 text-[#2d2d2d]">Cómo medir el pie</h2>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            {MEASURE_STEPS.map((step, i) => (
              <div key={step.title} className="rounded-2xl border border-[#e8e6e3] bg-white p-6">
                <span className="font-['Inter'] text-[14px] font-medium text-[#c4b5a0]">Paso {i + 1}</span>
                <h3 className="mt-2 font-['Inter'] text-[20px] font-medium text-[#2d2d2d]">{step.title}</h3>
                <p className="mt-3 font-['Inter'] text-[14px] leading-[22px] text-[#6b6b6b]">{step.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <div className="rounded-2xl border border-[#e8e6e3] bg-white p-8">
            <h2 className="font-['Inter'] text-[22px] font-medium text-[#2d2d2d]">Importante para calzado barefoot</h2>
            <ul className="mt-6 flex flex-col gap-3">
              {BAREFOOT_TIPS.map((tip) => (
                <li
                  key={tip}
                  className="flex items-start gap-3 font-['Inter'] text-[14px] leading-[22px] text-[#6b6b6b]"
                >
                  <span className="mt-1 shrink-0 text-[#c4b5a0]">•</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-16">
          <h2 className="font-['Inter'] text-[30px] font-medium leading-9 text-[#2d2d2d]">Tabla de tallas</h2>
          <p className="mt-2 font-['Inter'] text-[14px] text-[#6b6b6b]">
            La edad es orientativa; la medida en centímetros es la referencia más fiable.
          </p>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-[#e8e6e3] bg-white">
            <table className="w-full min-w-[640px] border-collapse font-['Inter'] text-left text-[14px]">
              <thead>
                <tr className="border-b border-[#e8e6e3] bg-[#f7f5f2]">
                  <th className="px-4 py-3 font-medium text-[#2d2d2d]">Talla EU</th>
                  <th className="px-4 py-3 font-medium text-[#2d2d2d]">UK</th>
                  <th className="px-4 py-3 font-medium text-[#2d2d2d]">US</th>
                  <th className="px-4 py-3 font-medium text-[#2d2d2d]">Longitud (cm)</th>
                  <th className="px-4 py-3 font-medium text-[#2d2d2d]">Edad aproximada</th>
                </tr>
              </thead>
              <tbody>
                {SIZE_ROWS.map((row) => (
                  <tr key={row.eu} className="border-b border-[#e8e6e3] last:border-0">
                    <td className="px-4 py-3 font-medium text-[#2d2d2d]">{row.eu}</td>
                    <td className="px-4 py-3 text-[#6b6b6b]">{row.uk}</td>
                    <td className="px-4 py-3 text-[#6b6b6b]">{row.us}</td>
                    <td className="px-4 py-3 text-[#6b6b6b]">{row.cm}</td>
                    <td className="px-4 py-3 text-[#6b6b6b]">{row.age}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="mt-16 overflow-hidden rounded-3xl bg-gradient-to-b from-[#c4b5a0] to-[#a89584] px-8 py-12 text-center sm:px-12">
          <h3 className="font-['Inter'] text-[30px] font-medium leading-9 tracking-[0.4px] text-white">{ctaTitle}</h3>
          <p className="mx-auto mt-3 max-w-[500px] font-['Inter'] text-[16px] font-normal leading-6 tracking-[-0.31px] text-white/80">
            {ctaDesc}
          </p>
          <Link
            href="/contacto"
            className="mt-6 inline-flex h-14 items-center justify-center rounded-full bg-white px-8 font-['Inter'] text-[16px] font-medium leading-6 tracking-[-0.31px] text-[#2d2d2d] transition-opacity hover:opacity-90"
          >
            {ctaButtonText}
          </Link>
        </div>
      </div>
    </div>
  );
}
