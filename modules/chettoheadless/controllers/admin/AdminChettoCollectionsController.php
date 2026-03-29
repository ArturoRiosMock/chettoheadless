<?php

require_once _PS_MODULE_DIR_ . 'chettoheadless/classes/ChettoCollection.php';

class AdminChettoCollectionsController extends ModuleAdminController
{
    public function __construct()
    {
        $this->bootstrap = true;
        $this->table = 'chetto_collection';
        $this->className = 'ChettoCollection';
        $this->identifier = 'id_chetto_collection';
        $this->_defaultOrderBy = 'position';
        $this->_defaultOrderWay = 'ASC';
        $this->position_identifier = 'id_chetto_collection';

        parent::__construct();

        $this->bulk_actions = [
            'delete' => [
                'text' => 'Eliminar seleccionados',
                'confirm' => 'Eliminar las colecciones seleccionadas?',
            ],
        ];

        $this->fields_list = [
            'id_chetto_collection' => ['title' => 'ID', 'width' => 40, 'type' => 'int'],
            'name' => ['title' => 'Nombre', 'width' => 'auto'],
            'slug' => ['title' => 'Slug', 'width' => 120],
            'description' => ['title' => 'Descripcion', 'width' => 'auto'],
            'position' => ['title' => 'Posicion', 'width' => 60, 'position' => 'position', 'filter_key' => 'a!position'],
            'active' => ['title' => 'Activo', 'width' => 50, 'active' => 'status', 'type' => 'bool'],
        ];
    }

    public function initContent()
    {
        parent::initContent();

        if (Tools::isSubmit('submitCollectionPageConfig')) {
            $this->processSavePageConfig();
        }

        if ($this->display !== 'edit' && $this->display !== 'add') {
            $configHtml = $this->renderPageConfigForm();
            $ctaHtml = $this->renderCtaForm();
            $this->content = $configHtml . $ctaHtml . $this->content;
            $this->context->smarty->assign('content', $this->content);
        }
    }

    private function processSavePageConfig()
    {
        $keys = [
            'CHETTO_COLL_PAGE_TITLE',
            'CHETTO_COLL_PAGE_SUBTITLE',
            'CHETTO_COLLECTION_CTA_TITLE',
            'CHETTO_COLLECTION_CTA_DESC',
            'CHETTO_COLLECTION_CTA_TEXT',
            'CHETTO_COLLECTION_CTA_LINK',
        ];

        foreach ($keys as $key) {
            Configuration::updateValue($key, Tools::getValue($key));
        }

        $this->confirmations[] = 'Configuracion de la pagina guardada correctamente.';
    }

    private function renderPageConfigForm()
    {
        $forms = [];

        $forms[] = [
            'form' => [
                'legend' => ['title' => 'Pagina de Colecciones — Titulo y Subtitulo', 'icon' => 'icon-list'],
                'description' => 'Textos principales que aparecen en la parte superior de la pagina /colecciones.',
                'input' => [
                    ['type' => 'text', 'label' => 'Titulo de la pagina', 'name' => 'CHETTO_COLL_PAGE_TITLE', 'desc' => 'Ej: Nuestras Colecciones'],
                    ['type' => 'text', 'label' => 'Subtitulo', 'name' => 'CHETTO_COLL_PAGE_SUBTITLE', 'desc' => 'Ej: Encuentra el calzado barefoot perfecto para cada ocasion'],
                ],
                'submit' => ['title' => 'Guardar'],
            ],
        ];

        $helper = new HelperForm();
        $helper->module = $this->module;
        $helper->name_controller = 'AdminChettoCollections';
        $helper->token = Tools::getAdminTokenLite('AdminChettoCollections');
        $helper->currentIndex = $this->context->link->getAdminLink('AdminChettoCollections', false);
        $helper->submit_action = 'submitCollectionPageConfig';
        $helper->default_form_language = (int) Configuration::get('PS_LANG_DEFAULT');

        $helper->fields_value = [
            'CHETTO_COLL_PAGE_TITLE' => Configuration::get('CHETTO_COLL_PAGE_TITLE') ?: 'Nuestras Colecciones',
            'CHETTO_COLL_PAGE_SUBTITLE' => Configuration::get('CHETTO_COLL_PAGE_SUBTITLE') ?: 'Encuentra el calzado barefoot perfecto para cada ocasion',
        ];

        return $helper->generateForm($forms);
    }

    private function renderCtaForm()
    {
        $forms = [];

        $forms[] = [
            'form' => [
                'legend' => ['title' => 'Banner CTA (fondo de pagina)', 'icon' => 'icon-tags'],
                'description' => 'Banner con gradiente que aparece al final de cada pagina de coleccion individual (/colecciones/botas, etc.).',
                'input' => [
                    ['type' => 'text', 'label' => 'Titulo del banner', 'name' => 'CHETTO_COLLECTION_CTA_TITLE', 'desc' => 'Ej: Primera vez con calzado barefoot?'],
                    ['type' => 'textarea', 'label' => 'Descripcion', 'name' => 'CHETTO_COLLECTION_CTA_DESC'],
                    ['type' => 'text', 'label' => 'Texto del boton', 'name' => 'CHETTO_COLLECTION_CTA_TEXT', 'desc' => 'Ej: Ver Guia Barefoot'],
                    ['type' => 'text', 'label' => 'Enlace del boton', 'name' => 'CHETTO_COLLECTION_CTA_LINK', 'desc' => 'Ej: /porque-barefoot'],
                ],
                'submit' => ['title' => 'Guardar'],
            ],
        ];

        $helper = new HelperForm();
        $helper->module = $this->module;
        $helper->name_controller = 'AdminChettoCollections';
        $helper->token = Tools::getAdminTokenLite('AdminChettoCollections');
        $helper->currentIndex = $this->context->link->getAdminLink('AdminChettoCollections', false);
        $helper->submit_action = 'submitCollectionPageConfig';
        $helper->default_form_language = (int) Configuration::get('PS_LANG_DEFAULT');

        $helper->fields_value = [
            'CHETTO_COLLECTION_CTA_TITLE' => Configuration::get('CHETTO_COLLECTION_CTA_TITLE') ?: 'Primera vez con calzado barefoot?',
            'CHETTO_COLLECTION_CTA_DESC' => Configuration::get('CHETTO_COLLECTION_CTA_DESC') ?: 'Descubre nuestra guia completa sobre como elegir el zapato barefoot perfecto para tu hijo',
            'CHETTO_COLLECTION_CTA_TEXT' => Configuration::get('CHETTO_COLLECTION_CTA_TEXT') ?: 'Ver Guia Barefoot',
            'CHETTO_COLLECTION_CTA_LINK' => Configuration::get('CHETTO_COLLECTION_CTA_LINK') ?: '/porque-barefoot',
        ];

        return $helper->generateForm($forms);
    }

    public function renderForm()
    {
        $this->fields_form = [
            'legend' => ['title' => 'Coleccion', 'icon' => 'icon-list'],
            'input' => [
                ['type' => 'text', 'label' => 'Nombre', 'name' => 'name', 'required' => true, 'desc' => 'Ej: Botas / Botines'],
                ['type' => 'text', 'label' => 'Slug (URL)', 'name' => 'slug', 'required' => true, 'desc' => 'Ej: botas (se usara en /colecciones/botas)'],
                ['type' => 'text', 'label' => 'Descripcion corta', 'name' => 'description', 'desc' => 'Ej: Proteccion y flexibilidad'],
                ['type' => 'file', 'label' => 'Imagen', 'name' => 'image_upload', 'desc' => 'Imagen de la tarjeta de coleccion' . $this->getImagePreview()],
                ['type' => 'text', 'label' => 'Posicion', 'name' => 'position'],
                ['type' => 'switch', 'label' => 'Activo', 'name' => 'active', 'values' => [
                    ['id' => 'active_on', 'value' => 1, 'label' => 'Si'],
                    ['id' => 'active_off', 'value' => 0, 'label' => 'No'],
                ]],
            ],
            'submit' => ['title' => 'Guardar'],
        ];

        return parent::renderForm();
    }

    private function getImagePreview()
    {
        $id = (int) Tools::getValue('id_chetto_collection');
        if ($id) {
            $obj = new ChettoCollection($id);
            if (!empty($obj->image)) {
                $url = ChettoCollection::getImageUrl($obj->image);
                return '<br><strong>Actual:</strong><br><img src="' . $url . '" style="max-width:200px;margin-top:5px;border-radius:8px;" />';
            }
        }
        return '';
    }

    public function postProcess()
    {
        parent::postProcess();

        if ((Tools::isSubmit('submitAddchetto_collection') || Tools::isSubmit('submitAddchetto_collectionAndStay'))
            && isset($_FILES['image_upload']) && $_FILES['image_upload']['size'] > 0) {
            $id = (int) Tools::getValue('id_chetto_collection');
            if (!$id && $this->object && $this->object->id) {
                $id = (int) $this->object->id;
            }
            if ($id) {
                $dir = ChettoCollection::getImageDir();
                if (!is_dir($dir)) {
                    mkdir($dir, 0755, true);
                }
                $ext = strtolower(pathinfo($_FILES['image_upload']['name'], PATHINFO_EXTENSION));
                $filename = 'col-' . $id . '-' . time() . '.' . $ext;
                if (move_uploaded_file($_FILES['image_upload']['tmp_name'], $dir . $filename)) {
                    Db::getInstance()->update('chetto_collection', ['image' => $filename], 'id_chetto_collection = ' . $id);
                }
            }
        }
    }
}
