<?php
/**
 * Define CHETTO_HEADLESS_CART_TOKEN en PrestaShop si falta (mismo valor que PRESTASHOP_CART_SYNC_TOKEN en Next).
 *
 * docker exec chetto-prestashop php /var/www/html/scripts/ensure-cart-sync-token.php
 */
require_once dirname(__DIR__) . '/config/config.inc.php';

if (!Configuration::get('CHETTO_HEADLESS_CART_TOKEN')) {
    Configuration::updateValue('CHETTO_HEADLESS_CART_TOKEN', 'chetto_cart_sync_dev_change_me');
    fwrite(STDOUT, "OK: CHETTO_HEADLESS_CART_TOKEN = chetto_cart_sync_dev_change_me (ajusta en BO o en .env.local)\n");
} else {
    fwrite(STDOUT, "CHETTO_HEADLESS_CART_TOKEN ya existe (no se modificó).\n");
}
