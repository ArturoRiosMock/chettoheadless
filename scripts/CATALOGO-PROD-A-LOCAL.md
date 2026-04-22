# Catálogo producción → local (webservice PrestaShop)

Flujo para **replicar en tu PrestaShop local** fabricantes, categorías, productos base e imágenes, leyendo **toda la lista paginada** desde producción por la API JSON del webservice. No sustituye un **dump SQL** de la BD: es útil cuando quieres poblar o actualizar catálogo vía API o cuando el dump no trae productos recientes.

## Cómo se garantiza que son todos los productos

1. **Export (`test export`)**  
   El módulo `tools/prestashop-migration` recorre cada recurso con paginación estándar de PrestaShop: `limit=offset,cantidad` y `display=full` hasta que una página devuelve **menos filas que el tamaño de página** (no hay más datos). Implementación: `prestashop_migration/export_snapshot.py` (`export_resources`).

2. **Comprobación de conteos**  
   - En **origen**: `python -m prestashop_migration test store-stats` (o `node scripts/count-products-webservice.mjs` con URL de prod y `PRESTASHOP_API_KEY` con GET en `products`).  
   - Tras el export: abre `migration_snapshots/prod-catalog/manifest.json` y compara `resources.products.count` con esos conteos.  
   - En **destino** (tras el `push`): `python -m prestashop_migration test store-stats --use-target` o revisa el back office.

3. **Si el export falla a mitad**  
   Aparecerá `<recurso>.error.json` en la carpeta del snapshot. Corrige permisos, timeout o red; relanza el export (sobrescribe los JSON del snapshot).

## Requisitos

- **Python 3** y dependencias de `tools/prestashop-migration`.
- **Clave webservice en producción** con GET en: `manufacturers`, `categories`, `products`, `combinations`, `stock_availables`, `images`.
- **Docker** con `chetto-prestashop` en marcha para la escritura en local.
- **`tools/prestashop-migration/.env`**: `PRESTASHOP_SOURCE_BASE_URL` y `PRESTASHOP_SOURCE_API_KEY` de **producción**. El cargador lee `.env.local` en la raíz y luego `tools/prestashop-migration/.env` **con prioridad** (`config.load_env`).

## Fase 1 — Diagnóstico (origen)

```powershell
cd tools\prestashop-migration
python -m prestashop_migration test diagnose
```

Opcional:

```powershell
python -m prestashop_migration test store-stats --resources products,categories,manufacturers
```

## Fase 2 — Export masivo (solo GET en prod)

Salida: `migration_snapshots/prod-catalog`.

```powershell
cd tools\prestashop-migration
python -u -m prestashop_migration test export --out ../../migration_snapshots/prod-catalog --resources manufacturers,categories,products,combinations,stock_availables --page-size 50
```

`-u` (unbuffered) muestra el progreso por offset en consola. `--page-size 50` reduce el tamaño de cada respuesta con `display=full`.

Desde la raíz del repo:

```powershell
.\scripts\run-export-prod-catalog.ps1
```

Revisa `migration_snapshots/prod-catalog/manifest.json`.

## Fase 3 — Permisos de escritura en local

```powershell
docker exec chetto-prestashop php /var/www/html/scripts/grant-webservice-migration-write.php
```

## Fase 4 — Import en local (push + imágenes)

```powershell
$env:PRESTASHOP_TARGET_BASE_URL = "http://localhost:8080"
$env:PRESTASHOP_TARGET_API_KEY = "TU_CLAVE_LOCAL_CON_POST"
```

```powershell
.\scripts\run-push-prod-catalog-local.ps1
```

Ajusta en `run-push-prod-catalog-local.ps1` los flags `--map-categories` y `--parent-when-zero` si tu árbol de categorías local no es 1:1, 2:2.

## Limitaciones del migrate push

- **No importa combinaciones ni stock** por API al crear productos base con este flujo. Los JSON exportados de `combinations` y `stock_availables` no los aplica `migrate push` al destino.  
- Alternativa reanudable producto a producto: `migrate sync-products --run-all` (ver `tools/prestashop-migration/.env.example`).

## Resumen

| Paso | Comando | Efecto en prod |
|------|---------|----------------|
| Export | `test export` | Solo GET |
| Push | `migrate push` | Escribe en `PRESTASHOP_TARGET_*` |
| Fotos | `migrate sync-images` | GET origen, POST destino |

Para automatizar: ejecutar Fase 2, validar `manifest.json`, ejecutar Fase 4; supervisar log del export y el tamaño de `migration_snapshots/prod-catalog/`.
