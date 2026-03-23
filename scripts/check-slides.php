<?php
require_once '/var/www/html/config/config.inc.php';
$rows = Db::getInstance()->executeS('SELECT id_chetto_slide, title, image, position, active FROM ' . _DB_PREFIX_ . 'chetto_slide ORDER BY position');
echo json_encode($rows, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
