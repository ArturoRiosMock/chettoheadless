import type { Metadata } from "next";
import Link from "next/link";
import { prestashop } from "@/lib/prestashop";

export const metadata: Metadata = {
  title: "Sobre Nosotros - Chetto",
};

const VALORES = [
  {
    title: "Pasión",
    desc: "Diseñamos con pasión, creamos con amor",
  },
  {
    title: "Calidad",
    desc: "Selección meticulosa de cueros seleccionados",
  },
  {
    title: "Cercanía",
    desc: "Cada cliente merece atención cercana y personalizada",
  },
  {
    title: "Familia",
    desc: "Pensamos en cada niño, cada pisada como si fueran nuestros",
  },
];

export default async function SobreNosotrosPage() {
  let cms;
  try {
    cms = await prestashop.getHomepageContent();
  } catch {
    cms = null;
  }
  const cfg = cms?.config;

  const ctaTitle =
    cfg?.about_cta_title ??
    "¡Ojalá te enamores de Chetto tanto como lo estamos nosotros!";
  const ctaDesc = cfg?.about_cta_desc;

  return (
    <div className="min-h-screen bg-[#fdfcfb] font-['Inter']">
      <div className="mx-auto max-w-[900px] px-6 pt-10 pb-20">
        <p className="text-[13px] leading-5 text-[#6b6b6b]">
          <Link href="/" className="hover:text-[#2d2d2d]">
            Inicio de Chetto
          </Link>
        </p>

        <header className="mt-10 text-center">
          <span className="inline-block rounded-full border border-[#e8e6e3] bg-white px-4 py-1.5 text-[12px] font-medium tracking-wide text-[#c4b5a0]">
            Nuestra Historia
          </span>
          <h1 className="mt-8 text-[clamp(28px,5vw,44px)] font-semibold leading-[1.15] tracking-[-0.02em]">
            <span className="block text-[#2d2d2d]">Pocos saben quién está</span>
            <span className="mt-1 block italic text-[#c4b5a0]">
              detrás de Chetto
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-[640px] text-[17px] leading-[1.65] text-[#6b6b6b]">
            Somos una pareja que se enamoró de Italia y que siempre ha admirado
            su estilo de vida galán.
          </p>
        </header>

        <section className="mt-16 space-y-6 text-[16px] leading-[1.75] text-[#6b6b6b]">
          <p>
            En 2014, paseando por las calles y escuchando conversaciones,
            descubrimos una palabra que resonó con nosotros:{" "}
            <strong className="font-medium text-[#2d2d2d]">Chetto</strong>. En
            italiano coloquial significa belleza, galán, guapetón: esa mezcla de
            elegancia natural y carácter que queríamos transmitir en cada par
            que diseñamos. Desde entonces, el nombre acompaña cada decisión que
            tomamos.
          </p>
          <p>
            Nos obsesiona ofrecer calzado infantil de calidad: zapatos que
            respeten el pie en crecimiento, con acabados cuidados y un diseño
            que los pequeños quieran llevar cada día. Cada colección nace de
            horas de pruebas, ajustes y conversaciones con familias como la
            tuya.
          </p>
          <p>
            Trabajamos con cuero italiano seleccionado por su tacto, durabilidad
            y nobleza. Creemos que los materiales de primera se notan en cada
            pisada y en cómo envejecen con el tiempo, contando una historia tan
            única como la del niño que los lleva.
          </p>
        </section>

        <section className="mt-20 rounded-2xl border border-[#e8e6e3] bg-white px-8 py-12 text-center">
          <h2 className="text-[28px] font-semibold tracking-tight text-[#2d2d2d]">
            Urban &amp; Chic
          </h2>
          <p className="mx-auto mt-4 max-w-[560px] text-[16px] leading-[1.7] text-[#6b6b6b]">
            Elegantes para el cole, para un cumpleaños o para un domingo en
            familia: nuestros modelos buscan ese equilibrio entre sofisticación y
            comodidad, para que cada ocasión se sienta especial.
          </p>
          <div className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-4">
            <div>
              <p className="text-[32px] font-semibold text-[#c4b5a0]">2</p>
              <p className="mt-1 text-[13px] leading-snug text-[#6b6b6b]">
                Colecciones al año
              </p>
            </div>
            <div>
              <p className="text-[32px] font-semibold text-[#c4b5a0]">100%</p>
              <p className="mt-1 text-[13px] leading-snug text-[#6b6b6b]">
                Cuero natural
              </p>
            </div>
            <div>
              <p className="text-[32px] font-semibold text-[#c4b5a0]">0-99</p>
              <p className="mt-1 text-[13px] leading-snug text-[#6b6b6b]">
                Tallas disponibles
              </p>
            </div>
            <div>
              <p className="text-[32px] font-semibold text-[#c4b5a0]">2014</p>
              <p className="mt-1 text-[13px] leading-snug text-[#6b6b6b]">
                Año de fundación
              </p>
            </div>
          </div>
        </section>

        <section className="mt-20">
          <h2 className="text-center text-[26px] font-semibold text-[#2d2d2d]">
            Nuestros Valores
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {VALORES.map((v) => (
              <div
                key={v.title}
                className="rounded-2xl border border-[#e8e6e3] bg-white p-8"
              >
                <h3 className="text-[18px] font-semibold text-[#c4b5a0]">
                  {v.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-[#6b6b6b]">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        <p className="mx-auto mt-20 max-w-[720px] text-center text-[17px] leading-[1.75] text-[#6b6b6b]">
          Con el paso de los años hemos aprendido que lo que para hacer un buen
          trabajo y rendir un buen resultado es la pasión que le pones al
          realizarlo y el uso de materiales de primera calidad
        </p>

        <blockquote className="mx-auto mt-16 rounded-2xl bg-[#f7f6f4] px-8 py-10 text-center text-[17px] font-normal leading-[1.7] text-[#6b6b6b]">
          En Chetto cada modelo está hecho con muchísimo mimo, nos esforzamos al
          200% desde el boceto hasta que el zapato llega al pie del peque.
        </blockquote>

        <section className="mt-20 text-center">
          <h2 className="text-[24px] font-semibold leading-snug text-[#2d2d2d] sm:text-[26px]">
            {ctaTitle}
          </h2>
          {ctaDesc ? (
            <p className="mx-auto mt-4 max-w-[560px] text-[16px] leading-relaxed text-[#6b6b6b]">
              {ctaDesc}
            </p>
          ) : null}
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/colecciones"
              className="inline-flex h-12 min-w-[220px] items-center justify-center rounded-full bg-[#2d2d2d] px-8 text-[15px] font-medium text-white transition hover:bg-[#1a1a1a]"
            >
              Descubre Nuestra Colección
            </Link>
            <Link
              href="/contacto"
              className="inline-flex h-12 min-w-[220px] items-center justify-center rounded-full border-2 border-[#2d2d2d] px-8 text-[15px] font-medium text-[#2d2d2d] transition hover:bg-[#2d2d2d] hover:text-white"
            >
              Conócenos
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
