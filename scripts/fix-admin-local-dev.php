<?php
/**
 * Ajustes para back office en HTTP local (IP o localhost sin certificado).
 *
 * - PS_SSL_ENABLED_EVERYWHERE=1 con http:// provoca recursos/enlaces https rotos y
 *   el admin puede quedar sin navegar o sin cargar widgets.
 * - Fuerza _PS_MODE_DEMO_=0 en configuración por si el toggle dejó la clave en BD.
 *
 * Uso: docker exec chetto-prestashop php /var/www/html/scripts/fix-admin-local-dev.php
 */
declare(strict_types=1);

require_once '/var/www/html/config/config.inc.php';

Configuration::updateValue('PS_SSL_ENABLED_EVERYWHERE', 0);
Configuration::updateValue('PS_SSL_ENABLED', 0);
Configuration::updateValue('_PS_MODE_DEMO_', 0);

echo "[OK] PS_SSL_ENABLED_EVERYWHERE=0, PS_SSL_ENABLED=0, _PS_MODE_DEMO_=0\n";
echo "Limpia caché: docker exec chetto-prestashop bash -c \"rm -rf /var/www/html/var/cache/* && chown -R www-data:www-data /var/www/html/var\"\n";
