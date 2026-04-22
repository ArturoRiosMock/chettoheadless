# Revisar el proyecto en local (avances del catálogo y migración)

Con el stack en marcha puedes abrir el front, el back office y comprobar conteos sin esperar a que termine un import largo.

## 1. Arranque mínimo

En la raíz del repo (PowerShell):

```powershell
docker compose up -d
npm install
npm run dev
```

- Espera a que PrestaShop responda (unos segundos tras `up -d`). Si algo falla: `docker logs chetto-prestashop --tail 40`.

## 2. URLs locales (puerto PrestaShop del `docker-compose` actual)

| Qué | URL |
|-----|-----|
| **Next.js** (tienda headless) | http://localhost:3000 |
| **PrestaShop** (ficha nativa, redirecciones) | http://localhost:8090 |
| **Back office** | http://localhost:8090/admin-chetto/ |
| **API CMS** (módulo chettoheadless) | http://localhost:8090/index.php?fc=module&module=chettoheadless&controller=api |
| **phpMyAdmin** | http://localhost:8081 (usuario `root`, contraseña `admin`) |

Credenciales típicas de una instalación Docker limpia: `admin@chetto.es` / `Chetto2026!` (si importaste un dump, serán las del dump).

En `.env.local` del front debe figurar `NEXT_PUBLIC_PRESTASHOP_URL=http://localhost:8090` y la clave del **webservice** de tu PrestaShop local (`PRESTASHOP_API_KEY`).

## 3. Conteos rápidos (¿cuántos productos hay ya?)

**Dentro del contenedor PrestaShop** (lee la base directamente):

```powershell
docker exec chetto-prestashop php /var/www/html/scripts/show-catalog-count.php
```

**Vía webservice local** (misma API que usa la migración; requiere `tools/prestashop-migration/.env` y raíz `.env.local` con claves):

```powershell
cd tools\prestashop-migration
python -m prestashop_migration test store-stats --use-target --resources products,categories,manufacturers
```

Compara con producción quitando `--use-target` (usa `PRESTASHOP_SOURCE_*`).

## 4. Avance del import por snapshot (`prod-catalog`)

Si sigues el flujo export → push → imágenes:

| Fichero | Qué indica |
|---------|------------|
| [migration_snapshots/prod-catalog/manifest.json](../migration_snapshots/prod-catalog/manifest.json) | Cuántos registros se exportaron desde producción por recurso. |
| [migration_snapshots/prod-catalog/mapping.json](../migration_snapshots/prod-catalog/mapping.json) | Mapeo id origen → id destino tras el `migrate push` (se va actualizando). |
| `migration_snapshots/prod-catalog/sync_images_report.json` | Resultado del `migrate sync-images` (si existe). |

## 5. Import producto a producto (`sync-products`)

Si usas `migrate sync-products --run-all` o logs propios:

- Estado y fallos: [migration_snapshots/product-sync-state.json](../migration_snapshots/product-sync-state.json) (ruta por defecto según `.env.example` del migrador).
- Mapeo acumulado: [migration_snapshots/mapping.json](../migration_snapshots/mapping.json).
- Si rediriges salida a fichero, abre ese `.log` en el editor para ver la última línea procesada.

## 6. Back office: dónde mirar

- **Catálogo → Productos**: listado y filtros por referencia o nombre.
- **Parámetros avanzados → Webservice**: que la clave siga activa y con permisos si el front no carga productos.
- Tras cambios masivos, si el BO no refleja todo: limpiar caché (`var/cache` en el contenedor o desde Parámetros de rendimiento).

## 7. Reglas útiles

- Un import largo **no bloquea** abrir http://localhost:3000 ni el BO; verás el catálogo crecer al refrescar.
- Las **combinaciones y stock** completos por API tienen limitaciones documentadas en [CATALOGO-PROD-A-LOCAL.md](CATALOGO-PROD-A-LOCAL.md).
