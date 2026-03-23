import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Chetto - Calzado Barefoot para Niños",
  description:
    "Calzado respetuoso para el desarrollo natural de los pies de tu hijo. Sneakers, botas, sandalias y más.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${inter.variable} font-sans antialiased`}>
        <AnnouncementBar />
        <Header />
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
