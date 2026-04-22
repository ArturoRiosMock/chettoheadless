/**
 * Crear pedidos en PrestaShop vía Webservice (servidor Next.js).
 * Requiere: PRESTASHOP_API_KEY, NEXT_PUBLIC_PRESTASHOP_URL.
 * Para el total TTC (validateOrder): PRESTASHOP_DOCKER_CONTAINER (por defecto chetto-prestashop) y Docker CLI.
 */

import { execFile } from "node:child_process";
import { promisify } from "node:util";
import bcrypt from "bcryptjs";
import { buildCartXml, fetchCartRowsFromPs, type PsCartRow } from "@/lib/prestashop-cart-server";

const execFileAsync = promisify(execFile);

function normalizeList<T>(raw: T | T[] | undefined | null): T[] {
  if (raw == null) {
    return [];
  }
  return Array.isArray(raw) ? raw : [raw];
}

function psErrorMessage(data: unknown): string {
  const o = data as { errors?: { message?: string }[] };
  const msg = o.errors?.[0]?.message;
  return typeof msg === "string" ? msg : "Error del webservice PrestaShop";
}

function buildEntityXml(singular: string, fields: Record<string, string | number>): string {
  const lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<prestashop xmlns:xlink="http://www.w3.org/1999/xlink">',
    `<${singular}>`,
  ];
  for (const [k, v] of Object.entries(fields)) {
    lines.push(`<${k}><![CDATA[${v}]]></${k}>`);
  }
  lines.push(`</${singular}>`, "</prestashop>");
  return `${lines.join("\n")}\n`;
}

async function getCartTotalTtc(cartId: number): Promise<string | null> {
  const container = process.env.PRESTASHOP_DOCKER_CONTAINER?.trim() || "chetto-prestashop";
  try {
    const { stdout } = await execFileAsync(
      "docker",
      ["exec", container, "php", "/var/www/html/scripts/cart_order_total.php", String(cartId)],
      { timeout: 120_000, windowsHide: true },
    );
    const t = (stdout || "").trim();
    return t || null;
  } catch {
    return null;
  }
}

async function fetchDefaultOrderStateId(base: string, auth: string): Promise<number> {
  const envId = Number.parseInt(process.env.PRESTASHOP_ORDER_STATE_ID || "", 10);
  if (Number.isFinite(envId) && envId > 0) {
    return envId;
  }
  const r = await fetch(`${base}/api/order_states?display=full&sort=[id_ASC]&output_format=JSON`, {
    headers: { Authorization: auth },
    cache: "no-store",
  });
  if (!r.ok) {
    return 1;
  }
  let data: unknown;
  try {
    data = await r.json();
  } catch {
    return 1;
  }
  const root = data as { order_states?: Record<string, unknown> | Record<string, unknown>[] };
  const list = normalizeList(root.order_states as Record<string, unknown>[] | undefined);
  const awaiting = list.find(
    (s) =>
      String(s?.paid || "") === "0" &&
      (String(s?.shipped || "") === "0" || s?.shipped == null),
  );
  if (awaiting?.id != null) {
    return Number(awaiting.id);
  }
  const first = list[0];
  return first?.id != null ? Number(first.id) : 1;
}

export type CreateOrderResult =
  | { ok: true; orderId: number; reference: string; cartId: number }
  | { ok: false; error: string };

/**
 * Cierra un carrito existente creando cliente invitado, dirección (ES), y POST /orders.
 */
export async function createOrderFromWebserviceCart(cartId: number): Promise<CreateOrderResult> {
  const base = process.env.NEXT_PUBLIC_PRESTASHOP_URL?.trim().replace(/\/$/, "");
  const key = process.env.PRESTASHOP_API_KEY?.trim();
  if (!base || !key) {
    return { ok: false, error: "Falta PRESTASHOP_API_KEY o NEXT_PUBLIC_PRESTASHOP_URL" };
  }
  if (!Number.isFinite(cartId) || cartId < 1) {
    return { ok: false, error: "cartId inválido" };
  }

  const auth = `Basic ${Buffer.from(`${key}:`).toString("base64")}`;
  const langId = Number.parseInt(process.env.NEXT_PUBLIC_PRESTASHOP_LANG_ID || "1", 10) || 1;

  const cartRes = await fetch(`${base}/api/carts/${cartId}?display=full&output_format=JSON`, {
    headers: { Authorization: auth },
    cache: "no-store",
  });
  let cartData: unknown;
  try {
    cartData = await cartRes.json();
  } catch {
    cartData = null;
  }
  if (!cartRes.ok) {
    return { ok: false, error: psErrorMessage(cartData) || `Carrito ${cartId} no encontrado` };
  }

  const root = cartData as Record<string, unknown>;
  const cart = (root.cart ?? (Array.isArray(root.carts) ? root.carts[0] : null)) as
    | Record<string, unknown>
    | undefined
    | null;
  if (!cart || Number(cart.id) !== cartId) {
    return { ok: false, error: "Respuesta de carrito inválida" };
  }

  const rows = await fetchCartRowsFromPs(cartId);
  if (!rows?.length) {
    return { ok: false, error: "El carrito no tiene líneas" };
  }

  let idCustomer = Number(cart.id_customer ?? 0);
  let idAddrDel = Number(cart.id_address_delivery ?? 0);
  let idAddrInv = Number(cart.id_address_invoice ?? 0);
  const idCurrency = Number(cart.id_currency ?? 1);
  const idLang = Number(cart.id_lang ?? langId);
  const idCarrier = Number(cart.id_carrier ?? 1);

  if (!idCustomer || idCustomer < 1) {
    const email = `local-${Date.now()}@pedido.local`;
    const plainPass = `Ws${Math.random().toString(36).slice(2, 10)}!`;
    const passwd = bcrypt.hashSync(plainPass, 10);

    const custXml = buildEntityXml("customer", {
      email,
      passwd,
      firstname: "Local",
      lastname: "Webservice",
      active: 1,
      id_lang: idLang,
      id_default_group: 3,
      newsletter: 0,
      optin: 0,
    });

    const postCust = await fetch(`${base}/api/customers?output_format=JSON`, {
      method: "POST",
      headers: { Authorization: auth, "Content-Type": "application/xml" },
      body: custXml,
      cache: "no-store",
    });
    let custJson: unknown;
    try {
      custJson = await postCust.json();
    } catch {
      custJson = null;
    }
    if (!postCust.ok) {
      return { ok: false, error: `POST customer: ${psErrorMessage(custJson)}` };
    }
    const cj = custJson as { customer?: { id?: string | number } };
    const newCustId = cj.customer?.id != null ? Number(cj.customer.id) : NaN;
    if (!Number.isFinite(newCustId) || newCustId < 1) {
      return { ok: false, error: "No se obtuvo id de cliente creado" };
    }
    idCustomer = newCustId;

    const addrFields = {
      id_customer: idCustomer,
      id_country: 6,
      id_state: 0,
      alias: "Principal",
      company: "",
      lastname: "Webservice",
      firstname: "Local",
      address1: "Calle Prueba 1",
      address2: "",
      postcode: "28001",
      city: "Madrid",
      other: "",
      phone: "600000000",
      phone_mobile: "",
      vat_number: "",
      dni: "12345678Z",
    } as Record<string, string | number>;

    const addrXml = buildEntityXml("address", addrFields);
    const postAddr = await fetch(`${base}/api/addresses?output_format=JSON`, {
      method: "POST",
      headers: { Authorization: auth, "Content-Type": "application/xml" },
      body: addrXml,
      cache: "no-store",
    });
    let addrJson: unknown;
    try {
      addrJson = await postAddr.json();
    } catch {
      addrJson = null;
    }
    if (!postAddr.ok) {
      return { ok: false, error: `POST address: ${psErrorMessage(addrJson)}` };
    }
    const aj = addrJson as { address?: { id?: string | number } };
    const newAddr = aj.address?.id != null ? Number(aj.address.id) : NaN;
    if (!Number.isFinite(newAddr) || newAddr < 1) {
      return { ok: false, error: "No se obtuvo id de dirección" };
    }
    idAddrDel = newAddr;
    idAddrInv = newAddr;
  }

  const rowsWithAddr: PsCartRow[] = rows.map((r) => ({
    ...r,
    id_address_delivery: idAddrDel > 0 ? idAddrDel : r.id_address_delivery,
  }));

  const putXml = buildCartXml(
    {
      id: cartId,
      id_customer: idCustomer,
      id_address_delivery: idAddrDel,
      id_address_invoice: idAddrInv,
      id_currency: idCurrency,
      id_lang: idLang,
      id_carrier: idCarrier,
    },
    rowsWithAddr,
  );

  const putRes = await fetch(`${base}/api/carts/${cartId}?output_format=JSON`, {
    method: "PUT",
    headers: { Authorization: auth, "Content-Type": "application/xml" },
    body: putXml,
    cache: "no-store",
  });
  let putJson: unknown;
  try {
    putJson = await putRes.json();
  } catch {
    putJson = null;
  }
  if (!putRes.ok) {
    return { ok: false, error: `PUT cart: ${psErrorMessage(putJson)}` };
  }

  const totalPaid = await getCartTotalTtc(cartId);
  if (!totalPaid) {
    return {
      ok: false,
      error:
        "No se pudo calcular el total del carrito (¿Docker y PRESTASHOP_DOCKER_CONTAINER?). " +
        "Necesario: docker exec … php scripts/cart_order_total.php",
    };
  }

  const reference = `WS${Date.now()}`.slice(0, 32);
  const currentState = await fetchDefaultOrderStateId(base, auth);

  const orderFields: Record<string, string | number> = {
    reference,
    id_shop: 1,
    id_shop_group: 1,
    id_carrier: idCarrier,
    id_lang: idLang,
    id_customer: idCustomer,
    id_cart: cartId,
    id_currency: idCurrency,
    id_address_delivery: idAddrDel,
    id_address_invoice: idAddrInv,
    current_state: currentState,
    module: "ps_checkpayment",
    payment: "Webservice (pedido local)",
    conversion_rate: 1,
    total_paid: totalPaid,
    total_paid_real: totalPaid,
  };

  const orderXml = buildEntityXml("order", orderFields);
  const postOrd = await fetch(`${base}/api/orders?output_format=JSON`, {
    method: "POST",
    headers: { Authorization: auth, "Content-Type": "application/xml" },
    body: orderXml,
    cache: "no-store",
  });
  let ordJson: unknown;
  try {
    ordJson = await postOrd.json();
  } catch {
    ordJson = null;
  }
  if (!postOrd.ok) {
    return { ok: false, error: `POST order: ${psErrorMessage(ordJson)}` };
  }

  const oj = ordJson as { order?: { id?: string | number } };
  let orderId = oj.order?.id != null ? Number(oj.order.id) : NaN;
  if (!Number.isFinite(orderId) || orderId < 1) {
    const lookup = await fetch(
      `${base}/api/orders?filter[reference]=[${reference}]&display=[id]&limit=1&output_format=JSON`,
      { headers: { Authorization: auth }, cache: "no-store" },
    );
    if (lookup.ok) {
      try {
        const lj = (await lookup.json()) as {
          orders?: { id?: string | number } | { id?: string | number }[];
        };
        const ol = normalizeList(lj.orders);
        const first = ol[0] as { id?: string | number } | undefined;
        if (first?.id != null) {
          orderId = Number(first.id);
        }
      } catch {
        /* */
      }
    }
  }

  if (!Number.isFinite(orderId) || orderId < 1) {
    return { ok: false, error: "Pedido creado pero no se leyó el id en la respuesta" };
  }

  return { ok: true, orderId, reference, cartId };
}
