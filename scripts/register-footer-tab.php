<?php
define('_PS_ADMIN_DIR_', '/var/www/html/admin');
require('/var/www/html/config/config.inc.php');

// Create newsletter table
$sql = 'CREATE TABLE IF NOT EXISTS `' . _DB_PREFIX_ . 'chetto_newsletter` (
    `id_chetto_newsletter` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `active` TINYINT(1) UNSIGNED NOT NULL DEFAULT 1,
    `date_add` DATETIME NOT NULL,
    PRIMARY KEY (`id_chetto_newsletter`),
    UNIQUE KEY `email` (`email`)
) ENGINE=' . _MYSQL_ENGINE_ . ' DEFAULT CHARSET=utf8mb4';

if (Db::getInstance()->execute($sql)) {
    echo "Newsletter table created/verified.\n";
} else {
    echo "ERROR creating newsletter table.\n";
}

// Register tab
$className = 'AdminChettoFooter';
$existing = (int) Tab::getIdFromClassName($className);

if ($existing) {
    echo "Tab '$className' already exists (id: $existing)\n";
} else {
    $parentId = (int) Tab::getIdFromClassName('AdminChettoParent');
    if (!$parentId) {
        echo "ERROR: Parent tab 'AdminChettoParent' not found!\n";
        exit(1);
    }

    $tab = new Tab();
    $tab->active = 1;
    $tab->class_name = $className;
    $tab->name = [];
    foreach (Language::getLanguages(true) as $lang) {
        $tab->name[$lang['id_lang']] = 'Footer y Newsletter';
    }
    $tab->id_parent = $parentId;
    $tab->module = 'chettoheadless';

    if ($tab->add()) {
        echo "Tab '$className' registered successfully (id: {$tab->id})\n";
    } else {
        echo "ERROR: Failed to register tab\n";
    }
}

// Set default config values
$defaults = [
    'CHETTO_NEWSLETTER_TITLE' => 'Únete a la familia barefoot',
    'CHETTO_NEWSLETTER_DESC' => 'Recibe consejos, guías y ofertas exclusivas sobre calzado respetuoso',
    'CHETTO_FOOTER_DESC' => 'Calzado respetuoso para el desarrollo natural de los pies de tus hijos. Diseñado con amor y respeto por la naturaleza.',
    'CHETTO_FOOTER_PHONE' => '660 132 049',
    'CHETTO_FOOTER_EMAIL' => 'tienda@chetto.es',
    'CHETTO_FOOTER_LOCATION' => 'Madrid, España',
];

foreach ($defaults as $key => $value) {
    if (!Configuration::get($key)) {
        Configuration::updateValue($key, $value);
        echo "Set $key\n";
    }
}

echo "Done!\n";
