<?php

require_once _PS_MODULE_DIR_ . 'chettoheadless/classes/ChettoStore.php';

class AdminChettoStoresController extends ModuleAdminController
{
    public function __construct()
    {
        $this->table = 'chetto_store';
        $this->className = 'ChettoStore';
        $this->identifier = 'id_chetto_store';
        $this->lang = false;
        $this->bootstrap = true;
        $this->addRowAction('edit');
        $this->addRowAction('delete');

        parent::__construct();

        $this->bulk_actions = [
            'delete' => [
                'text' => 'Eliminar seleccionados',
                'confirm' => '¿Eliminar las tiendas seleccionadas?',
            ],
        ];

        $this->fields_list = [
            'id_chetto_store' => ['title' => 'ID', 'width' => 40, 'type' => 'int'],
            'name' => ['title' => 'Nombre', 'width' => 'auto'],
            'address_line1' => ['title' => 'Dirección', 'width' => 'auto'],
            'phone' => ['title' => 'Teléfono', 'width' => 100],
            'position' => ['title' => 'Pos.', 'width' => 50],
            'active' => ['title' => 'Activo', 'width' => 50, 'active' => 'status', 'type' => 'bool'],
        ];
    }

    public function renderForm()
    {
        $imgHtml = '';
        if ($this->object && $this->object->id && !empty($this->object->image)) {
            $url = ChettoStore::getImageUrl($this->object->image);
            $imgHtml = '<br><strong>Imagen actual:</strong><br><img src="' . htmlspecialchars($url) . '" style="max-width:200px;margin-top:5px;" />';
        }

        $this->fields_form = [
            'legend' => [
                'title' => 'Tienda',
                'icon' => 'icon-map-marker',
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
                    'label' => 'Dirección (línea 1)',
                    'name' => 'address_line1',
                    'required' => true,
                ],
                [
                    'type' => 'text',
                    'label' => 'Dirección (línea 2)',
                    'name' => 'address_line2',
                ],
                [
                    'type' => 'text',
                    'label' => 'Teléfono',
                    'name' => 'phone',
                ],
                [
                    'type' => 'text',
                    'label' => 'Consulta mapas (dirección para Google Maps)',
                    'name' => 'maps_query',
                    'desc' => 'Texto que se pasa a Google Maps al pulsar Cómo llegar',
                ],
                [
                    'type' => 'file',
                    'label' => 'Imagen',
                    'name' => 'image_upload',
                    'desc' => 'Opcional.' . $imgHtml,
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
        if (Tools::isSubmit('submitAddchetto_store') || Tools::isSubmit('submitAddchetto_storeAndStay')) {
            if (!isset($_POST['position']) || $_POST['position'] === '') {
                $_POST['position'] = ChettoStore::getHighestPosition() + 1;
            }

            if (isset($_FILES['image_upload']) && $_FILES['image_upload']['size'] > 0) {
                $dir = ChettoStore::getImageDir();
                if (!is_dir($dir)) {
                    mkdir($dir, 0755, true);
                }
                $ext = strtolower(pathinfo($_FILES['image_upload']['name'], PATHINFO_EXTENSION));
                $filename = 'store-' . time() . '.' . $ext;
                if (move_uploaded_file($_FILES['image_upload']['tmp_name'], $dir . $filename)) {
                    $_POST['image'] = $filename;
                }
            }
        }

        return parent::postProcess();
    }
}
