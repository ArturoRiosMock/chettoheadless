<?php
/**
 * Corrige el error al entrar al back office: "Undefined array key 0" en Employee::getDefaultShopID().
 * Ocurre cuando el empleado no es superadmin y no tiene la tienda por defecto (PS_SHOP_DEFAULT)
 * en ps_employee_shop, o solo tiene filas hacia tiendas borradas/inexistentes.
 *
 * Uso:
 *   docker exec chetto-prestashop php /var/www/html/scripts/fix-employee-shop.php agarzon@highdatanet.com
 */
declare(strict_types=1);

require_once '/var/www/html/config/config.inc.php';

$email = isset($argv[1]) ? trim((string) $argv[1]) : '';
if ($email === '' || !Validate::isEmail($email)) {
    fwrite(STDERR, "Uso: php fix-employee-shop.php email@dominio.com\n");
    exit(1);
}

$row = Db::getInstance()->getRow(
    'SELECT `id_employee`, `id_profile`, `active` FROM `' . _DB_PREFIX_ . 'employee` WHERE `email` = \'' . pSQL($email) . '\''
);
if (!$row) {
    fwrite(STDERR, "No existe empleado con email: {$email}\n");
    exit(1);
}

$idEmployee = (int) $row['id_employee'];
$idProfile = (int) $row['id_profile'];
$isSuper = $idProfile === (int) _PS_ADMIN_PROFILE_;

echo "Empleado id={$idEmployee} email={$email} id_profile={$idProfile} superadmin=" . ($isSuper ? 'sí' : 'no') . "\n";

$idDefault = (int) Configuration::get('PS_SHOP_DEFAULT');
if ($idDefault < 1) {
    $idDefault = 1;
}

$validShopIds = array_map(
    'intval',
    array_column(
        Db::getInstance()->executeS(
            'SELECT `id_shop` FROM `' . _DB_PREFIX_ . 'shop` WHERE `deleted` = 0 ORDER BY `id_shop` ASC'
        ) ?: [],
        'id_shop'
    )
);
if ($validShopIds === []) {
    fwrite(STDERR, "ERROR: No hay tiendas activas en ps_shop.\n");
    exit(1);
}

if (!in_array($idDefault, $validShopIds, true)) {
    $fallback = $validShopIds[0];
    echo "[AVISO] PS_SHOP_DEFAULT={$idDefault} no coincide con ninguna tienda activa; usando id_shop={$fallback}\n";
    $idDefault = $fallback;
}

$linked = Db::getInstance()->executeS(
    'SELECT `id_shop` FROM `' . _DB_PREFIX_ . 'employee_shop` WHERE `id_employee` = ' . $idEmployee
) ?: [];
$linkedIds = array_map('intval', array_column($linked, 'id_shop'));
echo 'Tiendas en employee_shop (antes): ' . ($linkedIds === [] ? '(vacío)' : implode(', ', $linkedIds)) . "\n";

$orphans = array_diff($linkedIds, $validShopIds);
foreach ($orphans as $badShop) {
    Db::getInstance()->delete(
        'employee_shop',
        '`id_employee` = ' . $idEmployee . ' AND `id_shop` = ' . (int) $badShop
    );
    echo "[OK] Eliminada asociación huérfana id_shop={$badShop}\n";
}

if ($orphans !== []) {
    $linked = Db::getInstance()->executeS(
        'SELECT `id_shop` FROM `' . _DB_PREFIX_ . 'employee_shop` WHERE `id_employee` = ' . $idEmployee
    ) ?: [];
    $linkedIds = array_map('intval', array_column($linked, 'id_shop'));
}

$hasDefault = in_array($idDefault, $linkedIds, true);

if (!$isSuper && ($linkedIds === [] || !$hasDefault)) {
    $exists = (bool) Db::getInstance()->getValue(
        'SELECT 1 FROM `' . _DB_PREFIX_ . 'employee_shop` WHERE `id_employee` = ' . $idEmployee . ' AND `id_shop` = ' . $idDefault
    );
    if (!$exists) {
        Db::getInstance()->insert('employee_shop', [
            'id_employee' => $idEmployee,
            'id_shop' => $idDefault,
        ]);
        echo "[OK] Añadida fila employee_shop: id_employee={$idEmployee} id_shop={$idDefault}\n";
    }
} elseif ($isSuper) {
    echo "Superadmin: no es obligatoria la fila en employee_shop para getDefaultShopID(), pero se mantienen asociaciones.\n";
    if ($linkedIds === []) {
        $exists = (bool) Db::getInstance()->getValue(
            'SELECT 1 FROM `' . _DB_PREFIX_ . 'employee_shop` WHERE `id_employee` = ' . $idEmployee . ' AND `id_shop` = ' . $idDefault
        );
        if (!$exists) {
            Db::getInstance()->insert('employee_shop', [
                'id_employee' => $idEmployee,
                'id_shop' => $idDefault,
            ]);
            echo "[OK] Añadida asociación por consistencia (employee_shop vacío): id_shop={$idDefault}\n";
        }
    }
}

$final = Db::getInstance()->executeS(
    'SELECT `id_shop` FROM `' . _DB_PREFIX_ . 'employee_shop` WHERE `id_employee` = ' . $idEmployee
) ?: [];
$finalIds = array_map('intval', array_column($final, 'id_shop'));
echo 'Tiendas en employee_shop (después): ' . ($finalIds === [] ? '(vacío)' : implode(', ', $finalIds)) . "\n";

$employee = new Employee($idEmployee);
$shops = $employee->getAssociatedShops();
echo 'getAssociatedShops(): ' . json_encode($shops) . "\n";
echo 'getDefaultShopID(): ' . $employee->getDefaultShopID() . "\n";

echo "\nLimpia caché si sigue fallando:\n";
echo "docker exec chetto-prestashop bash -c \"rm -rf /var/www/html/var/cache/* && chown -R www-data:www-data /var/www/html/var\"\n";
