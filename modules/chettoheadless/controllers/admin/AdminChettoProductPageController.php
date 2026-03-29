<?php

class AdminChettoProductPageController extends ModuleAdminController
{
    private $configKeys = [
        'CHETTO_PDP_SHIPPING_1',
        'CHETTO_PDP_SHIPPING_2',
        'CHETTO_PDP_SHIPPING_3',
        'CHETTO_PDP_SHIPPING_4',
        'CHETTO_PDP_SHIPPING_5',
        'CHETTO_PDP_PACK_TITLE',
        'CHETTO_PDP_PACK_DESC',
        'CHETTO_PDP_RELATED_TITLE',
        'CHETTO_PDP_RELATED_SUBTITLE',
    ];

    public function __construct()
    {
        $this->bootstrap = true;
        parent::__construct();
    }

    public function initContent()
    {
        parent::initContent();

        if (Tools::isSubmit('submitProductPageConfig')) {
            $this->processSaveConfig();
        }

        $html = $this->renderShippingForm() . $this->renderPackForm() . $this->renderRelatedForm();
        $this->context->smarty->assign('content', $html);
    }

    private function processSaveConfig()
    {
        foreach ($this->configKeys as $key) {
            Configuration::updateValue($key, Tools::getValue($key));
        }
        $this->confirmations[] = 'Configuracion de la pagina de producto guardada correctamente.';
    }

    private function renderShippingForm()
    {
        $forms = [[
            'form' => [
                'legend' => ['title' => 'Iconos de Envio y Garantias', 'icon' => 'icon-truck'],
                'description' => 'Textos que aparecen debajo del boton "Anadir al carrito" en cada ficha de producto.',
                'input' => [
                    ['type' => 'text', 'label' => 'Envio', 'name' => 'CHETTO_PDP_SHIPPING_1', 'desc' => 'Ej: Envio gratis y rapido entre 24-48h'],
                    ['type' => 'text', 'label' => 'Pedido', 'name' => 'CHETTO_PDP_SHIPPING_2', 'desc' => 'Ej: Solo sobre pedido y unidades limitadas'],
                    ['type' => 'text', 'label' => 'Devoluciones', 'name' => 'CHETTO_PDP_SHIPPING_3', 'desc' => 'Ej: Cambios y devoluciones gratis 30 dias'],
                    ['type' => 'text', 'label' => 'Seguridad', 'name' => 'CHETTO_PDP_SHIPPING_4', 'desc' => 'Ej: Compra segura con SSL 256bits'],
                    ['type' => 'text', 'label' => 'Pago', 'name' => 'CHETTO_PDP_SHIPPING_5', 'desc' => 'Ej: Pago en hasta en 3 cuotas sin intereses'],
                ],
                'submit' => ['title' => 'Guardar'],
            ],
        ]];

        return $this->buildHelper($forms, [
            'CHETTO_PDP_SHIPPING_1' => Configuration::get('CHETTO_PDP_SHIPPING_1') ?: 'Envio gratis y rapido entre 24-48h',
            'CHETTO_PDP_SHIPPING_2' => Configuration::get('CHETTO_PDP_SHIPPING_2') ?: 'Solo sobre pedido y unidades limitadas',
            'CHETTO_PDP_SHIPPING_3' => Configuration::get('CHETTO_PDP_SHIPPING_3') ?: 'Cambios y devoluciones gratis 30 dias',
            'CHETTO_PDP_SHIPPING_4' => Configuration::get('CHETTO_PDP_SHIPPING_4') ?: 'Compra segura con SSL 256bits',
            'CHETTO_PDP_SHIPPING_5' => Configuration::get('CHETTO_PDP_SHIPPING_5') ?: 'Pago en hasta en 3 cuotas sin intereses',
        ]);
    }

    private function renderPackForm()
    {
        $forms = [[
            'form' => [
                'legend' => ['title' => 'Seccion Oferta Pack', 'icon' => 'icon-gift'],
                'description' => 'Banner de oferta pack que aparece debajo de la descripcion del producto.',
                'input' => [
                    ['type' => 'text', 'label' => 'Titulo', 'name' => 'CHETTO_PDP_PACK_TITLE', 'desc' => 'Ej: Oferta Pack con Descuento'],
                    ['type' => 'text', 'label' => 'Descripcion', 'name' => 'CHETTO_PDP_PACK_DESC', 'desc' => 'Ej: Combina y ahorra un 15% comprando estos productos juntos'],
                ],
                'submit' => ['title' => 'Guardar'],
            ],
        ]];

        return $this->buildHelper($forms, [
            'CHETTO_PDP_PACK_TITLE' => Configuration::get('CHETTO_PDP_PACK_TITLE') ?: 'Oferta Pack con Descuento',
            'CHETTO_PDP_PACK_DESC' => Configuration::get('CHETTO_PDP_PACK_DESC') ?: 'Combina y ahorra un 15% comprando estos productos juntos',
        ]);
    }

    private function renderRelatedForm()
    {
        $forms = [[
            'form' => [
                'legend' => ['title' => 'Seccion Productos Relacionados', 'icon' => 'icon-th'],
                'description' => 'Titulo y subtitulo de la seccion de productos relacionados.',
                'input' => [
                    ['type' => 'text', 'label' => 'Titulo', 'name' => 'CHETTO_PDP_RELATED_TITLE', 'desc' => 'Ej: Tambien te puede interesar'],
                    ['type' => 'text', 'label' => 'Subtitulo', 'name' => 'CHETTO_PDP_RELATED_SUBTITLE'],
                ],
                'submit' => ['title' => 'Guardar'],
            ],
        ]];

        return $this->buildHelper($forms, [
            'CHETTO_PDP_RELATED_TITLE' => Configuration::get('CHETTO_PDP_RELATED_TITLE') ?: 'Tambien te puede interesar',
            'CHETTO_PDP_RELATED_SUBTITLE' => Configuration::get('CHETTO_PDP_RELATED_SUBTITLE') ?: 'Descubre mas opciones de calzado barefoot',
        ]);
    }

    private function buildHelper($forms, $values)
    {
        $helper = new HelperForm();
        $helper->module = $this->module;
        $helper->name_controller = 'AdminChettoProductPage';
        $helper->token = Tools::getAdminTokenLite('AdminChettoProductPage');
        $helper->currentIndex = $this->context->link->getAdminLink('AdminChettoProductPage', false);
        $helper->submit_action = 'submitProductPageConfig';
        $helper->default_form_language = (int) Configuration::get('PS_LANG_DEFAULT');
        $helper->fields_value = $values;

        return $helper->generateForm($forms);
    }
}
