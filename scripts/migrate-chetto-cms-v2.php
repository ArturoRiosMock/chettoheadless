<?php
/**
 * Idempotent: crea tablas nuevas del CMS Chetto (nav, footer, FAQ, page blocks, tiendas, overlay PDP).
 * Ajusta _PS_ADMIN_DIR_ y require si tu PrestaShop no está en /var/www/html.
 */
define('_PS_ADMIN_DIR_', '/var/www/html/admin');
require '/var/www/html/config/config.inc.php';

$sqlFile = dirname(__DIR__) . '/modules/chettoheadless/sql/patch_cms_extended.sql';
if (!is_readable($sqlFile)) {
    echo "ERROR: No se encuentra $sqlFile\n";
    exit(1);
}

$sql = file_get_contents($sqlFile);
$sql = str_replace('PREFIX_', _DB_PREFIX_, $sql);
$sql = str_replace('ENGINE_TYPE', _MYSQL_ENGINE_, $sql);
$queries = preg_split('/;\s*[\r\n]+/', $sql);

foreach ($queries as $query) {
    $query = trim($query);
    if ($query === '') {
        continue;
    }
    if (!Db::getInstance()->execute($query)) {
        echo "ERROR ejecutando SQL:\n$query\n";
        exit(1);
    }
}

echo "Tablas CMS extendidas verificadas/creadas correctamente.\n";
echo "Registra las pestañas del admin desde el backoffice (reinstalar módulo) o crea las pestañas manualmente si faltan.\n";
