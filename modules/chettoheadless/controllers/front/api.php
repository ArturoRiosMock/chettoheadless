<?php

require_once _PS_MODULE_DIR_ . 'chettoheadless/classes/ChettoSlide.php';
require_once _PS_MODULE_DIR_ . 'chettoheadless/classes/ChettoBenefit.php';
require_once _PS_MODULE_DIR_ . 'chettoheadless/classes/ChettoHomepageCategory.php';
require_once _PS_MODULE_DIR_ . 'chettoheadless/classes/ChettoTestimonial.php';
require_once _PS_MODULE_DIR_ . 'chettoheadless/classes/ChettoContentBlock.php';
require_once _PS_MODULE_DIR_ . 'chettoheadless/classes/ChettoHomepageProduct.php';
require_once _PS_MODULE_DIR_ . 'chettoheadless/classes/ChettoNewsletter.php';
require_once _PS_MODULE_DIR_ . 'chettoheadless/classes/ChettoCollection.php';

class ChettoHeadlessApiModuleFrontController extends ModuleFrontController
{
    public function initContent()
    {
        parent::initContent();

        header('Content-Type: application/json; charset=utf-8');
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type');

        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            http_response_code(200);
            exit;
        }

        $action = Tools::getValue('action');
        if ($_SERVER['REQUEST_METHOD'] === 'POST' && $action === 'newsletter') {
            $this->handleNewsletter();
            return;
        }

        $data = [
            'slides' => $this->getSlides(),
            'benefits' => $this->getBenefits(),
            'categories' => $this->getCategories(),
            'testimonials' => $this->getTestimonials(),
            'barefoot_features' => $this->getContentBlocks('barefoot_feature'),
            'why_barefoot' => $this->getContentBlocks('why_barefoot'),
            'limitations' => $this->getContentBlocks('limitation'),
            'barefoot_benefits' => $this->getContentBlocks('barefoot_benefit'),
            'why_barefoot_features' => $this->getContentBlocks('why_barefoot_feature'),
            'collections' => $this->getCollections(),
            'featured_products' => $this->getHomepageProducts('featured'),
            'favorites_products' => $this->getHomepageProducts('favorites'),
            'config' => $this->getConfig(),
        ];

        echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
        exit;
    }

    private function handleNewsletter()
    {
        $body = json_decode(file_get_contents('php://input'), true);
        $email = isset($body['email']) ? trim($body['email']) : '';

        if (empty($email) || !Validate::isEmail($email)) {
            echo json_encode(['success' => false, 'message' => 'Email no válido']);
            exit;
        }

        if (ChettoNewsletter::emailExists($email)) {
            echo json_encode(['success' => true, 'message' => 'Ya estás suscrito']);
            exit;
        }

        $sub = new ChettoNewsletter();
        $sub->email = $email;
        $sub->active = 1;
        $sub->date_add = date('Y-m-d H:i:s');

        if ($sub->add()) {
            echo json_encode(['success' => true, 'message' => '¡Suscripción exitosa!']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Error al suscribirse']);
        }
        exit;
    }

    private function getSlides()
    {
        $rows = ChettoSlide::getAll();
        $slides = [];

        foreach ($rows as $row) {
            $slides[] = [
                'id' => (int) $row['id_chetto_slide'],
                'badge' => $row['badge'] ?? '',
                'subtitle' => $row['subtitle'] ?? '',
                'title' => $row['title'],
                'description' => $row['description'] ?? '',
                'cta' => $row['cta'] ?? '',
                'ctaLink' => $row['cta_link'] ?? '',
                'image' => ChettoSlide::getImageUrl($row['image']),
            ];
        }

        return $slides;
    }

    private function getBenefits()
    {
        $rows = ChettoBenefit::getAll();
        $benefits = [];

        foreach ($rows as $row) {
            $benefits[] = [
                'id' => (int) $row['id_chetto_benefit'],
                'icon' => $row['icon'],
                'title' => $row['title'],
                'description' => $row['description'] ?? '',
            ];
        }

        return $benefits;
    }

    private function getCategories()
    {
        $rows = ChettoHomepageCategory::getAll();
        $categories = [];

        foreach ($rows as $row) {
            $categories[] = [
                'id' => (int) $row['id_chetto_homepage_category'],
                'name' => $row['name'],
                'description' => $row['description'] ?? '',
                'image' => ChettoHomepageCategory::getImageUrl($row['image']),
                'slug' => $row['slug'],
                'link' => $row['link'] ?? '',
            ];
        }

        return $categories;
    }

    private function getTestimonials()
    {
        $rows = ChettoTestimonial::getAll();
        $testimonials = [];

        foreach ($rows as $row) {
            $name = $row['name'];
            $testimonials[] = [
                'id' => (int) $row['id_chetto_testimonial'],
                'name' => $name,
                'location' => $row['location'] ?? '',
                'rating' => (int) $row['rating'],
                'text' => $row['text'],
                'initial' => mb_substr($name, 0, 1),
            ];
        }

        return $testimonials;
    }

    private function getContentBlocks($type)
    {
        $rows = ChettoContentBlock::getByType($type);
        $blocks = [];

        foreach ($rows as $row) {
            $block = [
                'id' => (int) $row['id_chetto_content_block'],
                'title' => $row['title'],
                'description' => $row['description'] ?? '',
            ];

            if (!empty($row['icon'])) {
                $block['icon'] = $row['icon'];
            }
            if (!empty($row['extra_text'])) {
                $block['extra_text'] = $row['extra_text'];
            }

            $blocks[] = $block;
        }

        return $blocks;
    }

    private function getHomepageProducts($sectionType)
    {
        $rows = ChettoHomepageProduct::getBySection($sectionType);
        $products = [];

        foreach ($rows as $row) {
            $product = [
                'id' => (int) $row['id_chetto_homepage_product'],
                'name' => $row['name'],
                'slug' => $row['slug'],
                'price' => (float) $row['price'],
                'image' => ChettoHomepageProduct::getImageUrl($row['image']),
                'category' => $row['category'] ?? '',
            ];

            if (!empty($row['original_price']) && (float) $row['original_price'] > 0) {
                $product['originalPrice'] = (float) $row['original_price'];
            }
            if (!empty($row['discount'])) {
                $product['discount'] = $row['discount'];
            }
            if (!empty($row['badge'])) {
                $product['badge'] = $row['badge'];
            }
            if (!empty($row['colors']) && (int) $row['colors'] > 0) {
                $product['colors'] = (int) $row['colors'];
            }
            if (!empty($row['link'])) {
                $product['link'] = $row['link'];
            }

            $products[] = $product;
        }

        return $products;
    }

    private function getCollections()
    {
        $rows = ChettoCollection::getAll();
        $collections = [];

        foreach ($rows as $row) {
            $collections[] = [
                'id' => (int) $row['id_chetto_collection'],
                'name' => $row['name'],
                'description' => $row['description'] ?? '',
                'image' => ChettoCollection::getImageUrl($row['image']),
                'slug' => $row['slug'],
            ];
        }

        return $collections;
    }

    private function getConfig()
    {
        $stats = [];
        for ($i = 1; $i <= 3; $i++) {
            $value = Configuration::get('CHETTO_STAT_' . $i . '_VALUE');
            $label = Configuration::get('CHETTO_STAT_' . $i . '_LABEL');
            if ($value && $label) {
                $stats[] = ['value' => $value, 'label' => $label];
            }
        }

        $getSectionImageUrl = function ($filename) {
            if (empty($filename)) {
                return '';
            }
            return _PS_BASE_URL_ . __PS_BASE_URI__ . 'modules/chettoheadless/views/img/sections/' . $filename;
        };

        return [
            'newsletter_title' => Configuration::get('CHETTO_NEWSLETTER_TITLE') ?: '',
            'newsletter_description' => Configuration::get('CHETTO_NEWSLETTER_DESC') ?: '',
            'stats' => $stats,
            'featured_title' => Configuration::get('CHETTO_FEATURED_TITLE') ?: 'Productos Destacados',
            'featured_subtitle' => Configuration::get('CHETTO_FEATURED_SUBTITLE') ?: 'Lo mejor de nuestra colección barefoot',
            'featured_cta_text' => Configuration::get('CHETTO_FEATURED_CTA_TEXT') ?: 'Ver Todo',
            'featured_cta_link' => Configuration::get('CHETTO_FEATURED_CTA_LINK') ?: '/colecciones',
            'favorites_title' => Configuration::get('CHETTO_FAVORITES_TITLE') ?: 'Los favoritos de nuestros clientes',
            'favorites_subtitle' => Configuration::get('CHETTO_FAVORITES_SUBTITLE') ?: '',
            'favorites_cta_text' => Configuration::get('CHETTO_FAVORITES_CTA_TEXT') ?: 'Ver Todas las Ofertas',
            'favorites_cta_link' => Configuration::get('CHETTO_FAVORITES_CTA_LINK') ?: '/ofertas',
            'barefoot_badge' => Configuration::get('CHETTO_BAREFOOT_BADGE') ?: 'Aprende sobre Barefoot',
            'barefoot_title' => Configuration::get('CHETTO_BAREFOOT_TITLE') ?: 'Las 3 claves del calzado barefoot',
            'barefoot_title_highlight' => Configuration::get('CHETTO_BAREFOOT_TITLE_HIGHLIGHT') ?: 'calzado barefoot',
            'barefoot_description' => Configuration::get('CHETTO_BAREFOOT_DESC') ?: '',
            'barefoot_image' => $getSectionImageUrl(Configuration::get('CHETTO_BAREFOOT_IMAGE')),
            'barefoot_labels' => array_filter([
                Configuration::get('CHETTO_BAREFOOT_LABEL_1') ?: 'Flexible',
                Configuration::get('CHETTO_BAREFOOT_LABEL_2') ?: '0mm Drop',
                Configuration::get('CHETTO_BAREFOOT_LABEL_3') ?: 'Horma Amplia',
            ]),
            'barefoot_trad_badge' => Configuration::get('CHETTO_BAREFOOT_TRAD_BADGE') ?: 'Calzado Tradicional',
            'barefoot_trad_title' => Configuration::get('CHETTO_BAREFOOT_TRAD_TITLE') ?: 'Limitaciones',
            'barefoot_bf_badge' => Configuration::get('CHETTO_BAREFOOT_BF_BADGE') ?: 'Calzado Barefoot',
            'barefoot_bf_title' => Configuration::get('CHETTO_BAREFOOT_BF_TITLE') ?: 'Beneficios',
            'why_badge' => Configuration::get('CHETTO_WHY_BADGE') ?: '¿Por qué Barefoot?',
            'why_title' => Configuration::get('CHETTO_WHY_TITLE') ?: 'Calzado que respeta el movimiento natural',
            'why_title_highlight' => Configuration::get('CHETTO_WHY_TITLE_HIGHLIGHT') ?: 'movimiento natural',
            'why_description' => Configuration::get('CHETTO_WHY_DESC') ?: '',
            'why_image' => $getSectionImageUrl(Configuration::get('CHETTO_WHY_IMAGE')),
            'why_cta_title' => Configuration::get('CHETTO_WHY_CTA_TITLE') ?: '¿Tienes dudas sobre el calzado barefoot?',
            'why_cta_description' => Configuration::get('CHETTO_WHY_CTA_DESC') ?: '',
            'why_cta_text' => Configuration::get('CHETTO_WHY_CTA_TEXT') ?: 'Hablar con un Experto',
            'why_cta_link' => Configuration::get('CHETTO_WHY_CTA_LINK') ?: '/contacto',
            'announce_phone' => Configuration::get('CHETTO_ANNOUNCE_PHONE') ?: '+34 660 132 249',
            'announce_email' => Configuration::get('CHETTO_ANNOUNCE_EMAIL') ?: 'Tienda@chetto.es',
            'announce_about_text' => Configuration::get('CHETTO_ANNOUNCE_ABOUT_TEXT') ?: 'Sobre Nosotros',
            'announce_about_url' => Configuration::get('CHETTO_ANNOUNCE_ABOUT_URL') ?: '/sobre-nosotros',
            'announce_stores_text' => Configuration::get('CHETTO_ANNOUNCE_STORES_TEXT') ?: 'Nuestras tiendas',
            'announce_stores_url' => Configuration::get('CHETTO_ANNOUNCE_STORES_URL') ?: '/tiendas',
            'testimonials_title' => Configuration::get('CHETTO_TESTIMONIALS_TITLE') ?: 'Familias Felices',
            'testimonials_subtitle' => Configuration::get('CHETTO_TESTIMONIALS_SUBTITLE') ?: 'Lo que dicen nuestros clientes sobre el calzado barefoot',
            'pdp_shipping_1' => Configuration::get('CHETTO_PDP_SHIPPING_1') ?: 'Envío gratis y rápido entre 24-48h',
            'pdp_shipping_2' => Configuration::get('CHETTO_PDP_SHIPPING_2') ?: 'Sólo sobre pedido y unidades limitadas',
            'pdp_shipping_3' => Configuration::get('CHETTO_PDP_SHIPPING_3') ?: 'Cambios y devoluciones gratis 30 días',
            'pdp_shipping_4' => Configuration::get('CHETTO_PDP_SHIPPING_4') ?: 'Compra segura con SSL 256bits',
            'pdp_shipping_5' => Configuration::get('CHETTO_PDP_SHIPPING_5') ?: 'Pago en hasta en 3 cuotas sin intereses',
            'pdp_pack_title' => Configuration::get('CHETTO_PDP_PACK_TITLE') ?: 'Oferta Pack con Descuento',
            'pdp_pack_desc' => Configuration::get('CHETTO_PDP_PACK_DESC') ?: 'Combina y ahorra un 15% comprando estos productos juntos',
            'pdp_related_title' => Configuration::get('CHETTO_PDP_RELATED_TITLE') ?: 'También te puede interesar',
            'pdp_related_subtitle' => Configuration::get('CHETTO_PDP_RELATED_SUBTITLE') ?: 'Descubre más opciones de calzado barefoot',
            'collection_page_title' => Configuration::get('CHETTO_COLL_PAGE_TITLE') ?: 'Nuestras Colecciones',
            'collection_page_subtitle' => Configuration::get('CHETTO_COLL_PAGE_SUBTITLE') ?: 'Encuentra el calzado barefoot perfecto para cada ocasión',
            'collection_cta_title' => Configuration::get('CHETTO_COLLECTION_CTA_TITLE') ?: '¿Primera vez con calzado barefoot?',
            'collection_cta_description' => Configuration::get('CHETTO_COLLECTION_CTA_DESC') ?: 'Descubre nuestra guía completa sobre cómo elegir el zapato barefoot perfecto para tu hijo',
            'collection_cta_text' => Configuration::get('CHETTO_COLLECTION_CTA_TEXT') ?: 'Ver Guía Barefoot',
            'collection_cta_link' => Configuration::get('CHETTO_COLLECTION_CTA_LINK') ?: '/porque-barefoot',
            'footer_description' => Configuration::get('CHETTO_FOOTER_DESC') ?: 'Calzado respetuoso para el desarrollo natural de los pies de tus hijos. Diseñado con amor y respeto por la naturaleza.',
            'footer_phone' => Configuration::get('CHETTO_FOOTER_PHONE') ?: '660 132 049',
            'footer_email' => Configuration::get('CHETTO_FOOTER_EMAIL') ?: 'tienda@chetto.es',
            'footer_location' => Configuration::get('CHETTO_FOOTER_LOCATION') ?: 'Madrid, España',
        ];
    }
}
