<?php
/**
 * Cambia database_name y database_prefix en app/config/parameters.php (Docker local).
 * Uso: docker exec -u www-data chetto-prestashop php /var/www/html/scripts/switch-prestashop-db.php chetto_produccion ps47f_
 */
$targetDb = $argv[1] ?? 'chetto_produccion';
$targetPrefix = $argv[2] ?? 'ps47f_';

$path = dirname(__DIR__) . '/app/config/parameters.php';
if (!is_readable($path)) {
    fwrite(STDERR, "No existe o no se puede leer: $path\n");
    exit(1);
}

$text = file_get_contents($path);
$orig = $text;

if (preg_match("/'database_name'\\s*=>\\s*'([^']*)'/", $text, $m)) {
    $text = preg_replace(
        "/'database_name'\\s*=>\\s*'[^']*'/",
        "'database_name' => '" . addslashes($targetDb) . "'",
        $text,
        1
    );
}
if (preg_match("/'database_prefix'\\s*=>\\s*'([^']*)'/", $text, $m)) {
    $text = preg_replace(
        "/'database_prefix'\\s*=>\\s*'[^']*'/",
        "'database_prefix' => '" . addslashes($targetPrefix) . "'",
        $text,
        1
    );
}

if ($text === $orig) {
    fwrite(STDERR, "No se aplicaron cambios.\n");
    exit(1);
}

file_put_contents($path, $text);
echo "[OK] database_name => $targetDb, database_prefix => $targetPrefix\n";
