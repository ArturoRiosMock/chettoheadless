import type { Metadata } from "next";
import Link from "next/link";
import CmsImage from "@/components/ui/CmsImage";
import { prestashop } from "@/lib/prestashop";
import BarefootFaqAccordion from "@/components/porque-barefoot/FaqAccordion";

export const metadata: Metadata = {
  title: "¿Por qué elegir Barefoot? - Guía Completa",
  description:
    "El calzado barefoot respeta el desarrollo natural del pie infantil. Descubre los beneficios, las 3 características esenciales y respuestas a preguntas frecuentes.",
};

const BENEFITS = [
  {
    title: "Desarrollo Natural",
    description: "Permite que los pies se desarrollen de forma natural, fortaleciendo músculos y ligamentos desde la infancia.",
    icon: "foot",
  },
  {
    title: "Mejor Postura",
    description: "La suela plana (drop cero) favorece una postura correcta y un caminar más natural.",
    icon: "posture",
  },
  {
    title: "Propiocepción",
    description: "Mayor conexión con el suelo mejora el equilibrio y la coordinación motora.",
    icon: "brain",
  },
  {
    title: "Pies Sanos",
    description: "Previene deformaciones y problemas ortopédicos a largo plazo.",
    icon: "heart",
  },
];

const COMPARISON_ROWS = [
  { feature: "Flexibilidad de la suela", desc: "Permite el movimiento natural del pie", barefoot: true, traditional: false },
  { feature: "Drop cero (0mm)", desc: "Misma altura en talón y puntera", barefoot: true, traditional: false },
  { feature: "Horma ancha", desc: "Espacio para los dedos sin compresión", barefoot: true, traditional: false },
  { feature: "Suela fina", desc: "Conexión sensorial con el terreno", barefoot: true, traditional: false },
  { feature: "Ligero", desc: "No limita el movimiento natural", barefoot: true, traditional: false },
];

const ESSENTIALS = [
  {
    badge: "1. Suela Flexible",
    title: "Flexibilidad Total",
    description: "La suela debe poder doblarse completamente, permitiendo que el pie se mueva de forma natural y fortalezca su musculatura.",
    image: "/images/porque-barefoot/suela-flexible.jpg",
  },
  {
    badge: "2. Drop Cero",
    title: "0mm de Elevación",
    description: "La misma altura en talón y puntera favorece una postura natural y una marcha saludable desde la base.",
    image: "/images/porque-barefoot/drop-cero.jpg",
  },
  {
    badge: "3. Horma Amplia",
    title: "Espacio para Crecer",
    description: "Los dedos deben poder expandirse naturalmente. La horma ancha previene deformaciones y permite el desarrollo correcto.",
    image: "/images/porque-barefoot/horma-amplia.jpg",
  },
];

const STAGES = [
  {
    age: "0-2 años",
    title: "Primeros Pasos",
    description: "Lo ideal es caminar descalzo. Si necesitas calzado, elige el más minimalista posible.",
  },
  {
    age: "2-5 años",
    title: "Exploración",
    description: "Época crucial para el desarrollo. El calzado barefoot permite explorar con libertad.",
  },
  {
    age: "5-10 años",
    title: "Consolidación",
    description: "Los pies siguen desarrollándose. Mantener el barefoot fortalece los pies.",
  },
  {
    age: "10+ años",
    title: "Mantenimiento",
    description: "Continuar con barefoot asegura pies fuertes y sanos para toda la vida.",
  },
];

const FAQS = [
  {
    question: "¿Mi hijo puede usar barefoot si siempre ha llevado calzado tradicional?",
    answer: "Sí, la transición es posible y recomendable. Te sugerimos hacerla de forma gradual, aumentando progresivamente las horas de uso del calzado barefoot.",
  },
  {
    question: "¿El calzado barefoot es adecuado para todas las estaciones?",
    answer: "Absolutamente. Existen modelos barefoot para cada estación: sandalias para verano, botas forradas para invierno y sneakers para entretiempo.",
  },
  {
    question: "¿Cómo sé si la talla es correcta?",
    answer: "Mide el pie de tu hijo en centímetros y consulta nuestra guía de tallas. Debe haber entre 0.5 y 1 cm de espacio entre el dedo más largo y la punta del zapato.",
  },
  {
    question: "¿Son más caros que los zapatos normales?",
    answer: "El precio es comparable al de cualquier calzado infantil de calidad. Además, su durabilidad y los beneficios para la salud los convierten en una inversión inteligente.",
  },
  {
    question: "¿Puedo usar barefoot para hacer deporte?",
    answer: "Sí, existen modelos deportivos barefoot diseñados para actividades físicas, con la protección necesaria manteniendo la filosofía minimalista.",
  },
  {
    question: "¿Hay estudios científicos sobre el calzado barefoot?",
    answer: "Sí, múltiples estudios avalan los beneficios del calzado minimalista para el desarrollo podológico infantil. Consulta nuestra sección de recursos para más información.",
  },
];

function BenefitIcon({ type }: { type: string }) {
  const cls = "size-8 text-[#c4b5a0]";
  switch (type) {
    case "foot":
      return (<svg className={cls} viewBox="0 0 32 32" fill="none"><path d="M10 28c-2-1-4-4-4-8 0-6 4-10 4-14S8 2 12 2s6 2 6 6-2 8-2 14c0 4-2 7-4 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><circle cx="20" cy="8" r="2" fill="currentColor"/><circle cx="24" cy="12" r="2" fill="currentColor"/><circle cx="24" cy="18" r="2" fill="currentColor"/></svg>);
    case "posture":
      return (<svg className={cls} viewBox="0 0 32 32" fill="none"><path d="M16 4a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm0 8c-2 0-3 1-3 3v6l-4 7h3l3-5 3 5h3l-4-7v-6c0-2-1-3-3-3Z" fill="currentColor"/></svg>);
    case "brain":
      return (<svg className={cls} viewBox="0 0 32 32" fill="none"><path d="M16 4C10 4 6 8 6 14c0 4 2 7 4 9l1 5h10l1-5c2-2 4-5 4-9 0-6-4-10-10-10Z" stroke="currentColor" strokeWidth="2"/><path d="M12 18h8M14 22h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>);
    case "heart":
      return (<svg className={cls} viewBox="0 0 32 32" fill="none"><path d="M16 28S4 20 4 12a6 6 0 0 1 12-1 6 6 0 0 1 12 1c0 8-12 16-12 16Z" fill="currentColor" opacity=".2"/><path d="M16 28S4 20 4 12a6 6 0 0 1 12-1 6 6 0 0 1 12 1c0 8-12 16-12 16Z" stroke="currentColor" strokeWidth="2"/></svg>);
    default:
      return null;
  }
}

function StageIcon({ index }: { index: number }) {
  const colors = ["#c4b5a0", "#a89584", "#8b7e6a", "#6b6b6b"];
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="14" stroke={colors[index]} strokeWidth="2" />
      <text x="16" y="21" textAnchor="middle" fill={colors[index]} fontSize="14" fontWeight="600" fontFamily="Inter">
        {index + 1}
      </text>
    </svg>
  );
}

export default async function PorqueBarefootPage() {
  let cms;
  try {
    cms = await prestashop.getHomepageContent();
  } catch {
    cms = null;
  }
  const cfg = cms?.config;

  const heroTitle1 = cfg?.bf_hero_title1 || "¿Por qué elegir";
  const heroTitle2 = cfg?.bf_hero_title2 || "Barefoot";
  const heroDesc = cfg?.bf_hero_desc || "El calzado barefoot respeta el desarrollo natural del pie infantil, permitiendo que tus hijos crezcan con pies fuertes, sanos y libres.";
  const heroImage = cfg?.bf_hero_image || "/images/porque-barefoot/hero-kid.jpg";
  const heroStat = cfg?.bf_hero_stat || "95%";
  const heroStatLabel = cfg?.bf_hero_stat_label || "de padres notan mejoras";

  const benefitsTitle = cfg?.bf_benefits_title || "Beneficios del Calzado Barefoot";
  const benefitsSubtitle = cfg?.bf_benefits_subtitle || "Descubre cómo el calzado respetuoso puede transformar la salud y el bienestar de los pies de tus hijos";

  const compTitle = cfg?.bf_comp_title || "Barefoot vs Calzado Tradicional";
  const compSubtitle = cfg?.bf_comp_subtitle || "Comprende las diferencias fundamentales y por qué importa";

  const essentialsTitle = cfg?.bf_essentials_title || "Las 3 Características Esenciales";
  const essentialsSubtitle = cfg?.bf_essentials_subtitle || "Todo calzado barefoot debe cumplir estos requisitos fundamentales";

  const stagesTitle = cfg?.bf_stages_title || "Barefoot en Cada Etapa";
  const stagesSubtitle = cfg?.bf_stages_subtitle || "El desarrollo del pie es continuo durante toda la infancia";

  const faqTitle = cfg?.bf_faq_title || "Preguntas Frecuentes";
  const faqSubtitle = cfg?.bf_faq_subtitle || "Resolvemos tus dudas sobre el calzado barefoot";

  const ctaTitle = cfg?.bf_cta_title || "¿Listo para dar el paso?";
  const ctaDesc = cfg?.bf_cta_desc || "Descubre nuestra colección de calzado barefoot y empieza a cuidar los pies de tus hijos de la mejor forma posible.";

  return (
    <div className="bg-[#fdfcfb]">
      {/* ===== HERO ===== */}
      <section className="bg-gradient-to-b from-[#f7f6f4] to-[#eae7e1]">
        <div className="mx-auto max-w-[1354px] px-6 pb-20 pt-32">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="flex flex-col gap-6">
              <span className="inline-flex w-fit items-center rounded-full bg-white/80 px-4 py-2 font-['Inter'] text-[14px] font-bold leading-5 tracking-[-0.15px] text-[#6b6b6b]">
                Guía Completa
              </span>
              <h1>
                <span className="block font-['Inter'] text-[60px] font-bold leading-[75px] tracking-[0.26px] text-[#2d2d2d]">
                  {heroTitle1}
                </span>
                <span className="font-['Inter'] text-[60px] font-bold leading-[75px] tracking-[0.26px] text-[#c4b5a0]">
                  {heroTitle2}
                </span>
                <span className="font-['Inter'] text-[60px] font-bold leading-[75px] tracking-[0.26px] text-[#2d2d2d]">?</span>
              </h1>
              <p className="max-w-[574px] font-['Inter'] text-[20px] font-bold leading-[32.5px] tracking-[-0.45px] text-[#6b6b6b]">
                {heroDesc}
              </p>
              <div className="flex gap-4 pt-4">
                <Link
                  href="/colecciones"
                  className="inline-flex h-[60px] items-center gap-2 rounded-full bg-[#2d2d2d] px-8 font-['Inter'] text-[16px] font-bold tracking-[-0.31px] text-white transition-colors hover:bg-[#1a1a1a]"
                >
                  Ver Productos
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4.167 10h11.666M10 4.167 15.833 10 10 15.833" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </Link>
                <Link
                  href="#beneficios"
                  className="inline-flex h-[60px] items-center rounded-full border-2 border-[#2d2d2d] px-8 font-['Inter'] text-[16px] font-bold tracking-[-0.31px] text-[#2d2d2d] transition-colors hover:bg-[#2d2d2d] hover:text-white"
                >
                  Saber más
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="relative aspect-square overflow-hidden rounded-3xl shadow-2xl">
                <CmsImage src={heroImage} alt="Niño caminando barefoot" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 629px" priority />
              </div>
              <div className="absolute -bottom-4 right-0 flex flex-col gap-2 rounded-2xl bg-white px-6 pt-6 pb-6 shadow-xl">
                <span className="font-['Inter'] text-[36px] font-bold leading-10 tracking-[0.37px] text-[#c4b5a0]">
                  {heroStat}
                </span>
                <span className="font-['Inter'] text-[14px] font-bold leading-5 tracking-[-0.15px] text-[#6b6b6b]">
                  {heroStatLabel}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== BENEFICIOS ===== */}
      <section id="beneficios" className="py-20">
        <div className="mx-auto max-w-[1354px] px-6">
          <div className="text-center">
            <h2 className="font-['Inter'] text-[36px] font-bold leading-10 tracking-[0.37px] text-[#2d2d2d]">
              {benefitsTitle}
            </h2>
            <p className="mx-auto mt-4 max-w-[672px] font-['Inter'] text-[20px] font-normal leading-7 tracking-[-0.45px] text-[#6b6b6b]">
              {benefitsSubtitle}
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {BENEFITS.map((b, i) => (
              <div key={i} className="flex flex-col gap-6 rounded-2xl bg-white p-8 shadow-sm">
                <div className="flex size-16 items-center justify-center rounded-2xl bg-[#f7f6f4]">
                  <BenefitIcon type={b.icon} />
                </div>
                <h3 className="font-['Inter'] text-[22px] font-bold leading-7 text-[#2d2d2d]">{b.title}</h3>
                <p className="font-['Inter'] text-[16px] font-normal leading-[26px] tracking-[-0.31px] text-[#6b6b6b]">
                  {b.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== COMPARACIÓN ===== */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-[1354px] px-6">
          <div className="text-center">
            <h2 className="font-['Inter'] text-[36px] font-bold leading-10 tracking-[0.37px] text-[#2d2d2d]">
              {compTitle}
            </h2>
            <p className="mx-auto mt-4 max-w-[672px] font-['Inter'] text-[20px] font-normal leading-7 text-[#6b6b6b]">
              {compSubtitle}
            </p>
          </div>

          <div className="mt-12 overflow-hidden rounded-2xl border border-[#e8e6e3]">
            {/* Header */}
            <div className="grid grid-cols-3 bg-[#f7f6f4]">
              <div className="px-6 py-6">
                <span className="font-['Inter'] text-[14px] font-medium leading-5 tracking-[-0.15px] text-[#6b6b6b]">
                  Característica
                </span>
              </div>
              <div className="px-6 py-6 text-center">
                <p className="font-['Inter'] text-[22px] font-bold leading-7 text-[#2d2d2d]">
                  Barefoot <span className="text-[#c4b5a0]">✓</span>
                </p>
                <p className="mt-1 font-['Inter'] text-[12px] font-medium leading-4 text-[#6b6b6b]">Respetuoso</p>
              </div>
              <div className="px-6 py-6 text-center">
                <p className="font-['Inter'] text-[22px] font-bold leading-7 text-[#2d2d2d]">
                  Tradicional <span className="text-[#e89b6b]">✕</span>
                </p>
                <p className="mt-1 font-['Inter'] text-[12px] font-medium leading-4 text-[#6b6b6b]">Restrictivo</p>
              </div>
            </div>
            {/* Rows */}
            {COMPARISON_ROWS.map((row, i) => (
              <div key={i} className="grid grid-cols-3 border-t border-[#e8e6e3]">
                <div className="px-6 py-6">
                  <p className="font-['Inter'] text-[16px] font-medium leading-6 tracking-[-0.31px] text-[#2d2d2d]">
                    {row.feature}
                  </p>
                  <p className="mt-1 font-['Inter'] text-[12px] leading-4 text-[#6b6b6b]">{row.desc}</p>
                </div>
                <div className="flex items-center justify-center px-6 py-6">
                  <div className="flex size-10 items-center justify-center rounded-full bg-[#e8f5e9]">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5" stroke="#4caf50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                </div>
                <div className="flex items-center justify-center px-6 py-6">
                  <div className="flex size-10 items-center justify-center rounded-full bg-[#fce4ec]">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="m18 6-12 12M6 6l12 12" stroke="#e57373" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 3 CARACTERÍSTICAS ESENCIALES ===== */}
      <section className="py-20">
        <div className="mx-auto max-w-[1354px] px-6">
          <div className="text-center">
            <h2 className="font-['Inter'] text-[36px] font-bold leading-10 tracking-[0.37px] text-[#2d2d2d]">
              {essentialsTitle}
            </h2>
            <p className="mx-auto mt-4 max-w-[672px] font-['Inter'] text-[20px] font-normal leading-7 text-[#6b6b6b]">
              {essentialsSubtitle}
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {ESSENTIALS.map((item, i) => (
              <div key={i} className="overflow-hidden rounded-2xl bg-white shadow-sm">
                <div className="relative aspect-square bg-[#f7f6f4] p-8">
                  <CmsImage src={item.image} alt={item.title} fill className="object-contain p-8" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                </div>
                <div className="p-8">
                  <span className="inline-flex rounded-full bg-[#f0ede8] px-3 py-1 font-['Inter'] text-[12px] font-medium text-[#8b7e6a]">
                    {item.badge}
                  </span>
                  <h3 className="mt-4 font-['Inter'] text-[24px] font-bold leading-8 text-[#2d2d2d]">{item.title}</h3>
                  <p className="mt-3 font-['Inter'] text-[16px] font-normal leading-[26px] tracking-[-0.31px] text-[#6b6b6b]">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ETAPAS ===== */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-[1354px] px-6">
          <div className="text-center">
            <h2 className="font-['Inter'] text-[36px] font-bold leading-10 tracking-[0.37px] text-[#2d2d2d]">
              {stagesTitle}
            </h2>
            <p className="mx-auto mt-4 max-w-[672px] font-['Inter'] text-[20px] font-normal leading-7 text-[#6b6b6b]">
              {stagesSubtitle}
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {STAGES.map((stage, i) => (
              <div key={i} className="flex flex-col gap-4 rounded-2xl border border-[#e8e6e3] p-6">
                <StageIcon index={i} />
                <span className="inline-flex w-fit rounded-full bg-[#f0ede8] px-3 py-1 font-['Inter'] text-[12px] font-medium text-[#8b7e6a]">
                  {stage.age}
                </span>
                <h3 className="font-['Inter'] text-[22px] font-bold leading-7 text-[#2d2d2d]">{stage.title}</h3>
                <p className="font-['Inter'] text-[16px] font-normal leading-[26px] tracking-[-0.31px] text-[#6b6b6b]">
                  {stage.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="py-20">
        <div className="mx-auto max-w-[852px] px-6">
          <div className="text-center">
            <h2 className="font-['Inter'] text-[36px] font-bold leading-10 tracking-[0.37px] text-[#2d2d2d]">
              {faqTitle}
            </h2>
            <p className="mt-4 font-['Inter'] text-[20px] font-normal leading-7 text-[#6b6b6b]">
              {faqSubtitle}
            </p>
          </div>
          <div className="mt-12">
            <BarefootFaqAccordion faqs={FAQS} />
          </div>
        </div>
      </section>

      {/* ===== CTA FINAL ===== */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-[1354px] px-6 text-center">
          <h2 className="font-['Inter'] text-[48px] font-bold leading-[60px] tracking-[0.26px] text-[#2d2d2d]">
            {ctaTitle}
          </h2>
          <p className="mx-auto mt-6 max-w-[672px] font-['Inter'] text-[20px] font-normal leading-7 tracking-[-0.45px] text-[#6b6b6b]">
            {ctaDesc}
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Link
              href="/colecciones"
              className="inline-flex h-16 items-center gap-2 rounded-full bg-[#2d2d2d] px-10 font-['Inter'] text-[18px] font-bold text-white transition-colors hover:bg-[#1a1a1a]"
            >
              Ver Toda la Colección
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4.167 10h11.666M10 4.167 15.833 10 10 15.833" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
            <Link
              href="/"
              className="inline-flex h-16 items-center rounded-full border-2 border-[#2d2d2d] px-10 font-['Inter'] text-[18px] font-bold text-[#2d2d2d] transition-colors hover:bg-[#2d2d2d] hover:text-white"
            >
              Volver al Inicio
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
