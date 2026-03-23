import type { Product, Category } from "@/types";

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

  async #fetch(endpoint: string) {
    const url = `${this.#baseUrl}/api/${endpoint}?output_format=JSON`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Basic ${Buffer.from(`${this.#apiKey}:`).toString("base64")}`,
      },
      next: { revalidate: 60 },
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
