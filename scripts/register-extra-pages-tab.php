<?php

require_once '/var/www/html/config/config.inc.php';

$db = Db::getInstance();

$defaults = [
    'CHETTO_SZ_CTA_TITLE' => '¿Necesitas ayuda con las tallas?',
    'CHETTO_SZ_CTA_DESC' => 'Nuestro equipo está aquí para ayudarte a elegir la talla perfecta',
    'CHETTO_SZ_CTA_BUTTON' => 'Contactar con atención al cliente',
    'CHETTO_CS_PHONE' => '660 132 049',
    'CHETTO_CS_EMAIL' => 'tienda@chetto.es',
    'CHETTO_CS_HOURS_WEEKDAY' => 'Lunes - Viernes: 9:00 - 18:00h',
    'CHETTO_CS_HOURS_SAT' => 'Sábados: 10:00 - 14:00h',
    'CHETTO_CS_COMMIT_DESC' => 'En Chetto, tu satisfacción es nuestra prioridad. Nuestro equipo de atención al cliente está formado por expertos en calzado barefoot que están aquí para resolver todas tus dudas y asegurarse de que encuentres el calzado perfecto para tus hijos.',
    'CHETTO_CONTACT_PHONE' => '660 132 049',
    'CHETTO_CONTACT_EMAIL' => 'tienda@chetto.es',
    'CHETTO_STORES_TITLE' => 'Mapa de tiendas',
    'CHETTO_ABOUT_CTA_TITLE' => '¡Ojalá te enamores de Chetto tanto como lo estamos nosotros!',
    'CHETTO_ABOUT_CTA_DESC' => 'Descubre nuestra colección de calzado barefoot para niños',
];

foreach ($defaults as $key => $value) {
    if (!Configuration::get($key)) {
        Configuration::updateValue($key, $value);
        echo "  Config: $key = OK\n";
    } else {
        echo "  Config: $key ya existe\n";
    }
}

$globalParentId = (int) Tab::getIdFromClassName('AdminChettoGlobalParent');
if (!$globalParentId) {
    echo "ERROR: No se encontró AdminChettoGlobalParent\n";
    exit(1);
}

$existingId = (int) Tab::getIdFromClassName('AdminChettoExtraPages');
if ($existingId) {
    echo "Tab AdminChettoExtraPages ya existe (id=$existingId)\n";
} else {
    $tab = new Tab();
    $tab->active = 1;
    $tab->class_name = 'AdminChettoExtraPages';
    $tab->name = [];
    foreach (Language::getLanguages(true) as $lang) {
        $tab->name[$lang['id_lang']] = 'Paginas Extra';
    }
    $tab->id_parent = $globalParentId;
    $tab->module = 'chettoheadless';
    $tab->position = 3;

    if ($tab->add()) {
        echo "Tab AdminChettoExtraPages creado (id={$tab->id})\n";
    } else {
        echo "ERROR al crear tab AdminChettoExtraPages\n";
    }
}

echo "\nDone!\n";
