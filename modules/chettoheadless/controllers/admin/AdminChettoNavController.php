<?php

require_once _PS_MODULE_DIR_ . 'chettoheadless/classes/ChettoNavItem.php';

class AdminChettoNavController extends ModuleAdminController
{
    public function __construct()
    {
        $this->table = 'chetto_nav_item';
        $this->className = 'ChettoNavItem';
        $this->identifier = 'id_chetto_nav_item';
        $this->lang = false;
        $this->bootstrap = true;
        $this->addRowAction('edit');
        $this->addRowAction('delete');

        parent::__construct();

        $this->bulk_actions = [
            'delete' => [
                'text' => 'Eliminar seleccionados',
                'confirm' => '¿Eliminar los elementos seleccionados?',
            ],
        ];

        $this->fields_list = [
            'id_chetto_nav_item' => ['title' => 'ID', 'width' => 40, 'type' => 'int'],
            'label' => ['title' => 'Texto', 'width' => 'auto'],
            'href' => ['title' => 'Enlace', 'width' => 'auto'],
            'position' => ['title' => 'Posición', 'width' => 60],
            'active' => ['title' => 'Activo', 'width' => 50, 'active' => 'status', 'type' => 'bool'],
        ];
    }

    public function renderForm()
    {
        $this->fields_form = [
            'legend' => [
                'title' => 'Elemento del menú',
                'icon' => 'icon-link',
            ],
            'input' => [
                [
                    'type' => 'text',
                    'label' => 'Texto',
                    'name' => 'label',
                    'required' => true,
                ],
                [
                    'type' => 'text',
                    'label' => 'Enlace (URL o ruta)',
                    'name' => 'href',
                    'required' => true,
                    'desc' => 'Ej: /colecciones o https://...',
                ],
                [
                    'type' => 'text',
                    'label' => 'Posición',
                    'name' => 'position',
                ],
                [
                    'type' => 'switch',
                    'label' => 'Activo',
                    'name' => 'active',
                    'values' => [
                        ['id' => 'active_on', 'value' => 1, 'label' => 'Sí'],
                        ['id' => 'active_off', 'value' => 0, 'label' => 'No'],
                    ],
                ],
            ],
            'submit' => ['title' => 'Guardar'],
        ];

        return parent::renderForm();
    }

    public function postProcess()
    {
        if (Tools::isSubmit('submitAddchetto_nav_item') || Tools::isSubmit('submitAddchetto_nav_itemAndStay')) {
            if (!isset($_POST['position']) || $_POST['position'] === '') {
                $_POST['position'] = ChettoNavItem::getHighestPosition() + 1;
            }
        }

        return parent::postProcess();
    }
}
