import type { Product, Category, HomepageContent, HomepageConfig } from "@/types";

const CMS_FETCH_TIMEOUT_MS = 12_000;

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

  async getProducts(): Promise<Product[]> {
    const data = await this.#fetch("products&display=full");
    return data.products.map(mapPrestashopProduct);
  }

  async getProduct(id: number): Promise<Product> {
    const data = await this.#fetch(`products/${id}`);
    return mapPrestashopProduct(data.product);
  }

  async getCategories(): Promise<Category[]> {
    const data = await this.#fetch("categories&display=full");
    return data.categories.map(mapPrestashopCategory);
  }

  async getHomepageContent(): Promise<HomepageContent> {
    const base = this.#requirePublicCmsBase();
    const url = `${base}/index.php?fc=module&module=chettoheadless&controller=api`;
    const response = await fetch(url, {
      cache: "no-store",
      signal: AbortSignal.timeout(CMS_FETCH_TIMEOUT_MS),
    });

    if (!response.ok) {
      throw new Error(`CMS API error: ${response.status}`);
    }

    return response.json();
  }

  async subscribeNewsletter(email: string): Promise<{ success: boolean; message: string }> {
    try {
      const base = this.#requirePublicCmsBase();
      const url = `${base}/index.php?fc=module&module=chettoheadless&controller=api&action=newsletter`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
        signal: AbortSignal.timeout(CMS_FETCH_TIMEOUT_MS),
      });

      if (!response.ok) {
        return { success: false, message: "Error de conexión" };
      }

      return response.json();
    } catch {
      return { success: false, message: "Error de conexión" };
    }
  }

  async getSiteConfig(): Promise<HomepageConfig> {
    const base = this.#requirePublicCmsBase();
    const url = `${base}/index.php?fc=module&module=chettoheadless&controller=api`;
    const response = await fetch(url, {
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(CMS_FETCH_TIMEOUT_MS),
    });

    if (!response.ok) {
      throw new Error(`CMS API error: ${response.status}`);
    }

    const data = await response.json();
    return data.config;
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function mapPrestashopProduct(ps: any): Product {
  return {
    id: ps.id,
    name: ps.name?.[0]?.value || ps.name || "",
    slug: ps.link_rewrite?.[0]?.value || String(ps.id),
    price: parseFloat(ps.price || "0"),
    originalPrice: ps.on_sale === "1" ? parseFloat(ps.price || "0") : undefined,
    image: ps.id_default_image
      ? `${process.env.NEXT_PUBLIC_PRESTASHOP_URL}/api/images/products/${ps.id}/${ps.id_default_image}`
      : "",
    category: ps.id_category_default || "",
  };
}

function mapPrestashopCategory(ps: any): Category {
  return {
    id: ps.id,
    name: ps.name?.[0]?.value || ps.name || "",
    description: ps.description?.[0]?.value || "",
    image: "",
    slug: ps.link_rewrite?.[0]?.value || String(ps.id),
  };
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export const prestashop = new PrestashopClient();
