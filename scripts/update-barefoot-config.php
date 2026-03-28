<?php
define('_PS_ADMIN_DIR_', '/var/www/html/admin');
require('/var/www/html/config/config.inc.php');

$key = 'CHETTO_BAREFOOT_TITLE_HIGHLIGHT';
$existing = Configuration::get($key);
if (!$existing) {
    Configuration::updateValue($key, 'calzado barefoot');
    echo "Config set: $key = calzado barefoot\n";
} else {
    echo "Config exists: $key = $existing\n";
}

Configuration::updateValue('CHETTO_BAREFOOT_DESC', 'Descubre qué hace que el calzado barefoot sea diferente y por qué es la mejor elección para el desarrollo saludable de los pies infantiles');
echo "Updated CHETTO_BAREFOOT_DESC\n";

echo "Done!\n";
