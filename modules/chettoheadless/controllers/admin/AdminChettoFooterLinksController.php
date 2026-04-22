<?php

require_once _PS_MODULE_DIR_ . 'chettoheadless/classes/ChettoFooterLink.php';

class AdminChettoFooterLinksController extends ModuleAdminController
{
    public function __construct()
    {
        $this->table = 'chetto_footer_link';
        $this->className = 'ChettoFooterLink';
        $this->identifier = 'id_chetto_footer_link';
        $this->lang = false;
        $this->bootstrap = true;
        $this->addRowAction('edit');
        $this->addRowAction('delete');

        parent::__construct();

        $this->bulk_actions = [
            'delete' => [
                'text' => 'Eliminar seleccionados',
                'confirm' => '¿Eliminar los enlaces seleccionados?',
            ],
        ];

        $this->fields_list = [
            'id_chetto_footer_link' => ['title' => 'ID', 'width' => 40, 'type' => 'int'],
            'column_index' => ['title' => 'Columna', 'width' => 60],
            'column_title' => ['title' => 'Título columna', 'width' => 120],
            'label' => ['title' => 'Texto', 'width' => 'auto'],
            'href' => ['title' => 'Enlace', 'width' => 'auto'],
            'position' => ['title' => 'Pos.', 'width' => 50],
            'active' => ['title' => 'Activo', 'width' => 50, 'active' => 'status', 'type' => 'bool'],
        ];
    }

    public function renderForm()
    {
        $this->fields_form = [
            'legend' => [
                'title' => 'Enlace del footer',
                'icon' => 'icon-list',
            ],
            'input' => [
                [
                    'type' => 'select',
                    'label' => 'Columna (1–3)',
                    'name' => 'column_index',
                    'required' => true,
                    'options' => [
                        'query' => [
                            ['id' => 1, 'name' => '1'],
                            ['id' => 2, 'name' => '2'],
                            ['id' => 3, 'name' => '3'],
                        ],
                        'id' => 'id',
                        'name' => 'name',
                    ],
                ],
                [
                    'type' => 'text',
                    'label' => 'Título de la columna',
                    'name' => 'column_title',
                    'required' => true,
                    'desc' => 'Debe coincidir en todos los enlaces de la misma columna (ej: Compra)',
                ],
                [
                    'type' => 'text',
                    'label' => 'Texto del enlace',
                    'name' => 'label',
                    'required' => true,
                ],
                [
                    'type' => 'text',
                    'label' => 'Enlace',
                    'name' => 'href',
                    'required' => true,
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
        if (Tools::isSubmit('submitAddchetto_footer_link') || Tools::isSubmit('submitAddchetto_footer_linkAndStay')) {
            if (!isset($_POST['position']) || $_POST['position'] === '') {
                $_POST['position'] = ChettoFooterLink::getHighestPosition() + 1;
            }
        }

        return parent::postProcess();
    }
}
