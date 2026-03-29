<?php

class AdminChettoCollectionsController extends ModuleAdminController
{
    private $configKeys = [
        'CHETTO_COLLECTION_CTA_TITLE',
        'CHETTO_COLLECTION_CTA_DESC',
        'CHETTO_COLLECTION_CTA_TEXT',
        'CHETTO_COLLECTION_CTA_LINK',
    ];

    public function __construct()
    {
        $this->bootstrap = true;
        parent::__construct();
    }

    public function initContent()
    {
        parent::initContent();

        if (Tools::isSubmit('submitCollectionConfig')) {
            $this->processSaveConfig();
        }

        $html = $this->renderConfigForm();

        $this->context->smarty->assign('content', $html);
    }

    private function processSaveConfig()
    {
        foreach ($this->configKeys as $key) {
            Configuration::updateValue($key, Tools::getValue($key));
        }
        $this->confirmations[] = 'Configuración de la página de Colecciones guardada correctamente.';
    }

    private function renderConfigForm()
    {
        $forms = [];
        $forms[] = [
            'form' => [
                'legend' => ['title' => 'Página de Colecciones — Banner CTA', 'icon' => 'icon-tags'],
                'description' => 'Edita el banner que aparece al final de cada página de colección. Este banner se muestra en todas las colecciones (Botas, Sneakers, Sandalias, etc.).',
                'input' => [
                    ['type' => 'text', 'label' => 'Título del banner', 'name' => 'CHETTO_COLLECTION_CTA_TITLE', 'desc' => 'Ej: ¿Primera vez con calzado barefoot?'],
                    ['type' => 'textarea', 'label' => 'Descripción', 'name' => 'CHETTO_COLLECTION_CTA_DESC', 'desc' => 'Texto debajo del título'],
                    ['type' => 'text', 'label' => 'Texto del botón', 'name' => 'CHETTO_COLLECTION_CTA_TEXT', 'desc' => 'Ej: Ver Guía Barefoot'],
                    ['type' => 'text', 'label' => 'Enlace del botón', 'name' => 'CHETTO_COLLECTION_CTA_LINK', 'desc' => 'Ej: /porque-barefoot'],
                ],
                'submit' => ['title' => 'Guardar'],
            ],
        ];

        $helper = new HelperForm();
        $helper->module = $this->module;
        $helper->name_controller = 'AdminChettoCollections';
        $helper->token = Tools::getAdminTokenLite('AdminChettoCollections');
        $helper->currentIndex = $this->context->link->getAdminLink('AdminChettoCollections', false);
        $helper->submit_action = 'submitCollectionConfig';
        $helper->default_form_language = (int) Configuration::get('PS_LANG_DEFAULT');

        $helper->fields_value = [];
        foreach ($this->configKeys as $key) {
            $helper->fields_value[$key] = Configuration::get($key) ?: '';
        }

        return $helper->generateForm($forms);
    }
}
