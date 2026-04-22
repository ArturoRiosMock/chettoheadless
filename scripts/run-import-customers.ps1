<#
.SYNOPSIS
  Importa clientes desde producción (PRESTASHOP_SOURCE_*) hacia PrestaShop local vía webservice.

.DESCRIPTION
  Usa tools/prestashop-migration: migrate import-customers.
  Actualiza migration_snapshots/mapping.json (clave customers: id_origen -> id_destino).
  Estado: customer-import-state.json junto al mapping.

  Origen: tools/prestashop-migration/.env
  Destino: .env.local o PRESTASHOP_TARGET_*

  Las contraseñas en destino se sustituyen por hash fijo (ver import_customers_batch.py);
  si el email ya existe en local, se reutiliza el cliente y se guarda el mapeo.

.EXAMPLE
  .\scripts\run-import-customers.ps1 -ListOnly
.EXAMPLE
  .\scripts\run-import-customers.ps1 -DryRun -Limit 5
.EXAMPLE
  .\scripts\run-import-customers.ps1 -RunAll -Limit 100
#>
param(
    [string] $MappingPath = "",
    [int] $MinId = 0,
    [switch] $ListOnly,
    [switch] $DryRun,
    [int] $Limit = 0,
    [switch] $RunAll,
    [switch] $RetryFailed,
    [string] $MapGroups = "",
    [string] $LogFile = ""
)

$ErrorActionPreference = "Stop"
$repoRoot = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path

function Import-DotEnvFile {
    param([string] $Path)
    if (-not (Test-Path -LiteralPath $Path)) { return }
    Get-Content -LiteralPath $Path | ForEach-Object {
        $line = $_.Trim()
        if ($line -match '^\s*#' -or $line -eq "") { return }
        $eq = $line.IndexOf("=")
        if ($eq -lt 1) { return }
        $k = $line.Substring(0, $eq).Trim()
        $v = $line.Substring($eq + 1).Trim()
        if (($v.StartsWith('"') -and $v.EndsWith('"')) -or ($v.StartsWith("'") -and $v.EndsWith("'"))) {
            $v = $v.Substring(1, $v.Length - 2)
        }
        [Environment]::SetEnvironmentVariable($k, $v, "Process")
    }
}

Import-DotEnvFile (Join-Path $repoRoot ".env.local")
Import-DotEnvFile (Join-Path $repoRoot "tools\prestashop-migration\.env")

if (-not $MappingPath) {
    $MappingPath = Join-Path $repoRoot "migration_snapshots\mapping.json"
}
elseif (-not [System.IO.Path]::IsPathRooted($MappingPath)) {
    $MappingPath = [System.IO.Path]::GetFullPath((Join-Path $repoRoot $MappingPath))
}
else {
    $MappingPath = [System.IO.Path]::GetFullPath($MappingPath)
}

if (-not (Test-Path -LiteralPath $MappingPath)) {
    Write-Host "No existe mapping: $MappingPath" -ForegroundColor Red
    exit 1
}

if (-not $env:PRESTASHOP_SOURCE_BASE_URL -or -not $env:PRESTASHOP_SOURCE_API_KEY) {
    Write-Host "Faltan PRESTASHOP_SOURCE_BASE_URL o PRESTASHOP_SOURCE_API_KEY." -ForegroundColor Red
    exit 1
}

$tBase = $env:PRESTASHOP_TARGET_BASE_URL
if (-not $tBase) { $tBase = $env:NEXT_PUBLIC_PRESTASHOP_URL }
$tKey = $env:PRESTASHOP_TARGET_API_KEY
if (-not $tKey) { $tKey = $env:PRESTASHOP_API_KEY }
if (-not $tBase -or -not $tKey) {
    Write-Host "Destino: define PRESTASHOP_TARGET_* o .env.local (NEXT_PUBLIC_PRESTASHOP_URL + PRESTASHOP_API_KEY)." -ForegroundColor Red
    exit 1
}
$env:PRESTASHOP_TARGET_BASE_URL = $tBase.TrimEnd("/")
$env:PRESTASHOP_TARGET_API_KEY = $tKey

$py = Get-Command python -ErrorAction SilentlyContinue
if (-not $py) {
    $py = Get-Command py -ErrorAction SilentlyContinue
}
if (-not $py) {
    Write-Host "No se encontró Python en PATH." -ForegroundColor Red
    exit 1
}

$python = $py.Path
$migDir = Join-Path $repoRoot "tools\prestashop-migration"
$args = @(
    "-u", "-m", "prestashop_migration", "migrate", "import-customers",
    "--mapping", $MappingPath
)
if ($ListOnly) { $args += "--list-only" }
if ($DryRun) { $args += "--dry-run" }
if ($MinId -gt 0) { $args += "--min-id"; $args += "$MinId" }
if ($Limit -gt 0) { $args += "--limit"; $args += "$Limit" }
if ($RunAll) { $args += "--run-all" }
if ($RetryFailed) { $args += "--retry-failed" }
if ($MapGroups.Trim()) { $args += "--map-groups"; $args += $MapGroups.Trim() }
if ($LogFile) {
    $logFull = [System.IO.Path]::GetFullPath((Join-Path $repoRoot $LogFile))
    $args += "--log-file"; $args += $logFull
}

Write-Host "Origen: $($env:PRESTASHOP_SOURCE_BASE_URL)" -ForegroundColor Cyan
Write-Host "Destino: $($env:PRESTASHOP_TARGET_BASE_URL)" -ForegroundColor Cyan
Write-Host "Mapping: $MappingPath" -ForegroundColor Cyan

Push-Location $migDir
try {
    & $python @args
    exit $LASTEXITCODE
}
finally {
    Pop-Location
}
