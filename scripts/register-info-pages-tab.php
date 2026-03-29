<?php
require_once '/var/www/html/config/config.inc.php';

echo "=== Registrando tab Paginas Info ===\n";

$globalParentId = (int) Tab::getIdFromClassName('AdminChettoGlobalParent');
if (!$globalParentId) {
    echo "  ERROR: AdminChettoGlobalParent no encontrado\n";
    exit(1);
}

$childClassName = 'AdminChettoInfoPages';
$childId = (int) Tab::getIdFromClassName($childClassName);
if (!$childId) {
    $child = new Tab();
    $child->active = 1;
    $child->class_name = $childClassName;
    $child->name = [];
    foreach (Language::getLanguages(true) as $lang) {
        $child->name[$lang['id_lang']] = 'Paginas Info';
    }
    $child->id_parent = $globalParentId;
    $child->module = 'chettoheadless';
    $child->position = 3;
    if ($child->add()) {
        echo "  Creado AdminChettoInfoPages\n";
    } else {
        echo "  ERROR creando tab\n";
    }
} else {
    echo "  AdminChettoInfoPages ya existe\n";
}

$defaults = [
    'CHETTO_MAT_TITLE' => 'Materiales',
    'CHETTO_MAT_SUBTITLE' => 'Materiales naturales, sostenibles e hipoalergenicos',
    'CHETTO_MAT_INTRO_TITLE' => 'Calidad y sostenibilidad en cada detalle',
    'CHETTO_MAT_INTRO_DESC' => 'En Chetto seleccionamos cuidadosamente cada material.',
    'CHETTO_MAT_COMMIT_TITLE' => 'Nuestro compromiso',
    'CHETTO_MAT_COMMIT_DESC' => 'Trabajamos constantemente para mejorar la sostenibilidad.',
    'CHETTO_ENV_FREE_TEXT' => 'Envio Gratis en pedidos superiores a 60€',
    'CHETTO_ENV_FREE_SUB' => 'Para Espana Peninsular, valido para envio estandar',
    'CHETTO_ENV_INT_TITLE' => 'Envios internacionales?',
    'CHETTO_ENV_INT_DESC' => 'Actualmente solo realizamos envios dentro de Espana.',
    'CHETTO_ENV_CTA_TITLE' => 'Necesitas mas informacion?',
    'CHETTO_ENV_CTA_DESC' => 'Nuestro equipo de atencion al cliente esta disponible.',
    'CHETTO_CARE_INTRO_TITLE' => 'Cuida tus zapatos, cuidan de tus hijos',
    'CHETTO_CARE_INTRO_DESC' => 'El calzado barefoot esta fabricado con materiales naturales de alta calidad.',
    'CHETTO_CARE_REPAIR_TITLE' => 'Servicio de reparacion',
    'CHETTO_CARE_REPAIR_DESC' => 'Ofrecemos servicio de reparacion profesional.',
    'CHETTO_CARE_PRO_TIP' => 'Si tus hijos usan los zapatos en condiciones humedas, te recomendamos tener dos pares y alternarlos.',
];

foreach ($defaults as $key => $val) {
    if (!Configuration::get($key)) {
        Configuration::updateValue($key, $val);
        echo "  Config: $key\n";
    }
}

echo "\n=== Completado ===\n";
