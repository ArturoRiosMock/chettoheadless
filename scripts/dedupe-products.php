<?php
// Delete duplicate products: SQL + file cleanup (no Symfony container needed).
// Reads IDs from scripts/_dedupe_ids.txt (one id per line) unless --test given.
// Usage inside container:
//   php scripts/dedupe-products.php --test           # deletes 3 pre-selected ids (212,257,220)
//   php scripts/dedupe-products.php --limit=10       # first 10 of _dedupe_ids.txt
//   php scripts/dedupe-products.php                  # all ids from _dedupe_ids.txt

require_once __DIR__ . '/../config/config.inc.php';

$PROD_DIR = _PS_IMG_DIR_ . 'p/';

$ids = [];
if (in_array('--test', $argv)) {
    $ids = [212, 257, 220];
} else {
    $file = __DIR__ . '/_dedupe_ids.txt';
    if (!file_exists($file)) { fwrite(STDERR, "missing $file\n"); exit(1); }
    foreach (file($file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) as $ln) {
        $ln = trim($ln);
        if (ctype_digit($ln)) $ids[] = (int)$ln;
    }
}

$limit = null;
foreach ($argv as $a) if (preg_match('/^--limit=(\d+)$/', $a, $m)) $limit = (int)$m[1];
if ($limit !== null) $ids = array_slice($ids, 0, $limit);

echo 'Products to delete: ' . count($ids) . PHP_EOL;

$db = Db::getInstance();

function splitPath(int $id): string {
    return implode('/', str_split((string)$id)) . '/';
}

function deleteImageFiles(string $prodDir, int $idImage): int {
    $dir = $prodDir . splitPath($idImage);
    if (!is_dir($dir)) return 0;
    $removed = 0;
    foreach (glob($dir . $idImage . '*') as $f) {
        if (is_file($f) && @unlink($f)) $removed++;
    }
    // Try to remove now-empty parent dirs (best-effort)
    for ($d = rtrim($dir, '/'); strlen($d) > strlen($prodDir); $d = dirname($d)) {
        @rmdir($d);
    }
    return $removed;
}

$totalProducts = 0; $totalImages = 0; $totalFiles = 0; $totalCombinations = 0;
$t0 = microtime(true);

foreach ($ids as $id) {
    $id = (int)$id;

    // Gather image ids
    $imageIds = array_map('intval', $db->executeS("SELECT id_image FROM ps_image WHERE id_product=$id", true, false) ? array_column($db->executeS("SELECT id_image FROM ps_image WHERE id_product=$id"), 'id_image') : []);

    // Delete image files
    $filesRemoved = 0;
    foreach ($imageIds as $iid) $filesRemoved += deleteImageFiles($PROD_DIR, (int)$iid);

    // Combinations
    $combRows = $db->executeS("SELECT id_product_attribute FROM ps_product_attribute WHERE id_product=$id") ?: [];
    $paIds = array_map('intval', array_column($combRows, 'id_product_attribute'));

    // Start deletion
    $db->execute("DELETE FROM ps_image_lang  WHERE id_image  IN (SELECT id_image  FROM ps_image  WHERE id_product=$id)");
    $db->execute("DELETE FROM ps_image_shop  WHERE id_image  IN (SELECT id_image  FROM ps_image  WHERE id_product=$id)");
    $db->execute("DELETE FROM ps_image       WHERE id_product=$id");

    if ($paIds) {
        $list = implode(',', $paIds);
        $db->execute("DELETE FROM ps_product_attribute_combination WHERE id_product_attribute IN ($list)");
        $db->execute("DELETE FROM ps_product_attribute_lang        WHERE id_product_attribute IN ($list)");
        $db->execute("DELETE FROM ps_product_attribute_shop        WHERE id_product_attribute IN ($list)");
        $db->execute("DELETE FROM ps_product_attribute_image       WHERE id_product_attribute IN ($list)");
        $db->execute("DELETE FROM ps_stock_available               WHERE id_product_attribute IN ($list)");
        $db->execute("DELETE FROM ps_product_attribute             WHERE id_product_attribute IN ($list)");
    }

    $db->execute("DELETE FROM ps_stock_available   WHERE id_product=$id");
    $db->execute("DELETE FROM ps_category_product  WHERE id_product=$id");
    $db->execute("DELETE FROM ps_specific_price    WHERE id_product=$id");
    $db->execute("DELETE FROM ps_feature_product   WHERE id_product=$id");
    $db->execute("DELETE FROM ps_product_tag       WHERE id_product=$id");
    $db->execute("DELETE FROM ps_product_supplier  WHERE id_product=$id");
    $db->execute("DELETE FROM ps_accessory         WHERE id_product_1=$id OR id_product_2=$id");
    $db->execute("DELETE FROM ps_product_lang      WHERE id_product=$id");
    $db->execute("DELETE FROM ps_product_shop      WHERE id_product=$id");
    $db->execute("DELETE FROM ps_product           WHERE id_product=$id");

    $totalProducts++;
    $totalImages += count($imageIds);
    $totalFiles += $filesRemoved;
    $totalCombinations += count($paIds);

    if ($totalProducts % 20 === 0) {
        $rate = $totalProducts / (microtime(true) - $t0);
        echo sprintf("  progress: %d/%d (%.1f p/s)\n", $totalProducts, count($ids), $rate);
    }
}

echo sprintf("DONE products=%d images=%d files_removed=%d combinations=%d elapsed=%.1fs\n",
    $totalProducts, $totalImages, $totalFiles, $totalCombinations, microtime(true) - $t0);
