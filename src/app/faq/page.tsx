import type { Metadata } from "next";
import Link from "next/link";
import { prestashop } from "@/lib/prestashop";
import FaqClient from "@/components/faq/FaqClient";

export const metadata: Metadata = {
  title: "Preguntas Frecuentes - FAQ",
  description:
    "Resolvemos tus dudas sobre pedidos, envíos, devoluciones, tallas, productos barefoot y pagos en Chetto Kids.",
};

const FAQ_DATA = [
  {
    category: "Pedidos y Envíos",
    items: [
      {
        question: "¿Cuánto tarda en llegar mi pedido?",
        answer: "Los pedidos se envían en 24-48 horas laborables. El tiempo de entrega depende de tu ubicación: España peninsular 1-3 días, Baleares 3-5 días, Canarias 5-7 días.",
      },
      {
        question: "¿Puedo hacer seguimiento de mi pedido?",
        answer: "Sí, una vez enviado tu pedido recibirás un email con el número de seguimiento y un enlace para rastrear tu paquete en tiempo real.",
      },
      {
        question: "¿Cuánto cuesta el envío?",
        answer: "El envío es gratuito para pedidos superiores a 50€ en España peninsular. Para el resto de destinos, consulta nuestra política de envíos.",
      },
      {
        question: "¿Puedo recoger mi pedido en tienda?",
        answer: "Sí, puedes seleccionar la opción de recogida en tienda durante el proceso de compra. Te avisaremos por email cuando tu pedido esté listo.",
      },
    ],
  },
  {
    category: "Devoluciones y Cambios",
    items: [
      {
        question: "¿Cuál es la política de devoluciones?",
        answer: "Dispones de 30 días desde la recepción del pedido para realizar una devolución. El producto debe estar sin usar y en su embalaje original.",
      },
      {
        question: "¿Cuánto tarda el reembolso?",
        answer: "Una vez recibido el producto devuelto, procesamos el reembolso en 3-5 días hábiles. El tiempo hasta que aparezca en tu cuenta depende de tu entidad bancaria.",
      },
      {
        question: "¿Puedo cambiar la talla?",
        answer: "Sí, puedes solicitar un cambio de talla sin coste adicional dentro de los 30 días de devolución. Contacta con nuestro equipo de atención al cliente.",
      },
      {
        question: "¿Quién paga el envío de la devolución?",
        answer: "El cliente asume el coste del envío de devolución, excepto en caso de producto defectuoso o error en el envío, donde nosotros cubrimos todos los gastos.",
      },
    ],
  },
  {
    category: "Productos y Tallas",
    items: [
      {
        question: "¿Cómo sé qué talla necesito?",
        answer: "Mide el pie de tu hijo en centímetros y consulta nuestra guía de tallas. Recomendamos dejar entre 0,5 y 1 cm de margen para un ajuste cómodo.",
      },
      {
        question: '¿Qué significa realmente "barefoot"?',
        answer: "Barefoot significa calzado minimalista que respeta la forma natural del pie: suela flexible, drop cero, horma ancha y materiales ligeros.",
      },
      {
        question: "¿Son impermeables los zapatos?",
        answer: "Algunos modelos cuentan con tratamiento hidrófugo que repele el agua. Consulta la ficha de cada producto para conocer sus características específicas.",
      },
      {
        question: "¿A partir de qué edad son adecuados?",
        answer: "Tenemos modelos desde los primeros pasos (talla 18) hasta tallas para niños mayores. El calzado barefoot es beneficioso desde el inicio de la marcha.",
      },
    ],
  },
  {
    category: "Cuenta y Pagos",
    items: [
      {
        question: "¿Necesito crear una cuenta para comprar?",
        answer: "No es obligatorio, puedes comprar como invitado. Sin embargo, crear una cuenta te permite hacer seguimiento de pedidos y acceder a ofertas exclusivas.",
      },
      {
        question: "¿Qué métodos de pago aceptáis?",
        answer: "Aceptamos tarjeta de crédito/débito (Visa, Mastercard), PayPal, Apple Pay, Google Pay y pago a plazos sin intereses con Klarna.",
      },
      {
        question: "¿Es seguro comprar en vuestra web?",
        answer: "Totalmente. Utilizamos encriptación SSL de 256 bits y cumplimos con los estándares PCI DSS para garantizar la seguridad de tus datos.",
      },
      {
        question: "¿Puedo modificar mi pedido después de realizarlo?",
        answer: "Si tu pedido aún no ha sido enviado, puedes contactarnos para modificarlo. Una vez en camino, no es posible hacer cambios.",
      },
    ],
  },
];

export default async function FaqPage() {
  let cms;
  try {
    cms = await prestashop.getHomepageContent();
  } catch {
    cms = null;
  }
  const cfg = cms?.config;

  const ctaTitle = cfg?.faq_cta_title || "¿No encuentras lo que buscas?";
  const ctaDesc = cfg?.faq_cta_desc || "Nuestro equipo de atención al cliente estará encantado de ayudarte";
  const ctaButtonText = cfg?.faq_cta_button || "Contactar con nosotros";

  return (
    <div className="bg-[#fdfcfb]">
      <div className="mx-auto max-w-[1354px] px-6 pb-16 pt-12">
        <FaqClient categories={FAQ_DATA} />

        {/* CTA Banner */}
        <div className="mt-16 overflow-hidden rounded-3xl bg-gradient-to-b from-[#c4b5a0] to-[#a89584] px-12 py-12 text-center">
          <h3 className="font-['Inter'] text-[30px] font-medium leading-9 tracking-[0.4px] text-white">
            {ctaTitle}
          </h3>
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
