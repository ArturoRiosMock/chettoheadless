<?php
require_once '/var/www/html/config/config.inc.php';

echo "=== Registrando pestañas CMS extendidas (nav, footer links, bloques, tiendas, overlay) ===\n";

$globalParentId = (int) Tab::getIdFromClassName('AdminChettoGlobalParent');
$productParentId = (int) Tab::getIdFromClassName('AdminChettoProductParent');
if (!$globalParentId) {
    echo "ERROR: No se encontró AdminChettoGlobalParent\n";
    exit(1);
}
if (!$productParentId) {
    echo "ERROR: No se encontró AdminChettoProductParent\n";
    exit(1);
}

$toAdd = [
    ['class' => 'AdminChettoNav', 'name' => 'Menu principal', 'parent' => $globalParentId],
    ['class' => 'AdminChettoFooterLinks', 'name' => 'Enlaces footer', 'parent' => $globalParentId],
    ['class' => 'AdminChettoPageBlocks', 'name' => 'Bloques paginas info', 'parent' => $globalParentId],
    ['class' => 'AdminChettoStores', 'name' => 'Tiendas', 'parent' => $globalParentId],
    ['class' => 'AdminChettoProductOverlay', 'name' => 'Overlays PDP', 'parent' => $productParentId],
];

foreach ($toAdd as $t) {
    $id = (int) Tab::getIdFromClassName($t['class']);
    if ($id) {
        echo "  {$t['class']} ya existe (id=$id)\n";
        continue;
    }
    $tab = new Tab();
    $tab->active = 1;
    $tab->class_name = $t['class'];
    $tab->name = [];
    foreach (Language::getLanguages(true) as $lang) {
        $tab->name[$lang['id_lang']] = $t['name'];
    }
    $tab->id_parent = (int) $t['parent'];
    $tab->module = 'chettoheadless';
    if ($tab->add()) {
        echo "  Creado {$t['class']}\n";
    } else {
        echo "  ERROR creando {$t['class']}\n";
    }
}

echo "\n=== Completado ===\n";
