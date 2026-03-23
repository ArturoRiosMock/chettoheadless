<?php

if (!defined('_PS_VERSION_')) {
    exit;
}

class ChettoContentBlock extends ObjectModel
{
    public $id_chetto_content_block;
    public $type;
    public $icon;
    public $title;
    public $description;
    public $extra_text;
    public $position;
    public $active;
    public $date_add;
    public $date_upd;

    public static $definition = [
        'table' => 'chetto_content_block',
        'primary' => 'id_chetto_content_block',
        'fields' => [
            'type' => ['type' => self::TYPE_STRING, 'validate' => 'isGenericName', 'required' => true, 'size' => 64],
            'icon' => ['type' => self::TYPE_STRING, 'validate' => 'isGenericName', 'size' => 64],
            'title' => ['type' => self::TYPE_STRING, 'validate' => 'isGenericName', 'required' => true, 'size' => 255],
            'description' => ['type' => self::TYPE_HTML, 'validate' => 'isCleanHtml'],
            'extra_text' => ['type' => self::TYPE_HTML, 'validate' => 'isCleanHtml'],
            'position' => ['type' => self::TYPE_INT, 'validate' => 'isUnsignedInt'],
            'active' => ['type' => self::TYPE_BOOL, 'validate' => 'isBool'],
            'date_add' => ['type' => self::TYPE_DATE, 'validate' => 'isDate'],
            'date_upd' => ['type' => self::TYPE_DATE, 'validate' => 'isDate'],
        ],
    ];

    public static function getByType($type, $activeOnly = true)
    {
        $sql = new DbQuery();
        $sql->select('*');
        $sql->from('chetto_content_block');
        $sql->where('type = \'' . pSQL($type) . '\'');
        if ($activeOnly) {
            $sql->where('active = 1');
        }
        $sql->orderBy('position ASC, id_chetto_content_block ASC');

        return Db::getInstance()->executeS($sql);
    }

    public static function getAll($activeOnly = true)
    {
        $sql = new DbQuery();
        $sql->select('*');
        $sql->from('chetto_content_block');
        if ($activeOnly) {
            $sql->where('active = 1');
        }
        $sql->orderBy('type ASC, position ASC, id_chetto_content_block ASC');

        return Db::getInstance()->executeS($sql);
    }

    public static function getHighestPosition($type)
    {
        return (int) Db::getInstance()->getValue(
            'SELECT MAX(position) FROM `' . _DB_PREFIX_ . 'chetto_content_block` WHERE type = \'' . pSQL($type) . '\''
        );
    }

    public static function getTypes()
    {
        return [
            'barefoot_feature' => 'Características Barefoot (acordeón)',
            'why_barefoot' => 'Por qué Barefoot (tarjetas)',
            'limitation' => 'Limitaciones calzado convencional',
            'barefoot_benefit' => 'Beneficios Barefoot',
            'why_barefoot_feature' => 'Por qué Barefoot (features izq.)',
        ];
    }
}
