<?php

require_once _PS_MODULE_DIR_ . 'chettoheadless/classes/ChettoContentBlock.php';

class AdminChettoBarefootController extends ModuleAdminController
{
    private $configKeys = [
        'CHETTO_BAREFOOT_BADGE',
        'CHETTO_BAREFOOT_TITLE',
        'CHETTO_BAREFOOT_TITLE_HIGHLIGHT',
        'CHETTO_BAREFOOT_DESC',
        'CHETTO_BAREFOOT_IMAGE',
        'CHETTO_BAREFOOT_LABEL_1',
        'CHETTO_BAREFOOT_LABEL_2',
        'CHETTO_BAREFOOT_LABEL_3',
        'CHETTO_BAREFOOT_TRAD_BADGE',
        'CHETTO_BAREFOOT_TRAD_TITLE',
        'CHETTO_BAREFOOT_BF_BADGE',
        'CHETTO_BAREFOOT_BF_TITLE',
    ];

    public function __construct()
    {
        $this->bootstrap = true;
        parent::__construct();
    }

    public function initContent()
    {
        parent::initContent();

        if (Tools::isSubmit('submitBarefootConfig')) {
            $this->processSaveConfig();
        }

        if (Tools::isSubmit('submitBarefootFeature')) {
            $this->processSaveFeature();
        }

        if (Tools::isSubmit('submitBarefootLimitation')) {
            $this->processSaveLimitation();
        }

        if (Tools::isSubmit('submitBarefootBenefit')) {
            $this->processSaveBenefit();
        }

        if (Tools::isSubmit('deleteFeature')) {
            $this->processDeleteBlock('barefoot_feature');
        }
        if (Tools::isSubmit('deleteLimitation')) {
            $this->processDeleteBlock('limitation');
        }
        if (Tools::isSubmit('deleteBenefit')) {
            $this->processDeleteBlock('barefoot_benefit');
        }

        $html = $this->renderConfigForm();
        $html .= $this->renderFeaturesPanel();
        $html .= $this->renderLimitationsPanel();
        $html .= $this->renderBenefitsPanel();

        $this->context->smarty->assign('content', $html);
    }

    private function processSaveConfig()
    {
        foreach ($this->configKeys as $key) {
            if ($key === 'CHETTO_BAREFOOT_IMAGE') {
                continue;
            }
            Configuration::updateValue($key, Tools::getValue($key));
        }

        if (isset($_FILES['CHETTO_BAREFOOT_IMAGE_FILE']) && $_FILES['CHETTO_BAREFOOT_IMAGE_FILE']['size'] > 0) {
            $dir = _PS_MODULE_DIR_ . 'chettoheadless/views/img/sections/';
            if (!is_dir($dir)) {
                mkdir($dir, 0755, true);
            }
            $ext = strtolower(pathinfo($_FILES['CHETTO_BAREFOOT_IMAGE_FILE']['name'], PATHINFO_EXTENSION));
            $filename = 'barefoot-' . time() . '.' . $ext;
            if (move_uploaded_file($_FILES['CHETTO_BAREFOOT_IMAGE_FILE']['tmp_name'], $dir . $filename)) {
                Configuration::updateValue('CHETTO_BAREFOOT_IMAGE', $filename);
            }
        }

        $this->confirmations[] = 'Configuración de "Las 3 Claves" guardada correctamente.';
    }

    private function processSaveFeature()
    {
        $id = (int) Tools::getValue('id_block');
        $block = $id ? new ChettoContentBlock($id) : new ChettoContentBlock();
        $block->type = 'barefoot_feature';
        $block->icon = Tools::getValue('icon');
        $block->title = Tools::getValue('title');
        $block->description = Tools::getValue('description');
        $block->extra_text = Tools::getValue('extra_text');
        $block->position = (int) Tools::getValue('position', 0);
        $block->active = 1;
        $block->save();
        $this->confirmations[] = 'Característica guardada.';
    }

    private function processSaveLimitation()
    {
        $id = (int) Tools::getValue('id_block');
        $block = $id ? new ChettoContentBlock($id) : new ChettoContentBlock();
        $block->type = 'limitation';
        $block->title = Tools::getValue('title');
        $block->position = (int) Tools::getValue('position', 0);
        $block->active = 1;
        $block->save();
        $this->confirmations[] = 'Limitación guardada.';
    }

    private function processSaveBenefit()
    {
        $id = (int) Tools::getValue('id_block');
        $block = $id ? new ChettoContentBlock($id) : new ChettoContentBlock();
        $block->type = 'barefoot_benefit';
        $block->title = Tools::getValue('title');
        $block->position = (int) Tools::getValue('position', 0);
        $block->active = 1;
        $block->save();
        $this->confirmations[] = 'Beneficio guardado.';
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
        $barefootImgHtml = '';
        $barefootImg = Configuration::get('CHETTO_BAREFOOT_IMAGE');
        if ($barefootImg) {
            $url = _PS_BASE_URL_ . __PS_BASE_URI__ . 'modules/chettoheadless/views/img/sections/' . $barefootImg;
            $barefootImgHtml = '<br><strong>Actual:</strong><br><img src="' . $url . '" style="max-width:300px;margin-top:5px;" />';
        }

        $forms = [];
        $forms[] = [
            'form' => [
                'legend' => ['title' => 'Las 3 Claves del Calzado Barefoot — Configuración', 'icon' => 'icon-book'],
                'description' => 'Edita los textos, imagen y etiquetas de la sección "Aprende sobre Barefoot" del homepage.',
                'input' => [
                    ['type' => 'text', 'label' => 'Badge (etiqueta superior)', 'name' => 'CHETTO_BAREFOOT_BADGE', 'desc' => 'Ej: Aprende sobre Barefoot'],
                    ['type' => 'text', 'label' => 'Título principal', 'name' => 'CHETTO_BAREFOOT_TITLE', 'desc' => 'Ej: Las 3 claves del calzado barefoot'],
                    ['type' => 'text', 'label' => 'Parte del título en dorado', 'name' => 'CHETTO_BAREFOOT_TITLE_HIGHLIGHT', 'desc' => 'Este texto aparecerá en color dorado. Ej: calzado barefoot'],
                    ['type' => 'textarea', 'label' => 'Descripción', 'name' => 'CHETTO_BAREFOOT_DESC', 'desc' => 'Texto debajo del título'],
                    ['type' => 'file', 'label' => 'Imagen del zapato', 'name' => 'CHETTO_BAREFOOT_IMAGE_FILE', 'desc' => 'Imagen del zapato barefoot (recomendado: 600x600px)' . $barefootImgHtml],
                    ['type' => 'text', 'label' => 'Etiqueta flotante 1', 'name' => 'CHETTO_BAREFOOT_LABEL_1', 'desc' => 'Ej: Flexible'],
                    ['type' => 'text', 'label' => 'Etiqueta flotante 2', 'name' => 'CHETTO_BAREFOOT_LABEL_2', 'desc' => 'Ej: 0mm Drop'],
                    ['type' => 'text', 'label' => 'Etiqueta flotante 3', 'name' => 'CHETTO_BAREFOOT_LABEL_3', 'desc' => 'Ej: Horma Amplia'],
                    ['type' => 'text', 'label' => 'Card Tradicional — Badge', 'name' => 'CHETTO_BAREFOOT_TRAD_BADGE', 'desc' => 'Ej: Calzado Tradicional'],
                    ['type' => 'text', 'label' => 'Card Tradicional — Título', 'name' => 'CHETTO_BAREFOOT_TRAD_TITLE', 'desc' => 'Ej: Limitaciones'],
                    ['type' => 'text', 'label' => 'Card Barefoot — Badge', 'name' => 'CHETTO_BAREFOOT_BF_BADGE', 'desc' => 'Ej: Calzado Barefoot'],
                    ['type' => 'text', 'label' => 'Card Barefoot — Título', 'name' => 'CHETTO_BAREFOOT_BF_TITLE', 'desc' => 'Ej: Beneficios'],
                ],
                'submit' => ['title' => 'Guardar Configuración'],
            ],
        ];

        $helper = new HelperForm();
        $helper->module = $this->module;
        $helper->name_controller = 'AdminChettoBarefoot';
        $helper->token = Tools::getAdminTokenLite('AdminChettoBarefoot');
        $helper->currentIndex = $this->context->link->getAdminLink('AdminChettoBarefoot', false);
        $helper->submit_action = 'submitBarefootConfig';
        $helper->default_form_language = (int) Configuration::get('PS_LANG_DEFAULT');

        $helper->fields_value = [];
        foreach ($this->configKeys as $key) {
            $helper->fields_value[$key] = Configuration::get($key) ?: '';
        }

        return $helper->generateForm($forms);
    }

    private function renderFeaturesPanel()
    {
        $rows = ChettoContentBlock::getByType('barefoot_feature');
        $token = Tools::getAdminTokenLite('AdminChettoBarefoot');
        $url = $this->context->link->getAdminLink('AdminChettoBarefoot', false) . '&token=' . $token;

        $html = '<div class="panel"><div class="panel-heading"><i class="icon-list"></i> Características del Accordion (3 claves)</div>';
        $html .= '<p class="help-block">Estas son las 3 características que se muestran como accordion al lado de la imagen del zapato.</p>';
        $html .= '<table class="table"><thead><tr><th>ID</th><th>Icono</th><th>Título</th><th>Subtítulo</th><th>Descripción expandida</th><th>Pos.</th><th>Acciones</th></tr></thead><tbody>';

        foreach ($rows as $row) {
            $html .= '<tr>';
            $html .= '<td>' . $row['id_chetto_content_block'] . '</td>';
            $html .= '<td>' . htmlspecialchars($row['icon']) . '</td>';
            $html .= '<td>' . htmlspecialchars($row['title']) . '</td>';
            $html .= '<td>' . htmlspecialchars($row['description']) . '</td>';
            $html .= '<td>' . htmlspecialchars(substr($row['extra_text'], 0, 80)) . (strlen($row['extra_text']) > 80 ? '...' : '') . '</td>';
            $html .= '<td>' . $row['position'] . '</td>';
            $html .= '<td>';
            $html .= '<a href="' . $url . '&editFeature=1&id_block=' . $row['id_chetto_content_block'] . '" class="btn btn-default btn-sm"><i class="icon-edit"></i></a> ';
            $html .= '<a href="' . $url . '&deleteFeature=1&id_block=' . $row['id_chetto_content_block'] . '" class="btn btn-default btn-sm" onclick="return confirm(\'¿Eliminar?\');"><i class="icon-trash"></i></a>';
            $html .= '</td></tr>';
        }
        if (empty($rows)) {
            $html .= '<tr><td colspan="7" class="text-center">Sin características. Añade una abajo.</td></tr>';
        }
        $html .= '</tbody></table>';

        $editId = 0;
        $editData = ['icon' => '', 'title' => '', 'description' => '', 'extra_text' => '', 'position' => count($rows) + 1];
        if (Tools::getValue('editFeature') && Tools::getValue('id_block')) {
            $block = new ChettoContentBlock((int) Tools::getValue('id_block'));
            if ($block->id) {
                $editId = $block->id;
                $editData = ['icon' => $block->icon, 'title' => $block->title, 'description' => $block->description, 'extra_text' => $block->extra_text, 'position' => $block->position];
            }
        }

        $html .= '<hr><h4>' . ($editId ? 'Editar' : 'Añadir') . ' Característica</h4>';
        $html .= '<form method="post" action="' . $url . '">';
        $html .= '<input type="hidden" name="id_block" value="' . $editId . '">';
        $html .= '<div class="form-group"><label>Icono (Lucide)</label><input type="text" name="icon" class="form-control" value="' . htmlspecialchars($editData['icon']) . '" placeholder="Ej: Waves, ArrowDownToLine, Maximize"></div>';
        $html .= '<div class="form-group"><label>Título</label><input type="text" name="title" class="form-control" value="' . htmlspecialchars($editData['title']) . '" placeholder="Ej: Suela Flexible"></div>';
        $html .= '<div class="form-group"><label>Subtítulo</label><input type="text" name="description" class="form-control" value="' . htmlspecialchars($editData['description']) . '" placeholder="Ej: Dobla en todas las direcciones"></div>';
        $html .= '<div class="form-group"><label>Texto expandido</label><textarea name="extra_text" class="form-control" rows="3" placeholder="Texto que aparece al expandir el accordion">' . htmlspecialchars($editData['extra_text']) . '</textarea></div>';
        $html .= '<div class="form-group"><label>Posición</label><input type="number" name="position" class="form-control" value="' . (int) $editData['position'] . '" style="width:80px"></div>';
        $html .= '<button type="submit" name="submitBarefootFeature" class="btn btn-primary"><i class="icon-save"></i> Guardar Característica</button>';
        $html .= '</form></div>';

        return $html;
    }

    private function renderLimitationsPanel()
    {
        $rows = ChettoContentBlock::getByType('limitation');
        $token = Tools::getAdminTokenLite('AdminChettoBarefoot');
        $url = $this->context->link->getAdminLink('AdminChettoBarefoot', false) . '&token=' . $token;

        $html = '<div class="panel"><div class="panel-heading"><i class="icon-remove"></i> Limitaciones del Calzado Tradicional</div>';
        $html .= '<p class="help-block">Lista de puntos negativos del calzado tradicional (tarjeta izquierda).</p>';
        $html .= '<table class="table"><thead><tr><th>ID</th><th>Texto</th><th>Pos.</th><th>Acciones</th></tr></thead><tbody>';

        foreach ($rows as $row) {
            $html .= '<tr><td>' . $row['id_chetto_content_block'] . '</td>';
            $html .= '<td>' . htmlspecialchars($row['title']) . '</td>';
            $html .= '<td>' . $row['position'] . '</td>';
            $html .= '<td><a href="' . $url . '&editLimitation=1&id_block=' . $row['id_chetto_content_block'] . '" class="btn btn-default btn-sm"><i class="icon-edit"></i></a> ';
            $html .= '<a href="' . $url . '&deleteLimitation=1&id_block=' . $row['id_chetto_content_block'] . '" class="btn btn-default btn-sm" onclick="return confirm(\'¿Eliminar?\');"><i class="icon-trash"></i></a></td></tr>';
        }
        if (empty($rows)) {
            $html .= '<tr><td colspan="4" class="text-center">Sin limitaciones.</td></tr>';
        }
        $html .= '</tbody></table>';

        $editId = 0;
        $editData = ['title' => '', 'position' => count($rows) + 1];
        if (Tools::getValue('editLimitation') && Tools::getValue('id_block')) {
            $block = new ChettoContentBlock((int) Tools::getValue('id_block'));
            if ($block->id && $block->type === 'limitation') {
                $editId = $block->id;
                $editData = ['title' => $block->title, 'position' => $block->position];
            }
        }

        $html .= '<hr><h4>' . ($editId ? 'Editar' : 'Añadir') . ' Limitación</h4>';
        $html .= '<form method="post" action="' . $url . '">';
        $html .= '<input type="hidden" name="id_block" value="' . $editId . '">';
        $html .= '<div class="form-group"><label>Texto</label><input type="text" name="title" class="form-control" value="' . htmlspecialchars($editData['title']) . '" placeholder="Ej: Suela rígida que limita el movimiento natural"></div>';
        $html .= '<div class="form-group"><label>Posición</label><input type="number" name="position" class="form-control" value="' . (int) $editData['position'] . '" style="width:80px"></div>';
        $html .= '<button type="submit" name="submitBarefootLimitation" class="btn btn-primary"><i class="icon-save"></i> Guardar Limitación</button>';
        $html .= '</form></div>';

        return $html;
    }

    private function renderBenefitsPanel()
    {
        $rows = ChettoContentBlock::getByType('barefoot_benefit');
        $token = Tools::getAdminTokenLite('AdminChettoBarefoot');
        $url = $this->context->link->getAdminLink('AdminChettoBarefoot', false) . '&token=' . $token;

        $html = '<div class="panel"><div class="panel-heading"><i class="icon-ok"></i> Beneficios del Calzado Barefoot</div>';
        $html .= '<p class="help-block">Lista de puntos positivos del calzado barefoot (tarjeta derecha).</p>';
        $html .= '<table class="table"><thead><tr><th>ID</th><th>Texto</th><th>Pos.</th><th>Acciones</th></tr></thead><tbody>';

        foreach ($rows as $row) {
            $html .= '<tr><td>' . $row['id_chetto_content_block'] . '</td>';
            $html .= '<td>' . htmlspecialchars($row['title']) . '</td>';
            $html .= '<td>' . $row['position'] . '</td>';
            $html .= '<td><a href="' . $url . '&editBenefit=1&id_block=' . $row['id_chetto_content_block'] . '" class="btn btn-default btn-sm"><i class="icon-edit"></i></a> ';
            $html .= '<a href="' . $url . '&deleteBenefit=1&id_block=' . $row['id_chetto_content_block'] . '" class="btn btn-default btn-sm" onclick="return confirm(\'¿Eliminar?\');"><i class="icon-trash"></i></a></td></tr>';
        }
        if (empty($rows)) {
            $html .= '<tr><td colspan="4" class="text-center">Sin beneficios.</td></tr>';
        }
        $html .= '</tbody></table>';

        $editId = 0;
        $editData = ['title' => '', 'position' => count($rows) + 1];
        if (Tools::getValue('editBenefit') && Tools::getValue('id_block')) {
            $block = new ChettoContentBlock((int) Tools::getValue('id_block'));
            if ($block->id && $block->type === 'barefoot_benefit') {
                $editId = $block->id;
                $editData = ['title' => $block->title, 'position' => $block->position];
            }
        }

        $html .= '<hr><h4>' . ($editId ? 'Editar' : 'Añadir') . ' Beneficio</h4>';
        $html .= '<form method="post" action="' . $url . '">';
        $html .= '<input type="hidden" name="id_block" value="' . $editId . '">';
        $html .= '<div class="form-group"><label>Texto</label><input type="text" name="title" class="form-control" value="' . htmlspecialchars($editData['title']) . '" placeholder="Ej: Suela flexible que respeta el movimiento natural"></div>';
        $html .= '<div class="form-group"><label>Posición</label><input type="number" name="position" class="form-control" value="' . (int) $editData['position'] . '" style="width:80px"></div>';
        $html .= '<button type="submit" name="submitBarefootBenefit" class="btn btn-primary"><i class="icon-save"></i> Guardar Beneficio</button>';
        $html .= '</form></div>';

        return $html;
    }
}
