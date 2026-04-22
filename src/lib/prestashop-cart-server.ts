/**
 * Carrito vía Webservice PrestaShop (solo servidor: usa PRESTASHOP_API_KEY).
 */

function normalizeList<T>(raw: T | T[] | undefined | null): T[] {
  if (raw == null) {
    return [];
  }
  return Array.isArray(raw) ? raw : [raw];
}

export type PsCartRow = {
  id_product: number;
  id_product_attribute: number;
  id_address_delivery: number;
  quantity: number;
};

export type PsCartMeta = {
  id: number;
  id_customer: number;
  id_address_delivery: number;
  id_address_invoice: number;
  id_currency: number;
  id_lang: number;
  id_carrier: number;
};

/** XML de carrito para POST/PUT al webservice (reutilizable al cerrar pedido). */
export function buildCartXml(
  meta: Omit<PsCartMeta, "id"> & { id?: number },
  rows: PsCartRow[],
): string {
  const parts: string[] = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<prestashop xmlns:xlink="http://www.w3.org/1999/xlink">',
    "<cart>",
  ];
  if (meta.id != null) {
    parts.push(`<id><![CDATA[${meta.id}]]></id>`);
  }
  parts.push(
    `<id_customer><![CDATA[${meta.id_customer}]]></id_customer>`,
    `<id_address_delivery><![CDATA[${meta.id_address_delivery}]]></id_address_delivery>`,
    `<id_address_invoice><![CDATA[${meta.id_address_invoice}]]></id_address_invoice>`,
    `<id_currency><![CDATA[${meta.id_currency}]]></id_currency>`,
    `<id_lang><![CDATA[${meta.id_lang}]]></id_lang>`,
    `<id_carrier><![CDATA[${meta.id_carrier}]]></id_carrier>`,
    "<associations>",
    "<cart_rows>",
  );
  for (const r of rows) {
    parts.push(
      "<cart_row>",
      `<id_product><![CDATA[${r.id_product}]]></id_product>`,
      `<id_product_attribute><![CDATA[${r.id_product_attribute}]]></id_product_attribute>`,
      `<id_address_delivery><![CDATA[${r.id_address_delivery}]]></id_address_delivery>`,
      `<id_customization><![CDATA[0]]></id_customization>`,
      `<quantity><![CDATA[${r.quantity}]]></quantity>`,
      "</cart_row>",
    );
  }
  parts.push("</cart_rows>", "</associations>", "</cart>", "</prestashop>");
  return `${parts.join("\n")}\n`;
}

function extractCartFromResponse(data: unknown): { meta: PsCartMeta; rows: PsCartRow[] } | null {
  const root = data as Record<string, unknown>;
  const cart = (root.cart ?? (Array.isArray(root.carts) ? root.carts[0] : null)) as
    | Record<string, unknown>
    | undefined
    | null;
  if (!cart || cart.id == null) {
    return null;
  }
  const assoc = cart.associations as Record<string, unknown> | undefined;
  const rawRows = assoc?.cart_rows ?? assoc?.cart_row;
  const list = normalizeList(rawRows as unknown);
  const rows: PsCartRow[] = [];
  for (const r of list) {
    if (!r || typeof r !== "object") {
      continue;
    }
    const o = r as Record<string, unknown>;
    rows.push({
      id_product: Number(o.id_product ?? 0),
      id_product_attribute: Number(o.id_product_attribute ?? 0),
      id_address_delivery: Number(o.id_address_delivery ?? 0),
      quantity: Number(o.quantity ?? 1),
    });
  }
  return {
    meta: {
      id: Number(cart.id),
      id_customer: Number(cart.id_customer ?? 0),
      id_address_delivery: Number(cart.id_address_delivery ?? 0),
      id_address_invoice: Number(cart.id_address_invoice ?? 0),
      id_currency: Number(cart.id_currency ?? 1),
      id_lang: Number(cart.id_lang ?? 1),
      id_carrier: Number(cart.id_carrier ?? 1),
    },
    rows,
  };
}

function mergeRows(
  existing: PsCartRow[],
  line: { idProduct: number; idProductAttribute: number; quantity: number },
): PsCartRow[] {
  const out = existing.map((r) => ({ ...r }));
  const idx = out.findIndex(
    (r) =>
      r.id_product === line.idProduct && r.id_product_attribute === line.idProductAttribute,
  );
  if (idx >= 0) {
    out[idx] = { ...out[idx], quantity: out[idx].quantity + line.quantity };
  } else {
    out.push({
      id_product: line.idProduct,
      id_product_attribute: line.idProductAttribute,
      id_address_delivery: 0,
      quantity: line.quantity,
    });
  }
  return out;
}

function extractNewCartId(data: unknown): number | null {
  const o = data as Record<string, unknown>;
  const c = o.cart as Record<string, unknown> | undefined;
  if (c?.id == null) {
    return null;
  }
  return Number(c.id);
}

function psErrorMessage(data: unknown): string {
  const o = data as { errors?: { message?: string }[] };
  const msg = o.errors?.[0]?.message;
  return typeof msg === "string" ? msg : "Error del webservice PrestaShop";
}

async function fetchDefaultCarrierId(base: string, authHeader: string): Promise<number> {
  try {
    const r = await fetch(
      `${base}/api/carriers?filter[active]=1&display=[id]&limit=0,1&output_format=JSON`,
      { headers: { Authorization: authHeader }, cache: "no-store" },
    );
    const j = (await r.json()) as { carriers?: { id?: string | number } | { id?: string | number }[] };
    const list = normalizeList(j.carriers);
    const first = list[0] as { id?: string | number } | undefined;
    if (first?.id != null) {
      return Number(first.id);
    }
  } catch {
    /* */
  }
  return 1;
}

export async function addLineToPsCart(
  cartId: number | undefined,
  line: { idProduct: number; idProductAttribute: number; quantity: number },
): Promise<{ cartId: number; error?: string }> {
  const base = process.env.NEXT_PUBLIC_PRESTASHOP_URL?.trim().replace(/\/$/, "");
  const key = process.env.PRESTASHOP_API_KEY?.trim();
  if (!base || !key) {
    return { cartId: 0, error: "Falta PRESTASHOP_API_KEY o NEXT_PUBLIC_PRESTASHOP_URL en el servidor" };
  }
  const auth = `Basic ${Buffer.from(`${key}:`).toString("base64")}`;
  const langId = Number.parseInt(process.env.NEXT_PUBLIC_PRESTASHOP_LANG_ID || "1", 10) || 1;
  const currencyId = Number.parseInt(process.env.PRESTASHOP_CURRENCY_ID || "1", 10) || 1;
  const carrierId = await fetchDefaultCarrierId(base, auth);

  const emptyMeta: Omit<PsCartMeta, "id"> = {
    id_customer: 0,
    id_address_delivery: 0,
    id_address_invoice: 0,
    id_currency: currencyId,
    id_lang: langId,
    id_carrier: carrierId,
  };

  async function postCart(xml: string): Promise<{ ok: boolean; data: unknown; status: number }> {
    const r = await fetch(`${base}/api/carts?output_format=JSON`, {
      method: "POST",
      headers: { Authorization: auth, "Content-Type": "application/xml" },
      body: xml,
      cache: "no-store",
    });
    let data: unknown = null;
    try {
      data = await r.json();
    } catch {
      data = null;
    }
    return { ok: r.ok, data, status: r.status };
  }

  async function getCart(id: number): Promise<{ ok: boolean; data: unknown }> {
    const r = await fetch(`${base}/api/carts/${id}?display=full&output_format=JSON`, {
      headers: { Authorization: auth },
      cache: "no-store",
    });
    let data: unknown = null;
    try {
      data = await r.json();
    } catch {
      data = null;
    }
    return { ok: r.ok, data };
  }

  async function putCart(id: number, xml: string): Promise<{ ok: boolean; data: unknown }> {
    const r = await fetch(`${base}/api/carts/${id}?output_format=JSON`, {
      method: "PUT",
      headers: { Authorization: auth, "Content-Type": "application/xml" },
      body: xml,
      cache: "no-store",
    });
    let data: unknown = null;
    try {
      data = await r.json();
    } catch {
      data = null;
    }
    return { ok: r.ok, data };
  }

  if (!cartId || cartId < 1) {
    const xml = buildCartXml(emptyMeta, [
      {
        id_product: line.idProduct,
        id_product_attribute: line.idProductAttribute,
        id_address_delivery: 0,
        quantity: line.quantity,
      },
    ]);
    const { ok, data, status } = await postCart(xml);
    const newId = extractNewCartId(data);
    if (!ok || !newId) {
      return {
        cartId: 0,
        error: status === 401 ? "Webservice no autorizado (clave API)" : psErrorMessage(data),
      };
    }
    return { cartId: newId };
  }

  const got = await getCart(cartId);
  const parsed = got.ok ? extractCartFromResponse(got.data) : null;
  if (!parsed || parsed.meta.id !== cartId) {
    const xml = buildCartXml(emptyMeta, [
      {
        id_product: line.idProduct,
        id_product_attribute: line.idProductAttribute,
        id_address_delivery: 0,
        quantity: line.quantity,
      },
    ]);
    const { ok, data, status } = await postCart(xml);
    const newId = extractNewCartId(data);
    if (!ok || !newId) {
      return {
        cartId: 0,
        error: status === 401 ? "Webservice no autorizado (clave API)" : psErrorMessage(data),
      };
    }
    return { cartId: newId };
  }

  const merged = mergeRows(parsed.rows, line);
  const putXml = buildCartXml({ ...parsed.meta, id: cartId }, merged);
  const { ok, data } = await putCart(cartId, putXml);
  if (!ok) {
    return { cartId: 0, error: psErrorMessage(data) };
  }
  return { cartId };
}

export function sumCartRowsQuantities(rows: PsCartRow[]): number {
  return rows.reduce((acc, r) => acc + (Number.isFinite(r.quantity) ? r.quantity : 0), 0);
}

export async function fetchCartRowsFromPs(cartId: number): Promise<PsCartRow[] | null> {
  const base = process.env.NEXT_PUBLIC_PRESTASHOP_URL?.trim().replace(/\/$/, "");
  const key = process.env.PRESTASHOP_API_KEY?.trim();
  if (!base || !key || !Number.isFinite(cartId) || cartId < 1) {
    return null;
  }
  const auth = `Basic ${Buffer.from(`${key}:`).toString("base64")}`;
  const r = await fetch(`${base}/api/carts/${cartId}?display=full&output_format=JSON`, {
    headers: { Authorization: auth },
    cache: "no-store",
  });
  if (!r.ok) {
    return null;
  }
  let data: unknown;
  try {
    data = await r.json();
  } catch {
    return null;
  }
  const parsed = extractCartFromResponse(data);
  return parsed?.rows ?? null;
}
