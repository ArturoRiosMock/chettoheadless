<?php

require_once _PS_MODULE_DIR_ . 'chettoheadless/classes/ChettoTestimonial.php';

class AdminChettoFamiliasController extends ModuleAdminController
{
    private $configKeys = [
        'CHETTO_TESTIMONIALS_TITLE',
        'CHETTO_TESTIMONIALS_SUBTITLE',
        'CHETTO_STAT_1_VALUE',
        'CHETTO_STAT_1_LABEL',
        'CHETTO_STAT_2_VALUE',
        'CHETTO_STAT_2_LABEL',
        'CHETTO_STAT_3_VALUE',
        'CHETTO_STAT_3_LABEL',
    ];

    public function __construct()
    {
        $this->bootstrap = true;
        parent::__construct();
    }

    public function initContent()
    {
        parent::initContent();

        if (Tools::isSubmit('submitFamiliasConfig')) {
            $this->processSaveConfig();
        }

        if (Tools::isSubmit('submitTestimonial')) {
            $this->processSaveTestimonial();
        }

        if (Tools::isSubmit('deleteTestimonial')) {
            $this->processDeleteTestimonial();
        }

        $html = $this->renderConfigForm();
        $html .= $this->renderTestimonialsPanel();

        $this->context->smarty->assign('content', $html);
    }

    private function processSaveConfig()
    {
        foreach ($this->configKeys as $key) {
            Configuration::updateValue($key, Tools::getValue($key));
        }
        $this->confirmations[] = 'Configuración de "Familias Felices" guardada correctamente.';
    }

    private function processSaveTestimonial()
    {
        $id = (int) Tools::getValue('id_chetto_testimonial');
        $testimonial = $id ? new ChettoTestimonial($id) : new ChettoTestimonial();
        $testimonial->name = Tools::getValue('name');
        $testimonial->location = Tools::getValue('location');
        $testimonial->rating = (int) Tools::getValue('rating', 5);
        $testimonial->text = Tools::getValue('text');
        $testimonial->position = (int) Tools::getValue('position', 0);
        $testimonial->active = 1;
        $testimonial->save();
        $this->confirmations[] = 'Testimonio guardado correctamente.';
    }

    private function processDeleteTestimonial()
    {
        $id = (int) Tools::getValue('id_chetto_testimonial');
        if ($id) {
            $testimonial = new ChettoTestimonial($id);
            if ($testimonial->id) {
                $testimonial->delete();
                $this->confirmations[] = 'Testimonio eliminado.';
            }
        }
    }

    private function renderConfigForm()
    {
        $forms = [];
        $forms[] = [
            'form' => [
                'legend' => ['title' => 'Familias Felices — Configuración General', 'icon' => 'icon-comments'],
                'description' => 'Edita el título, subtítulo y las 3 estadísticas de la sección "Familias Felices" del homepage.',
                'input' => [
                    ['type' => 'text', 'label' => 'Título de la sección', 'name' => 'CHETTO_TESTIMONIALS_TITLE', 'desc' => 'Ej: Familias Felices'],
                    ['type' => 'text', 'label' => 'Subtítulo', 'name' => 'CHETTO_TESTIMONIALS_SUBTITLE', 'desc' => 'Ej: Lo que dicen nuestros clientes sobre el calzado barefoot'],
                    ['type' => 'text', 'label' => 'Estadística 1 — Valor', 'name' => 'CHETTO_STAT_1_VALUE', 'desc' => 'Ej: 4.8/5'],
                    ['type' => 'text', 'label' => 'Estadística 1 — Etiqueta', 'name' => 'CHETTO_STAT_1_LABEL', 'desc' => 'Ej: +2.500 reseñas'],
                    ['type' => 'text', 'label' => 'Estadística 2 — Valor', 'name' => 'CHETTO_STAT_2_VALUE', 'desc' => 'Ej: 98%'],
                    ['type' => 'text', 'label' => 'Estadística 2 — Etiqueta', 'name' => 'CHETTO_STAT_2_LABEL', 'desc' => 'Ej: Clientes satisfechos'],
                    ['type' => 'text', 'label' => 'Estadística 3 — Valor', 'name' => 'CHETTO_STAT_3_VALUE', 'desc' => 'Ej: 5.000+'],
                    ['type' => 'text', 'label' => 'Estadística 3 — Etiqueta', 'name' => 'CHETTO_STAT_3_LABEL', 'desc' => 'Ej: Familias felices'],
                ],
                'submit' => ['title' => 'Guardar Configuración'],
            ],
        ];

        $helper = new HelperForm();
        $helper->module = $this->module;
        $helper->name_controller = 'AdminChettoFamilias';
        $helper->token = Tools::getAdminTokenLite('AdminChettoFamilias');
        $helper->currentIndex = $this->context->link->getAdminLink('AdminChettoFamilias', false);
        $helper->submit_action = 'submitFamiliasConfig';
        $helper->default_form_language = (int) Configuration::get('PS_LANG_DEFAULT');

        $helper->fields_value = [];
        foreach ($this->configKeys as $key) {
            $helper->fields_value[$key] = Configuration::get($key) ?: '';
        }

        return $helper->generateForm($forms);
    }

    private function renderTestimonialsPanel()
    {
        $rows = ChettoTestimonial::getAll();
        $token = Tools::getAdminTokenLite('AdminChettoFamilias');
        $url = $this->context->link->getAdminLink('AdminChettoFamilias', false) . '&token=' . $token;

        $html = '<div class="panel"><div class="panel-heading"><i class="icon-comment"></i> Testimonios</div>';
        $html .= '<p class="help-block">Gestiona las tarjetas de testimonios que se muestran en la sección.</p>';
        $html .= '<table class="table"><thead><tr>';
        $html .= '<th>ID</th><th>Nombre</th><th>Ubicación</th><th>Valoración</th><th>Texto</th><th>Pos.</th><th>Acciones</th>';
        $html .= '</tr></thead><tbody>';

        foreach ($rows as $row) {
            $stars = str_repeat('★', (int) $row['rating']) . str_repeat('☆', 5 - (int) $row['rating']);
            $textPreview = htmlspecialchars(mb_substr($row['text'], 0, 60)) . (mb_strlen($row['text']) > 60 ? '...' : '');

            $html .= '<tr>';
            $html .= '<td>' . $row['id_chetto_testimonial'] . '</td>';
            $html .= '<td>' . htmlspecialchars($row['name']) . '</td>';
            $html .= '<td>' . htmlspecialchars($row['location']) . '</td>';
            $html .= '<td>' . $stars . '</td>';
            $html .= '<td>' . $textPreview . '</td>';
            $html .= '<td>' . $row['position'] . '</td>';
            $html .= '<td>';
            $html .= '<a href="' . $url . '&editTestimonial=1&id_chetto_testimonial=' . $row['id_chetto_testimonial'] . '" class="btn btn-default btn-sm"><i class="icon-edit"></i></a> ';
            $html .= '<a href="' . $url . '&deleteTestimonial=1&id_chetto_testimonial=' . $row['id_chetto_testimonial'] . '" class="btn btn-default btn-sm" onclick="return confirm(\'¿Eliminar este testimonio?\');"><i class="icon-trash"></i></a>';
            $html .= '</td></tr>';
        }

        if (empty($rows)) {
            $html .= '<tr><td colspan="7" class="text-center">Sin testimonios. Añade uno abajo.</td></tr>';
        }

        $html .= '</tbody></table>';

        $editId = 0;
        $editData = ['name' => '', 'location' => '', 'rating' => 5, 'text' => '', 'position' => count($rows) + 1];
        if (Tools::getValue('editTestimonial') && Tools::getValue('id_chetto_testimonial')) {
            $testimonial = new ChettoTestimonial((int) Tools::getValue('id_chetto_testimonial'));
            if ($testimonial->id) {
                $editId = $testimonial->id;
                $editData = [
                    'name' => $testimonial->name,
                    'location' => $testimonial->location,
                    'rating' => $testimonial->rating,
                    'text' => $testimonial->text,
                    'position' => $testimonial->position,
                ];
            }
        }

        $html .= '<hr><h4>' . ($editId ? 'Editar' : 'Añadir') . ' Testimonio</h4>';
        $html .= '<form method="post" action="' . $url . '">';
        $html .= '<input type="hidden" name="id_chetto_testimonial" value="' . $editId . '">';
        $html .= '<div class="form-group"><label>Nombre</label><input type="text" name="name" class="form-control" value="' . htmlspecialchars($editData['name']) . '" placeholder="Ej: María González" required></div>';
        $html .= '<div class="form-group"><label>Ubicación</label><input type="text" name="location" class="form-control" value="' . htmlspecialchars($editData['location']) . '" placeholder="Ej: Madrid"></div>';

        $html .= '<div class="form-group"><label>Valoración</label><select name="rating" class="form-control" style="width:120px">';
        for ($i = 5; $i >= 1; $i--) {
            $selected = ((int) $editData['rating'] === $i) ? ' selected' : '';
            $html .= '<option value="' . $i . '"' . $selected . '>' . str_repeat('★', $i) . ' (' . $i . ')</option>';
        }
        $html .= '</select></div>';

        $html .= '<div class="form-group"><label>Texto del testimonio</label><textarea name="text" class="form-control" rows="3" placeholder="Ej: Los mejores zapatos para mi hijo..." required>' . htmlspecialchars($editData['text']) . '</textarea></div>';
        $html .= '<div class="form-group"><label>Posición</label><input type="number" name="position" class="form-control" value="' . (int) $editData['position'] . '" style="width:80px"></div>';
        $html .= '<button type="submit" name="submitTestimonial" class="btn btn-primary"><i class="icon-save"></i> Guardar Testimonio</button>';
        $html .= '</form></div>';

        return $html;
    }
}
