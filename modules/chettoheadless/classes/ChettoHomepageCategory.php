<?php

if (!defined('_PS_VERSION_')) {
    exit;
}

class ChettoHomepageCategory extends ObjectModel
{
    public $id_chetto_homepage_category;
    public $name;
    public $description;
    public $image;
    public $slug;
    public $link;
    public $position;
    public $active;
    public $date_add;
    public $date_upd;

    public static $definition = [
        'table' => 'chetto_homepage_category',
        'primary' => 'id_chetto_homepage_category',
        'fields' => [
            'name' => ['type' => self::TYPE_STRING, 'validate' => 'isGenericName', 'required' => true, 'size' => 128],
            'description' => ['type' => self::TYPE_STRING, 'validate' => 'isCleanHtml', 'size' => 255],
            'image' => ['type' => self::TYPE_STRING, 'validate' => 'isGenericName', 'size' => 255],
            'slug' => ['type' => self::TYPE_STRING, 'validate' => 'isLinkRewrite', 'required' => true, 'size' => 128],
            'link' => ['type' => self::TYPE_STRING, 'validate' => 'isUrl', 'size' => 255],
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
        $sql->from('chetto_homepage_category');
        if ($activeOnly) {
            $sql->where('active = 1');
        }
        $sql->orderBy('position ASC, id_chetto_homepage_category ASC');

        return Db::getInstance()->executeS($sql);
    }

    public static function getHighestPosition()
    {
        return (int) Db::getInstance()->getValue(
            'SELECT MAX(position) FROM `' . _DB_PREFIX_ . 'chetto_homepage_category`'
        );
    }

    public static function getImageDir()
    {
        return _PS_MODULE_DIR_ . 'chettoheadless/views/img/categories/';
    }

    public static function getImageUrl($filename)
    {
        if (empty($filename)) {
            return '';
        }
        return _PS_BASE_URL_ . __PS_BASE_URI__ . 'modules/chettoheadless/views/img/categories/' . $filename;
    }
}
