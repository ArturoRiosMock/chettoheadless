import { Phone, Mail, MapPin } from "lucide-react";

interface AnnouncementBarProps {
  phone?: string;
  email?: string;
  aboutText?: string;
  aboutUrl?: string;
  storesText?: string;
  storesUrl?: string;
}

export default function AnnouncementBar({
  phone = "+34 660 132 249",
  email = "Tienda@chetto.es",
  aboutText = "Sobre Nosotros",
  aboutUrl = "/sobre-nosotros",
  storesText = "Nuestras tiendas",
  storesUrl = "/tiendas",
}: AnnouncementBarProps) {
  return (
    <div className="bg-[#2d2d2d] text-white">
      <div className="mx-auto max-w-[1354px] px-6 flex items-center justify-between h-10 text-sm">
        <div className="flex items-center gap-6">
          <a
            href={`tel:${phone.replace(/\s/g, "")}`}
            className="flex items-center gap-2 hover:text-neutral-300 transition-colors"
          >
            <Phone className="h-3.5 w-3.5" />
            <span>{phone}</span>
          </a>
          <a
            href={`mailto:${email}`}
            className="flex items-center gap-2 hover:text-neutral-300 transition-colors underline"
          >
            <Mail className="h-3.5 w-3.5" />
            <span>{email}</span>
          </a>
        </div>
        <div className="flex items-center gap-6">
          <a
            href={aboutUrl}
            className="hover:text-neutral-300 transition-colors"
          >
            {aboutText}
          </a>
          <a
            href={storesUrl}
            className="flex items-center gap-2 hover:text-neutral-300 transition-colors"
          >
            <MapPin className="h-3.5 w-3.5" />
            <span>{storesText}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
