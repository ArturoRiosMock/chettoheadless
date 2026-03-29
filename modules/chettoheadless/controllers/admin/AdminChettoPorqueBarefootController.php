<?php

class AdminChettoPorqueBarefootController extends ModuleAdminController
{
    private $configKeys = [
        'CHETTO_BF_HERO_TITLE1',
        'CHETTO_BF_HERO_TITLE2',
        'CHETTO_BF_HERO_DESC',
        'CHETTO_BF_HERO_STAT',
        'CHETTO_BF_HERO_STAT_LABEL',
        'CHETTO_BF_BENEFITS_TITLE',
        'CHETTO_BF_BENEFITS_SUBTITLE',
        'CHETTO_BF_COMP_TITLE',
        'CHETTO_BF_COMP_SUBTITLE',
        'CHETTO_BF_ESSENTIALS_TITLE',
        'CHETTO_BF_ESSENTIALS_SUBTITLE',
        'CHETTO_BF_STAGES_TITLE',
        'CHETTO_BF_STAGES_SUBTITLE',
        'CHETTO_BF_FAQ_TITLE',
        'CHETTO_BF_FAQ_SUBTITLE',
        'CHETTO_BF_CTA_TITLE',
        'CHETTO_BF_CTA_DESC',
    ];

    public function __construct()
    {
        $this->bootstrap = true;
        parent::__construct();
    }

    public function initContent()
    {
        parent::initContent();

        if (Tools::isSubmit('submitBarefootPageConfig')) {
            $this->processSaveConfig();
        }

        $html = $this->renderHeroForm()
            . $this->renderBenefitsForm()
            . $this->renderCompForm()
            . $this->renderEssentialsForm()
            . $this->renderStagesForm()
            . $this->renderFaqForm()
            . $this->renderCtaForm();

        $this->context->smarty->assign('content', $html);
    }

    private function processSaveConfig()
    {
        foreach ($this->configKeys as $key) {
            Configuration::updateValue($key, Tools::getValue($key));
        }
        $this->confirmations[] = 'Configuracion de la pagina guardada correctamente.';
    }

    private function renderHeroForm()
    {
        $forms = [[
            'form' => [
                'legend' => ['title' => 'Hero / Cabecera', 'icon' => 'icon-picture-o'],
                'description' => 'Seccion principal con titulo, descripcion, imagen y estadistica.',
                'input' => [
                    ['type' => 'text', 'label' => 'Titulo linea 1', 'name' => 'CHETTO_BF_HERO_TITLE1', 'desc' => 'Ej: Por que elegir'],
                    ['type' => 'text', 'label' => 'Titulo linea 2 (dorado)', 'name' => 'CHETTO_BF_HERO_TITLE2', 'desc' => 'Ej: Barefoot'],
                    ['type' => 'textarea', 'label' => 'Descripcion', 'name' => 'CHETTO_BF_HERO_DESC'],
                    ['type' => 'text', 'label' => 'Estadistica (numero)', 'name' => 'CHETTO_BF_HERO_STAT', 'desc' => 'Ej: 95%'],
                    ['type' => 'text', 'label' => 'Estadistica (texto)', 'name' => 'CHETTO_BF_HERO_STAT_LABEL', 'desc' => 'Ej: de padres notan mejoras'],
                ],
                'submit' => ['title' => 'Guardar'],
            ],
        ]];

        return $this->buildHelper($forms, [
            'CHETTO_BF_HERO_TITLE1' => Configuration::get('CHETTO_BF_HERO_TITLE1') ?: 'Por que elegir',
            'CHETTO_BF_HERO_TITLE2' => Configuration::get('CHETTO_BF_HERO_TITLE2') ?: 'Barefoot',
            'CHETTO_BF_HERO_DESC' => Configuration::get('CHETTO_BF_HERO_DESC') ?: 'El calzado barefoot respeta el desarrollo natural del pie infantil, permitiendo que tus hijos crezcan con pies fuertes, sanos y libres.',
            'CHETTO_BF_HERO_STAT' => Configuration::get('CHETTO_BF_HERO_STAT') ?: '95%',
            'CHETTO_BF_HERO_STAT_LABEL' => Configuration::get('CHETTO_BF_HERO_STAT_LABEL') ?: 'de padres notan mejoras',
        ]);
    }

    private function renderBenefitsForm()
    {
        $forms = [[
            'form' => [
                'legend' => ['title' => 'Seccion Beneficios', 'icon' => 'icon-star'],
                'input' => [
                    ['type' => 'text', 'label' => 'Titulo', 'name' => 'CHETTO_BF_BENEFITS_TITLE'],
                    ['type' => 'text', 'label' => 'Subtitulo', 'name' => 'CHETTO_BF_BENEFITS_SUBTITLE'],
                ],
                'submit' => ['title' => 'Guardar'],
            ],
        ]];

        return $this->buildHelper($forms, [
            'CHETTO_BF_BENEFITS_TITLE' => Configuration::get('CHETTO_BF_BENEFITS_TITLE') ?: 'Beneficios del Calzado Barefoot',
            'CHETTO_BF_BENEFITS_SUBTITLE' => Configuration::get('CHETTO_BF_BENEFITS_SUBTITLE') ?: 'Descubre como el calzado respetuoso puede transformar la salud y el bienestar de los pies de tus hijos',
        ]);
    }

    private function renderCompForm()
    {
        $forms = [[
            'form' => [
                'legend' => ['title' => 'Seccion Comparacion', 'icon' => 'icon-exchange'],
                'input' => [
                    ['type' => 'text', 'label' => 'Titulo', 'name' => 'CHETTO_BF_COMP_TITLE'],
                    ['type' => 'text', 'label' => 'Subtitulo', 'name' => 'CHETTO_BF_COMP_SUBTITLE'],
                ],
                'submit' => ['title' => 'Guardar'],
            ],
        ]];

        return $this->buildHelper($forms, [
            'CHETTO_BF_COMP_TITLE' => Configuration::get('CHETTO_BF_COMP_TITLE') ?: 'Barefoot vs Calzado Tradicional',
            'CHETTO_BF_COMP_SUBTITLE' => Configuration::get('CHETTO_BF_COMP_SUBTITLE') ?: 'Comprende las diferencias fundamentales y por que importa',
        ]);
    }

    private function renderEssentialsForm()
    {
        $forms = [[
            'form' => [
                'legend' => ['title' => 'Seccion 3 Caracteristicas', 'icon' => 'icon-list-ol'],
                'input' => [
                    ['type' => 'text', 'label' => 'Titulo', 'name' => 'CHETTO_BF_ESSENTIALS_TITLE'],
                    ['type' => 'text', 'label' => 'Subtitulo', 'name' => 'CHETTO_BF_ESSENTIALS_SUBTITLE'],
                ],
                'submit' => ['title' => 'Guardar'],
            ],
        ]];

        return $this->buildHelper($forms, [
            'CHETTO_BF_ESSENTIALS_TITLE' => Configuration::get('CHETTO_BF_ESSENTIALS_TITLE') ?: 'Las 3 Caracteristicas Esenciales',
            'CHETTO_BF_ESSENTIALS_SUBTITLE' => Configuration::get('CHETTO_BF_ESSENTIALS_SUBTITLE') ?: 'Todo calzado barefoot debe cumplir estos requisitos fundamentales',
        ]);
    }

    private function renderStagesForm()
    {
        $forms = [[
            'form' => [
                'legend' => ['title' => 'Seccion Etapas', 'icon' => 'icon-child'],
                'input' => [
                    ['type' => 'text', 'label' => 'Titulo', 'name' => 'CHETTO_BF_STAGES_TITLE'],
                    ['type' => 'text', 'label' => 'Subtitulo', 'name' => 'CHETTO_BF_STAGES_SUBTITLE'],
                ],
                'submit' => ['title' => 'Guardar'],
            ],
        ]];

        return $this->buildHelper($forms, [
            'CHETTO_BF_STAGES_TITLE' => Configuration::get('CHETTO_BF_STAGES_TITLE') ?: 'Barefoot en Cada Etapa',
            'CHETTO_BF_STAGES_SUBTITLE' => Configuration::get('CHETTO_BF_STAGES_SUBTITLE') ?: 'El desarrollo del pie es continuo durante toda la infancia',
        ]);
    }

    private function renderFaqForm()
    {
        $forms = [[
            'form' => [
                'legend' => ['title' => 'Seccion Preguntas Frecuentes', 'icon' => 'icon-question-circle'],
                'input' => [
                    ['type' => 'text', 'label' => 'Titulo', 'name' => 'CHETTO_BF_FAQ_TITLE'],
                    ['type' => 'text', 'label' => 'Subtitulo', 'name' => 'CHETTO_BF_FAQ_SUBTITLE'],
                ],
                'submit' => ['title' => 'Guardar'],
            ],
        ]];

        return $this->buildHelper($forms, [
            'CHETTO_BF_FAQ_TITLE' => Configuration::get('CHETTO_BF_FAQ_TITLE') ?: 'Preguntas Frecuentes',
            'CHETTO_BF_FAQ_SUBTITLE' => Configuration::get('CHETTO_BF_FAQ_SUBTITLE') ?: 'Resolvemos tus dudas sobre el calzado barefoot',
        ]);
    }

    private function renderCtaForm()
    {
        $forms = [[
            'form' => [
                'legend' => ['title' => 'Seccion CTA Final', 'icon' => 'icon-bullhorn'],
                'input' => [
                    ['type' => 'text', 'label' => 'Titulo', 'name' => 'CHETTO_BF_CTA_TITLE'],
                    ['type' => 'textarea', 'label' => 'Descripcion', 'name' => 'CHETTO_BF_CTA_DESC'],
                ],
                'submit' => ['title' => 'Guardar'],
            ],
        ]];

        return $this->buildHelper($forms, [
            'CHETTO_BF_CTA_TITLE' => Configuration::get('CHETTO_BF_CTA_TITLE') ?: 'Listo para dar el paso?',
            'CHETTO_BF_CTA_DESC' => Configuration::get('CHETTO_BF_CTA_DESC') ?: 'Descubre nuestra coleccion de calzado barefoot y empieza a cuidar los pies de tus hijos de la mejor forma posible.',
        ]);
    }

    private function buildHelper($forms, $values)
    {
        $helper = new HelperForm();
        $helper->module = $this->module;
        $helper->name_controller = 'AdminChettoPorqueBarefoot';
        $helper->token = Tools::getAdminTokenLite('AdminChettoPorqueBarefoot');
        $helper->currentIndex = $this->context->link->getAdminLink('AdminChettoPorqueBarefoot', false);
        $helper->submit_action = 'submitBarefootPageConfig';
        $helper->default_form_language = (int) Configuration::get('PS_LANG_DEFAULT');
        $helper->fields_value = $values;

        return $helper->generateForm($forms);
    }
}
