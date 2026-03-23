<?php

require_once '/var/www/html/config/config.inc.php';
require_once '/var/www/html/modules/chettoheadless/classes/ChettoSlide.php';
require_once '/var/www/html/modules/chettoheadless/classes/ChettoBenefit.php';
require_once '/var/www/html/modules/chettoheadless/classes/ChettoHomepageCategory.php';
require_once '/var/www/html/modules/chettoheadless/classes/ChettoTestimonial.php';
require_once '/var/www/html/modules/chettoheadless/classes/ChettoContentBlock.php';

echo "=== Seeding Chetto CMS Data ===\n\n";

$db = Db::getInstance();

// --- Hero Slides ---
$slides = [
    ['badge' => 'Ofertas Especiales', 'subtitle' => 'Camina sin límites', 'title' => 'Hasta 30% de descuento', 'description' => 'Calzado barefoot de calidad a precios únicos', 'cta' => 'Ver Ofertas', 'cta_link' => '/ofertas', 'image' => '', 'position' => 1],
    ['badge' => 'Nueva Colección', 'subtitle' => 'Primavera 2026', 'title' => 'Sneakers para toda la familia', 'description' => 'Descubre los nuevos modelos de temporada', 'cta' => 'Explorar', 'cta_link' => '/colecciones/sneakers', 'image' => '', 'position' => 2],
];

foreach ($slides as $s) {
    $slide = new ChettoSlide();
    $slide->badge = $s['badge'];
    $slide->subtitle = $s['subtitle'];
    $slide->title = $s['title'];
    $slide->description = $s['description'];
    $slide->cta = $s['cta'];
    $slide->cta_link = $s['cta_link'];
    $slide->image = $s['image'];
    $slide->position = $s['position'];
    $slide->active = 1;
    $slide->save();
}
echo "[OK] " . count($slides) . " slides creados\n";

// --- Benefits ---
$benefits = [
    ['icon' => 'Truck', 'title' => 'Envío Gratis', 'description' => 'En pedidos +50€', 'position' => 1],
    ['icon' => 'RotateCcw', 'title' => 'Devoluciones', 'description' => '30 días garantía', 'position' => 2],
    ['icon' => 'ShieldCheck', 'title' => 'Pago Seguro', 'description' => '100% protegido', 'position' => 3],
    ['icon' => 'CreditCard', 'title' => 'Pago Fácil', 'description' => 'Múltiples métodos', 'position' => 4],
];

foreach ($benefits as $b) {
    $benefit = new ChettoBenefit();
    $benefit->icon = $b['icon'];
    $benefit->title = $b['title'];
    $benefit->description = $b['description'];
    $benefit->position = $b['position'];
    $benefit->active = 1;
    $benefit->save();
}
echo "[OK] " . count($benefits) . " beneficios creados\n";

// --- Homepage Categories ---
$categories = [
    ['name' => 'Sneakers', 'description' => 'Versatilidad diaria', 'slug' => 'sneakers', 'link' => '/colecciones/sneakers', 'image' => '', 'position' => 1],
    ['name' => 'Sandalias', 'description' => 'Para el verano', 'slug' => 'sandalias', 'link' => '/colecciones/sandalias', 'image' => '', 'position' => 2],
    ['name' => 'Casual', 'description' => 'Estilo clásico', 'slug' => 'casual', 'link' => '/colecciones/casual', 'image' => '', 'position' => 3],
];

foreach ($categories as $c) {
    $cat = new ChettoHomepageCategory();
    $cat->name = $c['name'];
    $cat->description = $c['description'];
    $cat->slug = $c['slug'];
    $cat->link = $c['link'];
    $cat->image = $c['image'];
    $cat->position = $c['position'];
    $cat->active = 1;
    $cat->save();
}
echo "[OK] " . count($categories) . " categorías creadas\n";

// --- Testimonials ---
$testimonials = [
    ['name' => 'María González', 'location' => 'Madrid', 'rating' => 5, 'text' => 'Los mejores zapatos para mi hijo. Desde que usa barefoot, su postura ha mejorado notablemente y camina con más seguridad.', 'position' => 1],
    ['name' => 'Carlos Ruiz', 'location' => 'Barcelona', 'rating' => 5, 'text' => 'Calidad excepcional y atención al cliente increíble. Los zapatos son cómodos y duraderos.', 'position' => 2],
    ['name' => 'Ana Martínez', 'location' => 'Valencia', 'rating' => 5, 'text' => 'Mi hija está encantada con sus nuevas zapatillas. Son ligeras, flexibles y con un diseño precioso.', 'position' => 3],
    ['name' => 'David López', 'location' => 'Sevilla', 'rating' => 5, 'text' => 'Compra recomendada al 100%. El equipo me ayudó a elegir la talla perfecta para mis dos hijos.', 'position' => 4],
];

foreach ($testimonials as $t) {
    $testimonial = new ChettoTestimonial();
    $testimonial->name = $t['name'];
    $testimonial->location = $t['location'];
    $testimonial->rating = $t['rating'];
    $testimonial->text = $t['text'];
    $testimonial->position = $t['position'];
    $testimonial->active = 1;
    $testimonial->save();
}
echo "[OK] " . count($testimonials) . " testimonios creados\n";

// --- Content Blocks: Barefoot Features ---
$barefootFeatures = [
    ['icon' => 'Waves', 'title' => 'Suela Flexible', 'description' => 'Dobla en todas las direcciones', 'extra_text' => 'La suela flexible permite que el pie se mueva de forma natural, fortaleciendo la musculatura y mejorando el equilibrio.', 'position' => 1],
    ['icon' => 'ArrowDownToLine', 'title' => 'Drop Cero', 'description' => 'Sin elevación del talón', 'extra_text' => 'La misma altura en talón y puntera favorece una postura natural y alineada, reduciendo el impacto en articulaciones.', 'position' => 2],
    ['icon' => 'Maximize', 'title' => 'Horma Amplia', 'description' => 'Espacio para los dedos', 'extra_text' => 'Una puntera amplia permite que los dedos se extiendan de forma natural, mejorando la estabilidad y el agarre.', 'position' => 3],
];

foreach ($barefootFeatures as $bf) {
    $block = new ChettoContentBlock();
    $block->type = 'barefoot_feature';
    $block->icon = $bf['icon'];
    $block->title = $bf['title'];
    $block->description = $bf['description'];
    $block->extra_text = $bf['extra_text'];
    $block->position = $bf['position'];
    $block->active = 1;
    $block->save();
}
echo "[OK] " . count($barefootFeatures) . " barefoot features creados\n";

// --- Content Blocks: Why Barefoot ---
$whyBarefoot = [
    ['icon' => 'Sprout', 'title' => 'Desarrollo Natural', 'description' => 'Permite que los pies de tu hijo se desarrollen de forma natural sin restricciones.', 'position' => 1],
    ['icon' => 'Heart', 'title' => 'Salud y Bienestar', 'description' => 'Mejora la postura, el equilibrio y fortalece la musculatura del pie.', 'position' => 2],
    ['icon' => 'Footprints', 'title' => 'Conexión Natural', 'description' => 'Sensibilidad al terreno que favorece el desarrollo sensorial y propioceptivo.', 'position' => 3],
    ['icon' => 'Shield', 'title' => 'Protección Respetuosa', 'description' => 'Protección necesaria sin comprometer la libertad de movimiento del pie.', 'position' => 4],
];

foreach ($whyBarefoot as $wb) {
    $block = new ChettoContentBlock();
    $block->type = 'why_barefoot';
    $block->icon = $wb['icon'];
    $block->title = $wb['title'];
    $block->description = $wb['description'];
    $block->position = $wb['position'];
    $block->active = 1;
    $block->save();
}
echo "[OK] " . count($whyBarefoot) . " why barefoot cards creados\n";

// --- Content Blocks: Limitations ---
$limitations = [
    ['title' => 'Suela rígida que limita el movimiento natural', 'position' => 1],
    ['title' => 'Elevación del talón que afecta la postura', 'position' => 2],
    ['title' => 'Puntera estrecha que comprime los dedos', 'position' => 3],
    ['title' => 'Debilita la musculatura del pie', 'position' => 4],
];

foreach ($limitations as $l) {
    $block = new ChettoContentBlock();
    $block->type = 'limitation';
    $block->title = $l['title'];
    $block->position = $l['position'];
    $block->active = 1;
    $block->save();
}
echo "[OK] " . count($limitations) . " limitaciones creadas\n";

// --- Content Blocks: Barefoot Benefits ---
$barefootBenefits = [
    ['title' => 'Suela flexible que respeta el movimiento natural', 'position' => 1],
    ['title' => 'Drop cero para una postura alineada', 'position' => 2],
    ['title' => 'Horma amplia que permite libertad de movimiento', 'position' => 3],
    ['title' => 'Fortalece la musculatura del pie', 'position' => 4],
    ['title' => 'Sin contrafuertes para un desarrollo más natural', 'position' => 5],
];

foreach ($barefootBenefits as $bb) {
    $block = new ChettoContentBlock();
    $block->type = 'barefoot_benefit';
    $block->title = $bb['title'];
    $block->position = $bb['position'];
    $block->active = 1;
    $block->save();
}
echo "[OK] " . count($barefootBenefits) . " barefoot benefits creados\n";

// --- Configuration values ---
Configuration::updateValue('CHETTO_NEWSLETTER_TITLE', 'Únete a la familia Chetto');
Configuration::updateValue('CHETTO_NEWSLETTER_DESC', 'Recibe ofertas exclusivas, novedades y consejos sobre calzado barefoot.');
Configuration::updateValue('CHETTO_STAT_1_VALUE', '4.8/5');
Configuration::updateValue('CHETTO_STAT_1_LABEL', '+2.500 reseñas');
Configuration::updateValue('CHETTO_STAT_2_VALUE', '98%');
Configuration::updateValue('CHETTO_STAT_2_LABEL', 'Clientes satisfechos');
Configuration::updateValue('CHETTO_STAT_3_VALUE', '5.000+');
Configuration::updateValue('CHETTO_STAT_3_LABEL', 'Familias felices');
echo "[OK] Configuración general guardada\n";

echo "\n=== SEED COMPLETADO ===\n";
