<?php
require_once '/var/www/html/config/config.inc.php';

echo "=== Registrando tab Por que Barefoot ===\n";

// Find or create parent "CMS: Por que Barefoot"
$parentClassName = 'AdminChettoBfParent';
$parentId = (int) Tab::getIdFromClassName($parentClassName);

if (!$parentId) {
    $improveId = (int) Tab::getIdFromClassName('IMPROVE');
    $tab = new Tab();
    $tab->active = 1;
    $tab->class_name = $parentClassName;
    $tab->name = [];
    foreach (Language::getLanguages(true) as $lang) {
        $tab->name[$lang['id_lang']] = 'CMS: Por que Barefoot';
    }
    $tab->id_parent = $improveId;
    $tab->module = 'chettoheadless';
    $tab->icon = 'help_outline';
    if ($tab->add()) {
        $parentId = $tab->id;
        echo "  Creado CMS: Por que Barefoot (id=$parentId)\n";
    } else {
        echo "  ERROR creando parent tab\n";
        exit(1);
    }
} else {
    echo "  CMS: Por que Barefoot ya existe (id=$parentId)\n";
}

// Register child
$childClassName = 'AdminChettoPorqueBarefoot';
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
        echo "  Creado AdminChettoPorqueBarefoot\n";
    } else {
        echo "  ERROR creando child tab\n";
    }
} else {
    echo "  AdminChettoPorqueBarefoot ya existe\n";
}

// Set defaults
$defaults = [
    'CHETTO_BF_HERO_TITLE1' => 'Por que elegir',
    'CHETTO_BF_HERO_TITLE2' => 'Barefoot',
    'CHETTO_BF_HERO_DESC' => 'El calzado barefoot respeta el desarrollo natural del pie infantil, permitiendo que tus hijos crezcan con pies fuertes, sanos y libres.',
    'CHETTO_BF_HERO_STAT' => '95%',
    'CHETTO_BF_HERO_STAT_LABEL' => 'de padres notan mejoras',
    'CHETTO_BF_BENEFITS_TITLE' => 'Beneficios del Calzado Barefoot',
    'CHETTO_BF_BENEFITS_SUBTITLE' => 'Descubre como el calzado respetuoso puede transformar la salud y el bienestar de los pies de tus hijos',
    'CHETTO_BF_COMP_TITLE' => 'Barefoot vs Calzado Tradicional',
    'CHETTO_BF_COMP_SUBTITLE' => 'Comprende las diferencias fundamentales y por que importa',
    'CHETTO_BF_ESSENTIALS_TITLE' => 'Las 3 Caracteristicas Esenciales',
    'CHETTO_BF_ESSENTIALS_SUBTITLE' => 'Todo calzado barefoot debe cumplir estos requisitos fundamentales',
    'CHETTO_BF_STAGES_TITLE' => 'Barefoot en Cada Etapa',
    'CHETTO_BF_STAGES_SUBTITLE' => 'El desarrollo del pie es continuo durante toda la infancia',
    'CHETTO_BF_FAQ_TITLE' => 'Preguntas Frecuentes',
    'CHETTO_BF_FAQ_SUBTITLE' => 'Resolvemos tus dudas sobre el calzado barefoot',
    'CHETTO_BF_CTA_TITLE' => 'Listo para dar el paso?',
    'CHETTO_BF_CTA_DESC' => 'Descubre nuestra coleccion de calzado barefoot y empieza a cuidar los pies de tus hijos de la mejor forma posible.',
];

foreach ($defaults as $key => $val) {
    if (!Configuration::get($key)) {
        Configuration::updateValue($key, $val);
        echo "  Config: $key\n";
    }
}

echo "\n=== Completado ===\n";
