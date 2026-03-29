<?php
require_once '/var/www/html/config/config.inc.php';

echo "=== Migrando estructura de menu CMS ===\n\n";

$improveId = (int) Tab::getIdFromClassName('IMPROVE');
if (!$improveId) {
    echo "ERROR: No se encontro la categoria IMPROVE\n";
    exit(1);
}

// --- Step 1: Create the 3 new parent tabs ---
echo "--- Paso 1: Crear tabs padres ---\n";

$parents = [
    'AdminChettoHomeParent'   => ['name' => 'CMS: Home',         'icon' => 'home'],
    'AdminChettoCollParent'   => ['name' => 'CMS: Colecciones',  'icon' => 'list'],
    'AdminChettoGlobalParent' => ['name' => 'CMS: Global',       'icon' => 'settings'],
];

$parentIds = [];
foreach ($parents as $className => $config) {
    $existingId = (int) Tab::getIdFromClassName($className);
    if ($existingId) {
        echo "  $className ya existe (id=$existingId)\n";
        $parentIds[$className] = $existingId;
        $tab = new Tab($existingId);
        foreach (Language::getLanguages(true) as $lang) {
            $tab->name[$lang['id_lang']] = $config['name'];
        }
        $tab->icon = $config['icon'];
        $tab->id_parent = $improveId;
        $tab->update();
    } else {
        $tab = new Tab();
        $tab->active = 1;
        $tab->class_name = $className;
        $tab->name = [];
        foreach (Language::getLanguages(true) as $lang) {
            $tab->name[$lang['id_lang']] = $config['name'];
        }
        $tab->id_parent = $improveId;
        $tab->module = 'chettoheadless';
        $tab->icon = $config['icon'];
        if ($tab->add()) {
            echo "  Creado $className => '{$config['name']}' (id={$tab->id})\n";
            $parentIds[$className] = $tab->id;
        } else {
            echo "  ERROR creando $className\n";
            exit(1);
        }
    }
}

// --- Step 2: Define child-to-parent mapping ---
$children = [
    'AdminChettoSlides'      => ['parent' => 'AdminChettoHomeParent',   'name' => 'Hero Slider',           'pos' => 0],
    'AdminChettoBenefits'    => ['parent' => 'AdminChettoHomeParent',   'name' => 'Beneficios',            'pos' => 1],
    'AdminChettoCategories'  => ['parent' => 'AdminChettoHomeParent',   'name' => 'Categorias',            'pos' => 2],
    'AdminChettoProducts'    => ['parent' => 'AdminChettoHomeParent',   'name' => 'Productos Destacados',  'pos' => 3],
    'AdminChettoBarefoot'    => ['parent' => 'AdminChettoHomeParent',   'name' => 'Las 3 Claves',          'pos' => 4],
    'AdminChettoFamilias'    => ['parent' => 'AdminChettoHomeParent',   'name' => 'Familias Felices',      'pos' => 5],
    'AdminChettoWhyBarefoot' => ['parent' => 'AdminChettoHomeParent',   'name' => 'Por que Barefoot',      'pos' => 6],
    'AdminChettoCollections' => ['parent' => 'AdminChettoCollParent',   'name' => 'Pagina y Tarjetas',     'pos' => 0],
    'AdminChettoFooter'      => ['parent' => 'AdminChettoGlobalParent', 'name' => 'Footer y Newsletter',   'pos' => 0],
    'AdminChettoContent'     => ['parent' => 'AdminChettoGlobalParent', 'name' => 'Bloques de Contenido',  'pos' => 1],
];

// --- Step 3: Reparent and rename existing child tabs ---
echo "\n--- Paso 2: Reasignar hijos a sus nuevos padres ---\n";

foreach ($children as $className => $config) {
    $tabId = (int) Tab::getIdFromClassName($className);
    if ($tabId) {
        $tab = new Tab($tabId);
        foreach (Language::getLanguages(true) as $lang) {
            $tab->name[$lang['id_lang']] = $config['name'];
        }
        $tab->id_parent = $parentIds[$config['parent']];
        $tab->position = $config['pos'];
        $tab->update();
        echo "  $className => padre={$config['parent']}, nombre='{$config['name']}', pos={$config['pos']}\n";
    } else {
        echo "  ADVERTENCIA: $className no existe, creando...\n";
        $tab = new Tab();
        $tab->active = 1;
        $tab->class_name = $className;
        $tab->name = [];
        foreach (Language::getLanguages(true) as $lang) {
            $tab->name[$lang['id_lang']] = $config['name'];
        }
        $tab->id_parent = $parentIds[$config['parent']];
        $tab->module = 'chettoheadless';
        $tab->position = $config['pos'];
        $tab->add();
        echo "  Creado $className\n";
    }
}

// --- Step 4: Remove old parent tab ---
echo "\n--- Paso 3: Eliminar tab padre viejo ---\n";

$oldParentId = (int) Tab::getIdFromClassName('AdminChettoParent');
if ($oldParentId) {
    $oldTab = new Tab($oldParentId);
    $oldTab->delete();
    echo "  Eliminado AdminChettoParent (id=$oldParentId)\n";
} else {
    echo "  AdminChettoParent ya no existe\n";
}

// --- Step 5: Remove duplicate AdminChettoTestimonials ---
$oldTestId = (int) Tab::getIdFromClassName('AdminChettoTestimonials');
if ($oldTestId) {
    $oldTest = new Tab($oldTestId);
    $oldTest->delete();
    echo "  Eliminado AdminChettoTestimonials (id=$oldTestId) - duplicado de Familias Felices\n";
}

echo "\n=== Migracion completada ===\n";
echo "\nEstructura final:\n";
foreach ($parents as $className => $config) {
    echo "  [{$config['icon']}] {$config['name']}\n";
    foreach ($children as $childClass => $childConfig) {
        if ($childConfig['parent'] === $className) {
            echo "    -> {$childConfig['name']} ($childClass)\n";
        }
    }
}
