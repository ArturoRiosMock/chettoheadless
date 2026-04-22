<?php
/**
 * Añade permisos POST/PUT para migración vía API a todas las claves webservice existentes.
 * No crea claves nuevas (no invalida tu .env.local).
 *
 * Uso: docker exec chetto-prestashop php /var/www/html/scripts/grant-webservice-migration-write.php
 */

require_once '/var/www/html/config/config.inc.php';

// Recursos que deben permitir lectura (GET/HEAD) y escritura (POST/PUT) para la migración completa.
$readWriteResources = [
    // Catálogo
    'manufacturers', 'suppliers', 'categories', 'products',
    'combinations', 'stock_availables', 'images',
    'product_option_values', 'product_options',
    'product_features', 'product_feature_values',
    'specific_prices', 'specific_price_rules',
    // Atributos via alias API
    'attributes', 'attribute_groups',
    // Clientes, pedidos, carrito
    'customers', 'addresses', 'orders', 'order_details', 'carts',
    'order_states', 'order_histories', 'order_carriers',
    'order_invoices', 'order_slip', 'messages',
    // Datos referencia / fiscalidad / zonas / envíos
    'groups', 'taxes', 'tax_rules', 'tax_rule_groups',
    'carriers', 'zones', 'countries', 'states',
    // Tienda / idiomas / moneda
    'languages', 'currencies', 'shops', 'shop_groups', 'shop_urls',
    // Misceláneo útil para validación
    'employees', 'contacts', 'configurations',
];
$methods = ['GET', 'HEAD', 'POST', 'PUT'];

$rows = Db::getInstance()->executeS(
    'SELECT `id_webservice_account` FROM `' . _DB_PREFIX_ . 'webservice_account`'
);
if (!$rows) {
    echo "[WARN] No hay claves webservice.\n";
    exit(0);
}

// DELETE: recursos donde permitimos borrar (para rollback + limpieza pre-import).
$deleteResources = [
    'products', 'combinations', 'stock_availables', 'images',
    'categories', 'manufacturers',
    'product_option_values', 'product_options',
    'specific_prices',
    'customers', 'addresses', 'orders', 'carts',
];

foreach ($rows as $row) {
    $idKey = (int) $row['id_webservice_account'];
    $added = 0;
    foreach ($readWriteResources as $resource) {
        foreach ($methods as $method) {
            $n = (int) Db::getInstance()->getValue(
                'SELECT COUNT(*) FROM `' . _DB_PREFIX_ . 'webservice_permission` WHERE `id_webservice_account`=' . $idKey
                . " AND `resource`='" . pSQL($resource) . "' AND `method`='" . pSQL($method) . "'"
            );
            if ($n > 0) {
                continue;
            }
            Db::getInstance()->execute(
                'INSERT INTO `' . _DB_PREFIX_ . 'webservice_permission` (`id_webservice_account`, `resource`, `method`) VALUES ('
                . $idKey . ", '" . pSQL($resource) . "', '" . pSQL($method) . "')"
            );
            $added++;
        }
    }
    foreach ($deleteResources as $resource) {
        $nDel = (int) Db::getInstance()->getValue(
            'SELECT COUNT(*) FROM `' . _DB_PREFIX_ . 'webservice_permission` WHERE `id_webservice_account`=' . $idKey
            . " AND `resource`='" . pSQL($resource) . "' AND `method`='DELETE'"
        );
        if ($nDel === 0) {
            Db::getInstance()->execute(
                'INSERT INTO `' . _DB_PREFIX_ . 'webservice_permission` (`id_webservice_account`, `resource`, `method`) VALUES ('
                . $idKey . ", '" . pSQL($resource) . "', 'DELETE')"
            );
            $added++;
        }
    }
    echo "[+] key_id=$idKey  permisos añadidos: $added\n";
}

echo "\n[OK] Permisos de escritura migración aplicados.\n";
