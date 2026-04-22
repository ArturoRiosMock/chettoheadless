<?php

require_once _PS_MODULE_DIR_ . 'chettoheadless/classes/ChettoFaq.php';

class AdminChettoFaqController extends ModuleAdminController
{
    private $configKeys = [
        'CHETTO_FAQ_CTA_TITLE',
        'CHETTO_FAQ_CTA_DESC',
        'CHETTO_FAQ_CTA_BUTTON',
    ];

    public function __construct()
    {
        $this->table = 'chetto_faq';
        $this->className = 'ChettoFaq';
        $this->identifier = 'id_chetto_faq';
        $this->lang = false;
        $this->bootstrap = true;
        $this->addRowAction('edit');
        $this->addRowAction('delete');

        parent::__construct();

        $this->bulk_actions = [
            'delete' => [
                'text' => 'Eliminar seleccionados',
                'confirm' => '¿Eliminar las preguntas seleccionadas?',
            ],
        ];

        $this->fields_list = [
            'id_chetto_faq' => ['title' => 'ID', 'width' => 40, 'type' => 'int'],
            'category' => ['title' => 'Categoría', 'width' => 140],
            'question' => ['title' => 'Pregunta', 'width' => 'auto'],
            'position' => ['title' => 'Pos.', 'width' => 50],
            'active' => ['title' => 'Activo', 'width' => 50, 'active' => 'status', 'type' => 'bool'],
        ];
    }

    public function initContent()
    {
        if (Tools::isSubmit('submitFaqConfig')) {
            $this->processSaveConfig();
        }

        parent::initContent();

        if ($this->display !== 'edit' && $this->display !== 'add') {
            $this->content = $this->renderCtaForm() . $this->content;
            $this->context->smarty->assign('content', $this->content);
        }
    }

    private function processSaveConfig()
    {
        foreach ($this->configKeys as $key) {
            Configuration::updateValue($key, Tools::getValue($key));
        }
        $this->confirmations[] = 'Configuración del banner FAQ guardada correctamente.';
    }

    private function renderCtaForm()
    {
        $forms = [[
            'form' => [
                'legend' => ['title' => 'Banner CTA (parte inferior FAQ)', 'icon' => 'icon-question-circle'],
                'description' => 'Banner con gradiente al final de la página de preguntas frecuentes.',
                'input' => [
                    ['type' => 'text', 'label' => 'Título', 'name' => 'CHETTO_FAQ_CTA_TITLE'],
                    ['type' => 'text', 'label' => 'Descripción', 'name' => 'CHETTO_FAQ_CTA_DESC'],
                    ['type' => 'text', 'label' => 'Texto del botón', 'name' => 'CHETTO_FAQ_CTA_BUTTON'],
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
            'CHETTO_FAQ_CTA_TITLE' => Configuration::get('CHETTO_FAQ_CTA_TITLE') ?: '',
            'CHETTO_FAQ_CTA_DESC' => Configuration::get('CHETTO_FAQ_CTA_DESC') ?: '',
            'CHETTO_FAQ_CTA_BUTTON' => Configuration::get('CHETTO_FAQ_CTA_BUTTON') ?: '',
        ];

        return $helper->generateForm($forms);
    }

    public function renderForm()
    {
        $this->fields_form = [
            'legend' => [
                'title' => 'Pregunta frecuente',
                'icon' => 'icon-question',
            ],
            'input' => [
                [
                    'type' => 'text',
                    'label' => 'Categoría',
                    'name' => 'category',
                    'required' => true,
                    'desc' => 'Ej: Pedidos y Envíos',
                ],
                [
                    'type' => 'text',
                    'label' => 'Pregunta',
                    'name' => 'question',
                    'required' => true,
                ],
                [
                    'type' => 'textarea',
                    'label' => 'Respuesta',
                    'name' => 'answer',
                    'required' => true,
                    'rows' => 8,
                    'cols' => 60,
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
        if (Tools::isSubmit('submitAddchetto_faq') || Tools::isSubmit('submitAddchetto_faqAndStay')) {
            if (!isset($_POST['position']) || $_POST['position'] === '') {
                $_POST['position'] = ChettoFaq::getHighestPosition() + 1;
            }
        }

        return parent::postProcess();
    }
}
