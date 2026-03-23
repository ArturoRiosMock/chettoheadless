<?php

if (!defined('_PS_VERSION_')) {
    exit;
}

class ChettoSlide extends ObjectModel
{
    public $id_chetto_slide;
    public $badge;
    public $subtitle;
    public $title;
    public $description;
    public $cta;
    public $cta_link;
    public $image;
    public $position;
    public $active;
    public $date_add;
    public $date_upd;

    public static $definition = [
        'table' => 'chetto_slide',
        'primary' => 'id_chetto_slide',
        'fields' => [
            'badge' => ['type' => self::TYPE_STRING, 'validate' => 'isGenericName', 'size' => 128],
            'subtitle' => ['type' => self::TYPE_STRING, 'validate' => 'isGenericName', 'size' => 255],
            'title' => ['type' => self::TYPE_STRING, 'validate' => 'isGenericName', 'required' => true, 'size' => 255],
            'description' => ['type' => self::TYPE_STRING, 'validate' => 'isCleanHtml', 'size' => 512],
            'cta' => ['type' => self::TYPE_STRING, 'validate' => 'isGenericName', 'size' => 128],
            'cta_link' => ['type' => self::TYPE_STRING, 'validate' => 'isUrl', 'size' => 255],
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
        $sql->from('chetto_slide');
        if ($activeOnly) {
            $sql->where('active = 1');
        }
        $sql->orderBy('position ASC, id_chetto_slide ASC');

        return Db::getInstance()->executeS($sql);
    }

    public static function getHighestPosition()
    {
        return (int) Db::getInstance()->getValue(
            'SELECT MAX(position) FROM `' . _DB_PREFIX_ . 'chetto_slide`'
        );
    }

    public static function getImageDir()
    {
        return _PS_MODULE_DIR_ . 'chettoheadless/views/img/slides/';
    }

    public static function getImageUrl($filename)
    {
        if (empty($filename)) {
            return '';
        }
        return _PS_BASE_URL_ . __PS_BASE_URI__ . 'modules/chettoheadless/views/img/slides/' . $filename;
    }
}
