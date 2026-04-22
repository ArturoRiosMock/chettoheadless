import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { buildPrestaShopCartRecoverUrl } from "@/lib/cart-recover-url";

export const metadata: Metadata = {
  title: "Carrito",
  description: "Tu carrito de compra en Chetto Kids.",
};

const COOKIE = "chetto_ps_cart_id";

export default async function CarritoPage() {
  const jar = await cookies();
  const raw = jar.get(COOKIE)?.value;
  const cartId = raw ? Number.parseInt(raw, 10) : NaN;
  const recoverUrl =
    Number.isFinite(cartId) && cartId >= 1 ? buildPrestaShopCartRecoverUrl(cartId) : "";

  if (recoverUrl) {
    redirect(recoverUrl);
  }

  const psBase = process.env.NEXT_PUBLIC_PRESTASHOP_URL?.trim().replace(/\/$/, "") ?? "";
  const hasCartCookie = Number.isFinite(cartId) && cartId >= 1;
  const psCartHint = psBase ? `${psBase}/carrito` : "";

  return (
    <main className="mx-auto max-w-[1354px] px-6 py-16">
      <h1 className="font-['Inter'] text-2xl font-medium tracking-tight text-[#2d2d2d]">
        Carrito
      </h1>
      {hasCartCookie ? (
        <div className="mt-6 max-w-xl space-y-4 font-['Inter'] text-[15px] leading-6 text-[#4a4a4a]">
          <p>
            Hay un carrito guardado en este navegador, pero falta sincronizarlo con la tienda.
            Añade en <code className="rounded bg-neutral-100 px-1.5 py-0.5 text-sm">.env.local</code> la
            variable{" "}
            <code className="rounded bg-neutral-100 px-1.5 py-0.5 text-sm">
              PRESTASHOP_CART_SYNC_TOKEN
            </code>{" "}
            con el mismo valor que{" "}
            <code className="rounded bg-neutral-100 px-1.5 py-0.5 text-sm">
              CHETTO_HEADLESS_CART_TOKEN
            </code>{" "}
            en PrestaShop, y vuelve a esta página.
          </p>
          {psCartHint ? (
            <p>
              Mientras tanto puedes abrir el{" "}
              <a
                href={psCartHint}
                className="font-medium text-[#2d2d2d] underline underline-offset-2 hover:opacity-90"
                rel="noopener noreferrer"
              >
                carrito en PrestaShop
              </a>{" "}
              (puede aparecer vacío hasta que configures el token).
            </p>
          ) : null}
        </div>
      ) : (
        <p className="mt-4 max-w-xl font-['Inter'] text-[15px] leading-6 text-[#4a4a4a]">
          Tu carrito está vacío. Explora el catálogo y añade productos desde la ficha.
        </p>
      )}
      <p className="mt-8">
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full bg-[#2d2d2d] px-6 py-3 font-['Inter'] text-sm font-medium text-white transition-colors hover:bg-[#1a1a1a]"
        >
          Seguir comprando
        </Link>
      </p>
    </main>
  );
}
