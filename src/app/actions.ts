"use server";

import { prestashop } from "@/lib/prestashop";

export async function subscribeNewsletter(email: string) {
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, message: "Email no válido" };
  }

  try {
    return await prestashop.subscribeNewsletter(email);
  } catch {
    return { success: false, message: "Error de conexión con el servidor" };
  }
}
