<?php
define('_PS_ADMIN_DIR_', '/var/www/html/admin');
require('/var/www/html/config/config.inc.php');

$sql = 'CREATE TABLE IF NOT EXISTS `' . _DB_PREFIX_ . 'chetto_homepage_product` (
    `id_chetto_homepage_product` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    `section_type` VARCHAR(32) NOT NULL DEFAULT \'featured\',
    `name` VARCHAR(255) NOT NULL,
    `slug` VARCHAR(255) NOT NULL,
    `price` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    `original_price` DECIMAL(10,2) DEFAULT NULL,
    `discount` VARCHAR(32) DEFAULT NULL,
    `image` VARCHAR(255) DEFAULT NULL,
    `badge` VARCHAR(64) DEFAULT NULL,
    `colors` INT(11) UNSIGNED DEFAULT NULL,
    `category` VARCHAR(128) DEFAULT NULL,
    `link` VARCHAR(255) DEFAULT NULL,
    `position` INT(11) UNSIGNED NOT NULL DEFAULT 0,
    `active` TINYINT(1) UNSIGNED NOT NULL DEFAULT 1,
    `date_add` DATETIME NOT NULL,
    `date_upd` DATETIME NOT NULL,
    PRIMARY KEY (`id_chetto_homepage_product`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4';

if (Db::getInstance()->execute($sql)) {
    echo "Table created OK\n";
} else {
    echo "Table creation failed\n";
}

$parentTabId = (int) Tab::getIdFromClassName('AdminChettoParent');
if ($parentTabId) {
    $existingTab = (int) Tab::getIdFromClassName('AdminChettoProducts');
    if (!$existingTab) {
        $tab = new Tab();
        $tab->active = 1;
        $tab->class_name = 'AdminChettoProducts';
        $tab->name = [];
        foreach (Language::getLanguages(true) as $lang) {
            $tab->name[$lang['id_lang']] = 'Productos Homepage';
        }
        $tab->id_parent = $parentTabId;
        $tab->module = 'chettoheadless';
        if ($tab->add()) {
            echo "Tab registered OK\n";
        } else {
            echo "Tab registration failed\n";
        }
    } else {
        echo "Tab already exists\n";
    }
} else {
    echo "Parent tab not found\n";
}
