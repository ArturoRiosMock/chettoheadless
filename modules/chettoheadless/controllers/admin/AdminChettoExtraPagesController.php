<?php

class AdminChettoExtraPagesController extends ModuleAdminController
{
    public function __construct()
    {
        $this->bootstrap = true;
        parent::__construct();
        $this->meta_title = 'Paginas Extra';
    }

    public function initContent()
    {
        parent::initContent();

        $html = '';

        if (Tools::isSubmit('submitSizePage')) {
            $keys = [
                'CHETTO_SZ_CTA_TITLE', 'CHETTO_SZ_CTA_DESC', 'CHETTO_SZ_CTA_BUTTON',
            ];
            foreach ($keys as $key) {
                Configuration::updateValue($key, Tools::getValue($key));
            }
            $html .= $this->module->displayConfirmation('Guía de Tallas guardada');
        }

        if (Tools::isSubmit('submitServicePage')) {
            $keys = [
                'CHETTO_CS_PHONE', 'CHETTO_CS_EMAIL',
                'CHETTO_CS_HOURS_WEEKDAY', 'CHETTO_CS_HOURS_SAT',
                'CHETTO_CS_COMMIT_DESC',
            ];
            foreach ($keys as $key) {
                Configuration::updateValue($key, Tools::getValue($key));
            }
            $html .= $this->module->displayConfirmation('Atención al Cliente guardada');
        }

        if (Tools::isSubmit('submitContactPage')) {
            $keys = ['CHETTO_CONTACT_PHONE', 'CHETTO_CONTACT_EMAIL'];
            foreach ($keys as $key) {
                Configuration::updateValue($key, Tools::getValue($key));
            }
            $html .= $this->module->displayConfirmation('Contacto guardado');
        }

        if (Tools::isSubmit('submitStoresPage')) {
            Configuration::updateValue('CHETTO_STORES_TITLE', Tools::getValue('CHETTO_STORES_TITLE'));
            $html .= $this->module->displayConfirmation('Tiendas guardado');
        }

        if (Tools::isSubmit('submitAboutPage')) {
            $keys = ['CHETTO_ABOUT_CTA_TITLE', 'CHETTO_ABOUT_CTA_DESC'];
            foreach ($keys as $key) {
                Configuration::updateValue($key, Tools::getValue($key));
            }
            $html .= $this->module->displayConfirmation('Sobre Nosotros guardado');
        }

        $html .= $this->renderSizeForm();
        $html .= $this->renderServiceForm();
        $html .= $this->renderContactForm();
        $html .= $this->renderStoresForm();
        $html .= $this->renderAboutForm();

        $this->context->smarty->assign('content', $html);
    }

    private function renderSizeForm()
    {
        $form = [
            'form' => [
                'legend' => ['title' => 'Guia de Tallas - CTA Banner', 'icon' => 'icon-resize-full'],
                'input' => [
                    ['type' => 'text', 'label' => 'Titulo CTA', 'name' => 'CHETTO_SZ_CTA_TITLE', 'required' => true],
                    ['type' => 'textarea', 'label' => 'Descripcion CTA', 'name' => 'CHETTO_SZ_CTA_DESC'],
                    ['type' => 'text', 'label' => 'Texto boton', 'name' => 'CHETTO_SZ_CTA_BUTTON'],
                ],
                'submit' => ['title' => 'Guardar Guia de Tallas'],
            ],
        ];

        $helper = $this->createHelper('submitSizePage');
        $helper->fields_value = [
            'CHETTO_SZ_CTA_TITLE' => Configuration::get('CHETTO_SZ_CTA_TITLE') ?: '',
            'CHETTO_SZ_CTA_DESC' => Configuration::get('CHETTO_SZ_CTA_DESC') ?: '',
            'CHETTO_SZ_CTA_BUTTON' => Configuration::get('CHETTO_SZ_CTA_BUTTON') ?: '',
        ];

        return $helper->generateForm([$form]);
    }

    private function renderServiceForm()
    {
        $form = [
            'form' => [
                'legend' => ['title' => 'Atencion al Cliente', 'icon' => 'icon-headphones'],
                'input' => [
                    ['type' => 'text', 'label' => 'Telefono', 'name' => 'CHETTO_CS_PHONE'],
                    ['type' => 'text', 'label' => 'Email', 'name' => 'CHETTO_CS_EMAIL'],
                    ['type' => 'text', 'label' => 'Horario L-V', 'name' => 'CHETTO_CS_HOURS_WEEKDAY'],
                    ['type' => 'text', 'label' => 'Horario Sabados', 'name' => 'CHETTO_CS_HOURS_SAT'],
                    ['type' => 'textarea', 'label' => 'Compromiso descripcion', 'name' => 'CHETTO_CS_COMMIT_DESC'],
                ],
                'submit' => ['title' => 'Guardar Atencion al Cliente'],
            ],
        ];

        $helper = $this->createHelper('submitServicePage');
        $helper->fields_value = [
            'CHETTO_CS_PHONE' => Configuration::get('CHETTO_CS_PHONE') ?: '',
            'CHETTO_CS_EMAIL' => Configuration::get('CHETTO_CS_EMAIL') ?: '',
            'CHETTO_CS_HOURS_WEEKDAY' => Configuration::get('CHETTO_CS_HOURS_WEEKDAY') ?: '',
            'CHETTO_CS_HOURS_SAT' => Configuration::get('CHETTO_CS_HOURS_SAT') ?: '',
            'CHETTO_CS_COMMIT_DESC' => Configuration::get('CHETTO_CS_COMMIT_DESC') ?: '',
        ];

        return $helper->generateForm([$form]);
    }

    private function renderContactForm()
    {
        $form = [
            'form' => [
                'legend' => ['title' => 'Pagina Contacto', 'icon' => 'icon-envelope'],
                'input' => [
                    ['type' => 'text', 'label' => 'Telefono', 'name' => 'CHETTO_CONTACT_PHONE'],
                    ['type' => 'text', 'label' => 'Email', 'name' => 'CHETTO_CONTACT_EMAIL'],
                ],
                'submit' => ['title' => 'Guardar Contacto'],
            ],
        ];

        $helper = $this->createHelper('submitContactPage');
        $helper->fields_value = [
            'CHETTO_CONTACT_PHONE' => Configuration::get('CHETTO_CONTACT_PHONE') ?: '',
            'CHETTO_CONTACT_EMAIL' => Configuration::get('CHETTO_CONTACT_EMAIL') ?: '',
        ];

        return $helper->generateForm([$form]);
    }

    private function renderStoresForm()
    {
        $form = [
            'form' => [
                'legend' => ['title' => 'Pagina Tiendas', 'icon' => 'icon-map-marker'],
                'input' => [
                    ['type' => 'text', 'label' => 'Titulo pagina', 'name' => 'CHETTO_STORES_TITLE'],
                ],
                'submit' => ['title' => 'Guardar Tiendas'],
            ],
        ];

        $helper = $this->createHelper('submitStoresPage');
        $helper->fields_value = [
            'CHETTO_STORES_TITLE' => Configuration::get('CHETTO_STORES_TITLE') ?: '',
        ];

        return $helper->generateForm([$form]);
    }

    private function renderAboutForm()
    {
        $form = [
            'form' => [
                'legend' => ['title' => 'Sobre Nosotros - CTA', 'icon' => 'icon-info-sign'],
                'input' => [
                    ['type' => 'text', 'label' => 'Titulo CTA', 'name' => 'CHETTO_ABOUT_CTA_TITLE'],
                    ['type' => 'textarea', 'label' => 'Descripcion CTA', 'name' => 'CHETTO_ABOUT_CTA_DESC'],
                ],
                'submit' => ['title' => 'Guardar Sobre Nosotros'],
            ],
        ];

        $helper = $this->createHelper('submitAboutPage');
        $helper->fields_value = [
            'CHETTO_ABOUT_CTA_TITLE' => Configuration::get('CHETTO_ABOUT_CTA_TITLE') ?: '',
            'CHETTO_ABOUT_CTA_DESC' => Configuration::get('CHETTO_ABOUT_CTA_DESC') ?: '',
        ];

        return $helper->generateForm([$form]);
    }

    private function createHelper($submitAction)
    {
        $helper = new HelperForm();
        $helper->module = $this->module;
        $helper->name_controller = $this->module->name;
        $helper->token = Tools::getAdminTokenLite($this->controller_name);
        $helper->currentIndex = $this->context->link->getAdminLink($this->controller_name, false);
        $helper->submit_action = $submitAction;
        $helper->default_form_language = (int) Configuration::get('PS_LANG_DEFAULT');
        return $helper;
    }
}
