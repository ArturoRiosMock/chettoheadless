<?php
/**
 * CLI: total TTC del carrito tal como lo redondea PaymentModule::validateOrder.
 * Uso: php cart_order_total.php <id_cart>
 * Montaje Docker: ./scripts -> /var/www/html/scripts
 */
declare(strict_types=1);

require dirname(__DIR__) . '/config/config.inc.php';

$idCart = isset($argv[1]) ? (int) $argv[1] : 0;
if ($idCart <= 0) {
    fwrite(STDERR, "usage: php cart_order_total.php <id_cart>\n");
    exit(1);
}

$cart = new Cart($idCart);
if (!Validate::isLoadedObject($cart)) {
    fwrite(STDERR, "cart not found\n");
    exit(2);
}

$context = Context::getContext();
$context->cart = $cart;
$context->customer = new Customer((int) $cart->id_customer);
$context->language = new Language((int) $cart->id_lang);
$context->shop = new Shop((int) $cart->id_shop);
$context->currency = new Currency((int) $cart->id_currency, null, (int) $context->shop->id);
$cart->setTaxCalculationMethod();

$precision = (int) $context->getComputingPrecision();
$raw = (float) $cart->getOrderTotal(true, Cart::BOTH);
$rounded = (float) Tools::ps_round($raw, $precision);

echo (string) $rounded;
