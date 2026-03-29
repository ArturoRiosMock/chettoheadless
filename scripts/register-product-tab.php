<?php
require_once '/var/www/html/config/config.inc.php';

echo "=== Registrando tab Pagina de Producto ===\n";

// Create parent "CMS: Producto" if not exists
$parentClassName = 'AdminChettoProductParent';
$parentId = (int) Tab::getIdFromClassName($parentClassName);

if (!$parentId) {
    $improveId = (int) Tab::getIdFromClassName('IMPROVE');
    $tab = new Tab();
    $tab->active = 1;
    $tab->class_name = $parentClassName;
    $tab->name = [];
    foreach (Language::getLanguages(true) as $lang) {
        $tab->name[$lang['id_lang']] = 'CMS: Producto';
    }
    $tab->id_parent = $improveId;
    $tab->module = 'chettoheadless';
    $tab->icon = 'shopping_cart';
    if ($tab->add()) {
        $parentId = $tab->id;
        echo "  Creado CMS: Producto (id=$parentId)\n";
    } else {
        echo "  ERROR creando CMS: Producto\n";
        exit(1);
    }
} else {
    echo "  CMS: Producto ya existe (id=$parentId)\n";
}

// Register child tab
$childClassName = 'AdminChettoProductPage';
$childId = (int) Tab::getIdFromClassName($childClassName);
if (!$childId) {
    $child = new Tab();
    $child->active = 1;
    $child->class_name = $childClassName;
    $child->name = [];
    foreach (Language::getLanguages(true) as $lang) {
        $child->name[$lang['id_lang']] = 'Secciones editables';
    }
    $child->id_parent = $parentId;
    $child->module = 'chettoheadless';
    $child->position = 0;
    if ($child->add()) {
        echo "  Creado AdminChettoProductPage\n";
    } else {
        echo "  ERROR creando AdminChettoProductPage\n";
    }
} else {
    echo "  AdminChettoProductPage ya existe\n";
}

// Set defaults
$defaults = [
    'CHETTO_PDP_SHIPPING_1' => 'Envio gratis y rapido entre 24-48h',
    'CHETTO_PDP_SHIPPING_2' => 'Solo sobre pedido y unidades limitadas',
    'CHETTO_PDP_SHIPPING_3' => 'Cambios y devoluciones gratis 30 dias',
    'CHETTO_PDP_SHIPPING_4' => 'Compra segura con SSL 256bits',
    'CHETTO_PDP_SHIPPING_5' => 'Pago en hasta en 3 cuotas sin intereses',
    'CHETTO_PDP_PACK_TITLE' => 'Oferta Pack con Descuento',
    'CHETTO_PDP_PACK_DESC' => 'Combina y ahorra un 15% comprando estos productos juntos',
    'CHETTO_PDP_RELATED_TITLE' => 'Tambien te puede interesar',
    'CHETTO_PDP_RELATED_SUBTITLE' => 'Descubre mas opciones de calzado barefoot',
];

foreach ($defaults as $key => $val) {
    if (!Configuration::get($key)) {
        Configuration::updateValue($key, $val);
        echo "  Config: $key\n";
    }
}

echo "\n=== Completado ===\n";
