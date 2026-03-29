<?php

class AdminChettoInfoPagesController extends ModuleAdminController
{
    private $allKeys = [
        'CHETTO_MAT_TITLE', 'CHETTO_MAT_SUBTITLE', 'CHETTO_MAT_INTRO_TITLE', 'CHETTO_MAT_INTRO_DESC',
        'CHETTO_MAT_COMMIT_TITLE', 'CHETTO_MAT_COMMIT_DESC',
        'CHETTO_ENV_FREE_TEXT', 'CHETTO_ENV_FREE_SUB', 'CHETTO_ENV_INT_TITLE', 'CHETTO_ENV_INT_DESC',
        'CHETTO_ENV_CTA_TITLE', 'CHETTO_ENV_CTA_DESC',
        'CHETTO_CARE_INTRO_TITLE', 'CHETTO_CARE_INTRO_DESC',
        'CHETTO_CARE_REPAIR_TITLE', 'CHETTO_CARE_REPAIR_DESC', 'CHETTO_CARE_PRO_TIP',
    ];

    public function __construct()
    {
        $this->bootstrap = true;
        parent::__construct();
    }

    public function initContent()
    {
        parent::initContent();

        if (Tools::isSubmit('submitInfoPagesConfig')) {
            foreach ($this->allKeys as $key) {
                Configuration::updateValue($key, Tools::getValue($key));
            }
            $this->confirmations[] = 'Configuracion guardada correctamente.';
        }

        $html = $this->renderMaterialesForm() . $this->renderEnviosForm() . $this->renderCuidadoForm();
        $this->context->smarty->assign('content', $html);
    }

    private function renderMaterialesForm()
    {
        $forms = [[
            'form' => [
                'legend' => ['title' => 'Pagina: Materiales', 'icon' => 'icon-leaf'],
                'description' => 'Textos editables de la pagina /materiales',
                'input' => [
                    ['type' => 'text', 'label' => 'Titulo pagina', 'name' => 'CHETTO_MAT_TITLE'],
                    ['type' => 'text', 'label' => 'Subtitulo pagina', 'name' => 'CHETTO_MAT_SUBTITLE'],
                    ['type' => 'text', 'label' => 'Titulo intro', 'name' => 'CHETTO_MAT_INTRO_TITLE'],
                    ['type' => 'textarea', 'label' => 'Descripcion intro', 'name' => 'CHETTO_MAT_INTRO_DESC'],
                    ['type' => 'text', 'label' => 'Titulo compromiso', 'name' => 'CHETTO_MAT_COMMIT_TITLE'],
                    ['type' => 'textarea', 'label' => 'Descripcion compromiso', 'name' => 'CHETTO_MAT_COMMIT_DESC'],
                ],
                'submit' => ['title' => 'Guardar todo'],
            ],
        ]];

        return $this->buildHelper($forms, [
            'CHETTO_MAT_TITLE' => Configuration::get('CHETTO_MAT_TITLE') ?: 'Materiales',
            'CHETTO_MAT_SUBTITLE' => Configuration::get('CHETTO_MAT_SUBTITLE') ?: 'Materiales naturales, sostenibles e hipoalergenicos con la salud de tus hijos y el planeta.',
            'CHETTO_MAT_INTRO_TITLE' => Configuration::get('CHETTO_MAT_INTRO_TITLE') ?: 'Calidad y sostenibilidad en cada detalle',
            'CHETTO_MAT_INTRO_DESC' => Configuration::get('CHETTO_MAT_INTRO_DESC') ?: 'En Chetto seleccionamos cuidadosamente cada material que utilizamos.',
            'CHETTO_MAT_COMMIT_TITLE' => Configuration::get('CHETTO_MAT_COMMIT_TITLE') ?: 'Nuestro compromiso',
            'CHETTO_MAT_COMMIT_DESC' => Configuration::get('CHETTO_MAT_COMMIT_DESC') ?: 'Trabajamos constantemente para mejorar la sostenibilidad de nuestros productos.',
        ]);
    }

    private function renderEnviosForm()
    {
        $forms = [[
            'form' => [
                'legend' => ['title' => 'Pagina: Envios y Devoluciones', 'icon' => 'icon-truck'],
                'description' => 'Textos editables de la pagina /envios-devoluciones',
                'input' => [
                    ['type' => 'text', 'label' => 'Banner envio gratis', 'name' => 'CHETTO_ENV_FREE_TEXT'],
                    ['type' => 'text', 'label' => 'Sub-banner', 'name' => 'CHETTO_ENV_FREE_SUB'],
                    ['type' => 'text', 'label' => 'Titulo internacionales', 'name' => 'CHETTO_ENV_INT_TITLE'],
                    ['type' => 'textarea', 'label' => 'Desc internacionales', 'name' => 'CHETTO_ENV_INT_DESC'],
                    ['type' => 'text', 'label' => 'Titulo CTA final', 'name' => 'CHETTO_ENV_CTA_TITLE'],
                    ['type' => 'text', 'label' => 'Desc CTA final', 'name' => 'CHETTO_ENV_CTA_DESC'],
                ],
                'submit' => ['title' => 'Guardar todo'],
            ],
        ]];

        return $this->buildHelper($forms, [
            'CHETTO_ENV_FREE_TEXT' => Configuration::get('CHETTO_ENV_FREE_TEXT') ?: 'Envio Gratis en pedidos superiores a 60€',
            'CHETTO_ENV_FREE_SUB' => Configuration::get('CHETTO_ENV_FREE_SUB') ?: 'Para Espana Peninsular, valido para envio estandar',
            'CHETTO_ENV_INT_TITLE' => Configuration::get('CHETTO_ENV_INT_TITLE') ?: 'Envios internacionales?',
            'CHETTO_ENV_INT_DESC' => Configuration::get('CHETTO_ENV_INT_DESC') ?: 'Actualmente solo realizamos envios dentro de Espana.',
            'CHETTO_ENV_CTA_TITLE' => Configuration::get('CHETTO_ENV_CTA_TITLE') ?: 'Necesitas mas informacion?',
            'CHETTO_ENV_CTA_DESC' => Configuration::get('CHETTO_ENV_CTA_DESC') ?: 'Nuestro equipo de atencion al cliente esta disponible para resolver tus dudas',
        ]);
    }

    private function renderCuidadoForm()
    {
        $forms = [[
            'form' => [
                'legend' => ['title' => 'Pagina: Cuidado del Calzado', 'icon' => 'icon-wrench'],
                'description' => 'Textos editables de la pagina /cuidado-calzado',
                'input' => [
                    ['type' => 'text', 'label' => 'Titulo intro', 'name' => 'CHETTO_CARE_INTRO_TITLE'],
                    ['type' => 'textarea', 'label' => 'Descripcion intro', 'name' => 'CHETTO_CARE_INTRO_DESC'],
                    ['type' => 'text', 'label' => 'Titulo reparacion', 'name' => 'CHETTO_CARE_REPAIR_TITLE'],
                    ['type' => 'textarea', 'label' => 'Desc reparacion', 'name' => 'CHETTO_CARE_REPAIR_DESC'],
                    ['type' => 'textarea', 'label' => 'Consejo profesional', 'name' => 'CHETTO_CARE_PRO_TIP'],
                ],
                'submit' => ['title' => 'Guardar todo'],
            ],
        ]];

        return $this->buildHelper($forms, [
            'CHETTO_CARE_INTRO_TITLE' => Configuration::get('CHETTO_CARE_INTRO_TITLE') ?: 'Cuida tus zapatos, cuidan de tus hijos',
            'CHETTO_CARE_INTRO_DESC' => Configuration::get('CHETTO_CARE_INTRO_DESC') ?: 'El calzado barefoot esta fabricado con materiales naturales de alta calidad.',
            'CHETTO_CARE_REPAIR_TITLE' => Configuration::get('CHETTO_CARE_REPAIR_TITLE') ?: 'Servicio de reparacion',
            'CHETTO_CARE_REPAIR_DESC' => Configuration::get('CHETTO_CARE_REPAIR_DESC') ?: 'Ofrecemos servicio de reparacion profesional para prolongar la vida util de tu calzado barefoot.',
            'CHETTO_CARE_PRO_TIP' => Configuration::get('CHETTO_CARE_PRO_TIP') ?: 'Si tus hijos usan los zapatos en condiciones humedas frecuentemente, te recomendamos tener dos pares y alternarlos.',
        ]);
    }

    private function buildHelper($forms, $values)
    {
        $helper = new HelperForm();
        $helper->module = $this->module;
        $helper->name_controller = 'AdminChettoInfoPages';
        $helper->token = Tools::getAdminTokenLite('AdminChettoInfoPages');
        $helper->currentIndex = $this->context->link->getAdminLink('AdminChettoInfoPages', false);
        $helper->submit_action = 'submitInfoPagesConfig';
        $helper->default_form_language = (int) Configuration::get('PS_LANG_DEFAULT');
        $helper->fields_value = $values;

        return $helper->generateForm($forms);
    }
}
