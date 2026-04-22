<?php

if (!defined('_PS_VERSION_')) {
    exit;
}

class ChettoFooterLink extends ObjectModel
{
    public $id_chetto_footer_link;
    public $column_index;
    public $column_title;
    public $label;
    public $href;
    public $position;
    public $active;
    public $date_add;
    public $date_upd;

    public static $definition = [
        'table' => 'chetto_footer_link',
        'primary' => 'id_chetto_footer_link',
        'fields' => [
            'column_index' => ['type' => self::TYPE_INT, 'validate' => 'isUnsignedInt', 'required' => true],
            'column_title' => ['type' => self::TYPE_STRING, 'validate' => 'isGenericName', 'required' => true, 'size' => 128],
            'label' => ['type' => self::TYPE_STRING, 'validate' => 'isGenericName', 'required' => true, 'size' => 255],
            'href' => ['type' => self::TYPE_STRING, 'required' => true, 'size' => 512],
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
        $sql->from('chetto_footer_link');
        if ($activeOnly) {
            $sql->where('active = 1');
        }
        $sql->orderBy('column_index ASC, position ASC, id_chetto_footer_link ASC');

        return Db::getInstance()->executeS($sql);
    }

    public static function getHighestPosition()
    {
        return (int) Db::getInstance()->getValue(
            'SELECT MAX(position) FROM `' . _DB_PREFIX_ . 'chetto_footer_link`'
        );
    }
}
