<?php

require_once '/var/www/html/config/config.inc.php';

$configs = [
    'CHETTO_ANNOUNCE_PHONE' => '+34 660 132 249',
    'CHETTO_ANNOUNCE_EMAIL' => 'Tienda@chetto.es',
    'CHETTO_ANNOUNCE_ABOUT_TEXT' => 'Sobre Nosotros',
    'CHETTO_ANNOUNCE_ABOUT_URL' => '/sobre-nosotros',
    'CHETTO_ANNOUNCE_STORES_TEXT' => 'Nuestras tiendas',
    'CHETTO_ANNOUNCE_STORES_URL' => '/tiendas',
    'CHETTO_TESTIMONIALS_TITLE' => 'Familias Felices',
    'CHETTO_TESTIMONIALS_SUBTITLE' => 'Lo que dicen nuestros clientes sobre el calzado barefoot',
];

foreach ($configs as $key => $value) {
    $existing = Configuration::get($key);
    if (empty($existing)) {
        Configuration::updateValue($key, $value);
        echo "SET $key = $value\n";
    } else {
        echo "SKIP $key (already: $existing)\n";
    }
}

echo "\nDone.\n";
