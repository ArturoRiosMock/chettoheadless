<?php
define('_PS_ADMIN_DIR_', '/var/www/html/admin');
require('/var/www/html/config/config.inc.php');

$className = 'AdminChettoFamilias';
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
        $tab->name[$lang['id_lang']] = 'Familias Felices';
    }
    $tab->id_parent = $parentId;
    $tab->module = 'chettoheadless';

    if ($tab->add()) {
        echo "Tab '$className' registered successfully (id: {$tab->id})\n";
    } else {
        echo "ERROR: Failed to register tab\n";
    }
}

echo "Done!\n";
