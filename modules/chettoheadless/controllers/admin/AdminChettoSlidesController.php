<?php

require_once _PS_MODULE_DIR_ . 'chettoheadless/classes/ChettoSlide.php';

class AdminChettoSlidesController extends ModuleAdminController
{
    public function __construct()
    {
        $this->table = 'chetto_slide';
        $this->className = 'ChettoSlide';
        $this->identifier = 'id_chetto_slide';
        $this->lang = false;
        $this->bootstrap = true;
        $this->addRowAction('edit');
        $this->addRowAction('delete');
        $this->position_identifier = 'id_chetto_slide';

        parent::__construct();

        $this->bulk_actions = [
            'delete' => [
                'text' => 'Eliminar seleccionados',
                'confirm' => '¿Eliminar los slides seleccionados?',
            ],
        ];

        $this->fields_list = [
            'id_chetto_slide' => ['title' => 'ID', 'width' => 40, 'type' => 'int'],
            'title' => ['title' => 'Título', 'width' => 'auto'],
            'badge' => ['title' => 'Badge', 'width' => 120],
            'image' => ['title' => 'Imagen', 'width' => 100],
            'cta' => ['title' => 'CTA', 'width' => 100],
            'position' => ['title' => 'Posición', 'width' => 60, 'position' => 'position', 'filter_key' => 'a!position'],
            'active' => ['title' => 'Activo', 'width' => 50, 'active' => 'status', 'type' => 'bool'],
        ];
    }

    public function renderForm()
    {
        $imageHtml = '';
        if ($this->object && $this->object->image) {
            $imageUrl = ChettoSlide::getImageUrl($this->object->image);
            $imageHtml = '<img src="' . $imageUrl . '" style="max-width:400px;margin-top:10px;display:block;" /><p>' . $this->object->image . '</p>';
        }

        $this->fields_form = [
            'legend' => [
                'title' => 'Slide del Hero',
                'icon' => 'icon-image',
            ],
            'input' => [
                [
                    'type' => 'text',
                    'label' => 'Título',
                    'name' => 'title',
                    'required' => true,
                    'desc' => 'Texto principal del slide. Ej: Hasta 30% de descuento',
                ],
                [
                    'type' => 'text',
                    'label' => 'Subtítulo',
                    'name' => 'subtitle',
                    'desc' => 'Texto secundario. Ej: Camina sin límites',
                ],
                [
                    'type' => 'text',
                    'label' => 'Badge',
                    'name' => 'badge',
                    'desc' => 'Etiqueta destacada. Ej: Ofertas Especiales',
                ],
                [
                    'type' => 'textarea',
                    'label' => 'Descripción',
                    'name' => 'description',
                ],
                [
                    'type' => 'text',
                    'label' => 'Texto del botón (CTA)',
                    'name' => 'cta',
                    'desc' => 'Ej: Ver Ofertas',
                ],
                [
                    'type' => 'text',
                    'label' => 'Enlace del botón',
                    'name' => 'cta_link',
                    'desc' => 'Ej: /ofertas',
                ],
                [
                    'type' => 'file',
                    'label' => 'Subir Imagen',
                    'name' => 'image_upload',
                    'desc' => 'Imagen del slide (recomendado: 1400x600px)' . ($imageHtml ? '<br><strong>Imagen actual:</strong>' . $imageHtml : ''),
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
        if (Tools::isSubmit('submitAddchetto_slide') || Tools::isSubmit('submitAddchetto_slideAndStay')) {
            if (!isset($_POST['position']) || $_POST['position'] === '') {
                $_POST['position'] = ChettoSlide::getHighestPosition() + 1;
            }

            $id = (int) Tools::getValue('id_chetto_slide');
            if ($id) {
                $existing = new ChettoSlide($id);
                $_POST['image'] = $existing->image;
            } else {
                $_POST['image'] = '';
            }
        }

        $result = parent::postProcess();

        if ((Tools::isSubmit('submitAddchetto_slide') || Tools::isSubmit('submitAddchetto_slideAndStay'))
            && isset($_FILES['image_upload']) && $_FILES['image_upload']['size'] > 0
        ) {
            $objectId = $this->object ? $this->object->id : (int) Tools::getValue('id_chetto_slide');
            if ($objectId) {
                $dir = ChettoSlide::getImageDir();
                if (!is_dir($dir)) {
                    mkdir($dir, 0755, true);
                }

                $ext = strtolower(pathinfo($_FILES['image_upload']['name'], PATHINFO_EXTENSION));
                $filename = 'slide-' . $objectId . '-' . time() . '.' . $ext;

                if (move_uploaded_file($_FILES['image_upload']['tmp_name'], $dir . $filename)) {
                    Db::getInstance()->update(
                        'chetto_slide',
                        ['image' => $filename],
                        'id_chetto_slide = ' . (int) $objectId
                    );
                }
            }
        }

        return $result;
    }
}
