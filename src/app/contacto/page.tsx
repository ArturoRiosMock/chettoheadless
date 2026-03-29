import type { Metadata } from "next";
import { prestashop } from "@/lib/prestashop";
import { ContactoClient } from "./contacto-client";

export const metadata: Metadata = {
  title: "Contacto",
};

export default async function ContactoPage() {
  let cms = null;
  try {
    cms = await prestashop.getHomepageContent();
  } catch {
    cms = null;
  }
  const cfg = cms?.config;
  const phone = (cfg?.contact_phone?.trim() || "660 132 049").trim();
  const email = (cfg?.contact_email?.trim() || "tienda@chetto.es").trim();

  return <ContactoClient phone={phone} email={email} />;
}
