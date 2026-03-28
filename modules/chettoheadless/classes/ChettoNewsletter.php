<?php

class ChettoNewsletter extends ObjectModel
{
    public $email;
    public $active = 1;
    public $date_add;

    public static $definition = [
        'table' => 'chetto_newsletter',
        'primary' => 'id_chetto_newsletter',
        'fields' => [
            'email' => ['type' => self::TYPE_STRING, 'validate' => 'isEmail', 'required' => true, 'size' => 255],
            'active' => ['type' => self::TYPE_BOOL, 'validate' => 'isBool'],
            'date_add' => ['type' => self::TYPE_DATE, 'validate' => 'isDate'],
        ],
    ];

    public static function emailExists($email)
    {
        return (bool) Db::getInstance()->getValue(
            'SELECT id_chetto_newsletter FROM `' . _DB_PREFIX_ . 'chetto_newsletter` WHERE email = \'' . pSQL($email) . '\''
        );
    }

    public static function getAll()
    {
        return Db::getInstance()->executeS(
            'SELECT * FROM `' . _DB_PREFIX_ . 'chetto_newsletter` WHERE active = 1 ORDER BY date_add DESC'
        );
    }

    public static function getCount()
    {
        return (int) Db::getInstance()->getValue(
            'SELECT COUNT(*) FROM `' . _DB_PREFIX_ . 'chetto_newsletter` WHERE active = 1'
        );
    }
}
