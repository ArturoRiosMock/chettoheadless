import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createOrderFromWebserviceCart } from "@/lib/prestashop-order-server";

const COOKIE = "chetto_ps_cart_id";

export async function POST(req: Request) {
  let body: { cartId?: number } = {};
  try {
    const j = await req.json();
    if (j && typeof j === "object" && "cartId" in j) {
      body = j as { cartId?: number };
    }
  } catch {
    body = {};
  }

  const jar = await cookies();
  const raw = jar.get(COOKIE)?.value;
  const fromCookie = raw ? Number.parseInt(raw, 10) : NaN;
  const fromBody = body.cartId != null ? Number(body.cartId) : NaN;
  const cartId =
    Number.isFinite(fromBody) && fromBody > 0
      ? fromBody
      : Number.isFinite(fromCookie) && fromCookie > 0
        ? fromCookie
        : NaN;

  if (!Number.isFinite(cartId) || cartId < 1) {
    return NextResponse.json(
      { ok: false, error: "No hay carrito: añade productos al carrito o envía { \"cartId\": <número> }" },
      { status: 400 },
    );
  }

  const result = await createOrderFromWebserviceCart(cartId);
  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 502 });
  }

  const res = NextResponse.json({
    ok: true,
    orderId: result.orderId,
    reference: result.reference,
    cartId: result.cartId,
  });
  res.cookies.delete(COOKIE);
  return res;
}
