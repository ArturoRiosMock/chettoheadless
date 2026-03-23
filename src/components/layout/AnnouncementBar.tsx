import { Phone, Mail, MapPin } from "lucide-react";

export default function AnnouncementBar() {
  return (
    <div className="bg-neutral-950 text-white">
      <div className="mx-auto max-w-[1354px] px-6 flex items-center justify-between h-10 text-xs">
        <div className="flex items-center gap-6">
          <a
            href="tel:+34660132249"
            className="flex items-center gap-2 hover:text-neutral-300 transition-colors"
          >
            <Phone className="h-3.5 w-3.5" />
            <span>+34 660 132 249</span>
          </a>
          <a
            href="mailto:Tienda@chetto.es"
            className="flex items-center gap-2 hover:text-neutral-300 transition-colors"
          >
            <Mail className="h-3.5 w-3.5" />
            <span>Tienda@chetto.es</span>
          </a>
        </div>
        <div className="flex items-center gap-6">
          <a
            href="/sobre-nosotros"
            className="hover:text-neutral-300 transition-colors"
          >
            Sobre Nosotros
          </a>
          <a
            href="/tiendas"
            className="flex items-center gap-2 hover:text-neutral-300 transition-colors"
          >
            <MapPin className="h-3.5 w-3.5" />
            <span>Nuestras tiendas</span>
          </a>
        </div>
      </div>
    </div>
  );
}
