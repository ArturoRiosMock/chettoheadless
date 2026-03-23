<?php

require_once _PS_MODULE_DIR_ . 'chettoheadless/classes/ChettoHomepageProduct.php';

class AdminChettoProductsController extends ModuleAdminController
{
    public function __construct()
    {
        $this->table = 'chetto_homepage_product';
        $this->className = 'ChettoHomepageProduct';
        $this->identifier = 'id_chetto_homepage_product';
        $this->lang = false;
        $this->bootstrap = true;
        $this->addRowAction('edit');
        $this->addRowAction('delete');
        $this->position_identifier = 'id_chetto_homepage_product';

        parent::__construct();

        $this->bulk_actions = [
            'delete' => [
                'text' => 'Eliminar seleccionados',
                'confirm' => '¿Eliminar los productos seleccionados?',
            ],
        ];

        $this->fields_list = [
            'id_chetto_homepage_product' => ['title' => 'ID', 'width' => 40, 'type' => 'int'],
            'section_type' => ['title' => 'Sección', 'width' => 100, 'type' => 'select', 'list' => ChettoHomepageProduct::getSectionTypes(), 'filter_key' => 'a!section_type'],
            'name' => ['title' => 'Nombre', 'width' => 'auto'],
            'price' => ['title' => 'Precio', 'width' => 80, 'type' => 'price'],
            'original_price' => ['title' => 'Precio Original', 'width' => 80, 'type' => 'price'],
            'discount' => ['title' => 'Descuento', 'width' => 70],
            'badge' => ['title' => 'Badge', 'width' => 80],
            'position' => ['title' => 'Posición', 'width' => 60],
            'active' => ['title' => 'Activo', 'width' => 50, 'active' => 'status', 'type' => 'bool'],
        ];

        $this->_defaultOrderBy = 'section_type';
        $this->_defaultOrderWay = 'ASC';
    }

    public function renderForm()
    {
        $imageHtml = '';
        if ($this->object && $this->object->image) {
            $imageUrl = ChettoHomepageProduct::getImageUrl($this->object->image);
            $imageHtml = '<img src="' . $imageUrl . '" style="max-width:300px;margin-top:10px;display:block;" /><p>' . $this->object->image . '</p>';
        }

        $sectionOptions = [];
        foreach (ChettoHomepageProduct::getSectionTypes() as $key => $label) {
            $sectionOptions[] = ['id' => $key, 'name' => $label];
        }

        $this->fields_form = [
            'legend' => [
                'title' => 'Producto del Homepage',
                'icon' => 'icon-shopping-cart',
            ],
            'input' => [
                [
                    'type' => 'select',
                    'label' => 'Sección',
                    'name' => 'section_type',
                    'required' => true,
                    'options' => [
                        'query' => $sectionOptions,
                        'id' => 'id',
                        'name' => 'name',
                    ],
                    'desc' => '"Productos Destacados" o "Favoritos de Clientes"',
                ],
                [
                    'type' => 'text',
                    'label' => 'Nombre',
                    'name' => 'name',
                    'required' => true,
                    'desc' => 'Ej: Sneaker Kaki Kids',
                ],
                [
                    'type' => 'text',
                    'label' => 'Slug',
                    'name' => 'slug',
                    'required' => true,
                    'desc' => 'Ej: sneaker-kaki-kids (para la URL)',
                ],
                [
                    'type' => 'text',
                    'label' => 'Precio',
                    'name' => 'price',
                    'required' => true,
                    'suffix' => '€',
                    'desc' => 'Precio actual del producto',
                ],
                [
                    'type' => 'text',
                    'label' => 'Precio Original',
                    'name' => 'original_price',
                    'suffix' => '€',
                    'desc' => 'Precio antes del descuento (dejar vacío si no hay descuento)',
                ],
                [
                    'type' => 'text',
                    'label' => 'Descuento',
                    'name' => 'discount',
                    'desc' => 'Ej: -25% (dejar vacío si no hay descuento)',
                ],
                [
                    'type' => 'text',
                    'label' => 'Badge',
                    'name' => 'badge',
                    'desc' => 'Ej: Nuevo, Oferta (dejar vacío si no aplica)',
                ],
                [
                    'type' => 'text',
                    'label' => 'Colores disponibles',
                    'name' => 'colors',
                    'desc' => 'Cantidad de colores (dejar vacío si no aplica)',
                ],
                [
                    'type' => 'text',
                    'label' => 'Categoría',
                    'name' => 'category',
                    'desc' => 'Ej: sneakers, botas, sandalias',
                ],
                [
                    'type' => 'text',
                    'label' => 'Enlace',
                    'name' => 'link',
                    'desc' => 'URL del producto. Ej: /producto/sneaker-kaki-kids',
                ],
                [
                    'type' => 'file',
                    'label' => 'Imagen',
                    'name' => 'image_upload',
                    'desc' => 'Imagen del producto (recomendado: 600x800px)' . ($imageHtml ? '<br><strong>Imagen actual:</strong>' . $imageHtml : ''),
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
        if (Tools::isSubmit('submitAddchetto_homepage_product') || Tools::isSubmit('submitAddchetto_homepage_productAndStay')) {
            if (!isset($_POST['position']) || $_POST['position'] === '') {
                $sectionType = Tools::getValue('section_type', 'featured');
                $_POST['position'] = ChettoHomepageProduct::getHighestPosition($sectionType) + 1;
            }

            $id = (int) Tools::getValue('id_chetto_homepage_product');
            if ($id) {
                $existing = new ChettoHomepageProduct($id);
                $_POST['image'] = $existing->image;
            } else {
                $_POST['image'] = '';
            }
        }

        $result = parent::postProcess();

        if ((Tools::isSubmit('submitAddchetto_homepage_product') || Tools::isSubmit('submitAddchetto_homepage_productAndStay'))
            && isset($_FILES['image_upload']) && $_FILES['image_upload']['size'] > 0
        ) {
            $objectId = $this->object ? $this->object->id : (int) Tools::getValue('id_chetto_homepage_product');
            if ($objectId) {
                $dir = ChettoHomepageProduct::getImageDir();
                if (!is_dir($dir)) {
                    mkdir($dir, 0755, true);
                }

                $ext = strtolower(pathinfo($_FILES['image_upload']['name'], PATHINFO_EXTENSION));
                $filename = 'product-' . $objectId . '-' . time() . '.' . $ext;

                if (move_uploaded_file($_FILES['image_upload']['tmp_name'], $dir . $filename)) {
                    Db::getInstance()->update(
                        'chetto_homepage_product',
                        ['image' => $filename],
                        'id_chetto_homepage_product = ' . (int) $objectId
                    );
                }
            }
        }

        return $result;
    }
}
