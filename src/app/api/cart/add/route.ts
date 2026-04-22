import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { buildPrestaShopCartRecoverUrl } from "@/lib/cart-recover-url";
import { addLineToPsCart } from "@/lib/prestashop-cart-server";

const COOKIE = "chetto_ps_cart_id";
const MAX_AGE = 60 * 60 * 24 * 45;

export async function POST(req: Request) {
  let body: { idProduct?: number; idProductAttribute?: number; quantity?: number };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "JSON inválido" }, { status: 400 });
  }

  const idProduct = Number(body.idProduct);
  const idProductAttribute = Number(body.idProductAttribute ?? 0);
  const quantity = Math.min(Math.max(Number(body.quantity ?? 1), 1), 99);

  if (!Number.isFinite(idProduct) || idProduct < 1) {
    return NextResponse.json({ ok: false, error: "idProduct inválido" }, { status: 400 });
  }

  const jar = await cookies();
  const raw = jar.get(COOKIE)?.value;
  const prev = raw ? Number.parseInt(raw, 10) : NaN;
  const cartId = Number.isFinite(prev) && prev > 0 ? prev : undefined;

  const result = await addLineToPsCart(cartId, {
    idProduct,
    idProductAttribute: Number.isFinite(idProductAttribute) && idProductAttribute >= 0 ? idProductAttribute : 0,
    quantity,
  });

  if (result.error || !result.cartId) {
    return NextResponse.json(
      { ok: false, error: result.error || "No se pudo actualizar el carrito" },
      { status: 502 },
    );
  }

  jar.set(COOKIE, String(result.cartId), {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    maxAge: MAX_AGE,
  });

  const recoverUrl = buildPrestaShopCartRecoverUrl(result.cartId);

  return NextResponse.json({
    ok: true,
    cartId: result.cartId,
    recoverUrl,
  });
}
