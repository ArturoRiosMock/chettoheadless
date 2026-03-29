<?php

if (!defined('_PS_VERSION_')) {
    exit;
}

class ChettoCollection extends ObjectModel
{
    public $id_chetto_collection;
    public $name;
    public $description;
    public $image;
    public $slug;
    public $position;
    public $active;
    public $date_add;
    public $date_upd;

    public static $definition = [
        'table' => 'chetto_collection',
        'primary' => 'id_chetto_collection',
        'fields' => [
            'name' => ['type' => self::TYPE_STRING, 'validate' => 'isGenericName', 'required' => true, 'size' => 128],
            'description' => ['type' => self::TYPE_STRING, 'validate' => 'isCleanHtml', 'size' => 255],
            'image' => ['type' => self::TYPE_STRING, 'validate' => 'isGenericName', 'size' => 255],
            'slug' => ['type' => self::TYPE_STRING, 'validate' => 'isLinkRewrite', 'required' => true, 'size' => 128],
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
        $sql->from('chetto_collection');
        if ($activeOnly) {
            $sql->where('active = 1');
        }
        $sql->orderBy('position ASC, id_chetto_collection ASC');

        return Db::getInstance()->executeS($sql);
    }

    public static function getHighestPosition()
    {
        return (int) Db::getInstance()->getValue(
            'SELECT MAX(position) FROM `' . _DB_PREFIX_ . 'chetto_collection`'
        );
    }

    public static function getImageDir()
    {
        return _PS_MODULE_DIR_ . 'chettoheadless/views/img/collections/';
    }

    public static function getImageUrl($filename)
    {
        if (empty($filename)) {
            return '';
        }
        return _PS_BASE_URL_ . __PS_BASE_URI__ . 'modules/chettoheadless/views/img/collections/' . $filename;
    }
}
