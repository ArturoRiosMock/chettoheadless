<?php

if (!defined('_PS_VERSION_')) {
    exit;
}

class ChettoProductOverlay extends ObjectModel
{
    public $id_chetto_product_overlay;
    public $id_product;
    public $marketing_html;
    public $date_add;
    public $date_upd;

    public static $definition = [
        'table' => 'chetto_product_overlay',
        'primary' => 'id_chetto_product_overlay',
        'fields' => [
            'id_product' => ['type' => self::TYPE_INT, 'validate' => 'isUnsignedId', 'required' => true],
            'marketing_html' => ['type' => self::TYPE_HTML, 'validate' => 'isCleanHtml'],
            'date_add' => ['type' => self::TYPE_DATE, 'validate' => 'isDate'],
            'date_upd' => ['type' => self::TYPE_DATE, 'validate' => 'isDate'],
        ],
    ];

    public static function getByProductId($idProduct)
    {
        $idProduct = (int) $idProduct;
        if ($idProduct < 1) {
            return null;
        }

        $sql = new DbQuery();
        $sql->select('*');
        $sql->from('chetto_product_overlay');
        $sql->where('id_product = ' . $idProduct);

        $row = Db::getInstance()->getRow($sql);

        return $row ?: null;
    }
}
