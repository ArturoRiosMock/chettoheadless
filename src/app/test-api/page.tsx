import { prestashop } from "@/lib/prestashop";

export const dynamic = "force-dynamic";

export default async function TestApiPage() {
  let products: Awaited<ReturnType<typeof prestashop.getProducts>> = [];
  let categories: Awaited<ReturnType<typeof prestashop.getCategories>> = [];
  let productsError = "";
  let categoriesError = "";

  try {
    products = await prestashop.getProducts();
  } catch (e) {
    productsError = e instanceof Error ? e.message : "Error desconocido";
  }

  try {
    categories = await prestashop.getCategories();
  } catch (e) {
    categoriesError = e instanceof Error ? e.message : "Error desconocido";
  }

  const apiUrl = process.env.NEXT_PUBLIC_PRESTASHOP_URL;
  const hasKey = !!process.env.PRESTASHOP_API_KEY;

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-3xl font-bold mb-2">Test de Conexión API</h1>
      <p className="text-neutral-500 mb-8">
        Next.js → PrestaShop Webservice
      </p>

      <section className="mb-8 rounded-xl border border-neutral-200 p-6">
        <h2 className="text-lg font-semibold mb-4">Configuración</h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="font-medium text-neutral-600">PRESTASHOP_URL</div>
          <div className={apiUrl ? "text-green-700" : "text-red-600"}>
            {apiUrl || "No configurada"}
          </div>
          <div className="font-medium text-neutral-600">API_KEY</div>
          <div className={hasKey ? "text-green-700" : "text-red-600"}>
            {hasKey ? "••••••••••••••••" : "No configurada"}
          </div>
          <div className="font-medium text-neutral-600">Estado</div>
          <div>
            {apiUrl && hasKey ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-green-700 font-medium">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                Conectado
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-red-700 font-medium">
                <span className="h-2 w-2 rounded-full bg-red-500" />
                Desconectado
              </span>
            )}
          </div>
        </div>
      </section>

      <section className="mb-8 rounded-xl border border-neutral-200 p-6">
        <h2 className="text-lg font-semibold mb-1">
          Productos desde PrestaShop
        </h2>
        <p className="text-sm text-neutral-400 mb-4">
          GET /api/products — {products.length} resultados
        </p>
        {productsError ? (
          <p className="text-red-600 text-sm">{productsError}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-neutral-500">
                  <th className="pb-2 pr-4">ID</th>
                  <th className="pb-2 pr-4">Nombre</th>
                  <th className="pb-2 pr-4">Precio</th>
                  <th className="pb-2">Slug</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} className="border-b border-neutral-100">
                    <td className="py-2 pr-4 font-mono text-neutral-400">
                      {p.id}
                    </td>
                    <td className="py-2 pr-4 font-medium">{p.name}</td>
                    <td className="py-2 pr-4">€{p.price.toFixed(2)}</td>
                    <td className="py-2 text-neutral-400">{p.slug}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="rounded-xl border border-neutral-200 p-6">
        <h2 className="text-lg font-semibold mb-1">
          Categorías desde PrestaShop
        </h2>
        <p className="text-sm text-neutral-400 mb-4">
          GET /api/categories — {categories.length} resultados
        </p>
        {categoriesError ? (
          <p className="text-red-600 text-sm">{categoriesError}</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <span
                key={c.id}
                className="rounded-full border border-neutral-200 bg-neutral-50 px-4 py-1.5 text-sm font-medium"
              >
                {c.name}
              </span>
            ))}
          </div>
        )}
      </section>

      <p className="mt-8 text-center text-xs text-neutral-400">
        Datos obtenidos en tiempo real desde http://localhost:8080/api/ via
        Server-Side Rendering
      </p>
    </div>
  );
}
