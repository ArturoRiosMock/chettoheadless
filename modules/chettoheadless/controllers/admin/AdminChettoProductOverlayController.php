<?php

require_once _PS_MODULE_DIR_ . 'chettoheadless/classes/ChettoProductOverlay.php';

class AdminChettoProductOverlayController extends ModuleAdminController
{
    public function __construct()
    {
        $this->table = 'chetto_product_overlay';
        $this->className = 'ChettoProductOverlay';
        $this->identifier = 'id_chetto_product_overlay';
        $this->lang = false;
        $this->bootstrap = true;
        $this->addRowAction('edit');
        $this->addRowAction('delete');

        parent::__construct();

        $this->bulk_actions = [
            'delete' => [
                'text' => 'Eliminar seleccionados',
                'confirm' => '¿Eliminar los overlays seleccionados?',
            ],
        ];

        $this->fields_list = [
            'id_chetto_product_overlay' => ['title' => 'ID', 'width' => 40, 'type' => 'int'],
            'id_product' => ['title' => 'ID producto PS', 'width' => 100],
        ];
    }

    public function renderForm()
    {
        $this->fields_form = [
            'legend' => [
                'title' => 'Texto marketing PDP',
                'icon' => 'icon-shopping-cart',
            ],
            'description' => 'Se muestra en la ficha del producto headless junto a los datos del catálogo PrestaShop. El ID de producto debe coincidir con un producto activo en PrestaShop.',
            'input' => [
                [
                    'type' => 'text',
                    'label' => 'ID producto PrestaShop',
                    'name' => 'id_product',
                    'required' => true,
                ],
                [
                    'type' => 'textarea',
                    'label' => 'HTML marketing (opcional)',
                    'name' => 'marketing_html',
                    'rows' => 10,
                    'cols' => 60,
                    'desc' => 'Bloque adicional bajo la descripción; puede incluir HTML seguro.',
                ],
            ],
            'submit' => ['title' => 'Guardar'],
        ];

        return parent::renderForm();
    }
}
