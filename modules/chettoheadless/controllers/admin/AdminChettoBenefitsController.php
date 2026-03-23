<?php

require_once _PS_MODULE_DIR_ . 'chettoheadless/classes/ChettoBenefit.php';

class AdminChettoBenefitsController extends ModuleAdminController
{
    public function __construct()
    {
        $this->table = 'chetto_benefit';
        $this->className = 'ChettoBenefit';
        $this->identifier = 'id_chetto_benefit';
        $this->lang = false;
        $this->bootstrap = true;
        $this->addRowAction('edit');
        $this->addRowAction('delete');

        parent::__construct();

        $this->bulk_actions = [
            'delete' => [
                'text' => 'Eliminar seleccionados',
                'confirm' => '¿Eliminar los beneficios seleccionados?',
            ],
        ];

        $this->fields_list = [
            'id_chetto_benefit' => ['title' => 'ID', 'width' => 40, 'type' => 'int'],
            'icon' => ['title' => 'Icono', 'width' => 80],
            'title' => ['title' => 'Título', 'width' => 'auto'],
            'description' => ['title' => 'Descripción', 'width' => 'auto'],
            'position' => ['title' => 'Posición', 'width' => 60, 'filter_key' => 'a!position'],
            'active' => ['title' => 'Activo', 'width' => 50, 'active' => 'status', 'type' => 'bool'],
        ];
    }

    public function renderForm()
    {
        $iconOptions = [];
        $icons = ['Truck', 'RotateCcw', 'ShieldCheck', 'CreditCard', 'Heart', 'Star', 'Package', 'Clock', 'Award', 'Zap', 'Gift', 'ThumbsUp'];
        foreach ($icons as $icon) {
            $iconOptions[] = ['id' => $icon, 'name' => $icon];
        }

        $this->fields_form = [
            'legend' => [
                'title' => 'Beneficio',
                'icon' => 'icon-star',
            ],
            'input' => [
                [
                    'type' => 'select',
                    'label' => 'Icono',
                    'name' => 'icon',
                    'required' => true,
                    'options' => [
                        'query' => $iconOptions,
                        'id' => 'id',
                        'name' => 'name',
                    ],
                    'desc' => 'Nombre del icono de Lucide React',
                ],
                [
                    'type' => 'text',
                    'label' => 'Título',
                    'name' => 'title',
                    'required' => true,
                ],
                [
                    'type' => 'text',
                    'label' => 'Descripción',
                    'name' => 'description',
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
        if (Tools::isSubmit('submitAddchetto_benefit') || Tools::isSubmit('submitAddchetto_benefitAndStay')) {
            if (!isset($_POST['position']) || $_POST['position'] === '') {
                $_POST['position'] = ChettoBenefit::getHighestPosition() + 1;
            }
        }

        return parent::postProcess();
    }
}
