<?php
require_once '/var/www/html/config/config.inc.php';

echo "=== Seed de Colecciones ===\n\n";

$prefix = _DB_PREFIX_;

// Create table
$sql = "CREATE TABLE IF NOT EXISTS `{$prefix}chetto_collection` (
    `id_chetto_collection` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(128) NOT NULL,
    `description` VARCHAR(255) DEFAULT NULL,
    `image` VARCHAR(255) DEFAULT NULL,
    `slug` VARCHAR(128) NOT NULL,
    `position` INT(11) UNSIGNED NOT NULL DEFAULT 0,
    `active` TINYINT(1) UNSIGNED NOT NULL DEFAULT 1,
    `date_add` DATETIME NOT NULL,
    `date_upd` DATETIME NOT NULL,
    PRIMARY KEY (`id_chetto_collection`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4";

Db::getInstance()->execute($sql);
echo "Tabla chetto_collection creada/verificada\n";

// Clear existing
Db::getInstance()->execute("DELETE FROM `{$prefix}chetto_collection`");

$now = date('Y-m-d H:i:s');
$collections = [
    ['name' => 'Novedades',        'description' => 'Lo ultimo en calzado barefoot',  'slug' => 'novedades',  'position' => 0],
    ['name' => 'Botas / Botines',  'description' => 'Proteccion y flexibilidad',      'slug' => 'botas',     'position' => 1],
    ['name' => 'Sneakers',         'description' => 'Versatilidad diaria',            'slug' => 'sneakers',  'position' => 2],
    ['name' => 'Sandalias',        'description' => 'Para el verano',                 'slug' => 'sandalias', 'position' => 3],
    ['name' => 'Casual / Classic', 'description' => 'Estilo clasico',                 'slug' => 'casual',    'position' => 4],
    ['name' => 'Ofertas',          'description' => 'Los mejores precios',             'slug' => 'ofertas',   'position' => 5],
];

foreach ($collections as $col) {
    Db::getInstance()->insert('chetto_collection', [
        'name' => pSQL($col['name']),
        'description' => pSQL($col['description']),
        'image' => '',
        'slug' => pSQL($col['slug']),
        'position' => (int) $col['position'],
        'active' => 1,
        'date_add' => $now,
        'date_upd' => $now,
    ]);
    echo "  Insertado: {$col['name']} ({$col['slug']})\n";
}

// Set page config defaults
$defaults = [
    'CHETTO_COLL_PAGE_TITLE' => 'Nuestras Colecciones',
    'CHETTO_COLL_PAGE_SUBTITLE' => 'Encuentra el calzado barefoot perfecto para cada ocasion',
];
foreach ($defaults as $key => $val) {
    if (!Configuration::get($key)) {
        Configuration::updateValue($key, $val);
        echo "  Config: $key\n";
    }
}

// Rename tab to better name
$tabId = (int) Tab::getIdFromClassName('AdminChettoCollections');
if ($tabId) {
    $tab = new Tab($tabId);
    foreach (Language::getLanguages(true) as $lang) {
        $tab->name[$lang['id_lang']] = 'Pagina y Tarjetas';
    }
    $tab->update();
    echo "  Tab renombrado a 'Pagina y Tarjetas'\n";
}

echo "\n=== Completado ===\n";
