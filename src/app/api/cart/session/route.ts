import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { buildPrestaShopCartRecoverUrl } from "@/lib/cart-recover-url";
import { fetchCartRowsFromPs, sumCartRowsQuantities } from "@/lib/prestashop-cart-server";

const COOKIE = "chetto_ps_cart_id";

export async function GET() {
  const jar = await cookies();
  const raw = jar.get(COOKIE)?.value;
  const cartId = raw ? Number.parseInt(raw, 10) : NaN;
  if (!Number.isFinite(cartId) || cartId < 1) {
    return NextResponse.json({
      cartId: null as number | null,
      itemCount: 0,
      recoverUrl: "",
    });
  }

  const rows = await fetchCartRowsFromPs(cartId);
  const itemCount = rows ? sumCartRowsQuantities(rows) : 0;
  const recoverUrl = buildPrestaShopCartRecoverUrl(cartId);

  return NextResponse.json({
    cartId,
    itemCount,
    recoverUrl,
  });
}
