import type {
  Product,
  Category,
  HomepageContent,
  HomepageConfig,
  NavItemApi,
  FooterColumn,
  PdpProductView,
  PdpSizeVariant,
} from "@/types";

const CMS_FETCH_TIMEOUT_MS = 12_000;

export type SiteLayoutConfig = HomepageConfig & {
  nav_items: NavItemApi[];
  footer_columns: FooterColumn[];
};

/**
 * PrestaShop Webservice API client.
 * Ready to connect when PRESTASHOP_API_KEY and NEXT_PUBLIC_PRESTASHOP_URL
 * are set in .env.local.
 */
class PrestashopClient {
  #baseUrl: string;
  #apiKey: string;

  constructor() {
    this.#baseUrl = process.env.NEXT_PUBLIC_PRESTASHOP_URL || "";
    this.#apiKey = process.env.PRESTASHOP_API_KEY || "";
  }

  #requirePublicCmsBase(): string {
    const base = this.#baseUrl.trim().replace(/\/$/, "");
    if (!base || !/^https?:\/\//i.test(base)) {
      throw new Error("NEXT_PUBLIC_PRESTASHOP_URL no configurada o no es una URL absoluta");
    }
    if (process.env.VERCEL === "1" && /localhost|127\.0\.0\.1/i.test(base)) {
      throw new Error("PrestaShop en localhost no es alcanzable desde Vercel; usa una URL pública HTTPS");
    }
    return base;
  }

  async #fetch(endpoint: string) {
    const base = this.#requirePublicCmsBase();
    const url = `${base}/api/${endpoint}?output_format=JSON`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Basic ${Buffer.from(`${this.#apiKey}:`).toString("base64")}`,
      },
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(CMS_FETCH_TIMEOUT_MS),
    });

    if (!response.ok) {
      throw new Error(`PrestaShop API error: ${response.status}`);
    }

    return response.json();
  }

  async #fetchCmsJson(init: RequestInit): Promise<HomepageContent> {
    const base = this.#requirePublicCmsBase();
    const url = `${base}/index.php?fc=module&module=chettoheadless&controller=api`;
    const response = await fetch(url, {
      ...init,
      signal: AbortSignal.timeout(CMS_FETCH_TIMEOUT_MS),
    });

    if (!response.ok) {
      throw new Error(`CMS API error: ${response.status}`);
    }

    return response.json();
  }

  async getProducts(): Promise<Product[]> {
    const data = await this.#fetch("products&display=full");
    return normalizeWsList(data.products).map(mapPrestashopProduct);
  }

  /**
   * Productos reales del catálogo para tarjetas (p. ej. carrusel «Favoritos»).
   * Requiere PRESTASHOP_API_KEY; si falta o falla la petición, el caller puede usar CMS/mock.
   */
  async getProductsForCards(options?: { limit?: number }): Promise<Product[]> {
    if (!this.#apiKey.trim()) {
      return [];
    }
    const lim = Math.min(Math.max(options?.limit ?? 12, 1), 48);
    const baseQs = `products&display=full&sort=[id_DESC]&limit=0,${lim}`;
    let data: { products?: unknown };
    try {
      data = await this.#fetch(`${baseQs}&filter[active]=1`);
    } catch {
      data = await this.#fetch(baseQs);
    }
    return normalizeWsList(data.products).map(mapPrestashopProduct);
  }

  async getProduct(id: number): Promise<Product> {
    const data = await this.#fetch(`products/${id}`);
    return mapPrestashopProduct(data.product);
  }

  async getCategories(): Promise<Category[]> {
    const data = await this.#fetch("categories&display=full");
    return normalizeWsList(data.categories).map(mapPrestashopCategory);
  }

  async getHomepageContent(): Promise<HomepageContent> {
    return this.#fetchCmsJson({ cache: "no-store" });
  }

  async getCachedHomepageContent(): Promise<HomepageContent> {
    return this.#fetchCmsJson({
      next: { revalidate: 300 },
    });
  }

  async subscribeNewsletter(email: string): Promise<{ success: boolean; message: string }> {
    try {
      const base = this.#requirePublicCmsBase();
      const response = await fetch(
        `${base}/index.php?fc=module&module=chettoheadless&controller=api&action=newsletter`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
          signal: AbortSignal.timeout(CMS_FETCH_TIMEOUT_MS),
        }
      );

      if (!response.ok) {
        return { success: false, message: "Error de conexión" };
      }

      return response.json();
    } catch {
      return { success: false, message: "Error de conexión" };
    }
  }

  async getSiteConfig(): Promise<SiteLayoutConfig> {
    const data = await this.#fetchCmsJson({
      next: { revalidate: 300 },
    });
    const cfg = data.config;
    return {
      ...cfg,
      nav_items: data.nav_items ?? [],
      footer_columns: data.footer_columns ?? [],
    };
  }

  /**
   * Carga PDP por segmento de URL: numérico = id_product PrestaShop; si no, link_rewrite.
   */
  async resolveProductPage(slug: string): Promise<PdpProductView | null> {
    if (!this.#apiKey.trim()) {
      return null;
    }
    let s = slug;
    try {
      s = decodeURIComponent(slug);
    } catch {
      s = slug;
    }
    s = s.trim();
    if (/^\d+$/.test(s)) {
      const byId = await this.getPdpProductById(parseInt(s, 10));
      if (byId) {
        return byId;
      }
    }
    return this.getProductByLinkRewrite(s);
  }

  async getPdpProductById(id: number): Promise<PdpProductView | null> {
    if (!this.#apiKey.trim() || !Number.isFinite(id) || id < 1) {
      return null;
    }
    try {
      const data = await this.#fetch(`products/${Math.floor(id)}`);
      const raw = data.product;
      if (raw && raw.id != null) {
        return await mapWsProductToPdp(raw, this.#fetch.bind(this));
      }
    } catch {
      /* */
    }
    return null;
  }

  async getProductByLinkRewrite(slug: string): Promise<PdpProductView | null> {
    if (!this.#apiKey.trim()) {
      return null;
    }
    const langId = process.env.NEXT_PUBLIC_PRESTASHOP_LANG_ID || "1";
    const normalized = slug.trim();
    const attempts = [
      `products&filter[link_rewrite]=[${langId}]${encodeURIComponent(normalized)}&display=full`,
      `products&filter[link_rewrite]=[${langId}]${normalized}&display=full`,
      `products&filter[link_rewrite]=${encodeURIComponent(normalized)}&display=full`,
      `products&filter[link_rewrite]=${normalized}&display=full`,
    ];

    for (const ep of attempts) {
      try {
        const data = await this.#fetch(ep);
        const list = normalizeWsList(data.products);
        const raw =
          list.find((p: any) => {
            const rs = wsLangValue(p?.link_rewrite);
            return rs && rs.toLowerCase() === normalized.toLowerCase();
          }) || list[0];
        if (raw?.id) {
          return await mapWsProductToPdp(raw, this.#fetch.bind(this));
        }
      } catch {
        /* try next */
      }
    }

    return null;
  }

  async getProductOverlayHtml(idProduct: number): Promise<string> {
    try {
      const base = this.#requirePublicCmsBase();
      const url = `${base}/index.php?fc=module&module=chettoheadless&controller=api&action=product_overlay&id_product=${idProduct}`;
      const response = await fetch(url, {
        next: { revalidate: 120 },
        signal: AbortSignal.timeout(CMS_FETCH_TIMEOUT_MS),
      });
      if (!response.ok) {
        return "";
      }
      const j = (await response.json()) as { marketing_html?: string };
      return j.marketing_html || "";
    } catch {
      return "";
    }
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function normalizeWsList<T>(raw: T | T[] | undefined): T[] {
  if (raw == null) {
    return [];
  }
  return Array.isArray(raw) ? raw : [raw];
}

function wsLangValue(val: unknown): string {
  const preferredLang = process.env.NEXT_PUBLIC_PRESTASHOP_LANG_ID ?? "1";
  if (val == null) {
    return "";
  }
  if (typeof val === "string") {
    return val;
  }
  if (Array.isArray(val)) {
    for (const item of val) {
      if (item && typeof item === "object" && "value" in item) {
        const id = (item as { id?: string | number }).id;
        if (id != null && String(id) === String(preferredLang)) {
          return String((item as { value: string }).value);
        }
      }
    }
    const first = val[0] as { value?: string } | undefined;
    if (first && typeof first === "object" && "value" in first) {
      return String(first.value);
    }
  }
  if (typeof val === "object" && val !== null) {
    const o = val as Record<string, unknown>;
    const byLang = o[preferredLang];
    if (byLang != null && typeof byLang === "string") {
      return byLang;
    }
    if ("value" in o) {
      return String((o as { value: string }).value);
    }
  }
  return "";
}

function normalizeImageIds(associations: any, productId: string | number): string[] {
  const ids: string[] = [];
  const def = associations?.images?.image ?? associations?.image;
  const list = normalizeWsList(def);
  for (const img of list) {
    if (img && typeof img === "object" && img.id != null) {
      ids.push(String(img.id));
    }
  }
  if (ids.length === 0 && associations?.images) {
    const alt = associations.images;
    if (typeof alt === "object" && !Array.isArray(alt) && alt.id) {
      ids.push(String(alt.id));
    }
  }
  return ids;
}

/**
 * Imagen servida por el front office (sin Basic auth). Las rutas /api/images/ exigen clave
 * del webservice y no cargan en <img> ni en next/image desde el navegador.
 */
function prestashopStorefrontImageUrl(
  baseRaw: string,
  imageId: string,
  linkRewrite: string,
  imageType: "home_default" | "large_default" | "medium_default",
): string {
  const base = baseRaw.trim().replace(/\/$/, "");
  if (!base || !imageId || imageId === "0") {
    return "";
  }
  void linkRewrite;
  // TODO(staging): URL amigables / rewrites de nginx no están activos en Webempresa.
  // Cuando se activen, revertir a `${base}/${imageId}-${imageType}/${slug}.jpg`.
  const folders = String(imageId).split("").join("/");
  return `${base}/img/p/${folders}/${imageId}-${imageType}.jpg`;
}

function resolvePrestaShopCoverImageId(ps: any): string {
  const raw = ps.id_default_image;
  if (raw != null && raw !== "" && String(raw) !== "0") {
    return String(raw);
  }
  return normalizeImageIds(ps.associations, ps.id)[0] || "";
}

function mapPrestashopProduct(ps: any): Product {
  const base = (process.env.NEXT_PUBLIC_PRESTASHOP_URL || "").replace(/\/$/, "");
  const slug = wsLangValue(ps.link_rewrite) || String(ps.id);
  const coverId = resolvePrestaShopCoverImageId(ps);
  const pid = Number(ps.id);
  return {
    id: pid,
    prestashopProductId: pid,
    name: wsLangValue(ps.name),
    slug,
    price: parseFloat(ps.price || "0"),
    originalPrice: ps.on_sale === "1" ? parseFloat(ps.price || "0") : undefined,
    image: coverId ? prestashopStorefrontImageUrl(base, coverId, slug, "home_default") : "",
    category: String(ps.id_category_default || ""),
  };
}

function mapPrestashopCategory(ps: any): Category {
  return {
    id: Number(ps.id),
    name: wsLangValue(ps.name),
    description: wsLangValue(ps.description),
    image: "",
    slug: wsLangValue(ps.link_rewrite) || String(ps.id),
  };
}

async function mapWsProductToPdp(
  ps: any,
  wsFetch: (endpoint: string) => Promise<any>
): Promise<PdpProductView> {
  const base = (process.env.NEXT_PUBLIC_PRESTASHOP_URL || "").replace(/\/$/, "");
  const id = Number(ps.id);
  const slug = wsLangValue(ps.link_rewrite) || String(id);
  const name = wsLangValue(ps.name);
  const description = wsLangValue(ps.description) || wsLangValue(ps.description_short) || "";
  const shortDescription = wsLangValue(ps.description_short) || "";
  const price = parseFloat(ps.price || "0");

  const imgIds = normalizeImageIds(ps.associations, id);
  const defaultImg = ps.id_default_image ? String(ps.id_default_image) : imgIds[0];
  const orderedIds = defaultImg && !imgIds.includes(defaultImg) ? [defaultImg, ...imgIds] : imgIds.length ? imgIds : defaultImg ? [defaultImg] : [];

  const images = orderedIds.map((imgId) =>
    prestashopStorefrontImageUrl(base, imgId, slug, "large_default"),
  );

  const mainImage = images[0] || "";

  let categoryName = "Catálogo";
  let categorySlug = "colecciones";
  const catId = ps.id_category_default ? Number(ps.id_category_default) : 0;
  if (catId > 2) {
    try {
      const catData = await wsFetch(`categories/${catId}`);
      const c = catData.category;
      if (c) {
        categoryName = wsLangValue(c.name) || categoryName;
        categorySlug = wsLangValue(c.link_rewrite) || String(catId);
      }
    } catch {
      /* ignore */
    }
  }

  const sizeVariants: PdpSizeVariant[] = [];
  try {
    const combData = await wsFetch(`combinations?filter[id_product]=[${id}]&display=full`);
    const combs = normalizeWsList(combData.combinations);
    const seenAttr = new Set<number>();
    for (const c of combs) {
      const idAttr = Number(c.id);
      if (!Number.isFinite(idAttr) || idAttr <= 0) {
        continue;
      }
      if (seenAttr.has(idAttr)) {
        continue;
      }
      seenAttr.add(idAttr);
      const label = String(c.reference || c.ean13 || idAttr).trim() || String(idAttr);
      sizeVariants.push({ idProductAttribute: idAttr, label });
    }
  } catch {
    /* */
  }

  if (sizeVariants.length === 0) {
    sizeVariants.push({ idProductAttribute: 0, label: "Única" });
  }

  const colors = [
    {
      name: "Producto",
      hex: "#e8e6e3",
      image: mainImage || "/images/product/lejan-one-mint.jpg",
    },
  ];

  return {
    id,
    name,
    slug,
    price,
    description,
    shortDescription,
    images: images.length ? images : ["/images/product/lejan-one-mint.jpg"],
    colors,
    sizeVariants,
    materials: shortDescription || description.slice(0, 400),
    care: "Consulta la etiqueta del producto o contacta con atención al cliente para cuidados específicos.",
    categoryName,
    categorySlug,
  };
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export const prestashop = new PrestashopClient();
