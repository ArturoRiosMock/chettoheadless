<?php

if (!defined('_PS_VERSION_')) {
    exit;
}

class ChettoTestimonial extends ObjectModel
{
    public $id_chetto_testimonial;
    public $name;
    public $location;
    public $rating;
    public $text;
    public $position;
    public $active;
    public $date_add;
    public $date_upd;

    public static $definition = [
        'table' => 'chetto_testimonial',
        'primary' => 'id_chetto_testimonial',
        'fields' => [
            'name' => ['type' => self::TYPE_STRING, 'validate' => 'isGenericName', 'required' => true, 'size' => 128],
            'location' => ['type' => self::TYPE_STRING, 'validate' => 'isGenericName', 'size' => 128],
            'rating' => ['type' => self::TYPE_INT, 'validate' => 'isUnsignedInt'],
            'text' => ['type' => self::TYPE_HTML, 'validate' => 'isCleanHtml', 'required' => true],
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
        $sql->from('chetto_testimonial');
        if ($activeOnly) {
            $sql->where('active = 1');
        }
        $sql->orderBy('position ASC, id_chetto_testimonial ASC');

        return Db::getInstance()->executeS($sql);
    }

    public static function getHighestPosition()
    {
        return (int) Db::getInstance()->getValue(
            'SELECT MAX(position) FROM `' . _DB_PREFIX_ . 'chetto_testimonial`'
        );
    }
}
