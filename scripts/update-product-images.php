<?php
define('_PS_ADMIN_DIR_', '/var/www/html/admin');
require('/var/www/html/config/config.inc.php');

$db = Db::getInstance();

$images = [
    'sneaker-kaki-kids' => 'sneaker-kaki-kids.png',
    'sneaker-maroon' => 'sneaker-maroon.png',
    'sneaker-grey' => '',
    'sneaker-light-pink' => 'sneaker-light-pink.png',
];

foreach ($images as $slug => $filename) {
    $result = $db->update(
        'chetto_homepage_product',
        ['image' => pSQL($filename)],
        'slug = \'' . pSQL($slug) . '\''
    );
    echo "Updated $slug -> $filename (result: " . ($result ? 'OK' : 'FAIL') . ")\n";
}

$rows = $db->executeS('SELECT id_chetto_homepage_product, slug, image, name FROM `' . _DB_PREFIX_ . 'chetto_homepage_product` WHERE section_type = \'featured\' ORDER BY position ASC');
echo "\nCurrent featured products:\n";
foreach ($rows as $row) {
    echo "  #{$row['id_chetto_homepage_product']} {$row['name']} -> image: '{$row['image']}'\n";
}

echo "\nDone!\n";
