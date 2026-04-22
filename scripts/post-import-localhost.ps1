<#
.SYNOPSIS
  Tras importar un dump: ajusta dominio a localhost:8080, limpia caché y permisos de var/.

.DESCRIPTION
  Requiere contenedores chetto-mysql y chetto-prestashop en ejecución.
  Ejecuta scripts/sql/post-import-localhost-8080.sql y borra var/cache.
#>
$ErrorActionPreference = "Stop"
$repoRoot = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$sqlHost = Join-Path $repoRoot "scripts\sql\post-import-localhost-8080.sql"
$mysql = "chetto-mysql"
$ps = "chetto-prestashop"
$db = "prestashop"
$dbRootUser = "root"
$dbRootPass = "admin"

if (-not (Test-Path $sqlHost)) {
    throw "No existe $sqlHost"
}

docker cp -- $sqlHost "${mysql}:/tmp/post-import-localhost.sql"
docker exec $mysql sh -c "mysql -u$dbRootUser -p$dbRootPass $db < /tmp/post-import-localhost.sql"
docker exec $mysql rm -f /tmp/post-import-localhost.sql

docker exec $ps sh -c "rm -rf /var/www/html/var/cache/prod /var/www/html/var/cache/dev 2>/dev/null; true"
docker exec $ps chown -R www-data:www-data /var/www/html/var
docker exec $ps chmod -R 775 /var/www/html/var

Write-Host "Listo: dominio local aplicado y caché limpiada. Abre http://localhost:8090"
