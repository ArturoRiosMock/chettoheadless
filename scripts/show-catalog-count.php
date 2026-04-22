<?php
/**
 * Muestra cuántos productos hay en la BD (no es un fallo del BO: si aquí sale ~19, falta importar el dump completo).
 *
 * Uso: docker exec chetto-prestashop php /var/www/html/scripts/show-catalog-count.php
 */
declare(strict_types=1);

require_once '/var/www/html/config/config.inc.php';

$p = (int) Db::getInstance()->getValue('SELECT COUNT(*) FROM `' . _DB_PREFIX_ . 'product`');
$ps = (int) Db::getInstance()->getValue('SELECT COUNT(*) FROM `' . _DB_PREFIX_ . 'product_shop` WHERE id_shop = ' . (int) Configuration::get('PS_SHOP_DEFAULT'));
$o = (int) Db::getInstance()->getValue('SELECT COUNT(*) FROM `' . _DB_PREFIX_ . 'orders`');

echo "ps_product:           {$p}\n";
echo "ps_product_shop (default shop): {$ps}\n";
echo "ps_orders:            {$o}\n";
