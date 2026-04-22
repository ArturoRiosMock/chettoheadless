<?php

if (!defined('_PS_VERSION_')) {
    exit;
}

class ChettoPageBlock extends ObjectModel
{
    public $id_chetto_page_block;
    public $page_key;
    public $block_key;
    public $title;
    public $body;
    public $image;
    public $meta_json;
    public $position;
    public $active;
    public $date_add;
    public $date_upd;

    public static $definition = [
        'table' => 'chetto_page_block',
        'primary' => 'id_chetto_page_block',
        'fields' => [
            'page_key' => ['type' => self::TYPE_STRING, 'validate' => 'isGenericName', 'required' => true, 'size' => 64],
            'block_key' => ['type' => self::TYPE_STRING, 'validate' => 'isGenericName', 'size' => 64],
            'title' => ['type' => self::TYPE_STRING, 'validate' => 'isGenericName', 'required' => true, 'size' => 255],
            'body' => ['type' => self::TYPE_HTML, 'validate' => 'isCleanHtml'],
            'image' => ['type' => self::TYPE_STRING, 'validate' => 'isGenericName', 'size' => 255],
            'meta_json' => ['type' => self::TYPE_HTML],
            'position' => ['type' => self::TYPE_INT, 'validate' => 'isUnsignedInt'],
            'active' => ['type' => self::TYPE_BOOL, 'validate' => 'isBool'],
            'date_add' => ['type' => self::TYPE_DATE, 'validate' => 'isDate'],
            'date_upd' => ['type' => self::TYPE_DATE, 'validate' => 'isDate'],
        ],
    ];

    public static function getByPageKey($pageKey, $activeOnly = true)
    {
        $sql = new DbQuery();
        $sql->select('*');
        $sql->from('chetto_page_block');
        $sql->where('page_key = \'' . pSQL($pageKey) . '\'');
        if ($activeOnly) {
            $sql->where('active = 1');
        }
        $sql->orderBy('position ASC, id_chetto_page_block ASC');

        return Db::getInstance()->executeS($sql);
    }

    public static function getAllByPage($activeOnly = true)
    {
        $sql = new DbQuery();
        $sql->select('*');
        $sql->from('chetto_page_block');
        if ($activeOnly) {
            $sql->where('active = 1');
        }
        $sql->orderBy('page_key ASC, position ASC');

        return Db::getInstance()->executeS($sql);
    }

    public static function getImageUrl($filename)
    {
        if (empty($filename)) {
            return '';
        }

        return _PS_BASE_URL_ . __PS_BASE_URI__ . 'modules/chettoheadless/views/img/page_blocks/' . $filename;
    }

    public static function getImageDir()
    {
        return _PS_MODULE_DIR_ . 'chettoheadless/views/img/page_blocks/';
    }

    public static function getHighestPosition($pageKey)
    {
        return (int) Db::getInstance()->getValue(
            'SELECT MAX(position) FROM `' . _DB_PREFIX_ . 'chetto_page_block` WHERE page_key = \'' . pSQL($pageKey) . '\''
        );
    }
}
