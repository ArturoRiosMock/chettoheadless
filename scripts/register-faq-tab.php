<?php
require_once '/var/www/html/config/config.inc.php';

echo "=== Registrando tab FAQ ===\n";

$globalParentId = (int) Tab::getIdFromClassName('AdminChettoGlobalParent');
if (!$globalParentId) {
    echo "  ERROR: No se encontro AdminChettoGlobalParent\n";
    exit(1);
}
echo "  Parent Global id=$globalParentId\n";

$childClassName = 'AdminChettoFaq';
$childId = (int) Tab::getIdFromClassName($childClassName);
if (!$childId) {
    $child = new Tab();
    $child->active = 1;
    $child->class_name = $childClassName;
    $child->name = [];
    foreach (Language::getLanguages(true) as $lang) {
        $child->name[$lang['id_lang']] = 'Pagina FAQ';
    }
    $child->id_parent = $globalParentId;
    $child->module = 'chettoheadless';
    $child->position = 2;
    if ($child->add()) {
        echo "  Creado AdminChettoFaq\n";
    } else {
        echo "  ERROR creando AdminChettoFaq\n";
    }
} else {
    echo "  AdminChettoFaq ya existe\n";
}

$defaults = [
    'CHETTO_FAQ_CTA_TITLE' => 'No encuentras lo que buscas?',
    'CHETTO_FAQ_CTA_DESC' => 'Nuestro equipo de atencion al cliente estara encantado de ayudarte',
    'CHETTO_FAQ_CTA_BUTTON' => 'Contactar con nosotros',
];

foreach ($defaults as $key => $val) {
    if (!Configuration::get($key)) {
        Configuration::updateValue($key, $val);
        echo "  Config: $key\n";
    }
}

echo "\n=== Completado ===\n";
