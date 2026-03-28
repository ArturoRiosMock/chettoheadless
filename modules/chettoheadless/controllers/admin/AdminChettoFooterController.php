<?php

require_once _PS_MODULE_DIR_ . 'chettoheadless/classes/ChettoNewsletter.php';

class AdminChettoFooterController extends ModuleAdminController
{
    private $configKeys = [
        'CHETTO_NEWSLETTER_TITLE',
        'CHETTO_NEWSLETTER_DESC',
        'CHETTO_FOOTER_DESC',
        'CHETTO_FOOTER_PHONE',
        'CHETTO_FOOTER_EMAIL',
        'CHETTO_FOOTER_LOCATION',
    ];

    public function __construct()
    {
        $this->bootstrap = true;
        parent::__construct();
    }

    public function initContent()
    {
        parent::initContent();

        if (Tools::isSubmit('submitFooterConfig')) {
            $this->processSaveConfig();
        }

        if (Tools::isSubmit('deleteSubscriber')) {
            $this->processDeleteSubscriber();
        }

        $html = $this->renderConfigForm();
        $html .= $this->renderSubscribersPanel();

        $this->context->smarty->assign('content', $html);
    }

    private function processSaveConfig()
    {
        foreach ($this->configKeys as $key) {
            Configuration::updateValue($key, Tools::getValue($key));
        }
        $this->confirmations[] = 'Configuración del Footer guardada correctamente.';
    }

    private function processDeleteSubscriber()
    {
        $id = (int) Tools::getValue('id_chetto_newsletter');
        if ($id) {
            $sub = new ChettoNewsletter($id);
            if ($sub->id) {
                $sub->delete();
                $this->confirmations[] = 'Suscriptor eliminado.';
            }
        }
    }

    private function renderConfigForm()
    {
        $forms = [];
        $forms[] = [
            'form' => [
                'legend' => ['title' => 'Newsletter — Configuración', 'icon' => 'icon-envelope'],
                'description' => 'Edita los textos de la sección Newsletter del footer. Los emails recibidos aparecen abajo.',
                'input' => [
                    ['type' => 'text', 'label' => 'Título del Newsletter', 'name' => 'CHETTO_NEWSLETTER_TITLE', 'desc' => 'Ej: Únete a la familia barefoot'],
                    ['type' => 'textarea', 'label' => 'Descripción', 'name' => 'CHETTO_NEWSLETTER_DESC', 'desc' => 'Ej: Recibe consejos, guías y ofertas exclusivas...'],
                ],
                'submit' => ['title' => 'Guardar'],
            ],
        ];

        $forms[] = [
            'form' => [
                'legend' => ['title' => 'Footer — Datos de Contacto', 'icon' => 'icon-home'],
                'description' => 'Edita la descripción y datos de contacto que aparecen en el footer.',
                'input' => [
                    ['type' => 'textarea', 'label' => 'Descripción del footer', 'name' => 'CHETTO_FOOTER_DESC', 'desc' => 'Texto debajo del logo en el footer'],
                    ['type' => 'text', 'label' => 'Teléfono', 'name' => 'CHETTO_FOOTER_PHONE', 'desc' => 'Ej: 660 132 049'],
                    ['type' => 'text', 'label' => 'Email', 'name' => 'CHETTO_FOOTER_EMAIL', 'desc' => 'Ej: tienda@chetto.es'],
                    ['type' => 'text', 'label' => 'Ubicación', 'name' => 'CHETTO_FOOTER_LOCATION', 'desc' => 'Ej: Madrid, España'],
                ],
                'submit' => ['title' => 'Guardar'],
            ],
        ];

        $helper = new HelperForm();
        $helper->module = $this->module;
        $helper->name_controller = 'AdminChettoFooter';
        $helper->token = Tools::getAdminTokenLite('AdminChettoFooter');
        $helper->currentIndex = $this->context->link->getAdminLink('AdminChettoFooter', false);
        $helper->submit_action = 'submitFooterConfig';
        $helper->default_form_language = (int) Configuration::get('PS_LANG_DEFAULT');

        $helper->fields_value = [];
        foreach ($this->configKeys as $key) {
            $helper->fields_value[$key] = Configuration::get($key) ?: '';
        }

        return $helper->generateForm($forms);
    }

    private function renderSubscribersPanel()
    {
        $rows = ChettoNewsletter::getAll();
        $count = ChettoNewsletter::getCount();
        $token = Tools::getAdminTokenLite('AdminChettoFooter');
        $url = $this->context->link->getAdminLink('AdminChettoFooter', false) . '&token=' . $token;

        $html = '<div class="panel"><div class="panel-heading"><i class="icon-users"></i> Suscriptores del Newsletter (' . $count . ')</div>';
        $html .= '<table class="table"><thead><tr>';
        $html .= '<th>ID</th><th>Email</th><th>Fecha</th><th>Acciones</th>';
        $html .= '</tr></thead><tbody>';

        foreach ($rows as $row) {
            $html .= '<tr>';
            $html .= '<td>' . $row['id_chetto_newsletter'] . '</td>';
            $html .= '<td>' . htmlspecialchars($row['email']) . '</td>';
            $html .= '<td>' . $row['date_add'] . '</td>';
            $html .= '<td>';
            $html .= '<a href="' . $url . '&deleteSubscriber=1&id_chetto_newsletter=' . $row['id_chetto_newsletter'] . '" class="btn btn-default btn-sm" onclick="return confirm(\'¿Eliminar este suscriptor?\');"><i class="icon-trash"></i></a>';
            $html .= '</td></tr>';
        }

        if (empty($rows)) {
            $html .= '<tr><td colspan="4" class="text-center">Sin suscriptores aún.</td></tr>';
        }

        $html .= '</tbody></table></div>';

        return $html;
    }
}
