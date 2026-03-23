<?php

require_once _PS_MODULE_DIR_ . 'chettoheadless/classes/ChettoTestimonial.php';

class AdminChettoTestimonialsController extends ModuleAdminController
{
    public function __construct()
    {
        $this->table = 'chetto_testimonial';
        $this->className = 'ChettoTestimonial';
        $this->identifier = 'id_chetto_testimonial';
        $this->lang = false;
        $this->bootstrap = true;
        $this->addRowAction('edit');
        $this->addRowAction('delete');

        parent::__construct();

        $this->bulk_actions = [
            'delete' => [
                'text' => 'Eliminar seleccionados',
                'confirm' => '¿Eliminar los testimonios seleccionados?',
            ],
        ];

        $this->fields_list = [
            'id_chetto_testimonial' => ['title' => 'ID', 'width' => 40, 'type' => 'int'],
            'name' => ['title' => 'Nombre', 'width' => 'auto'],
            'location' => ['title' => 'Ubicación', 'width' => 120],
            'rating' => ['title' => 'Valoración', 'width' => 60, 'type' => 'int'],
            'position' => ['title' => 'Posición', 'width' => 60, 'filter_key' => 'a!position'],
            'active' => ['title' => 'Activo', 'width' => 50, 'active' => 'status', 'type' => 'bool'],
        ];
    }

    public function renderForm()
    {
        $ratingOptions = [];
        for ($i = 1; $i <= 5; $i++) {
            $ratingOptions[] = ['id' => $i, 'name' => str_repeat('*', $i) . " ($i)"];
        }

        $this->fields_form = [
            'legend' => [
                'title' => 'Testimonio',
                'icon' => 'icon-comment',
            ],
            'input' => [
                [
                    'type' => 'text',
                    'label' => 'Nombre',
                    'name' => 'name',
                    'required' => true,
                ],
                [
                    'type' => 'text',
                    'label' => 'Ubicación',
                    'name' => 'location',
                    'desc' => 'Ej: Madrid',
                ],
                [
                    'type' => 'select',
                    'label' => 'Valoración',
                    'name' => 'rating',
                    'options' => [
                        'query' => $ratingOptions,
                        'id' => 'id',
                        'name' => 'name',
                    ],
                ],
                [
                    'type' => 'textarea',
                    'label' => 'Texto del testimonio',
                    'name' => 'text',
                    'required' => true,
                    'rows' => 4,
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
        if (Tools::isSubmit('submitAddchetto_testimonial') || Tools::isSubmit('submitAddchetto_testimonialAndStay')) {
            if (!isset($_POST['position']) || $_POST['position'] === '') {
                $_POST['position'] = ChettoTestimonial::getHighestPosition() + 1;
            }
        }

        return parent::postProcess();
    }
}
