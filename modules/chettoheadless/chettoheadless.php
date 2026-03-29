<?php

if (!defined('_PS_VERSION_')) {
    exit;
}

class ChettoHeadless extends Module
{
    public function __construct()
    {
        $this->name = 'chettoheadless';
        $this->tab = 'front_office_features';
        $this->version = '1.0.0';
        $this->author = 'Chetto';
        $this->need_instance = 0;
        $this->ps_versions_compliancy = ['min' => '8.0.0', 'max' => '9.99.99'];
        $this->bootstrap = true;

        parent::__construct();

        $this->displayName = $this->l('Chetto CMS Headless');
        $this->description = $this->l('Gestiona el contenido del homepage headless: slides, beneficios, categorías, testimonios y más.');
        $this->confirmUninstall = $this->l('¿Estás seguro de que quieres desinstalar este módulo? Se perderán todos los datos de contenido.');
    }

    public function install()
    {
        return parent::install()
            && $this->executeSqlFile('install')
            && $this->installTabs();
    }

    public function uninstall()
    {
        return $this->executeSqlFile('uninstall')
            && $this->uninstallTabs()
            && $this->deleteConfigurations()
            && parent::uninstall();
    }

    private function executeSqlFile($filename)
    {
        $sqlFile = dirname(__FILE__) . '/sql/' . $filename . '.sql';
        if (!file_exists($sqlFile)) {
            return false;
        }

        $sql = file_get_contents($sqlFile);
        $sql = str_replace('PREFIX_', _DB_PREFIX_, $sql);
        $sql = str_replace('ENGINE_TYPE', _MYSQL_ENGINE_, $sql);

        $queries = preg_split('/;\s*[\r\n]+/', $sql);

        foreach ($queries as $query) {
            $query = trim($query);
            if (!empty($query)) {
                if (!Db::getInstance()->execute($query)) {
                    return false;
                }
            }
        }

        return true;
    }

    private function installTabs()
    {
        $improveId = (int) Tab::getIdFromClassName('IMPROVE');

        $parents = [
            'AdminChettoHomeParent' => ['name' => 'CMS: Home', 'icon' => 'home'],
            'AdminChettoProductParent' => ['name' => 'CMS: Producto', 'icon' => 'shopping_cart'],
            'AdminChettoBfParent' => ['name' => 'CMS: Por que Barefoot', 'icon' => 'help_outline'],
            'AdminChettoCollParent' => ['name' => 'CMS: Colecciones', 'icon' => 'list'],
            'AdminChettoGlobalParent' => ['name' => 'CMS: Global', 'icon' => 'settings'],
        ];

        $parentIds = [];
        foreach ($parents as $className => $config) {
            $tab = new Tab();
            $tab->active = 1;
            $tab->class_name = $className;
            $tab->name = [];
            foreach (Language::getLanguages(true) as $lang) {
                $tab->name[$lang['id_lang']] = $config['name'];
            }
            $tab->id_parent = $improveId;
            $tab->module = $this->name;
            $tab->icon = $config['icon'];
            if (!$tab->add()) {
                return false;
            }
            $parentIds[$className] = $tab->id;
        }

        $children = [
            'AdminChettoSlides'      => ['parent' => 'AdminChettoHomeParent', 'name' => 'Hero Slider'],
            'AdminChettoBenefits'    => ['parent' => 'AdminChettoHomeParent', 'name' => 'Beneficios'],
            'AdminChettoCategories'  => ['parent' => 'AdminChettoHomeParent', 'name' => 'Categorias'],
            'AdminChettoProducts'    => ['parent' => 'AdminChettoHomeParent', 'name' => 'Productos Destacados'],
            'AdminChettoBarefoot'    => ['parent' => 'AdminChettoHomeParent', 'name' => 'Las 3 Claves'],
            'AdminChettoFamilias'    => ['parent' => 'AdminChettoHomeParent', 'name' => 'Familias Felices'],
            'AdminChettoWhyBarefoot' => ['parent' => 'AdminChettoHomeParent', 'name' => 'Por que Barefoot'],
            'AdminChettoProductPage' => ['parent' => 'AdminChettoProductParent', 'name' => 'Secciones editables'],
            'AdminChettoPorqueBarefoot' => ['parent' => 'AdminChettoBfParent', 'name' => 'Secciones editables'],
            'AdminChettoCollections' => ['parent' => 'AdminChettoCollParent', 'name' => 'Pagina y Tarjetas'],
            'AdminChettoFooter'      => ['parent' => 'AdminChettoGlobalParent', 'name' => 'Footer y Newsletter'],
            'AdminChettoContent'     => ['parent' => 'AdminChettoGlobalParent', 'name' => 'Bloques de Contenido'],
            'AdminChettoFaq'         => ['parent' => 'AdminChettoGlobalParent', 'name' => 'Pagina FAQ'],
            'AdminChettoInfoPages'   => ['parent' => 'AdminChettoGlobalParent', 'name' => 'Paginas Info'],
        ];

        foreach ($children as $className => $config) {
            $tab = new Tab();
            $tab->active = 1;
            $tab->class_name = $className;
            $tab->name = [];
            foreach (Language::getLanguages(true) as $lang) {
                $tab->name[$lang['id_lang']] = $config['name'];
            }
            $tab->id_parent = $parentIds[$config['parent']];
            $tab->module = $this->name;
            if (!$tab->add()) {
                return false;
            }
        }

        return true;
    }

    private function uninstallTabs()
    {
        $tabs = [
            'AdminChettoSlides',
            'AdminChettoBenefits',
            'AdminChettoCategories',
            'AdminChettoProducts',
            'AdminChettoBarefoot',
            'AdminChettoFamilias',
            'AdminChettoWhyBarefoot',
            'AdminChettoCollections',
            'AdminChettoFooter',
            'AdminChettoTestimonials',
            'AdminChettoContent',
            'AdminChettoInfoPages',
            'AdminChettoFaq',
            'AdminChettoProductPage',
            'AdminChettoPorqueBarefoot',
            'AdminChettoHomeParent',
            'AdminChettoProductParent',
            'AdminChettoBfParent',
            'AdminChettoCollParent',
            'AdminChettoGlobalParent',
            'AdminChettoParent',
        ];

        foreach ($tabs as $className) {
            $idTab = (int) Tab::getIdFromClassName($className);
            if ($idTab) {
                $tab = new Tab($idTab);
                $tab->delete();
            }
        }

        return true;
    }

    private function deleteConfigurations()
    {
        foreach ($this->getConfigKeys() as $key) {
            Configuration::deleteByName($key);
        }

        return true;
    }

    private function getConfigKeys()
    {
        return [
            'CHETTO_NEWSLETTER_TITLE',
            'CHETTO_NEWSLETTER_DESC',
            'CHETTO_STAT_1_VALUE',
            'CHETTO_STAT_1_LABEL',
            'CHETTO_STAT_2_VALUE',
            'CHETTO_STAT_2_LABEL',
            'CHETTO_STAT_3_VALUE',
            'CHETTO_STAT_3_LABEL',
            'CHETTO_FEATURED_TITLE',
            'CHETTO_FEATURED_SUBTITLE',
            'CHETTO_FEATURED_CTA_TEXT',
            'CHETTO_FEATURED_CTA_LINK',
            'CHETTO_FAVORITES_TITLE',
            'CHETTO_FAVORITES_SUBTITLE',
            'CHETTO_FAVORITES_CTA_TEXT',
            'CHETTO_FAVORITES_CTA_LINK',
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
            'CHETTO_WHY_BADGE',
            'CHETTO_WHY_TITLE',
            'CHETTO_WHY_TITLE_HIGHLIGHT',
            'CHETTO_WHY_DESC',
            'CHETTO_WHY_IMAGE',
            'CHETTO_WHY_CTA_TITLE',
            'CHETTO_WHY_CTA_DESC',
            'CHETTO_WHY_CTA_TEXT',
            'CHETTO_WHY_CTA_LINK',
            'CHETTO_ANNOUNCE_PHONE',
            'CHETTO_ANNOUNCE_EMAIL',
            'CHETTO_ANNOUNCE_ABOUT_TEXT',
            'CHETTO_ANNOUNCE_ABOUT_URL',
            'CHETTO_ANNOUNCE_STORES_TEXT',
            'CHETTO_ANNOUNCE_STORES_URL',
            'CHETTO_TESTIMONIALS_TITLE',
            'CHETTO_TESTIMONIALS_SUBTITLE',
            'CHETTO_COLLECTION_CTA_TITLE',
            'CHETTO_COLLECTION_CTA_DESC',
            'CHETTO_COLLECTION_CTA_TEXT',
            'CHETTO_COLLECTION_CTA_LINK',
            'CHETTO_FOOTER_DESC',
            'CHETTO_FOOTER_PHONE',
            'CHETTO_FOOTER_EMAIL',
            'CHETTO_FOOTER_LOCATION',
        ];
    }

    public function getContent()
    {
        $output = '';

        if (Tools::isSubmit('submitChettoConfig')) {
            foreach ($this->getConfigKeys() as $key) {
                Configuration::updateValue($key, Tools::getValue($key));
            }

            if (isset($_FILES['CHETTO_BAREFOOT_IMAGE_FILE']) && $_FILES['CHETTO_BAREFOOT_IMAGE_FILE']['size'] > 0) {
                $filename = $this->uploadSectionImage('CHETTO_BAREFOOT_IMAGE_FILE', 'barefoot');
                if ($filename) {
                    Configuration::updateValue('CHETTO_BAREFOOT_IMAGE', $filename);
                }
            }

            if (isset($_FILES['CHETTO_WHY_IMAGE_FILE']) && $_FILES['CHETTO_WHY_IMAGE_FILE']['size'] > 0) {
                $filename = $this->uploadSectionImage('CHETTO_WHY_IMAGE_FILE', 'why');
                if ($filename) {
                    Configuration::updateValue('CHETTO_WHY_IMAGE', $filename);
                }
            }

            $output .= $this->displayConfirmation($this->l('Configuración guardada.'));
        }

        return $output . $this->renderConfigForm();
    }

    private function uploadSectionImage($fileKey, $prefix)
    {
        $dir = _PS_MODULE_DIR_ . 'chettoheadless/views/img/sections/';
        if (!is_dir($dir)) {
            mkdir($dir, 0755, true);
        }

        $ext = strtolower(pathinfo($_FILES[$fileKey]['name'], PATHINFO_EXTENSION));
        $filename = $prefix . '-' . time() . '.' . $ext;

        if (move_uploaded_file($_FILES[$fileKey]['tmp_name'], $dir . $filename)) {
            return $filename;
        }

        return false;
    }

    public static function getSectionImageUrl($filename)
    {
        if (empty($filename)) {
            return '';
        }
        return _PS_BASE_URL_ . __PS_BASE_URI__ . 'modules/chettoheadless/views/img/sections/' . $filename;
    }

    private function renderConfigForm()
    {
        $barefootImgHtml = '';
        $barefootImg = Configuration::get('CHETTO_BAREFOOT_IMAGE');
        if ($barefootImg) {
            $url = self::getSectionImageUrl($barefootImg);
            $barefootImgHtml = '<br><strong>Actual:</strong><br><img src="' . $url . '" style="max-width:300px;margin-top:5px;" />';
        }

        $whyImgHtml = '';
        $whyImg = Configuration::get('CHETTO_WHY_IMAGE');
        if ($whyImg) {
            $url = self::getSectionImageUrl($whyImg);
            $whyImgHtml = '<br><strong>Actual:</strong><br><img src="' . $url . '" style="max-width:300px;margin-top:5px;" />';
        }

        $forms = [];

        $forms[] = [
            'form' => [
                'legend' => ['title' => 'Productos Destacados', 'icon' => 'icon-star'],
                'input' => [
                    ['type' => 'text', 'label' => 'Título', 'name' => 'CHETTO_FEATURED_TITLE'],
                    ['type' => 'text', 'label' => 'Subtítulo', 'name' => 'CHETTO_FEATURED_SUBTITLE'],
                    ['type' => 'text', 'label' => 'Texto botón', 'name' => 'CHETTO_FEATURED_CTA_TEXT'],
                    ['type' => 'text', 'label' => 'Enlace botón', 'name' => 'CHETTO_FEATURED_CTA_LINK'],
                ],
                'submit' => ['title' => 'Guardar'],
            ],
        ];

        $forms[] = [
            'form' => [
                'legend' => ['title' => 'Favoritos de Clientes', 'icon' => 'icon-heart'],
                'input' => [
                    ['type' => 'text', 'label' => 'Título', 'name' => 'CHETTO_FAVORITES_TITLE'],
                    ['type' => 'text', 'label' => 'Subtítulo', 'name' => 'CHETTO_FAVORITES_SUBTITLE'],
                    ['type' => 'text', 'label' => 'Texto botón', 'name' => 'CHETTO_FAVORITES_CTA_TEXT'],
                    ['type' => 'text', 'label' => 'Enlace botón', 'name' => 'CHETTO_FAVORITES_CTA_LINK'],
                ],
                'submit' => ['title' => 'Guardar'],
            ],
        ];

        $forms[] = [
            'form' => [
                'legend' => ['title' => 'Sección Barefoot Education', 'icon' => 'icon-book'],
                'input' => [
                    ['type' => 'text', 'label' => 'Badge', 'name' => 'CHETTO_BAREFOOT_BADGE', 'desc' => 'Ej: Aprende sobre Barefoot'],
                    ['type' => 'text', 'label' => 'Título', 'name' => 'CHETTO_BAREFOOT_TITLE', 'desc' => 'Ej: Las 3 claves del calzado barefoot'],
                    ['type' => 'text', 'label' => 'Título (parte destacada)', 'name' => 'CHETTO_BAREFOOT_TITLE_HIGHLIGHT', 'desc' => 'Parte del título en color dorado. Ej: calzado barefoot'],
                    ['type' => 'textarea', 'label' => 'Descripción', 'name' => 'CHETTO_BAREFOOT_DESC'],
                    ['type' => 'file', 'label' => 'Imagen producto', 'name' => 'CHETTO_BAREFOOT_IMAGE_FILE', 'desc' => 'Imagen del zapato en la sección' . $barefootImgHtml],
                    ['type' => 'text', 'label' => 'Etiqueta 1', 'name' => 'CHETTO_BAREFOOT_LABEL_1', 'desc' => 'Ej: Flexible'],
                    ['type' => 'text', 'label' => 'Etiqueta 2', 'name' => 'CHETTO_BAREFOOT_LABEL_2', 'desc' => 'Ej: 0mm Drop'],
                    ['type' => 'text', 'label' => 'Etiqueta 3', 'name' => 'CHETTO_BAREFOOT_LABEL_3', 'desc' => 'Ej: Horma Amplia'],
                    ['type' => 'text', 'label' => 'Card Tradicional - Badge', 'name' => 'CHETTO_BAREFOOT_TRAD_BADGE', 'desc' => 'Ej: Calzado Tradicional'],
                    ['type' => 'text', 'label' => 'Card Tradicional - Título', 'name' => 'CHETTO_BAREFOOT_TRAD_TITLE', 'desc' => 'Ej: Limitaciones'],
                    ['type' => 'text', 'label' => 'Card Barefoot - Badge', 'name' => 'CHETTO_BAREFOOT_BF_BADGE', 'desc' => 'Ej: Calzado Barefoot'],
                    ['type' => 'text', 'label' => 'Card Barefoot - Título', 'name' => 'CHETTO_BAREFOOT_BF_TITLE', 'desc' => 'Ej: Beneficios'],
                ],
                'submit' => ['title' => 'Guardar'],
            ],
        ];

        $forms[] = [
            'form' => [
                'legend' => ['title' => 'Sección ¿Por qué Barefoot?', 'icon' => 'icon-question-sign'],
                'input' => [
                    ['type' => 'text', 'label' => 'Badge', 'name' => 'CHETTO_WHY_BADGE', 'desc' => 'Ej: ¿Por qué Barefoot?'],
                    ['type' => 'text', 'label' => 'Título', 'name' => 'CHETTO_WHY_TITLE'],
                    ['type' => 'textarea', 'label' => 'Descripción', 'name' => 'CHETTO_WHY_DESC'],
                    ['type' => 'file', 'label' => 'Imagen', 'name' => 'CHETTO_WHY_IMAGE_FILE', 'desc' => 'Imagen principal de la sección' . $whyImgHtml],
                    ['type' => 'text', 'label' => 'CTA - Título', 'name' => 'CHETTO_WHY_CTA_TITLE', 'desc' => 'Ej: ¿Tienes dudas sobre el calzado barefoot?'],
                    ['type' => 'textarea', 'label' => 'CTA - Descripción', 'name' => 'CHETTO_WHY_CTA_DESC'],
                    ['type' => 'text', 'label' => 'CTA - Texto botón', 'name' => 'CHETTO_WHY_CTA_TEXT', 'desc' => 'Ej: Hablar con un Experto'],
                    ['type' => 'text', 'label' => 'CTA - Enlace', 'name' => 'CHETTO_WHY_CTA_LINK', 'desc' => 'Ej: /contacto'],
                ],
                'submit' => ['title' => 'Guardar'],
            ],
        ];

        $forms[] = [
            'form' => [
                'legend' => ['title' => 'Barra de Anuncio (top)', 'icon' => 'icon-bullhorn'],
                'input' => [
                    ['type' => 'text', 'label' => 'Teléfono', 'name' => 'CHETTO_ANNOUNCE_PHONE', 'desc' => 'Ej: +34 660 132 249'],
                    ['type' => 'text', 'label' => 'Email', 'name' => 'CHETTO_ANNOUNCE_EMAIL', 'desc' => 'Ej: Tienda@chetto.es'],
                    ['type' => 'text', 'label' => 'Enlace izquierdo - Texto', 'name' => 'CHETTO_ANNOUNCE_ABOUT_TEXT', 'desc' => 'Ej: Sobre Nosotros'],
                    ['type' => 'text', 'label' => 'Enlace izquierdo - URL', 'name' => 'CHETTO_ANNOUNCE_ABOUT_URL', 'desc' => 'Ej: /sobre-nosotros'],
                    ['type' => 'text', 'label' => 'Enlace tiendas - Texto', 'name' => 'CHETTO_ANNOUNCE_STORES_TEXT', 'desc' => 'Ej: Nuestras tiendas'],
                    ['type' => 'text', 'label' => 'Enlace tiendas - URL', 'name' => 'CHETTO_ANNOUNCE_STORES_URL', 'desc' => 'Ej: /tiendas'],
                ],
                'submit' => ['title' => 'Guardar'],
            ],
        ];

        $forms[] = [
            'form' => [
                'legend' => ['title' => 'Testimonios', 'icon' => 'icon-comments'],
                'input' => [
                    ['type' => 'text', 'label' => 'Título', 'name' => 'CHETTO_TESTIMONIALS_TITLE', 'desc' => 'Ej: Familias Felices'],
                    ['type' => 'text', 'label' => 'Subtítulo', 'name' => 'CHETTO_TESTIMONIALS_SUBTITLE', 'desc' => 'Ej: Lo que dicen nuestros clientes...'],
                ],
                'submit' => ['title' => 'Guardar'],
            ],
        ];

        $forms[] = [
            'form' => [
                'legend' => ['title' => 'Newsletter y Estadísticas', 'icon' => 'icon-envelope'],
                'input' => [
                    ['type' => 'text', 'label' => 'Newsletter - Título', 'name' => 'CHETTO_NEWSLETTER_TITLE'],
                    ['type' => 'textarea', 'label' => 'Newsletter - Descripción', 'name' => 'CHETTO_NEWSLETTER_DESC'],
                    ['type' => 'text', 'label' => 'Estadística 1 - Valor', 'name' => 'CHETTO_STAT_1_VALUE', 'desc' => 'Ej: 4.8/5'],
                    ['type' => 'text', 'label' => 'Estadística 1 - Etiqueta', 'name' => 'CHETTO_STAT_1_LABEL'],
                    ['type' => 'text', 'label' => 'Estadística 2 - Valor', 'name' => 'CHETTO_STAT_2_VALUE'],
                    ['type' => 'text', 'label' => 'Estadística 2 - Etiqueta', 'name' => 'CHETTO_STAT_2_LABEL'],
                    ['type' => 'text', 'label' => 'Estadística 3 - Valor', 'name' => 'CHETTO_STAT_3_VALUE'],
                    ['type' => 'text', 'label' => 'Estadística 3 - Etiqueta', 'name' => 'CHETTO_STAT_3_LABEL'],
                ],
                'submit' => ['title' => 'Guardar'],
            ],
        ];

        $helper = new HelperForm();
        $helper->module = $this;
        $helper->name_controller = $this->name;
        $helper->token = Tools::getAdminTokenLite('AdminModules');
        $helper->currentIndex = AdminController::$currentIndex . '&configure=' . $this->name;
        $helper->submit_action = 'submitChettoConfig';
        $helper->default_form_language = (int) Configuration::get('PS_LANG_DEFAULT');

        $helper->fields_value = [];
        foreach ($this->getConfigKeys() as $key) {
            $helper->fields_value[$key] = Configuration::get($key) ?: '';
        }

        return $helper->generateForm($forms);
    }
}
