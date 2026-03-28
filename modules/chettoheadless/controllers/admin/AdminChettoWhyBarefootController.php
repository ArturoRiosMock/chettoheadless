<?php

require_once _PS_MODULE_DIR_ . 'chettoheadless/classes/ChettoContentBlock.php';

class AdminChettoWhyBarefootController extends ModuleAdminController
{
    private $configKeys = [
        'CHETTO_WHY_BADGE',
        'CHETTO_WHY_TITLE',
        'CHETTO_WHY_TITLE_HIGHLIGHT',
        'CHETTO_WHY_DESC',
        'CHETTO_WHY_IMAGE',
        'CHETTO_WHY_CTA_TITLE',
        'CHETTO_WHY_CTA_DESC',
        'CHETTO_WHY_CTA_TEXT',
        'CHETTO_WHY_CTA_LINK',
    ];

    public function __construct()
    {
        $this->bootstrap = true;
        parent::__construct();
    }

    public function initContent()
    {
        parent::initContent();

        if (Tools::isSubmit('submitWhyConfig')) {
            $this->processSaveConfig();
        }
        if (Tools::isSubmit('submitWhyFeature')) {
            $this->processSaveBlock('why_barefoot_feature');
        }
        if (Tools::isSubmit('submitWhyCard')) {
            $this->processSaveBlock('why_barefoot');
        }
        if (Tools::isSubmit('deleteFeature')) {
            $this->processDeleteBlock('why_barefoot_feature');
        }
        if (Tools::isSubmit('deleteCard')) {
            $this->processDeleteBlock('why_barefoot');
        }

        $html = $this->renderConfigForm();
        $html .= $this->renderFeaturesPanel();
        $html .= $this->renderCardsPanel();

        $this->context->smarty->assign('content', $html);
    }

    private function processSaveConfig()
    {
        foreach ($this->configKeys as $key) {
            if ($key === 'CHETTO_WHY_IMAGE') {
                continue;
            }
            Configuration::updateValue($key, Tools::getValue($key));
        }

        if (isset($_FILES['CHETTO_WHY_IMAGE_FILE']) && $_FILES['CHETTO_WHY_IMAGE_FILE']['size'] > 0) {
            $dir = _PS_MODULE_DIR_ . 'chettoheadless/views/img/sections/';
            if (!is_dir($dir)) {
                mkdir($dir, 0755, true);
            }
            $ext = strtolower(pathinfo($_FILES['CHETTO_WHY_IMAGE_FILE']['name'], PATHINFO_EXTENSION));
            $filename = 'why-' . time() . '.' . $ext;
            if (move_uploaded_file($_FILES['CHETTO_WHY_IMAGE_FILE']['tmp_name'], $dir . $filename)) {
                Configuration::updateValue('CHETTO_WHY_IMAGE', $filename);
            }
        }

        $this->confirmations[] = 'Configuración de "¿Por qué Barefoot?" guardada correctamente.';
    }

    private function processSaveBlock($type)
    {
        $id = (int) Tools::getValue('id_block');
        $block = $id ? new ChettoContentBlock($id) : new ChettoContentBlock();
        $block->type = $type;
        $block->icon = Tools::getValue('icon', '');
        $block->title = Tools::getValue('title');
        $block->description = Tools::getValue('description', '');
        $block->position = (int) Tools::getValue('position', 0);
        $block->active = 1;
        $block->save();
        $this->confirmations[] = 'Bloque guardado correctamente.';
    }

    private function processDeleteBlock($type)
    {
        $id = (int) Tools::getValue('id_block');
        if ($id) {
            $block = new ChettoContentBlock($id);
            if ($block->id && $block->type === $type) {
                $block->delete();
                $this->confirmations[] = 'Bloque eliminado.';
            }
        }
    }

    private function renderConfigForm()
    {
        $whyImgHtml = '';
        $whyImg = Configuration::get('CHETTO_WHY_IMAGE');
        if ($whyImg) {
            $url = _PS_BASE_URL_ . __PS_BASE_URI__ . 'modules/chettoheadless/views/img/sections/' . $whyImg;
            $whyImgHtml = '<br><strong>Actual:</strong><br><img src="' . $url . '" style="max-width:300px;margin-top:5px;" />';
        }

        $forms = [];
        $forms[] = [
            'form' => [
                'legend' => ['title' => '¿Por qué Barefoot? — Configuración General', 'icon' => 'icon-question-sign'],
                'description' => 'Edita los textos, imagen y CTA de la sección "¿Por qué Barefoot?" del homepage.',
                'input' => [
                    ['type' => 'text', 'label' => 'Badge (etiqueta superior)', 'name' => 'CHETTO_WHY_BADGE', 'desc' => 'Ej: ¿Por qué Barefoot?'],
                    ['type' => 'text', 'label' => 'Título principal', 'name' => 'CHETTO_WHY_TITLE', 'desc' => 'Ej: Calzado que respeta el movimiento natural'],
                    ['type' => 'text', 'label' => 'Parte del título en dorado', 'name' => 'CHETTO_WHY_TITLE_HIGHLIGHT', 'desc' => 'Este texto aparecerá en color dorado. Ej: movimiento natural'],
                    ['type' => 'textarea', 'label' => 'Descripción', 'name' => 'CHETTO_WHY_DESC', 'desc' => 'Texto debajo del título'],
                    ['type' => 'file', 'label' => 'Imagen principal', 'name' => 'CHETTO_WHY_IMAGE_FILE', 'desc' => 'Imagen de niños caminando (recomendado: 621x400px)' . $whyImgHtml],
                    ['type' => 'text', 'label' => 'CTA — Título', 'name' => 'CHETTO_WHY_CTA_TITLE', 'desc' => 'Ej: ¿Tienes dudas sobre el calzado barefoot?'],
                    ['type' => 'textarea', 'label' => 'CTA — Descripción', 'name' => 'CHETTO_WHY_CTA_DESC', 'desc' => 'Texto debajo del título del CTA'],
                    ['type' => 'text', 'label' => 'CTA — Texto del botón', 'name' => 'CHETTO_WHY_CTA_TEXT', 'desc' => 'Ej: Hablar con un Experto'],
                    ['type' => 'text', 'label' => 'CTA — Enlace', 'name' => 'CHETTO_WHY_CTA_LINK', 'desc' => 'Ej: /contacto'],
                ],
                'submit' => ['title' => 'Guardar Configuración'],
            ],
        ];

        $helper = new HelperForm();
        $helper->module = $this->module;
        $helper->name_controller = 'AdminChettoWhyBarefoot';
        $helper->token = Tools::getAdminTokenLite('AdminChettoWhyBarefoot');
        $helper->currentIndex = $this->context->link->getAdminLink('AdminChettoWhyBarefoot', false);
        $helper->submit_action = 'submitWhyConfig';
        $helper->default_form_language = (int) Configuration::get('PS_LANG_DEFAULT');

        $helper->fields_value = [];
        foreach ($this->configKeys as $key) {
            $helper->fields_value[$key] = Configuration::get($key) ?: '';
        }

        return $helper->generateForm($forms);
    }

    private function renderFeaturesPanel()
    {
        $rows = ChettoContentBlock::getByType('why_barefoot_feature');
        $token = Tools::getAdminTokenLite('AdminChettoWhyBarefoot');
        $url = $this->context->link->getAdminLink('AdminChettoWhyBarefoot', false) . '&token=' . $token;

        $html = '<div class="panel"><div class="panel-heading"><i class="icon-check"></i> Características (junto a la imagen)</div>';
        $html .= '<p class="help-block">Las 3 características con icono de check que aparecen junto a la imagen principal (Suela Flexible, Drop Cero, Horma Amplia).</p>';
        $html .= '<table class="table"><thead><tr><th>ID</th><th>Icono</th><th>Título</th><th>Descripción</th><th>Pos.</th><th>Acciones</th></tr></thead><tbody>';

        foreach ($rows as $row) {
            $html .= '<tr>';
            $html .= '<td>' . $row['id_chetto_content_block'] . '</td>';
            $html .= '<td>' . htmlspecialchars($row['icon']) . '</td>';
            $html .= '<td>' . htmlspecialchars($row['title']) . '</td>';
            $html .= '<td>' . htmlspecialchars($row['description']) . '</td>';
            $html .= '<td>' . $row['position'] . '</td>';
            $html .= '<td>';
            $html .= '<a href="' . $url . '&editFeature=1&id_block=' . $row['id_chetto_content_block'] . '" class="btn btn-default btn-sm"><i class="icon-edit"></i></a> ';
            $html .= '<a href="' . $url . '&deleteFeature=1&id_block=' . $row['id_chetto_content_block'] . '" class="btn btn-default btn-sm" onclick="return confirm(\'¿Eliminar?\');"><i class="icon-trash"></i></a>';
            $html .= '</td></tr>';
        }
        if (empty($rows)) {
            $html .= '<tr><td colspan="6" class="text-center">Sin características. Añade una abajo.</td></tr>';
        }
        $html .= '</tbody></table>';

        $editId = 0;
        $editData = ['icon' => '', 'title' => '', 'description' => '', 'position' => count($rows) + 1];
        if (Tools::getValue('editFeature') && Tools::getValue('id_block')) {
            $block = new ChettoContentBlock((int) Tools::getValue('id_block'));
            if ($block->id && $block->type === 'why_barefoot_feature') {
                $editId = $block->id;
                $editData = ['icon' => $block->icon, 'title' => $block->title, 'description' => $block->description, 'position' => $block->position];
            }
        }

        $html .= '<hr><h4>' . ($editId ? 'Editar' : 'Añadir') . ' Característica</h4>';
        $html .= '<form method="post" action="' . $url . '">';
        $html .= '<input type="hidden" name="id_block" value="' . $editId . '">';
        $html .= '<div class="form-group"><label>Icono (Lucide)</label><input type="text" name="icon" class="form-control" value="' . htmlspecialchars($editData['icon']) . '" placeholder="Ej: Waves, ArrowDownToLine, Maximize"></div>';
        $html .= '<div class="form-group"><label>Título</label><input type="text" name="title" class="form-control" value="' . htmlspecialchars($editData['title']) . '" placeholder="Ej: Suela Flexible"></div>';
        $html .= '<div class="form-group"><label>Descripción</label><input type="text" name="description" class="form-control" value="' . htmlspecialchars($editData['description']) . '" placeholder="Ej: Permite el movimiento natural del pie en todas direcciones"></div>';
        $html .= '<div class="form-group"><label>Posición</label><input type="number" name="position" class="form-control" value="' . (int) $editData['position'] . '" style="width:80px"></div>';
        $html .= '<button type="submit" name="submitWhyFeature" class="btn btn-primary"><i class="icon-save"></i> Guardar Característica</button>';
        $html .= '</form></div>';

        return $html;
    }

    private function renderCardsPanel()
    {
        $rows = ChettoContentBlock::getByType('why_barefoot');
        $token = Tools::getAdminTokenLite('AdminChettoWhyBarefoot');
        $url = $this->context->link->getAdminLink('AdminChettoWhyBarefoot', false) . '&token=' . $token;

        $html = '<div class="panel"><div class="panel-heading"><i class="icon-th-large"></i> Tarjetas de Beneficios (grid de 4)</div>';
        $html .= '<p class="help-block">Las 4 tarjetas con icono de flecha que aparecen debajo de la imagen (Desarrollo Natural, Salud y Bienestar, etc.).</p>';
        $html .= '<table class="table"><thead><tr><th>ID</th><th>Icono</th><th>Título</th><th>Descripción</th><th>Pos.</th><th>Acciones</th></tr></thead><tbody>';

        foreach ($rows as $row) {
            $descPreview = htmlspecialchars(mb_substr($row['description'], 0, 60)) . (mb_strlen($row['description']) > 60 ? '...' : '');
            $html .= '<tr>';
            $html .= '<td>' . $row['id_chetto_content_block'] . '</td>';
            $html .= '<td>' . htmlspecialchars($row['icon']) . '</td>';
            $html .= '<td>' . htmlspecialchars($row['title']) . '</td>';
            $html .= '<td>' . $descPreview . '</td>';
            $html .= '<td>' . $row['position'] . '</td>';
            $html .= '<td>';
            $html .= '<a href="' . $url . '&editCard=1&id_block=' . $row['id_chetto_content_block'] . '" class="btn btn-default btn-sm"><i class="icon-edit"></i></a> ';
            $html .= '<a href="' . $url . '&deleteCard=1&id_block=' . $row['id_chetto_content_block'] . '" class="btn btn-default btn-sm" onclick="return confirm(\'¿Eliminar?\');"><i class="icon-trash"></i></a>';
            $html .= '</td></tr>';
        }
        if (empty($rows)) {
            $html .= '<tr><td colspan="6" class="text-center">Sin tarjetas. Añade una abajo.</td></tr>';
        }
        $html .= '</tbody></table>';

        $editId = 0;
        $editData = ['icon' => '', 'title' => '', 'description' => '', 'position' => count($rows) + 1];
        if (Tools::getValue('editCard') && Tools::getValue('id_block')) {
            $block = new ChettoContentBlock((int) Tools::getValue('id_block'));
            if ($block->id && $block->type === 'why_barefoot') {
                $editId = $block->id;
                $editData = ['icon' => $block->icon, 'title' => $block->title, 'description' => $block->description, 'position' => $block->position];
            }
        }

        $html .= '<hr><h4>' . ($editId ? 'Editar' : 'Añadir') . ' Tarjeta de Beneficio</h4>';
        $html .= '<form method="post" action="' . $url . '">';
        $html .= '<input type="hidden" name="id_block" value="' . $editId . '">';
        $html .= '<div class="form-group"><label>Icono (Lucide)</label><input type="text" name="icon" class="form-control" value="' . htmlspecialchars($editData['icon']) . '" placeholder="Ej: Sprout, Heart, Footprints, Shield"></div>';
        $html .= '<div class="form-group"><label>Título</label><input type="text" name="title" class="form-control" value="' . htmlspecialchars($editData['title']) . '" placeholder="Ej: Desarrollo Natural"></div>';
        $html .= '<div class="form-group"><label>Descripción</label><textarea name="description" class="form-control" rows="3" placeholder="Ej: Permite que los pies de tu hijo se desarrollen de forma natural...">' . htmlspecialchars($editData['description']) . '</textarea></div>';
        $html .= '<div class="form-group"><label>Posición</label><input type="number" name="position" class="form-control" value="' . (int) $editData['position'] . '" style="width:80px"></div>';
        $html .= '<button type="submit" name="submitWhyCard" class="btn btn-primary"><i class="icon-save"></i> Guardar Tarjeta</button>';
        $html .= '</form></div>';

        return $html;
    }
}
