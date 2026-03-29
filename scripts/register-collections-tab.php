<?php
require_once '/var/www/html/config/config.inc.php';

echo "=== Registrando tab Colecciones y reorganizando menú ===\n";

$parentId = (int) Tab::getIdFromClassName('AdminChettoParent');
if (!$parentId) {
    echo "ERROR: No se encontró AdminChettoParent\n";
    exit(1);
}

// Set default collection CTA config values
$defaults = [
    'CHETTO_COLLECTION_CTA_TITLE' => '¿Primera vez con calzado barefoot?',
    'CHETTO_COLLECTION_CTA_DESC' => 'Descubre nuestra guía completa sobre cómo elegir el zapato barefoot perfecto para tu hijo',
    'CHETTO_COLLECTION_CTA_TEXT' => 'Ver Guía Barefoot',
    'CHETTO_COLLECTION_CTA_LINK' => '/porque-barefoot',
];

foreach ($defaults as $key => $val) {
    if (!Configuration::get($key)) {
        Configuration::updateValue($key, $val);
        echo "  Config $key = $val\n";
    }
}

// Register AdminChettoCollections tab if not exists
$existingId = (int) Tab::getIdFromClassName('AdminChettoCollections');
if (!$existingId) {
    $tab = new Tab();
    $tab->active = 1;
    $tab->class_name = 'AdminChettoCollections';
    $tab->name = [];
    foreach (Language::getLanguages(true) as $lang) {
        $tab->name[$lang['id_lang']] = '📄 Colecciones';
    }
    $tab->id_parent = $parentId;
    $tab->module = 'chettoheadless';
    if ($tab->add()) {
        echo "  Tab AdminChettoCollections creado OK\n";
    } else {
        echo "  ERROR creando AdminChettoCollections\n";
    }
} else {
    echo "  Tab AdminChettoCollections ya existe (id=$existingId)\n";
}

// Remove old AdminChettoTestimonials tab (merged into AdminChettoFamilias)
$oldTestimonialsId = (int) Tab::getIdFromClassName('AdminChettoTestimonials');
if ($oldTestimonialsId) {
    $oldTab = new Tab($oldTestimonialsId);
    $oldTab->delete();
    echo "  Tab AdminChettoTestimonials eliminado (duplicado de Familias Felices)\n";
}

// Rename tabs with organized prefixes
$renames = [
    'AdminChettoSlides' => '🏠 Slides del Hero',
    'AdminChettoBenefits' => '🏠 Beneficios',
    'AdminChettoCategories' => '🏠 Categorías',
    'AdminChettoProducts' => '🏠 Productos Destacados',
    'AdminChettoBarefoot' => '🏠 Las 3 Claves',
    'AdminChettoFamilias' => '🏠 Familias Felices',
    'AdminChettoWhyBarefoot' => '🏠 ¿Por qué Barefoot?',
    'AdminChettoCollections' => '📄 Colecciones',
    'AdminChettoFooter' => '⚙️ Footer y Newsletter',
    'AdminChettoContent' => '⚙️ Bloques de Contenido',
];

$position = 0;
foreach ($renames as $className => $newName) {
    $tabId = (int) Tab::getIdFromClassName($className);
    if ($tabId) {
        $tab = new Tab($tabId);
        foreach (Language::getLanguages(true) as $lang) {
            $tab->name[$lang['id_lang']] = $newName;
        }
        $tab->position = $position;
        $tab->update();
        echo "  Renombrado $className => '$newName' (pos=$position)\n";
        $position++;
    }
}

echo "\n=== Completado ===\n";
