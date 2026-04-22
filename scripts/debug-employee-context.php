<?php
declare(strict_types=1);
require_once '/var/www/html/config/config.inc.php';

$email = $argv[1] ?? 'agarzon@highdatanet.com';
$row = Db::getInstance()->getRow(
    'SELECT id_employee FROM `' . _DB_PREFIX_ . 'employee` WHERE email = \'' . pSQL($email) . '\''
);
$id = (int) ($row['id_employee'] ?? 0);
$e = new Employee($id);
echo 'id=' . $e->id . ' id_profile=' . $e->id_profile . ' _PS_ADMIN_PROFILE_=' . _PS_ADMIN_PROFILE_ . "\n";
echo 'isSuperAdmin=' . ($e->isSuperAdmin() ? '1' : '0') . "\n";
echo 'associated=' . json_encode($e->getAssociatedShops()) . "\n";
echo 'getDefaultShopID=' . $e->getDefaultShopID() . "\n";
echo 'hasAuthOnShop(1)=' . ($e->hasAuthOnShop(1) ? '1' : '0') . "\n";
