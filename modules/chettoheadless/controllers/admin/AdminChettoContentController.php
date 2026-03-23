<?php

require_once _PS_MODULE_DIR_ . 'chettoheadless/classes/ChettoContentBlock.php';

class AdminChettoContentController extends ModuleAdminController
{
    public function __construct()
    {
        $this->table = 'chetto_content_block';
        $this->className = 'ChettoContentBlock';
        $this->identifier = 'id_chetto_content_block';
        $this->lang = false;
        $this->bootstrap = true;
        $this->addRowAction('edit');
        $this->addRowAction('delete');

        parent::__construct();

        $this->bulk_actions = [
            'delete' => [
                'text' => 'Eliminar seleccionados',
                'confirm' => '¿Eliminar los bloques seleccionados?',
            ],
        ];

        $this->fields_list = [
            'id_chetto_content_block' => ['title' => 'ID', 'width' => 40, 'type' => 'int'],
            'type' => ['title' => 'Tipo', 'width' => 140],
            'icon' => ['title' => 'Icono', 'width' => 80],
            'title' => ['title' => 'Título', 'width' => 'auto'],
            'position' => ['title' => 'Posición', 'width' => 60, 'filter_key' => 'a!position'],
            'active' => ['title' => 'Activo', 'width' => 50, 'active' => 'status', 'type' => 'bool'],
        ];

        $this->_defaultOrderBy = 'type';
    }

    public function renderForm()
    {
        $types = ChettoContentBlock::getTypes();
        $typeOptions = [];
        foreach ($types as $key => $label) {
            $typeOptions[] = ['id' => $key, 'name' => $label];
        }

        $iconOptions = [];
        $icons = [
            'Waves', 'ArrowDownToLine', 'Maximize', 'Sprout', 'Heart', 'Footprints', 'Shield',
            'Zap', 'Star', 'Award', 'Eye', 'Move', 'Activity', 'Target', 'Leaf',
        ];
        foreach ($icons as $icon) {
            $iconOptions[] = ['id' => $icon, 'name' => $icon];
        }

        $this->fields_form = [
            'legend' => [
                'title' => 'Bloque de Contenido',
                'icon' => 'icon-puzzle-piece',
            ],
            'input' => [
                [
                    'type' => 'select',
                    'label' => 'Tipo',
                    'name' => 'type',
                    'required' => true,
                    'options' => [
                        'query' => $typeOptions,
                        'id' => 'id',
                        'name' => 'name',
                    ],
                    'desc' => 'Sección donde aparecerá este bloque',
                ],
                [
                    'type' => 'select',
                    'label' => 'Icono',
                    'name' => 'icon',
                    'options' => [
                        'query' => $iconOptions,
                        'id' => 'id',
                        'name' => 'name',
                    ],
                    'desc' => 'Nombre del icono de Lucide React (solo para barefoot_feature y why_barefoot)',
                ],
                [
                    'type' => 'text',
                    'label' => 'Título',
                    'name' => 'title',
                    'required' => true,
                ],
                [
                    'type' => 'textarea',
                    'label' => 'Descripción',
                    'name' => 'description',
                    'rows' => 3,
                    'desc' => 'Texto principal del bloque',
                ],
                [
                    'type' => 'textarea',
                    'label' => 'Texto adicional',
                    'name' => 'extra_text',
                    'rows' => 3,
                    'desc' => 'Para barefoot_feature: descripción larga. Para limitation/barefoot_benefit: no se usa.',
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
        if (Tools::isSubmit('submitAddchetto_content_block') || Tools::isSubmit('submitAddchetto_content_blockAndStay')) {
            $type = Tools::getValue('type');
            if (!isset($_POST['position']) || $_POST['position'] === '') {
                $_POST['position'] = ChettoContentBlock::getHighestPosition($type) + 1;
            }
        }

        return parent::postProcess();
    }
}
