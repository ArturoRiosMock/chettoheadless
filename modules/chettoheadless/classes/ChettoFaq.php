<?php

if (!defined('_PS_VERSION_')) {
    exit;
}

class ChettoFaq extends ObjectModel
{
    public $id_chetto_faq;
    public $category;
    public $question;
    public $answer;
    public $position;
    public $active;
    public $date_add;
    public $date_upd;

    public static $definition = [
        'table' => 'chetto_faq',
        'primary' => 'id_chetto_faq',
        'fields' => [
            'category' => ['type' => self::TYPE_STRING, 'validate' => 'isGenericName', 'required' => true, 'size' => 128],
            'question' => ['type' => self::TYPE_STRING, 'required' => true, 'size' => 512],
            'answer' => ['type' => self::TYPE_HTML, 'validate' => 'isCleanHtml', 'required' => true],
            'position' => ['type' => self::TYPE_INT, 'validate' => 'isUnsignedInt'],
            'active' => ['type' => self::TYPE_BOOL, 'validate' => 'isBool'],
            'date_add' => ['type' => self::TYPE_DATE, 'validate' => 'isDate'],
            'date_upd' => ['type' => self::TYPE_DATE, 'validate' => 'isDate'],
        ],
    ];

    public static function getAllGrouped($activeOnly = true)
    {
        $sql = new DbQuery();
        $sql->select('*');
        $sql->from('chetto_faq');
        if ($activeOnly) {
            $sql->where('active = 1');
        }
        $sql->orderBy('category ASC, position ASC, id_chetto_faq ASC');

        return Db::getInstance()->executeS($sql);
    }

    public static function getHighestPosition()
    {
        return (int) Db::getInstance()->getValue(
            'SELECT MAX(position) FROM `' . _DB_PREFIX_ . 'chetto_faq`'
        );
    }
}
