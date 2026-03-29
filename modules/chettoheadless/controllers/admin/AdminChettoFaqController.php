<?php

class AdminChettoFaqController extends ModuleAdminController
{
    private $configKeys = [
        'CHETTO_FAQ_CTA_TITLE',
        'CHETTO_FAQ_CTA_DESC',
        'CHETTO_FAQ_CTA_BUTTON',
    ];

    public function __construct()
    {
        $this->bootstrap = true;
        parent::__construct();
    }

    public function initContent()
    {
        parent::initContent();

        if (Tools::isSubmit('submitFaqConfig')) {
            $this->processSaveConfig();
        }

        $html = $this->renderCtaForm();
        $this->context->smarty->assign('content', $html);
    }

    private function processSaveConfig()
    {
        foreach ($this->configKeys as $key) {
            Configuration::updateValue($key, Tools::getValue($key));
        }
        $this->confirmations[] = 'Configuracion de FAQ guardada correctamente.';
    }

    private function renderCtaForm()
    {
        $forms = [[
            'form' => [
                'legend' => ['title' => 'Banner CTA (parte inferior)', 'icon' => 'icon-question-circle'],
                'description' => 'Banner con gradiente que aparece al final de la pagina de Preguntas Frecuentes.',
                'input' => [
                    ['type' => 'text', 'label' => 'Titulo', 'name' => 'CHETTO_FAQ_CTA_TITLE', 'desc' => 'Ej: No encuentras lo que buscas?'],
                    ['type' => 'text', 'label' => 'Descripcion', 'name' => 'CHETTO_FAQ_CTA_DESC'],
                    ['type' => 'text', 'label' => 'Texto del boton', 'name' => 'CHETTO_FAQ_CTA_BUTTON', 'desc' => 'Ej: Contactar con nosotros'],
                ],
                'submit' => ['title' => 'Guardar'],
            ],
        ]];

        $helper = new HelperForm();
        $helper->module = $this->module;
        $helper->name_controller = 'AdminChettoFaq';
        $helper->token = Tools::getAdminTokenLite('AdminChettoFaq');
        $helper->currentIndex = $this->context->link->getAdminLink('AdminChettoFaq', false);
        $helper->submit_action = 'submitFaqConfig';
        $helper->default_form_language = (int) Configuration::get('PS_LANG_DEFAULT');
        $helper->fields_value = [
            'CHETTO_FAQ_CTA_TITLE' => Configuration::get('CHETTO_FAQ_CTA_TITLE') ?: 'No encuentras lo que buscas?',
            'CHETTO_FAQ_CTA_DESC' => Configuration::get('CHETTO_FAQ_CTA_DESC') ?: 'Nuestro equipo de atencion al cliente estara encantado de ayudarte',
            'CHETTO_FAQ_CTA_BUTTON' => Configuration::get('CHETTO_FAQ_CTA_BUTTON') ?: 'Contactar con nosotros',
        ];

        return $helper->generateForm($forms);
    }
}
