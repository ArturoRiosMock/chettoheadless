<?php
// Test script: delete 3 duplicate products (dry-run capable with --dry)
// Usage inside container: php scripts/dedupe-products-test.php [--dry]
require_once __DIR__ . '/../config/config.inc.php';

$dry = in_array('--dry', $argv);

// Hard-coded test IDs (from dedupe_delete.txt, first rows)
$testIds = [212, 257, 220];

foreach ($testIds as $id) {
    $p = new Product($id);
    if (!Validate::isLoadedObject($p)) {
        echo "id=$id NOT_FOUND\n";
        continue;
    }
    $ref  = $p->reference;
    $name = is_array($p->name) ? reset($p->name) : $p->name;
    $imgs = count($p->getImages((int)Configuration::get('PS_LANG_DEFAULT')));
    $cmb  = (int)Db::getInstance()->getValue("SELECT COUNT(*) FROM ps_product_attribute WHERE id_product=$id");
    echo "id=$id ref=$ref name=\"$name\" images=$imgs combinations=$cmb";
    if ($dry) { echo " [DRY-RUN, not deleted]\n"; continue; }
    $ok = $p->delete();
    echo $ok ? " [DELETED]\n" : " [DELETE FAILED]\n";
}
