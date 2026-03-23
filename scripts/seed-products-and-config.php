<?php
define('_PS_ADMIN_DIR_', '/var/www/html/admin');
require('/var/www/html/config/config.inc.php');

$db = Db::getInstance();
$now = date('Y-m-d H:i:s');

// ------ Featured Products ------
$featured = [
    ['featured', 'Sneaker Kaki Kids', 'sneaker-kaki-kids', 54.95, null, null, null, 'Nuevo', 4, 'sneakers', 1],
    ['featured', 'Sneaker Maroon', 'sneaker-maroon', 54.95, null, null, null, null, 3, 'sneakers', 2],
    ['featured', 'Sneaker Grey', 'sneaker-grey', 54.95, null, null, null, null, 2, 'sneakers', 3],
    ['featured', 'Sneaker Light Pink', 'sneaker-light-pink', 54.95, null, null, null, 'Nuevo', 3, 'sneakers', 4],
];

$count = (int) $db->getValue('SELECT COUNT(*) FROM `' . _DB_PREFIX_ . 'chetto_homepage_product` WHERE section_type = \'featured\'');
if ($count === 0) {
    foreach ($featured as $p) {
        $db->insert('chetto_homepage_product', [
            'section_type' => $p[0],
            'name' => pSQL($p[1]),
            'slug' => pSQL($p[2]),
            'price' => (float) $p[3],
            'original_price' => $p[4] ? (float) $p[4] : null,
            'discount' => $p[5] ? pSQL($p[5]) : null,
            'image' => $p[6] ? pSQL($p[6]) : '',
            'badge' => $p[7] ? pSQL($p[7]) : null,
            'colors' => $p[8] ? (int) $p[8] : null,
            'category' => pSQL($p[9]),
            'position' => (int) $p[10],
            'active' => 1,
            'date_add' => $now,
            'date_upd' => $now,
        ]);
    }
    echo "Featured products seeded: " . count($featured) . "\n";
} else {
    echo "Featured products already exist ($count)\n";
}

// ------ Favorites Products ------
$favorites = [
    ['favorites', 'Botín Explorador', 'botin-explorador', 52.99, 69.99, '-25%', null, null, null, 'botas', 1],
    ['favorites', 'Sandalia Verano', 'sandalia-verano', 39.99, 54.99, '-27%', null, null, null, 'sandalias', 2],
    ['favorites', 'Casual Clásico', 'casual-clasico', 44.99, 59.99, '-25%', null, null, null, 'casual', 3],
    ['favorites', 'Sneaker Premium', 'sneaker-premium', 49.99, 64.99, '-23%', null, null, null, 'sneakers', 4],
    ['favorites', 'Botín Aventura', 'botin-aventura', 54.99, 74.99, '-27%', null, null, null, 'botas', 5],
    ['favorites', 'Sandalia Minimalista', 'sandalia-minimalista', 36.99, 49.99, '-26%', null, null, null, 'sandalias', 6],
];

$count = (int) $db->getValue('SELECT COUNT(*) FROM `' . _DB_PREFIX_ . 'chetto_homepage_product` WHERE section_type = \'favorites\'');
if ($count === 0) {
    foreach ($favorites as $p) {
        $db->insert('chetto_homepage_product', [
            'section_type' => $p[0],
            'name' => pSQL($p[1]),
            'slug' => pSQL($p[2]),
            'price' => (float) $p[3],
            'original_price' => $p[4] ? (float) $p[4] : null,
            'discount' => $p[5] ? pSQL($p[5]) : null,
            'image' => $p[6] ? pSQL($p[6]) : '',
            'badge' => $p[7] ? pSQL($p[7]) : null,
            'colors' => $p[8] ? (int) $p[8] : null,
            'category' => pSQL($p[9]),
            'position' => (int) $p[10],
            'active' => 1,
            'date_add' => $now,
            'date_upd' => $now,
        ]);
    }
    echo "Favorites products seeded: " . count($favorites) . "\n";
} else {
    echo "Favorites products already exist ($count)\n";
}

// ------ Why Barefoot Features (content_block type) ------
$count = (int) $db->getValue("SELECT COUNT(*) FROM `" . _DB_PREFIX_ . "chetto_content_block` WHERE type = 'why_barefoot_feature'");
if ($count === 0) {
    $whyFeatures = [
        ['Waves', 'Suela Flexible', 'Permite el movimiento natural del pie en todas direcciones.', 1],
        ['ArrowDownToLine', 'Drop Cero', 'Sin desnivel entre talón y puntera para una pisada natural.', 2],
        ['Maximize', 'Horma Amplia', 'Espacio suficiente para que los dedos se muevan libremente.', 3],
    ];
    foreach ($whyFeatures as $f) {
        $db->insert('chetto_content_block', [
            'type' => 'why_barefoot_feature',
            'icon' => pSQL($f[0]),
            'title' => pSQL($f[1]),
            'description' => pSQL($f[2]),
            'position' => (int) $f[3],
            'active' => 1,
            'date_add' => $now,
            'date_upd' => $now,
        ]);
    }
    echo "Why barefoot features seeded: " . count($whyFeatures) . "\n";
} else {
    echo "Why barefoot features already exist ($count)\n";
}

// ------ Configuration keys with defaults ------
$configs = [
    'CHETTO_FEATURED_TITLE' => 'Productos Destacados',
    'CHETTO_FEATURED_SUBTITLE' => 'Lo mejor de nuestra colección barefoot',
    'CHETTO_FEATURED_CTA_TEXT' => 'Ver Todo',
    'CHETTO_FEATURED_CTA_LINK' => '/colecciones',
    'CHETTO_FAVORITES_TITLE' => 'Los favoritos de nuestros clientes',
    'CHETTO_FAVORITES_SUBTITLE' => 'Hasta 27% de descuento en calzado barefoot seleccionado',
    'CHETTO_FAVORITES_CTA_TEXT' => 'Ver Todas las Ofertas',
    'CHETTO_FAVORITES_CTA_LINK' => '/ofertas',
    'CHETTO_BAREFOOT_BADGE' => 'Aprende sobre Barefoot',
    'CHETTO_BAREFOOT_TITLE' => 'Las 3 claves del calzado barefoot',
    'CHETTO_BAREFOOT_DESC' => 'Descubre qué hace que el calzado barefoot sea diferente y por qué es la mejor opción para el desarrollo de tus hijos.',
    'CHETTO_BAREFOOT_LABEL_1' => 'Flexible',
    'CHETTO_BAREFOOT_LABEL_2' => '0mm Drop',
    'CHETTO_BAREFOOT_LABEL_3' => 'Horma Amplia',
    'CHETTO_BAREFOOT_TRAD_BADGE' => 'Calzado Tradicional',
    'CHETTO_BAREFOOT_TRAD_TITLE' => 'Limitaciones',
    'CHETTO_BAREFOOT_BF_BADGE' => 'Calzado Barefoot',
    'CHETTO_BAREFOOT_BF_TITLE' => 'Beneficios',
    'CHETTO_WHY_BADGE' => '¿Por qué Barefoot?',
    'CHETTO_WHY_TITLE' => 'Calzado que respeta el movimiento natural',
    'CHETTO_WHY_DESC' => 'El calzado barefoot está diseñado para imitar la sensación de caminar descalzo, ofreciendo la protección necesaria mientras permite que el pie funcione de forma natural.',
    'CHETTO_WHY_CTA_TITLE' => '¿Tienes dudas sobre el calzado barefoot?',
    'CHETTO_WHY_CTA_DESC' => 'Nuestro equipo está aquí para ayudarte a encontrar el calzado perfecto para tus hijos.',
    'CHETTO_WHY_CTA_TEXT' => 'Hablar con un Experto',
    'CHETTO_WHY_CTA_LINK' => '/contacto',
];

foreach ($configs as $key => $value) {
    $existing = Configuration::get($key);
    if (!$existing) {
        Configuration::updateValue($key, $value);
        echo "Config set: $key\n";
    } else {
        echo "Config exists: $key = $existing\n";
    }
}

echo "\nSeed complete!\n";
