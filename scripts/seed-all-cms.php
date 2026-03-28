<?php
define('_PS_ADMIN_DIR_', '/var/www/html/admin');
require('/var/www/html/config/config.inc.php');

$db = Db::getInstance();
$now = date('Y-m-d H:i:s');
$prefix = _DB_PREFIX_;

// ============================================================
// 1. SLIDES DEL HERO
// ============================================================
$count = (int) $db->getValue("SELECT COUNT(*) FROM `{$prefix}chetto_slide`");
if ($count === 0) {
    $slides = [
        [
            'badge' => 'Ofertas Especiales',
            'subtitle' => 'Camina sin límites',
            'title' => 'Hasta 30% de descuento',
            'description' => 'Calzado barefoot de calidad a precios únicos',
            'cta' => 'Ver Ofertas',
            'cta_link' => '/ofertas',
            'image' => 'hero-home.png',
            'position' => 1,
        ],
        [
            'badge' => 'Nueva Colección',
            'subtitle' => 'Primavera 2026',
            'title' => 'Sneakers para toda la familia',
            'description' => 'Descubre los nuevos modelos de temporada',
            'cta' => 'Explorar',
            'cta_link' => '/colecciones/sneakers',
            'image' => 'hero-slide-2.png',
            'position' => 2,
        ],
    ];
    foreach ($slides as $s) {
        $db->insert('chetto_slide', [
            'badge' => pSQL($s['badge']),
            'subtitle' => pSQL($s['subtitle']),
            'title' => pSQL($s['title']),
            'description' => pSQL($s['description']),
            'cta' => pSQL($s['cta']),
            'cta_link' => pSQL($s['cta_link']),
            'image' => pSQL($s['image']),
            'position' => (int) $s['position'],
            'active' => 1,
            'date_add' => $now,
            'date_upd' => $now,
        ]);
    }
    echo "Slides seeded: " . count($slides) . "\n";
} else {
    echo "Slides already exist ($count)\n";
}

// ============================================================
// 2. BENEFICIOS
// ============================================================
$count = (int) $db->getValue("SELECT COUNT(*) FROM `{$prefix}chetto_benefit`");
if ($count === 0) {
    $benefits = [
        ['icon' => 'Truck', 'title' => 'Envío Gratis', 'description' => 'En pedidos +50€', 'position' => 1],
        ['icon' => 'RotateCcw', 'title' => 'Devoluciones', 'description' => '30 días garantía', 'position' => 2],
        ['icon' => 'Shield', 'title' => 'Pago Seguro', 'description' => '100% protegido', 'position' => 3],
        ['icon' => 'CreditCard', 'title' => 'Pago Fácil', 'description' => 'Múltiples métodos', 'position' => 4],
    ];
    foreach ($benefits as $b) {
        $db->insert('chetto_benefit', [
            'icon' => pSQL($b['icon']),
            'title' => pSQL($b['title']),
            'description' => pSQL($b['description']),
            'position' => (int) $b['position'],
            'active' => 1,
            'date_add' => $now,
            'date_upd' => $now,
        ]);
    }
    echo "Benefits seeded: " . count($benefits) . "\n";
} else {
    echo "Benefits already exist ($count)\n";
}

// ============================================================
// 3. CATEGORÍAS HOMEPAGE
// ============================================================
$count = (int) $db->getValue("SELECT COUNT(*) FROM `{$prefix}chetto_homepage_category`");
if ($count === 0) {
    $categories = [
        ['name' => 'Sneakers', 'description' => 'Versatilidad diaria', 'image' => 'cat-sneakers-figma.png', 'slug' => 'sneakers', 'link' => '/colecciones/sneakers', 'position' => 1],
        ['name' => 'Sandalias', 'description' => 'Para el verano', 'image' => 'cat-sandalias-figma.png', 'slug' => 'sandalias', 'link' => '/colecciones/sandalias', 'position' => 2],
        ['name' => 'Casual', 'description' => 'Estilo clásico', 'image' => 'cat-casual-figma.png', 'slug' => 'casual', 'link' => '/colecciones/casual', 'position' => 3],
    ];
    foreach ($categories as $c) {
        $db->insert('chetto_homepage_category', [
            'name' => pSQL($c['name']),
            'description' => pSQL($c['description']),
            'image' => pSQL($c['image']),
            'slug' => pSQL($c['slug']),
            'link' => pSQL($c['link']),
            'position' => (int) $c['position'],
            'active' => 1,
            'date_add' => $now,
            'date_upd' => $now,
        ]);
    }
    echo "Categories seeded: " . count($categories) . "\n";
} else {
    echo "Categories already exist ($count)\n";
}

// ============================================================
// 4. TESTIMONIOS
// ============================================================
$count = (int) $db->getValue("SELECT COUNT(*) FROM `{$prefix}chetto_testimonial`");
if ($count === 0) {
    $testimonials = [
        ['name' => 'María González', 'location' => 'Madrid', 'rating' => 5, 'text' => 'Los mejores zapatos para mi hijo. Desde que usa barefoot, su postura ha mejorado notablemente y camina con más seguridad.', 'position' => 1],
        ['name' => 'Carlos Ruiz', 'location' => 'Barcelona', 'rating' => 5, 'text' => 'Calidad excepcional y atención al cliente increíble. Los zapatos son cómodos y duraderos.', 'position' => 2],
        ['name' => 'Ana Martínez', 'location' => 'Valencia', 'rating' => 5, 'text' => 'Mi hija está encantada con sus nuevas zapatillas. Son ligeras, flexibles y con un diseño precioso.', 'position' => 3],
        ['name' => 'David López', 'location' => 'Sevilla', 'rating' => 5, 'text' => 'Compra recomendada al 100%. El equipo me ayudó a elegir la talla perfecta para mis dos hijos.', 'position' => 4],
    ];
    foreach ($testimonials as $t) {
        $db->insert('chetto_testimonial', [
            'name' => pSQL($t['name']),
            'location' => pSQL($t['location']),
            'rating' => (int) $t['rating'],
            'text' => pSQL($t['text']),
            'position' => (int) $t['position'],
            'active' => 1,
            'date_add' => $now,
            'date_upd' => $now,
        ]);
    }
    echo "Testimonials seeded: " . count($testimonials) . "\n";
} else {
    echo "Testimonials already exist ($count)\n";
}

// ============================================================
// 5. BLOQUES DE CONTENIDO
// ============================================================
$count = (int) $db->getValue("SELECT COUNT(*) FROM `{$prefix}chetto_content_block`");
if ($count === 0) {
    $blocks = [
        // barefoot_feature (accordion de la sección Aprende sobre Barefoot)
        ['type' => 'barefoot_feature', 'icon' => 'Waves', 'title' => 'Suela Flexible', 'description' => 'Dobla en todas las direcciones', 'extra_text' => 'La suela flexible permite que el pie se mueva de forma natural, fortaleciendo la musculatura y mejorando el equilibrio.', 'position' => 1],
        ['type' => 'barefoot_feature', 'icon' => 'ArrowDownToLine', 'title' => 'Drop Cero', 'description' => 'Sin elevación del talón', 'extra_text' => 'La misma altura en talón y puntera favorece una postura natural y alineación correcta de la columna vertebral.', 'position' => 2],
        ['type' => 'barefoot_feature', 'icon' => 'Maximize', 'title' => 'Horma Amplia', 'description' => 'Espacio para los dedos', 'extra_text' => 'Una puntera amplia permite que los dedos se extiendan de forma natural, mejorando la estabilidad y el agarre.', 'position' => 3],

        // limitation (card izquierda de comparación)
        ['type' => 'limitation', 'icon' => '', 'title' => 'Suela rígida que limita el movimiento natural', 'description' => '', 'extra_text' => '', 'position' => 1],
        ['type' => 'limitation', 'icon' => '', 'title' => 'Elevación del talón que afecta la postura', 'description' => '', 'extra_text' => '', 'position' => 2],
        ['type' => 'limitation', 'icon' => '', 'title' => 'Puntera estrecha que comprime los dedos', 'description' => '', 'extra_text' => '', 'position' => 3],
        ['type' => 'limitation', 'icon' => '', 'title' => 'Debilita la musculatura del pie', 'description' => '', 'extra_text' => '', 'position' => 4],

        // barefoot_benefit (card derecha de comparación)
        ['type' => 'barefoot_benefit', 'icon' => '', 'title' => 'Suela flexible que respeta el movimiento natural', 'description' => '', 'extra_text' => '', 'position' => 1],
        ['type' => 'barefoot_benefit', 'icon' => '', 'title' => 'Drop cero para una postura alineada', 'description' => '', 'extra_text' => '', 'position' => 2],
        ['type' => 'barefoot_benefit', 'icon' => '', 'title' => 'Horma amplia que permite libertad de movimiento', 'description' => '', 'extra_text' => '', 'position' => 3],
        ['type' => 'barefoot_benefit', 'icon' => '', 'title' => 'Fortalece la musculatura del pie', 'description' => '', 'extra_text' => '', 'position' => 4],
        ['type' => 'barefoot_benefit', 'icon' => '', 'title' => 'Sin contrafuertes para un desarrollo más natural', 'description' => '', 'extra_text' => '', 'position' => 5],

        // why_barefoot (tarjetas de sección ¿Por qué Barefoot?)
        ['type' => 'why_barefoot', 'icon' => 'Leaf', 'title' => 'Desarrollo Natural', 'description' => 'Permite que los pies de tu hijo se desarrollen de forma natural sin restricciones.', 'extra_text' => '', 'position' => 1],
        ['type' => 'why_barefoot', 'icon' => 'Heart', 'title' => 'Salud y Bienestar', 'description' => 'Mejora la postura, el equilibrio y fortalece la musculatura del pie.', 'extra_text' => '', 'position' => 2],
        ['type' => 'why_barefoot', 'icon' => 'Footprints', 'title' => 'Conexión Natural', 'description' => 'Sensibilidad al terreno que favorece el desarrollo sensorial y propioceptivo.', 'extra_text' => '', 'position' => 3],
        ['type' => 'why_barefoot', 'icon' => 'ShieldCheck', 'title' => 'Protección Respetuosa', 'description' => 'Protección necesaria sin comprometer la libertad de movimiento del pie.', 'extra_text' => '', 'position' => 4],

        // why_barefoot_feature (features de la sección ¿Por qué Barefoot?)
        ['type' => 'why_barefoot_feature', 'icon' => 'Waves', 'title' => 'Suela Flexible', 'description' => 'Permite el movimiento natural del pie en todas direcciones.', 'extra_text' => '', 'position' => 1],
        ['type' => 'why_barefoot_feature', 'icon' => 'ArrowDownToLine', 'title' => 'Drop Cero', 'description' => 'Sin desnivel entre talón y puntera para una pisada natural.', 'extra_text' => '', 'position' => 2],
        ['type' => 'why_barefoot_feature', 'icon' => 'Maximize', 'title' => 'Horma Amplia', 'description' => 'Espacio suficiente para que los dedos se muevan libremente.', 'extra_text' => '', 'position' => 3],
    ];
    foreach ($blocks as $b) {
        $db->insert('chetto_content_block', [
            'type' => pSQL($b['type']),
            'icon' => pSQL($b['icon']),
            'title' => pSQL($b['title']),
            'description' => pSQL($b['description']),
            'extra_text' => pSQL($b['extra_text']),
            'position' => (int) $b['position'],
            'active' => 1,
            'date_add' => $now,
            'date_upd' => $now,
        ]);
    }
    echo "Content blocks seeded: " . count($blocks) . "\n";
} else {
    echo "Content blocks already exist ($count)\n";
}

// ============================================================
// 6. CONFIGURACIÓN GENERAL
// ============================================================
$configs = [
    'CHETTO_NEWSLETTER_TITLE' => 'Únete a la familia Chetto',
    'CHETTO_NEWSLETTER_DESC' => 'Suscríbete y recibe un 10% de descuento en tu primera compra, además de novedades y ofertas exclusivas.',
    'CHETTO_STAT_1_VALUE' => '4.8/5',
    'CHETTO_STAT_1_LABEL' => '+2.500 reseñas',
    'CHETTO_STAT_2_VALUE' => '98%',
    'CHETTO_STAT_2_LABEL' => 'Clientes satisfechos',
    'CHETTO_STAT_3_VALUE' => '5.000+',
    'CHETTO_STAT_3_LABEL' => 'Familias felices',
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
    'CHETTO_BAREFOOT_TITLE_HIGHLIGHT' => 'calzado barefoot',
    'CHETTO_BAREFOOT_DESC' => 'Descubre qué hace que el calzado barefoot sea diferente y por qué es la mejor elección para el desarrollo saludable de los pies infantiles',
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
    'CHETTO_ANNOUNCE_PHONE' => '+34 660 132 249',
    'CHETTO_ANNOUNCE_EMAIL' => 'Tienda@chetto.es',
    'CHETTO_ANNOUNCE_ABOUT_TEXT' => 'Sobre Nosotros',
    'CHETTO_ANNOUNCE_ABOUT_URL' => '/sobre-nosotros',
    'CHETTO_ANNOUNCE_STORES_TEXT' => 'Nuestras tiendas',
    'CHETTO_ANNOUNCE_STORES_URL' => '/tiendas',
    'CHETTO_TESTIMONIALS_TITLE' => 'Familias Felices',
    'CHETTO_TESTIMONIALS_SUBTITLE' => 'Lo que dicen nuestros clientes sobre el calzado barefoot',
];

$configCount = 0;
foreach ($configs as $key => $value) {
    Configuration::updateValue($key, $value);
    $configCount++;
}
echo "Config keys set: $configCount\n";

// ============================================================
// SUMMARY
// ============================================================
echo "\n=== CMS SEED SUMMARY ===\n";
echo "Slides:          " . $db->getValue("SELECT COUNT(*) FROM `{$prefix}chetto_slide`") . "\n";
echo "Benefits:        " . $db->getValue("SELECT COUNT(*) FROM `{$prefix}chetto_benefit`") . "\n";
echo "Categories:      " . $db->getValue("SELECT COUNT(*) FROM `{$prefix}chetto_homepage_category`") . "\n";
echo "Products:        " . $db->getValue("SELECT COUNT(*) FROM `{$prefix}chetto_homepage_product`") . "\n";
echo "Testimonials:    " . $db->getValue("SELECT COUNT(*) FROM `{$prefix}chetto_testimonial`") . "\n";
echo "Content blocks:  " . $db->getValue("SELECT COUNT(*) FROM `{$prefix}chetto_content_block`") . "\n";
echo "========================\n";
echo "ALL DONE!\n";
