import type { Metadata } from "next";
import Link from "next/link";
import { prestashop } from "@/lib/prestashop";

export const metadata: Metadata = {
  title: "Materiales - Calzado Barefoot",
  description: "Materiales naturales, sostenibles e hipoalergénicos con la salud de tus hijos y el planeta. Cuero vegetal, algodón orgánico, caucho natural.",
};

const MATERIALS = [
  {
    title: "Cuero natural curtido vegetal",
    description: "Utilizamos exclusivamente cuero curtido con taninos vegetales, sin cromo ni metales pesados. Este proceso insofre el agresivo al medio ambiente y produce un material suave, transpirable y que mejora su textura.",
    features: ["Libre de químicos tóxicos", "Biodegradable", "Se adapta al pie con el uso", "Transpirable naturalmente"],
    imagePosition: "right" as const,
  },
  {
    title: "Forros de algodón orgánico",
    description: "El interior de nuestros zapatos está forrado con algodón 100% orgánico certificado GOTS, que absorbe la humedad y mantiene los pies secos y cómodos durante todo el día.",
    features: ["Certificación orgánica", "Hipoalergénico", "Suave al tacto", "Regulación térmica natural"],
    imagePosition: "left" as const,
  },
  {
    title: "Suelas flexibles de caucho natural",
    description: "Nuestras suelas están fabricadas con caucho natural de alta calidad, formuladas específicamente flexibles para permitir el movimiento natural del pie, manteniendo su propiocepción y tracción e tracción.",
    features: ["Máxima flexibilidad", "Agarre superior", "Material renovable", "Drop cero (0mm)"],
    imagePosition: "right" as const,
  },
  {
    title: "Tratamientos impermeables ecológicos",
    description: "Para nuestros acabados, utilizamos un agua utilizamos tratamientos libres de PFC y fluorocarbonos, protegiendo de la humedad sin comprometer la salud ni el medioambiente.",
    features: ["Sin químicos dañinos", "Repelente al agua", "Mantiene la transpirabilidad", "Ecológico y vegano"],
    imagePosition: "left" as const,
  },
];

const CERTIFICATIONS = [
  { name: "GOTS", desc: "Textiles orgánicos certificados" },
  { name: "OEKO-TEX", desc: "Libres de sustancias nocivas" },
  { name: "LWG", desc: "Cuero de curtidurías certificadas" },
  { name: "Vegan Options", desc: "Alternativas veganas disponibles" },
];

export default async function MaterialesPage() {
  let cms;
  try { cms = await prestashop.getHomepageContent(); } catch { cms = null; }
  const cfg = cms?.config;

  const pageTitle = cfg?.mat_title || "Materiales";
  const pageSubtitle = cfg?.mat_subtitle || "Materiales naturales, sostenibles e hipoalergénicos con la salud de tus hijos y el planeta.";
  const introTitle = cfg?.mat_intro_title || "Calidad y sostenibilidad en cada detalle";
  const introDesc = cfg?.mat_intro_desc || "En Chetto seleccionamos cuidadosamente cada material que utilizamos. Creemos que el calzado infantil debe ser seguro, duradero y respetuoso con el medio ambiente. Por eso trabajamos exclusivamente con materiales naturales y certificados.";
  const commitTitle = cfg?.mat_commit_title || "Nuestro compromiso";
  const commitDesc = cfg?.mat_commit_desc || "Trabajamos constantemente para mejorar la sostenibilidad de nuestros productos. Buscamos nuevas materiales, innovamos en procesos ecológicos y priorizamos la transparencia total. Nos mueve un propósito claro: lo mejor para los más pequeños.";

  return (
    <div className="bg-[#fdfcfb]">
      {/* Header */}
      <div className="mx-auto max-w-[1354px] px-6 pt-12">
        <Link href="/" className="inline-flex items-center gap-1 font-['Inter'] text-[14px] text-[#6b6b6b] hover:text-[#2d2d2d]">
          ← Volver
        </Link>
        <div className="mt-6 flex items-center gap-4">
          <div className="flex size-12 items-center justify-center rounded-full bg-[#f0ede8]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm-1 15v-4H7l5-7v4h4l-5 7Z" fill="#8b7e6a"/></svg>
          </div>
          <div>
            <h1 className="font-['Inter'] text-[36px] font-semibold leading-[44px] tracking-[-0.75px] text-[#2d2d2d]">{pageTitle}</h1>
            <p className="mt-1 max-w-[500px] font-['Inter'] text-[16px] leading-6 tracking-[-0.31px] text-[#6b6b6b]">{pageSubtitle}</p>
          </div>
        </div>
      </div>

      {/* Intro */}
      <section className="mt-16 bg-white py-16">
        <div className="mx-auto max-w-[1354px] px-6 text-center">
          <h2 className="font-['Inter'] text-[30px] font-medium leading-9 tracking-[0.4px] text-[#2d2d2d]">{introTitle}</h2>
          <p className="mx-auto mt-4 max-w-[700px] font-['Inter'] text-[16px] leading-[26px] tracking-[-0.31px] text-[#6b6b6b]">{introDesc}</p>
        </div>
      </section>

      {/* Materials */}
      <section className="py-16">
        <div className="mx-auto max-w-[1354px] px-6 flex flex-col gap-20">
          {MATERIALS.map((mat, i) => (
            <div key={i} className={`grid grid-cols-1 items-center gap-12 lg:grid-cols-2 ${mat.imagePosition === "left" ? "" : "lg:[&>*:first-child]:order-2"}`}>
              <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-[#f0ede8]" />
              <div>
                <h3 className="font-['Inter'] text-[24px] font-medium leading-8 tracking-[0.07px] text-[#2d2d2d]">{mat.title}</h3>
                <p className="mt-3 font-['Inter'] text-[16px] leading-[26px] tracking-[-0.31px] text-[#6b6b6b]">{mat.description}</p>
                <ul className="mt-6 flex flex-col gap-2">
                  {mat.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 font-['Inter'] text-[14px] leading-5 tracking-[-0.15px] text-[#6b6b6b]">
                      <span className="text-[#c4b5a0]">•</span> {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-[1354px] px-6">
          <h2 className="text-center font-['Inter'] text-[30px] font-medium leading-9 tracking-[0.4px] text-[#2d2d2d]">Certificaciones</h2>
          <div className="mt-10 grid grid-cols-2 gap-8 lg:grid-cols-4">
            {CERTIFICATIONS.map((cert, i) => (
              <div key={i} className="flex flex-col items-center gap-3 text-center">
                <div className="flex size-16 items-center justify-center rounded-full bg-[#f0ede8]">
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M14 2l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 3-6Z" fill="#c4b5a0"/></svg>
                </div>
                <h4 className="font-['Inter'] text-[18px] font-medium text-[#2d2d2d]">{cert.name}</h4>
                <p className="font-['Inter'] text-[14px] leading-5 text-[#6b6b6b]">{cert.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commitment */}
      <section className="py-16">
        <div className="mx-auto max-w-[852px] px-6">
          <div className="overflow-hidden rounded-3xl bg-gradient-to-b from-[#c4b5a0] to-[#a89584] px-12 py-12 text-center">
            <h3 className="font-['Inter'] text-[30px] font-medium leading-9 tracking-[0.4px] text-white">{commitTitle}</h3>
            <p className="mx-auto mt-4 max-w-[600px] font-['Inter'] text-[16px] leading-[26px] tracking-[-0.31px] text-white/85">{commitDesc}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
