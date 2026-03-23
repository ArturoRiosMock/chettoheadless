<?php
/**
 * Post-installation script to enable PrestaShop Webservice API
 * and create an API key with read permissions for the headless frontend.
 *
 * Usage: docker exec -i chetto-prestashop php /var/www/html/scripts/enable-webservice.php
 */

require_once '/var/www/html/config/config.inc.php';

echo "=== Chetto Headless - PrestaShop API Setup ===\n\n";

// 1. Enable Webservice
Configuration::updateValue('PS_WEBSERVICE', 1);
echo "[OK] Webservice API habilitada\n";

// 2. Enable CORS for headless frontend
Configuration::updateValue('PS_WEBSERVICE_CGI_HOST', 1);
echo "[OK] CGI mode habilitado\n";

// 3. Generate API key
$apiKey = bin2hex(random_bytes(16)); // 32 char hex key

$webserviceKey = new WebserviceKey();
$webserviceKey->key = $apiKey;
$webserviceKey->description = 'Chetto Headless Frontend - Next.js';
$webserviceKey->active = 1;

if ($webserviceKey->save()) {
    echo "[OK] API Key creada: $apiKey\n";

    // 4. Set permissions (GET only for headless read access)
    $resources = [
        'products',
        'categories',
        'images',
        'manufacturers',
        'combinations',
        'product_features',
        'product_feature_values',
        'stock_availables',
        'languages',
        'currencies',
        'countries',
        'states',
        'zones',
        'carriers',
        'order_states',
        'customers',
        'orders',
        'carts',
        'addresses',
        'specific_prices',
        'tax_rules',
        'taxes',
        'shops',
    ];

    $idKey = $webserviceKey->id;

    foreach ($resources as $resource) {
        $sql = "INSERT INTO " . _DB_PREFIX_ . "webservice_permission 
                (`id_webservice_account`, `resource`, `method`) 
                VALUES ($idKey, '$resource', 'GET')";
        Db::getInstance()->execute($sql);
    }

    // Also add POST/PUT for carts and orders (needed for checkout)
    $writeResources = ['carts', 'orders', 'customers', 'addresses'];
    $writeMethods = ['POST', 'PUT'];
    
    foreach ($writeResources as $resource) {
        foreach ($writeMethods as $method) {
            $sql = "INSERT INTO " . _DB_PREFIX_ . "webservice_permission 
                    (`id_webservice_account`, `resource`, `method`) 
                    VALUES ($idKey, '$resource', '$method')";
            Db::getInstance()->execute($sql);
        }
    }

    echo "[OK] Permisos configurados para " . count($resources) . " recursos\n";
    echo "\n=== CONFIGURACION COMPLETADA ===\n";
    echo "\nAnade esto a tu archivo .env.local:\n";
    echo "-----------------------------------\n";
    echo "NEXT_PUBLIC_PRESTASHOP_URL=http://localhost:8080\n";
    echo "PRESTASHOP_API_KEY=$apiKey\n";
    echo "-----------------------------------\n";
    echo "\nURLs de acceso:\n";
    echo "  Front Office:  http://localhost:8080\n";
    echo "  Back Office:   http://localhost:8080/admin-chetto\n";
    echo "  API:           http://localhost:8080/api/\n";
    echo "  phpMyAdmin:    http://localhost:8081\n";
} else {
    echo "[ERROR] No se pudo crear la API Key\n";
    foreach ($webserviceKey->getErrors() as $error) {
        echo "  - $error\n";
    }
}
