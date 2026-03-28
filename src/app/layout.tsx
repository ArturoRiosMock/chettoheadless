import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { prestashop } from "@/lib/prestashop";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: "Chetto - Calzado Barefoot para Niños | Sneakers, Botas y Sandalias",
    template: "%s | Chetto Barefoot",
  },
  description:
    "Calzado barefoot respetuoso para el desarrollo natural de los pies de tu hijo. Sneakers, botas, sandalias y más. Envío gratis en pedidos +50€.",
  keywords: [
    "calzado barefoot",
    "zapatos barefoot niños",
    "calzado respetuoso",
    "sneakers barefoot",
    "botas barefoot",
    "sandalias barefoot",
    "calzado infantil",
    "chetto",
  ],
  authors: [{ name: "Chetto Barefoot Shoes" }],
  creator: "Chetto",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://chetto.es"),
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: "Chetto - Barefoot Shoes",
    title: "Chetto - Calzado Barefoot para Niños",
    description:
      "Calzado barefoot respetuoso para el desarrollo natural de los pies de tu hijo.",
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chetto - Calzado Barefoot para Niños",
    description:
      "Calzado barefoot respetuoso para el desarrollo natural de los pies de tu hijo.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let cfg;
  try {
    cfg = await prestashop.getSiteConfig();
  } catch {
    cfg = null;
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Chetto - Barefoot Shoes",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://chetto.es",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${process.env.NEXT_PUBLIC_SITE_URL || "https://chetto.es"}/buscar?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="es">
      <body className={`${inter.variable} font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <AnnouncementBar
          phone={cfg?.announce_phone}
          email={cfg?.announce_email}
          aboutText={cfg?.announce_about_text}
          aboutUrl={cfg?.announce_about_url}
          storesText={cfg?.announce_stores_text}
          storesUrl={cfg?.announce_stores_url}
        />
        <Header />
        <Navigation />
        <main>{children}</main>
        <Footer
          newsletterTitle={cfg?.newsletter_title || undefined}
          newsletterDescription={cfg?.newsletter_description || undefined}
          footerDescription={cfg?.footer_description || undefined}
          phone={cfg?.footer_phone || undefined}
          email={cfg?.footer_email || undefined}
          location={cfg?.footer_location || undefined}
        />
      </body>
    </html>
  );
}
