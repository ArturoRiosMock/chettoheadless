import { createHmac } from "node:crypto";

export function signPrestaShopCartId(cartId: number, secret: string): string {
  return createHmac("sha256", secret).update(String(cartId)).digest("hex");
}

/**
 * URL en el dominio PrestaShop que asocia el carrito (webservice) a la cookie del navegador y abre /carrito nativo.
 */
export function buildPrestaShopCartRecoverUrl(cartId: number): string {
  const base = process.env.NEXT_PUBLIC_PRESTASHOP_URL?.trim().replace(/\/$/, "");
  const secret = process.env.PRESTASHOP_CART_SYNC_TOKEN?.trim();
  if (!base || !secret || !Number.isFinite(cartId) || cartId < 1) {
    return "";
  }
  const token = signPrestaShopCartId(cartId, secret);
  const q = new URLSearchParams({
    fc: "module",
    module: "chettoheadless",
    controller: "api",
    action: "recover_cart",
    id_cart: String(cartId),
    token,
  });
  return `${base}/index.php?${q.toString()}`;
}
