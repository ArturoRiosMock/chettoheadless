<?php
require_once __DIR__ . '/../config/config.inc.php';

$PROD = _PS_IMG_DIR_ . 'p/';
$logFile = '/tmp/regenerate-thumbnails.log';
$progressFile = '/tmp/regenerate-thumbnails.progress';

function logmsg(string $msg): void {
    global $logFile;
    file_put_contents($logFile, '[' . date('H:i:s') . '] ' . $msg . PHP_EOL, FILE_APPEND);
}

$types = Db::getInstance()->executeS("SELECT name, width, height FROM ps_image_type WHERE products=1");
$rows = Db::getInstance()->executeS("SELECT id_image FROM ps_image ORDER BY id_image");
$total = count($rows);

logmsg("START total_images=$total types=" . count($types));

$srcOk = 0; $missing = 0; $created = 0; $already = 0; $failed = 0;
$start = microtime(true);

foreach ($rows as $i => $r) {
    $img = new Image((int)$r['id_image']);
    $base = $PROD . $img->getExistingImgPath();
    $src = $base . '.jpg';

    if (!file_exists($src) || !filesize($src)) { $missing++; continue; }
    $srcOk++;

    foreach ($types as $t) {
        $dest = $base . '-' . $t['name'] . '.jpg';
        if (file_exists($dest)) { $already++; continue; }
        if (ImageManager::resize($src, $dest, (int)$t['width'], (int)$t['height'], 'jpg')) {
            $created++;
        } else {
            $failed++;
            if ($failed <= 10) logmsg("FAIL resize src=$src type=" . $t['name']);
        }
    }

    if (($i + 1) % 50 === 0) {
        $elapsed = microtime(true) - $start;
        $rate = ($i + 1) / $elapsed;
        $eta = ($total - $i - 1) / max($rate, 0.01);
        $msg = sprintf(
            "PROGRESS %d/%d (%.1f%%) srcOk=%d missing=%d created=%d already=%d failed=%d rate=%.2f img/s eta=%dm%ds",
            $i + 1, $total, (($i + 1) / $total) * 100,
            $srcOk, $missing, $created, $already, $failed,
            $rate, (int)($eta / 60), (int)$eta % 60
        );
        file_put_contents($progressFile, $msg . PHP_EOL);
        logmsg($msg);
    }
}

$elapsed = microtime(true) - $start;
$final = sprintf(
    "DONE total=%d srcOk=%d missing=%d thumbsCreated=%d alreadyExisted=%d failed=%d elapsed=%ds",
    $total, $srcOk, $missing, $created, $already, $failed, (int)$elapsed
);
file_put_contents($progressFile, $final . PHP_EOL);
logmsg($final);
