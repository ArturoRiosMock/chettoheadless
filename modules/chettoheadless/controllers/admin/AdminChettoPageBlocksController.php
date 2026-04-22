<?php

require_once _PS_MODULE_DIR_ . 'chettoheadless/classes/ChettoPageBlock.php';

class AdminChettoPageBlocksController extends ModuleAdminController
{
    private static $pageKeyOptions = [
        ['id' => 'materiales', 'name' => 'Materiales'],
        ['id' => 'envios', 'name' => 'Envíos y devoluciones'],
        ['id' => 'cuidado', 'name' => 'Cuidado del calzado'],
        ['id' => 'sobre_nosotros', 'name' => 'Sobre nosotros'],
    ];

    public function __construct()
    {
        $this->table = 'chetto_page_block';
        $this->className = 'ChettoPageBlock';
        $this->identifier = 'id_chetto_page_block';
        $this->lang = false;
        $this->bootstrap = true;
        $this->addRowAction('edit');
        $this->addRowAction('delete');

        parent::__construct();

        $this->bulk_actions = [
            'delete' => [
                'text' => 'Eliminar seleccionados',
                'confirm' => '¿Eliminar los bloques seleccionados?',
            ],
        ];

        $this->fields_list = [
            'id_chetto_page_block' => ['title' => 'ID', 'width' => 40, 'type' => 'int'],
            'page_key' => ['title' => 'Página', 'width' => 120],
            'block_key' => ['title' => 'Clave', 'width' => 100],
            'title' => ['title' => 'Título', 'width' => 'auto'],
            'position' => ['title' => 'Pos.', 'width' => 50],
            'active' => ['title' => 'Activo', 'width' => 50, 'active' => 'status', 'type' => 'bool'],
        ];
    }

    public function renderForm()
    {
        $imgHtml = '';
        if ($this->object && $this->object->id && !empty($this->object->image)) {
            $url = ChettoPageBlock::getImageUrl($this->object->image);
            $imgHtml = '<br><strong>Imagen actual:</strong><br><img src="' . htmlspecialchars($url) . '" style="max-width:200px;margin-top:5px;" />';
        }

        $this->fields_form = [
            'legend' => [
                'title' => 'Bloque de página',
                'icon' => 'icon-file-text',
            ],
            'input' => [
                [
                    'type' => 'select',
                    'label' => 'Página',
                    'name' => 'page_key',
                    'required' => true,
                    'options' => [
                        'query' => self::$pageKeyOptions,
                        'id' => 'id',
                        'name' => 'name',
                    ],
                ],
                [
                    'type' => 'text',
                    'label' => 'Clave interna (opcional)',
                    'name' => 'block_key',
                    'desc' => 'Ej: intro, certifications',
                ],
                [
                    'type' => 'text',
                    'label' => 'Título',
                    'name' => 'title',
                    'required' => true,
                ],
                [
                    'type' => 'textarea',
                    'label' => 'Cuerpo (HTML permitido)',
                    'name' => 'body',
                    'rows' => 10,
                    'cols' => 60,
                ],
                [
                    'type' => 'file',
                    'label' => 'Imagen',
                    'name' => 'image_upload',
                    'desc' => 'Opcional. JPG/PNG/WebP.' . $imgHtml,
                ],
                [
                    'type' => 'textarea',
                    'label' => 'Meta JSON',
                    'name' => 'meta_json',
                    'rows' => 4,
                    'cols' => 60,
                    'desc' => 'Ej: {"features":["a","b"],"imagePosition":"right"} para bloques con listas o layout.',
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

    protected function afterImageUpload()
    {
        return true;
    }

    public function postProcess()
    {
        if (Tools::isSubmit('submitAddchetto_page_block') || Tools::isSubmit('submitAddchetto_page_blockAndStay')) {
            $pageKey = Tools::getValue('page_key');
            if (!isset($_POST['position']) || $_POST['position'] === '') {
                $_POST['position'] = ChettoPageBlock::getHighestPosition($pageKey) + 1;
            }

            if (isset($_FILES['image_upload']) && $_FILES['image_upload']['size'] > 0) {
                $dir = ChettoPageBlock::getImageDir();
                if (!is_dir($dir)) {
                    mkdir($dir, 0755, true);
                }
                $ext = strtolower(pathinfo($_FILES['image_upload']['name'], PATHINFO_EXTENSION));
                $filename = 'block-' . time() . '.' . $ext;
                if (move_uploaded_file($_FILES['image_upload']['tmp_name'], $dir . $filename)) {
                    $_POST['image'] = $filename;
                }
            }
        }

        return parent::postProcess();
    }
}
