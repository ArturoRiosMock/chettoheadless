<?php

require_once _PS_MODULE_DIR_ . 'chettoheadless/classes/ChettoHomepageCategory.php';

class AdminChettoCategoriesController extends ModuleAdminController
{
    public function __construct()
    {
        $this->table = 'chetto_homepage_category';
        $this->className = 'ChettoHomepageCategory';
        $this->identifier = 'id_chetto_homepage_category';
        $this->lang = false;
        $this->bootstrap = true;
        $this->addRowAction('edit');
        $this->addRowAction('delete');

        parent::__construct();

        $this->bulk_actions = [
            'delete' => [
                'text' => 'Eliminar seleccionados',
                'confirm' => '¿Eliminar las categorías seleccionadas?',
            ],
        ];

        $this->fields_list = [
            'id_chetto_homepage_category' => ['title' => 'ID', 'width' => 40, 'type' => 'int'],
            'name' => ['title' => 'Nombre', 'width' => 'auto'],
            'slug' => ['title' => 'Slug', 'width' => 120],
            'image' => ['title' => 'Imagen', 'width' => 100],
            'description' => ['title' => 'Descripción', 'width' => 'auto'],
            'position' => ['title' => 'Posición', 'width' => 60, 'filter_key' => 'a!position'],
            'active' => ['title' => 'Activo', 'width' => 50, 'active' => 'status', 'type' => 'bool'],
        ];
    }

    public function renderForm()
    {
        $imageHtml = '';
        if ($this->object && $this->object->image) {
            $imageUrl = ChettoHomepageCategory::getImageUrl($this->object->image);
            $imageHtml = '<img src="' . $imageUrl . '" style="max-width:300px;margin-top:10px;display:block;" /><p>' . $this->object->image . '</p>';
        }

        $this->fields_form = [
            'legend' => [
                'title' => 'Categoría del Homepage',
                'icon' => 'icon-th-large',
            ],
            'input' => [
                [
                    'type' => 'text',
                    'label' => 'Nombre',
                    'name' => 'name',
                    'required' => true,
                ],
                [
                    'type' => 'text',
                    'label' => 'Slug',
                    'name' => 'slug',
                    'required' => true,
                    'desc' => 'URL amigable. Ej: sneakers',
                ],
                [
                    'type' => 'text',
                    'label' => 'Descripción',
                    'name' => 'description',
                ],
                [
                    'type' => 'text',
                    'label' => 'Enlace',
                    'name' => 'link',
                    'desc' => 'Ej: /colecciones/sneakers',
                ],
                [
                    'type' => 'file',
                    'label' => 'Subir Imagen',
                    'name' => 'image_upload',
                    'desc' => 'Imagen de la categoría (recomendado: 600x400px)' . ($imageHtml ? '<br><strong>Imagen actual:</strong>' . $imageHtml : ''),
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
        if (Tools::isSubmit('submitAddchetto_homepage_category') || Tools::isSubmit('submitAddchetto_homepage_categoryAndStay')) {
            if (!isset($_POST['position']) || $_POST['position'] === '') {
                $_POST['position'] = ChettoHomepageCategory::getHighestPosition() + 1;
            }

            $id = (int) Tools::getValue('id_chetto_homepage_category');
            if ($id) {
                $existing = new ChettoHomepageCategory($id);
                $_POST['image'] = $existing->image;
            } else {
                $_POST['image'] = '';
            }
        }

        $result = parent::postProcess();

        if ((Tools::isSubmit('submitAddchetto_homepage_category') || Tools::isSubmit('submitAddchetto_homepage_categoryAndStay'))
            && isset($_FILES['image_upload']) && $_FILES['image_upload']['size'] > 0
        ) {
            $objectId = $this->object ? $this->object->id : (int) Tools::getValue('id_chetto_homepage_category');
            if ($objectId) {
                $dir = ChettoHomepageCategory::getImageDir();
                if (!is_dir($dir)) {
                    mkdir($dir, 0755, true);
                }

                $ext = strtolower(pathinfo($_FILES['image_upload']['name'], PATHINFO_EXTENSION));
                $filename = 'cat-' . $objectId . '-' . time() . '.' . $ext;

                if (move_uploaded_file($_FILES['image_upload']['tmp_name'], $dir . $filename)) {
                    Db::getInstance()->update(
                        'chetto_homepage_category',
                        ['image' => $filename],
                        'id_chetto_homepage_category = ' . (int) $objectId
                    );
                }
            }
        }

        return $result;
    }
}
