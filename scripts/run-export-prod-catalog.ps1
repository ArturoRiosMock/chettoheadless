# Exporta catálogo completo desde PRESTASHOP_SOURCE_* (producción) a migration_snapshots/prod-catalog.
# Solo lectura en origen. Usa -u para ver progreso por offset en consola.
#
# Requisitos:
# - tools/prestashop-migration/.env con PRESTASHOP_SOURCE_BASE_URL y PRESTASHOP_SOURCE_API_KEY (prod)
#   (override sobre .env.local; ver scripts/CATALOGO-PROD-A-LOCAL.md)
#
# Siguiente paso tras manifest.json OK: .\scripts\run-push-prod-catalog-local.ps1

$ErrorActionPreference = "Stop"
$root = Split-Path $PSScriptRoot -Parent
$out = Join-Path $root "migration_snapshots\prod-catalog"
$mig = Join-Path $root "tools\prestashop-migration"

if (-not (Test-Path (Join-Path $mig ".env"))) {
    Write-Error "Crea tools\prestashop-migration\.env (copia de .env.example) con PRESTASHOP_SOURCE_* de producción."
}

Set-Location $mig
python -u -m prestashop_migration test export --out ../../migration_snapshots/prod-catalog --resources manufacturers,categories,products,combinations,stock_availables --page-size 50

Write-Host "`nRevisa manifest.json en: $out" -ForegroundColor Green
Write-Host "Import local: .\scripts\run-push-prod-catalog-local.ps1 (con Docker y PRESTASHOP_TARGET_*)." -ForegroundColor Cyan
