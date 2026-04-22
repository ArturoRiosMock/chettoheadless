<?php

if (!defined('_PS_VERSION_')) {
    exit;
}

class ChettoStore extends ObjectModel
{
    public $id_chetto_store;
    public $name;
    public $address_line1;
    public $address_line2;
    public $phone;
    public $maps_query;
    public $image;
    public $position;
    public $active;
    public $date_add;
    public $date_upd;

    public static $definition = [
        'table' => 'chetto_store',
        'primary' => 'id_chetto_store',
        'fields' => [
            'name' => ['type' => self::TYPE_STRING, 'validate' => 'isGenericName', 'required' => true, 'size' => 255],
            'address_line1' => ['type' => self::TYPE_STRING, 'required' => true, 'size' => 255],
            'address_line2' => ['type' => self::TYPE_STRING, 'size' => 255],
            'phone' => ['type' => self::TYPE_STRING, 'size' => 64],
            'maps_query' => ['type' => self::TYPE_STRING, 'size' => 512],
            'image' => ['type' => self::TYPE_STRING, 'validate' => 'isGenericName', 'size' => 255],
            'position' => ['type' => self::TYPE_INT, 'validate' => 'isUnsignedInt'],
            'active' => ['type' => self::TYPE_BOOL, 'validate' => 'isBool'],
            'date_add' => ['type' => self::TYPE_DATE, 'validate' => 'isDate'],
            'date_upd' => ['type' => self::TYPE_DATE, 'validate' => 'isDate'],
        ],
    ];

    public static function getAll($activeOnly = true)
    {
        $sql = new DbQuery();
        $sql->select('*');
        $sql->from('chetto_store');
        if ($activeOnly) {
            $sql->where('active = 1');
        }
        $sql->orderBy('position ASC, id_chetto_store ASC');

        return Db::getInstance()->executeS($sql);
    }

    public static function getImageUrl($filename)
    {
        if (empty($filename)) {
            return '';
        }

        return _PS_BASE_URL_ . __PS_BASE_URI__ . 'modules/chettoheadless/views/img/stores/' . $filename;
    }

    public static function getImageDir()
    {
        return _PS_MODULE_DIR_ . 'chettoheadless/views/img/stores/';
    }

    public static function getHighestPosition()
    {
        return (int) Db::getInstance()->getValue(
            'SELECT MAX(position) FROM `' . _DB_PREFIX_ . 'chetto_store`'
        );
    }
}
