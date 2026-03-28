<?php
define('_PS_ADMIN_DIR_', '/var/www/html/admin');
require('/var/www/html/config/config.inc.php');

$db = Db::getInstance();
$now = date('Y-m-d H:i:s');
$prefix = _DB_PREFIX_;

$types = ['barefoot_feature', 'limitation', 'barefoot_benefit', 'why_barefoot'];

foreach ($types as $type) {
    $count = (int) $db->getValue("SELECT COUNT(*) FROM `{$prefix}chetto_content_block` WHERE type = '" . pSQL($type) . "'");
    echo "$type: $count existing\n";
}

$inserts = [
    // barefoot_feature - check if exist
    ['type' => 'barefoot_feature', 'icon' => 'Waves', 'title' => 'Suela Flexible', 'description' => 'Dobla en todas las direcciones', 'extra_text' => 'La suela flexible permite que el pie se mueva de forma natural, fortaleciendo la musculatura y mejorando el equilibrio.', 'position' => 1],
    ['type' => 'barefoot_feature', 'icon' => 'ArrowDownToLine', 'title' => 'Drop Cero', 'description' => 'Sin elevación del talón', 'extra_text' => 'La misma altura en talón y puntera favorece una postura natural y alineación correcta de la columna vertebral.', 'position' => 2],
    ['type' => 'barefoot_feature', 'icon' => 'Maximize', 'title' => 'Horma Amplia', 'description' => 'Espacio para los dedos', 'extra_text' => 'Una puntera amplia permite que los dedos se extiendan de forma natural, mejorando la estabilidad y el agarre.', 'position' => 3],

    // limitation
    ['type' => 'limitation', 'icon' => '', 'title' => 'Suela rígida que limita el movimiento natural', 'description' => '', 'extra_text' => '', 'position' => 1],
    ['type' => 'limitation', 'icon' => '', 'title' => 'Elevación del talón que afecta la postura', 'description' => '', 'extra_text' => '', 'position' => 2],
    ['type' => 'limitation', 'icon' => '', 'title' => 'Puntera estrecha que comprime los dedos', 'description' => '', 'extra_text' => '', 'position' => 3],
    ['type' => 'limitation', 'icon' => '', 'title' => 'Debilita la musculatura del pie', 'description' => '', 'extra_text' => '', 'position' => 4],

    // barefoot_benefit
    ['type' => 'barefoot_benefit', 'icon' => '', 'title' => 'Suela flexible que respeta el movimiento natural', 'description' => '', 'extra_text' => '', 'position' => 1],
    ['type' => 'barefoot_benefit', 'icon' => '', 'title' => 'Drop cero para una postura alineada', 'description' => '', 'extra_text' => '', 'position' => 2],
    ['type' => 'barefoot_benefit', 'icon' => '', 'title' => 'Horma amplia que permite libertad de movimiento', 'description' => '', 'extra_text' => '', 'position' => 3],
    ['type' => 'barefoot_benefit', 'icon' => '', 'title' => 'Fortalece la musculatura del pie', 'description' => '', 'extra_text' => '', 'position' => 4],
    ['type' => 'barefoot_benefit', 'icon' => '', 'title' => 'Sin contrafuertes para un desarrollo más natural', 'description' => '', 'extra_text' => '', 'position' => 5],

    // why_barefoot
    ['type' => 'why_barefoot', 'icon' => 'Leaf', 'title' => 'Desarrollo Natural', 'description' => 'Permite que los pies de tu hijo se desarrollen de forma natural sin restricciones.', 'extra_text' => '', 'position' => 1],
    ['type' => 'why_barefoot', 'icon' => 'Heart', 'title' => 'Salud y Bienestar', 'description' => 'Mejora la postura, el equilibrio y fortalece la musculatura del pie.', 'extra_text' => '', 'position' => 2],
    ['type' => 'why_barefoot', 'icon' => 'Footprints', 'title' => 'Conexión Natural', 'description' => 'Sensibilidad al terreno que favorece el desarrollo sensorial y propioceptivo.', 'extra_text' => '', 'position' => 3],
    ['type' => 'why_barefoot', 'icon' => 'ShieldCheck', 'title' => 'Protección Respetuosa', 'description' => 'Protección necesaria sin comprometer la libertad de movimiento del pie.', 'extra_text' => '', 'position' => 4],
];

$added = 0;
foreach ($inserts as $b) {
    $exists = (int) $db->getValue(
        "SELECT COUNT(*) FROM `{$prefix}chetto_content_block` WHERE type = '" . pSQL($b['type']) . "' AND title = '" . pSQL($b['title']) . "'"
    );
    if ($exists === 0) {
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
        $added++;
        echo "  + {$b['type']}: {$b['title']}\n";
    }
}

echo "\nBlocks added: $added\n";

echo "\n=== FINAL COUNTS ===\n";
$allTypes = ['barefoot_feature', 'limitation', 'barefoot_benefit', 'why_barefoot', 'why_barefoot_feature'];
foreach ($allTypes as $type) {
    $c = (int) $db->getValue("SELECT COUNT(*) FROM `{$prefix}chetto_content_block` WHERE type = '" . pSQL($type) . "'");
    echo "  $type: $c\n";
}
echo "Total: " . $db->getValue("SELECT COUNT(*) FROM `{$prefix}chetto_content_block`") . "\n";
echo "Done!\n";
