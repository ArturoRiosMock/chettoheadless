# Ejecutar cuando haya terminado el export a migration_snapshots/prod-catalog
# (ver tools/prestashop-migration/.env.example, seccion catálogo completo).
#
# Requisitos:
# - Docker: contenedor chetto-prestashop en marcha
# - tools/prestashop-migration/.env con PRESTASHOP_SOURCE_* (prod) y PRESTASHOP_TARGET_BASE_URL=http://localhost:8090
# - Raíz del repo: .env.local con PRESTASHOP_API_KEY = clave local con POST en products/images (tras grant-webservice)
#
# Nota: migrate push no importa combinaciones ni stock por API; solo fabricantes, categorías y productos base.
# Imágenes: migrate sync-images al final.

$ErrorActionPreference = "Stop"
$root = Split-Path $PSScriptRoot -Parent
$snapshot = Join-Path $root "migration_snapshots\prod-catalog"

if (-not (Test-Path (Join-Path $snapshot "products.json"))) {
    Write-Error "No existe $snapshot\products.json. Termina primero el export (test export)."
}

docker exec chetto-prestashop php /var/www/html/scripts/grant-webservice-migration-write.php

Set-Location (Join-Path $root "tools\prestashop-migration")

# PS9 típico: categoría raíz 1, Home 2. Ajusta --map-categories si tu local usa otros ids.
python -m prestashop_migration migrate push --from ../../migration_snapshots/prod-catalog --map-categories 1:1,2:2 --parent-when-zero 2 --only manufacturers,categories,products

Write-Host "`nSincronizando imágenes (puede tardar mucho)..." -ForegroundColor Cyan
python -u -m prestashop_migration migrate sync-images --from ../../migration_snapshots/prod-catalog --skip-existing

Write-Host "`nHecho. Revisa mapping.json en la carpeta del snapshot y limpia caché PS si hace falta." -ForegroundColor Green
