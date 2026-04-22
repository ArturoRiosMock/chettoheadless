<#
.SYNOPSIS
  Importa un dump .sql, .sql.bz2 o .sql.gz en el MySQL de Docker (chetto-mysql), recreando la BD `prestashop`.

.DESCRIPTION
  1) Arranca solo el servicio mysql (docker compose up -d mysql).
  2) Espera a que MySQL responda.
  3) DROP + CREATE base prestashop.
  4) Copia el SQL al contenedor e importa con el cliente mysql.
  5) Opcionalmente levanta el resto del stack (-UpAll).

  No incluyas dumps en el repositorio Git.

.PARAMETER DumpPath
  Ruta al fichero .sql, .sql.bz2 o .sql.gz (ej. $env:USERPROFILE\Downloads\backup.sql.bz2).

.PARAMETER UpAll
  Tras importar, ejecuta docker compose up -d (PrestaShop + phpMyAdmin).

.PARAMETER SkipValidation
  No comprobar que el SQL parezca un dump completo de PrestaShop (solo si sabes lo que haces).

.EXAMPLE
  .\scripts\import-mysql-dump.ps1 -DumpPath "$env:USERPROFILE\Downloads\backup.sql.bz2" -UpAll
#>
param(
    [Parameter(Mandatory = $true)]
    [string] $DumpPath,
    [switch] $UpAll,
    [switch] $SkipValidation
)

$ErrorActionPreference = "Stop"
$composeRoot = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
if (-not (Test-Path (Join-Path $composeRoot "docker-compose.yml"))) {
    throw "No se encontró docker-compose.yml en $composeRoot"
}

$mysql = "chetto-mysql"
$db = "prestashop"
# Evitar $user / $pass: en algunos hosts se expanden mal o chocan con variables del entorno.
$dbRootUser = "root"
$dbRootPass = "admin"

if (-not (Test-Path -LiteralPath $DumpPath)) {
    throw "No existe el fichero: $DumpPath"
}

function Test-PrestaShopDumpFile {
    <#
    .SYNOPSIS
      Comprueba que el .sql parezca un volcado completo (tablas core como ps_configuration).
    #>
    param(
        [Parameter(Mandatory = $true)]
        [string] $SqlPath
    )
    $hasConfiguration = $false
    $hasShopUrl = $false
    $createCount = 0
    $reader = [System.IO.StreamReader]::new($SqlPath)
    try {
        while (-not $reader.EndOfStream) {
            $line = $reader.ReadLine()
            if ($line -match '^\s*CREATE\s+TABLE') {
                $createCount++
            }
            # -match: backtick no es especial en regex .NET; -like con ` en el patrón fallaba en PS.
            if ($line -match 'CREATE TABLE `ps_configuration`') {
                $hasConfiguration = $true
            }
            if ($line -match 'CREATE TABLE `ps_shop_url`') {
                $hasShopUrl = $true
            }
        }
    }
    finally {
        $reader.Close()
    }
    return [pscustomobject]@{
        CreateTableCount   = $createCount
        HasPsConfiguration = $hasConfiguration
        HasPsShopUrl       = $hasShopUrl
    }
}

function Convert-WindowsPathToWslPath {
    param([Parameter(Mandatory = $true)][string] $WindowsPath)
    # GetFullPath normaliza rutas aunque el fichero aún no exista (p. ej. dump.sql temporal).
    $full = [System.IO.Path]::GetFullPath($WindowsPath)
    if ($full -notmatch '^([A-Za-z]):\\(.*)$') {
        throw "Ruta no soportada para WSL: $WindowsPath"
    }
    $drive = $Matches[1].ToLower()
    $rest = ($Matches[2] -replace '\\', '/')
    return "/mnt/$drive/$rest"
}

function Get-7ZipExecutable {
    foreach ($p in @(
            "${env:ProgramFiles}\7-Zip\7z.exe",
            "${env:ProgramFiles(x86)}\7-Zip\7z.exe",
            "$env:LOCALAPPDATA\Programs\7-Zip\7z.exe"
        )) {
        if ($p -and (Test-Path -LiteralPath $p)) { return $p }
    }
    if ($env:SEVEN_ZIP_PATH -and (Test-Path -LiteralPath $env:SEVEN_ZIP_PATH)) {
        return $env:SEVEN_ZIP_PATH
    }
    return $null
}

$sqlWork = $DumpPath
$cleanupExtractDir = $null
if ($DumpPath -match '\.bz2$') {
    $sevenZip = Get-7ZipExecutable
    $tmpDir = Join-Path $env:TEMP ("ps-import-" + [Guid]::NewGuid().ToString("n"))
    New-Item -ItemType Directory -Path $tmpDir | Out-Null
    try {
        if ($sevenZip) {
            & $sevenZip e "-o$tmpDir" $DumpPath "-y" | Out-Null
        }
        else {
            $py = Get-Command python.exe -ErrorAction SilentlyContinue
            if ($py) {
                $sqlOutWin = Join-Path $tmpDir "dump.sql"
                $dpEsc = $DumpPath.Replace("'", "''")
                $outEsc = $sqlOutWin.Replace("'", "''")
                python.exe -c "import bz2, shutil, pathlib; p=pathlib.Path(r'$dpEsc'); o=pathlib.Path(r'$outEsc'); shutil.copyfileobj(bz2.open(p,'rb'), o.open('wb'), length=1024*1024)"
                if ($LASTEXITCODE -ne 0) {
                    throw "Python no pudo descomprimir el .bz2. Instala 7-Zip o descomprime manualmente a .sql."
                }
            }
            else {
                $wsl = Get-Command wsl.exe -ErrorAction SilentlyContinue
                if (-not $wsl) {
                    throw "Para .bz2: instala 7-Zip, Python, o WSL con bunzip2; o descomprime manualmente a .sql."
                }
                $wslp = Convert-WindowsPathToWslPath $DumpPath
                $sqlOutWin = Join-Path $tmpDir "dump.sql"
                $wOut = Convert-WindowsPathToWslPath $sqlOutWin
                $wParent = Convert-WindowsPathToWslPath $tmpDir
                wsl sh -c "mkdir -p `"$wParent`" && bunzip2 -c `"$wslp`" > `"$wOut`"" | Out-Null
                if ($LASTEXITCODE -ne 0) {
                    throw "WSL bunzip2 falló. Instala Python o 7-Zip, o descomprime el .bz2 a .sql manualmente."
                }
            }
        }
        $found = Get-ChildItem -Path $tmpDir -Filter *.sql -File | Select-Object -First 1
        if (-not $found) {
            throw "No se generó ningún .sql en $tmpDir (revisa 7-Zip / WSL)."
        }
        $sqlWork = $found.FullName
        $cleanupExtractDir = $tmpDir
    }
    catch {
        Remove-Item -Recurse -Force $tmpDir -ErrorAction SilentlyContinue
        throw
    }
}
elseif ($DumpPath -match '\.gz$') {
    $sevenZip = Get-7ZipExecutable
    $tmpDir = Join-Path $env:TEMP ("ps-import-" + [Guid]::NewGuid().ToString("n"))
    New-Item -ItemType Directory -Path $tmpDir | Out-Null
    try {
        if ($sevenZip) {
            & $sevenZip e "-o$tmpDir" $DumpPath "-y" | Out-Null
        }
        else {
            $py = Get-Command python.exe -ErrorAction SilentlyContinue
            if ($py) {
                $sqlOutWin = Join-Path $tmpDir "dump.sql"
                $dpEsc = $DumpPath.Replace("'", "''")
                $outEsc = $sqlOutWin.Replace("'", "''")
                python.exe -c "import gzip, shutil, pathlib; p=pathlib.Path(r'$dpEsc'); o=pathlib.Path(r'$outEsc'); shutil.copyfileobj(gzip.open(p,'rb'), o.open('wb'), length=1024*1024)"
                if ($LASTEXITCODE -ne 0) {
                    throw "Python no pudo descomprimir el .gz. Instala 7-Zip o descomprime manualmente a .sql."
                }
            }
            else {
                $wsl = Get-Command wsl.exe -ErrorAction SilentlyContinue
                if (-not $wsl) {
                    throw "Para .gz: instala 7-Zip, Python, o WSL con gunzip; o descomprime manualmente a .sql."
                }
                $wslp = Convert-WindowsPathToWslPath $DumpPath
                $sqlOutWin = Join-Path $tmpDir "dump.sql"
                $wOut = Convert-WindowsPathToWslPath $sqlOutWin
                $wParent = Convert-WindowsPathToWslPath $tmpDir
                wsl sh -c "mkdir -p `"$wParent`" && gunzip -c `"$wslp`" > `"$wOut`"" | Out-Null
                if ($LASTEXITCODE -ne 0) {
                    throw "WSL gunzip falló. Instala Python o 7-Zip, o descomprime el .gz a .sql manualmente."
                }
            }
        }
        $found = Get-ChildItem -Path $tmpDir -Filter *.sql -File | Select-Object -First 1
        if (-not $found) {
            throw "No se generó ningún .sql en $tmpDir (revisa 7-Zip / WSL / contenido del .gz)."
        }
        $sqlWork = $found.FullName
        $cleanupExtractDir = $tmpDir
    }
    catch {
        Remove-Item -Recurse -Force $tmpDir -ErrorAction SilentlyContinue
        throw
    }
}

if (-not $SkipValidation) {
    Write-Host "Validando dump (tablas CREATE TABLE y presencia de tablas core)..."
    $check = Test-PrestaShopDumpFile -SqlPath $sqlWork
    Write-Host ("  CREATE TABLE encontrados: {0}" -f $check.CreateTableCount)
    if (-not $check.HasPsConfiguration -or $check.CreateTableCount -lt 100) {
        throw @"
Este fichero NO parece un dump usable de PrestaShop (falta ps_configuration o pocas tablas).

- CREATE TABLE: $($check.CreateTableCount) (una tienda completa suele tener 250+ tablas)
- ps_configuration: $($check.HasPsConfiguration)
- ps_shop_url: $($check.HasPsShopUrl)

En phpMyAdmin en producción: Exportar → método rápido (base entera) o Personalizado con TODAS las tablas marcadas. Alternativa: mysqldump de la base entera desde SSH.

Si insistes en importar: -SkipValidation
"@
    }
    if (-not $check.HasPsShopUrl) {
        Write-Warning "El dump no incluye la tabla ps_shop_url (CREATE). Tras importar, revisa ps_shop_url en MySQL o vuelve a exportar."
    }
    Write-Host "Validación OK."
}

Write-Host "Compose: $composeRoot"
Push-Location $composeRoot
try {
    docker compose up -d mysql
}
finally {
    Pop-Location
}

Write-Host "Esperando a MySQL..."
Start-Sleep -Seconds 3
$deadline = (Get-Date).AddMinutes(15)
$prevEap = $ErrorActionPreference
$ErrorActionPreference = "SilentlyContinue"
try {
    do {
        $one = (docker exec $mysql mysql "-u$dbRootUser" "-p$dbRootPass" -N -e "SELECT 1" 2>$null | Select-Object -First 1)
        if (($one | Out-String).Trim() -eq "1") { break }
        if ((Get-Date) -gt $deadline) { throw "MySQL no respondió a tiempo (revisa: docker ps, docker logs $mysql)." }
        Start-Sleep -Seconds 2
    } while ($true)
}
finally {
    $ErrorActionPreference = $prevEap
}
Write-Host "MySQL listo."

$sqlInContainer = "/tmp/dump_import.sql"
docker cp -- $sqlWork "${mysql}:${sqlInContainer}"

$dropCreate = "DROP DATABASE IF EXISTS $db; CREATE DATABASE $db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
docker exec $mysql mysql "-u$dbRootUser" "-p$dbRootPass" -e $dropCreate

Write-Host "Importando (puede tardar varios minutos)..."
docker exec $mysql sh -c "mysql -u$dbRootUser -p$dbRootPass $db < $sqlInContainer"
$importExit = $LASTEXITCODE
docker exec $mysql rm -f $sqlInContainer
if ($importExit -ne 0) {
    throw "mysql terminó con código $importExit (revisa el SQL y la versión de MySQL)."
}
if ($cleanupExtractDir) {
    Remove-Item -Recurse -Force $cleanupExtractDir -ErrorAction SilentlyContinue
}

Write-Host "Importación terminada."

if ($UpAll) {
    Push-Location $composeRoot
    try {
        docker compose up -d
    }
    finally {
        Pop-Location
    }
    Write-Host "Stack levantado. Siguiente: scripts\post-import-localhost.ps1 y copiar /img desde producción."
}
