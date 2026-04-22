<?php
/**
 * Desactiva el modo demostración en config/defines.inc.php para poder guardar
 * cambios en el back office (Webservice, Rendimiento, etc.).
 *
 * Uso: docker exec chetto-prestashop php /var/www/html/scripts/disable-prestashop-demo-mode.php
 */

$files = [
    '/var/www/html/config/defines.inc.php',
    '/var/www/html/config/defines.inc.phpe',
];

foreach ($files as $path) {
    if (!is_file($path)) {
        continue;
    }
    $c = file_get_contents($path);
    $orig = $c;
    $c = str_replace("define('_PS_MODE_DEMO_', true);", "define('_PS_MODE_DEMO_', false);", $c);
    if ($c !== $orig) {
        file_put_contents($path, $c);
        echo "[OK] Actualizado: $path\n";
    } else {
        echo "[--] Sin cambios (ya false o distinto formato): $path\n";
    }
}

echo "\nRecomendado: borrar caché (botón en Rendimiento o rm -rf var/cache/*).\n";
