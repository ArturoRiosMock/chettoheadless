import HeroSlider from "@/components/sections/HeroSlider";
import BenefitsBar from "@/components/sections/BenefitsBar";
import CategoriesGrid from "@/components/sections/CategoriesGrid";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import BarefootEducation from "@/components/sections/BarefootEducation";
import CustomerFavorites from "@/components/sections/CustomerFavorites";
import Testimonials from "@/components/sections/Testimonials";
import WhyBarefoot from "@/components/sections/WhyBarefoot";
import Newsletter from "@/components/sections/Newsletter";
import { prestashop } from "@/lib/prestashop";
import {
  HERO_SLIDES,
  BENEFITS,
  CATEGORIES,
  TESTIMONIALS,
  BAREFOOT_FEATURES,
  WHY_BAREFOOT_CARDS,
  LIMITATIONS,
  BAREFOOT_BENEFITS,
  STATS,
  FEATURED_PRODUCTS,
  FAVORITE_PRODUCTS,
} from "@/data/mock";

export default async function Home() {
  let cms;
  try {
    cms = await prestashop.getHomepageContent();
  } catch {
    cms = null;
  }

  const slides = cms?.slides?.length ? cms.slides : HERO_SLIDES;
  const benefits = cms?.benefits?.length ? cms.benefits : BENEFITS;
  const categories = cms?.categories?.length ? cms.categories : CATEGORIES;
  const testimonials = cms?.testimonials?.length
    ? cms.testimonials
    : TESTIMONIALS;
  const stats = cms?.config?.stats?.length ? cms.config.stats : STATS;

  const barefootFeatures = cms?.barefoot_features?.length
    ? cms.barefoot_features.map((b) => ({
        id: b.id,
        icon: b.icon || "",
        title: b.title,
        shortDescription: b.description,
        longDescription: b.extra_text,
      }))
    : BAREFOOT_FEATURES;

  const whyBarefootCards = cms?.why_barefoot?.length
    ? cms.why_barefoot.map((b) => ({
        id: b.id,
        icon: b.icon || "",
        title: b.title,
        description: b.description,
      }))
    : WHY_BAREFOOT_CARDS;

  const limitations = cms?.limitations?.length
    ? cms.limitations.map((b) => b.title)
    : LIMITATIONS;

  const barefootBenefits = cms?.barefoot_benefits?.length
    ? cms.barefoot_benefits.map((b) => b.title)
    : BAREFOOT_BENEFITS;

  const whyBarefootFeatures = cms?.why_barefoot_features?.length
    ? cms.why_barefoot_features
    : [
        { id: 1, icon: "Waves", title: "Suela Flexible", description: "Permite el movimiento natural del pie en todas direcciones." },
        { id: 2, icon: "ArrowDownToLine", title: "Drop Cero", description: "Sin desnivel entre talón y puntera para una pisada natural." },
        { id: 3, icon: "Maximize", title: "Horma Amplia", description: "Espacio suficiente para que los dedos se muevan libremente." },
      ];

  const featuredProducts = cms?.featured_products?.length
    ? cms.featured_products
    : FEATURED_PRODUCTS;

  const favoritesProducts = cms?.favorites_products?.length
    ? cms.favorites_products
    : FAVORITE_PRODUCTS;

  const cfg = cms?.config;

  return (
    <>
      <HeroSlider slides={slides} />
      <BenefitsBar benefits={benefits} />
      <CategoriesGrid categories={categories} />
      <FeaturedProducts
        products={featuredProducts}
        title={cfg?.featured_title || "Productos Destacados"}
        subtitle={cfg?.featured_subtitle || "Lo mejor de nuestra colección barefoot"}
        ctaText={cfg?.featured_cta_text || "Ver Todo"}
        ctaLink={cfg?.featured_cta_link || "/colecciones"}
      />
      <BarefootEducation
        features={barefootFeatures}
        limitations={limitations}
        barefootBenefits={barefootBenefits}
        badge={cfg?.barefoot_badge || "Aprende sobre Barefoot"}
        title={cfg?.barefoot_title || "Las 3 claves del calzado barefoot"}
        description={cfg?.barefoot_description || "Descubre qué hace que el calzado barefoot sea diferente y por qué es la mejor opción para el desarrollo de tus hijos."}
        image={cfg?.barefoot_image || "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop"}
        labels={cfg?.barefoot_labels || ["Flexible", "0mm Drop", "Horma Amplia"]}
        tradBadge={cfg?.barefoot_trad_badge || "Calzado Tradicional"}
        tradTitle={cfg?.barefoot_trad_title || "Limitaciones"}
        bfBadge={cfg?.barefoot_bf_badge || "Calzado Barefoot"}
        bfTitle={cfg?.barefoot_bf_title || "Beneficios"}
      />
      <CustomerFavorites
        products={favoritesProducts}
        title={cfg?.favorites_title || "Los favoritos de nuestros clientes"}
        subtitle={cfg?.favorites_subtitle || "Hasta 27% de descuento en calzado barefoot seleccionado"}
        ctaText={cfg?.favorites_cta_text || "Ver Todas las Ofertas"}
        ctaLink={cfg?.favorites_cta_link || "/ofertas"}
      />
      <Testimonials testimonials={testimonials} stats={stats} />
      <WhyBarefoot
        cards={whyBarefootCards}
        features={whyBarefootFeatures}
        badge={cfg?.why_badge || "¿Por qué Barefoot?"}
        title={cfg?.why_title || "Calzado que respeta el movimiento natural"}
        description={cfg?.why_description || "El calzado barefoot está diseñado para imitar la sensación de caminar descalzo, ofreciendo la protección necesaria mientras permite que el pie funcione de forma natural."}
        image={cfg?.why_image || "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=621&h=400&fit=crop"}
        ctaTitle={cfg?.why_cta_title || "¿Tienes dudas sobre el calzado barefoot?"}
        ctaDescription={cfg?.why_cta_description || "Nuestro equipo está aquí para ayudarte a encontrar el calzado perfecto para tus hijos."}
        ctaText={cfg?.why_cta_text || "Hablar con un Experto"}
        ctaLink={cfg?.why_cta_link || "/contacto"}
      />
      <Newsletter
        title={cfg?.newsletter_title || "Únete a la familia barefoot"}
        description={cfg?.newsletter_description || "Recibe consejos, guías y ofertas exclusivas sobre calzado barefoot"}
      />
    </>
  );
}
