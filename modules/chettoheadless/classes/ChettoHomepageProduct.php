<?php

if (!defined('_PS_VERSION_')) {
    exit;
}

class ChettoHomepageProduct extends ObjectModel
{
    public $id_chetto_homepage_product;
    public $section_type;
    public $name;
    public $slug;
    public $price;
    public $original_price;
    public $discount;
    public $image;
    public $badge;
    public $colors;
    public $category;
    public $link;
    public $position;
    public $active;
    public $date_add;
    public $date_upd;

    public static $definition = [
        'table' => 'chetto_homepage_product',
        'primary' => 'id_chetto_homepage_product',
        'fields' => [
            'section_type' => ['type' => self::TYPE_STRING, 'validate' => 'isGenericName', 'required' => true, 'size' => 32],
            'name' => ['type' => self::TYPE_STRING, 'validate' => 'isGenericName', 'required' => true, 'size' => 255],
            'slug' => ['type' => self::TYPE_STRING, 'validate' => 'isGenericName', 'required' => true, 'size' => 255],
            'price' => ['type' => self::TYPE_FLOAT, 'validate' => 'isPrice', 'required' => true],
            'original_price' => ['type' => self::TYPE_FLOAT, 'validate' => 'isPrice'],
            'discount' => ['type' => self::TYPE_STRING, 'validate' => 'isGenericName', 'size' => 32],
            'image' => ['type' => self::TYPE_STRING, 'validate' => 'isGenericName', 'size' => 255],
            'badge' => ['type' => self::TYPE_STRING, 'validate' => 'isGenericName', 'size' => 64],
            'colors' => ['type' => self::TYPE_INT, 'validate' => 'isUnsignedInt'],
            'category' => ['type' => self::TYPE_STRING, 'validate' => 'isGenericName', 'size' => 128],
            'link' => ['type' => self::TYPE_STRING, 'validate' => 'isUrl', 'size' => 255],
            'position' => ['type' => self::TYPE_INT, 'validate' => 'isUnsignedInt'],
            'active' => ['type' => self::TYPE_BOOL, 'validate' => 'isBool'],
            'date_add' => ['type' => self::TYPE_DATE, 'validate' => 'isDate'],
            'date_upd' => ['type' => self::TYPE_DATE, 'validate' => 'isDate'],
        ],
    ];

    public static function getBySection($sectionType, $activeOnly = true)
    {
        $sql = new DbQuery();
        $sql->select('*');
        $sql->from('chetto_homepage_product');
        $sql->where('section_type = \'' . pSQL($sectionType) . '\'');
        if ($activeOnly) {
            $sql->where('active = 1');
        }
        $sql->orderBy('position ASC, id_chetto_homepage_product ASC');

        return Db::getInstance()->executeS($sql);
    }

    public static function getHighestPosition($sectionType)
    {
        return (int) Db::getInstance()->getValue(
            'SELECT MAX(position) FROM `' . _DB_PREFIX_ . 'chetto_homepage_product` WHERE section_type = \'' . pSQL($sectionType) . '\''
        );
    }

    public static function getImageDir()
    {
        return _PS_MODULE_DIR_ . 'chettoheadless/views/img/products/';
    }

    public static function getImageUrl($filename)
    {
        if (empty($filename)) {
            return '';
        }
        return _PS_BASE_URL_ . __PS_BASE_URI__ . 'modules/chettoheadless/views/img/products/' . $filename;
    }

    public static function getSectionTypes()
    {
        return [
            'featured' => 'Productos Destacados',
            'favorites' => 'Favoritos de Clientes',
        ];
    }
}
