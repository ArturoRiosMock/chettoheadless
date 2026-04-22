/**
 * Cuenta productos vía Webservice PrestaShop (solo IDs, paginado).
 * Uso:
 *   PRESTASHOP_URL=https://chetto.es PRESTASHOP_API_KEY=tu_clave node scripts/count-products-webservice.mjs
 * O con .env.local (Next.js): dotenv no incluido; exporta vars o usa:
 *   Get-Content .env.local | ForEach-Object { if ($_ -match '^([^#][^=]+)=(.*)$') { Set-Item "env:$($matches[1])" $matches[2].Trim() } }; node scripts/count-products-webservice.mjs
 */

const base = (process.env.PRESTASHOP_URL || process.env.NEXT_PUBLIC_PRESTASHOP_URL || "")
  .trim()
  .replace(/\/$/, "");
const apiKey = (process.env.PRESTASHOP_API_KEY || "").trim();

if (!base || !/^https?:\/\//i.test(base)) {
  console.error("Falta PRESTASHOP_URL o NEXT_PUBLIC_PRESTASHOP_URL (URL absoluta).");
  process.exit(1);
}
if (!apiKey) {
  console.error("Falta PRESTASHOP_API_KEY.");
  process.exit(1);
}

const PAGE = Math.min(Math.max(parseInt(process.env.PRESTASHOP_WS_PAGE_SIZE || "500", 10) || 500, 1), 1000);
const auth = `Basic ${Buffer.from(`${apiKey}:`).toString("base64")}`;

function normalizeList(raw) {
  if (raw == null) return [];
  return Array.isArray(raw) ? raw : [raw];
}

let total = 0;
let offset = 0;

for (;;) {
  const params = new URLSearchParams({
    output_format: "JSON",
    display: "[id]",
    limit: `${offset},${PAGE}`,
  });
  const url = `${base}/api/products?${params}`;
  const res = await fetch(url, { headers: { Authorization: auth } });
  if (!res.ok) {
    const t = await res.text();
    console.error(`HTTP ${res.status}: ${t.slice(0, 500)}`);
    process.exit(1);
  }
  const data = await res.json();
  const batch = normalizeList(data.products);
  total += batch.length;
  if (batch.length < PAGE) break;
  offset += PAGE;
}

console.log(String(total));
