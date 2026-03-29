import type { Metadata } from "next";
import Link from "next/link";
import { prestashop } from "@/lib/prestashop";

export const metadata: Metadata = {
  title: "Nuestras Tiendas",
};

const STORES = [
  {
    name: "Chetto Madrid Centro",
    address: "Calle Gran Vía, 123, 28013 Madrid",
    phone: "+34 910 123 456",
    mapsQuery: "Calle Gran Vía 123, 28013 Madrid",
  },
  {
    name: "Chetto Barcelona",
    address: "Passeig de Gràcia, 89, 08008 Barcelona",
    phone: "+34 930 456 789",
    mapsQuery: "Passeig de Gràcia 89, 08008 Barcelona",
  },
  {
    name: "Chetto Valencia",
    address: "Calle Colón, 45, 46004 Valencia",
    phone: "+34 960 789 012",
    mapsQuery: "Calle Colón 45, 46004 Valencia",
  },
  {
    name: "Chetto Sevilla",
    address: "Avenida de la Constitución, 12, 41001 Sevilla",
    phone: "+34 950 345 678",
    mapsQuery: "Avenida de la Constitución 12, 41001 Sevilla",
  },
];

function MapPinIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-[#c4b5a0]"
      aria-hidden
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0 text-[#6b6b6b]"
      aria-hidden
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

export default async function TiendasPage() {
  let storesTitle = "Mapa de tiendas";
  try {
    const cms = await prestashop.getHomepageContent();
    if (cms?.config?.stores_title) {
      storesTitle = cms.config.stores_title;
    }
  } catch {
    storesTitle = "Mapa de tiendas";
  }

  return (
    <div className="min-h-screen bg-[#fdfcfb] font-['Inter'] text-[#6b6b6b]">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <h1 className="mb-10 text-center font-['Inter'] text-[36px] font-medium text-[#2d2d2d] md:mb-14">
          {storesTitle}
        </h1>
        <div className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-10">
          <div className="relative aspect-[4/3] w-full rounded-2xl bg-[#f0ede8]">
            <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-xl bg-white/95 px-3 py-2 text-sm text-[#2d2d2d] shadow-sm">
              <span className="text-[#c4b5a0]" aria-hidden>
                ●
              </span>
              <span>Tienda Chetto</span>
            </div>
          </div>
          <ul className="flex list-none flex-col gap-4 p-0">
            {STORES.map((store) => (
              <li
                key={store.name}
                className="rounded-2xl border border-[#e8e6e3] p-6"
              >
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#f0ede8]">
                    <MapPinIcon />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-lg font-bold text-[#2d2d2d]">
                      {store.name}
                    </h2>
                    <p className="mt-2 text-[#6b6b6b]">{store.address}</p>
                    <div className="mt-3 flex items-center gap-2">
                      <PhoneIcon />
                      <a
                        href={`tel:${store.phone.replace(/\s/g, "")}`}
                        className="text-[#6b6b6b] underline-offset-2 hover:text-[#c4b5a0] hover:underline"
                      >
                        {store.phone}
                      </a>
                    </div>
                    <Link
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(store.mapsQuery)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center justify-center rounded-xl border border-[#c4b5a0] px-4 py-2 text-sm font-medium text-[#c4b5a0] transition-colors hover:bg-[#f0ede8]"
                    >
                      Cómo llegar
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
