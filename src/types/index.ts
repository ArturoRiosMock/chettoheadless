export interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  discount?: string;
  image: string;
  colors?: number;
  badge?: string;
  category: string;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  image: string;
  slug: string;
}

export interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  text: string;
  initial: string;
}

export interface HeroSlide {
  id: number;
  badge: string;
  subtitle: string;
  title: string;
  description: string;
  cta: string;
  ctaLink: string;
  image: string;
}

export interface Benefit {
  id: number;
  icon: string;
  title: string;
  description: string;
}

export interface BarefootFeature {
  id: number;
  icon: string;
  title: string;
  shortDescription: string;
  longDescription?: string;
}

export interface WhyBarefootCard {
  id: number;
  icon: string;
  title: string;
  description: string;
}

export interface Collection {
  id: number;
  name: string;
  description: string;
  image: string;
  slug: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

export interface ContentBlock {
  id: number;
  title: string;
  description: string;
  icon?: string;
  extra_text?: string;
}

export interface HomepageConfig {
  newsletter_title: string;
  newsletter_description: string;
  stats: { value: string; label: string }[];
  featured_title: string;
  featured_subtitle: string;
  featured_cta_text: string;
  featured_cta_link: string;
  favorites_title: string;
  favorites_subtitle: string;
  favorites_cta_text: string;
  favorites_cta_link: string;
  barefoot_badge: string;
  barefoot_title: string;
  barefoot_title_highlight: string;
  barefoot_description: string;
  barefoot_image: string;
  barefoot_labels: string[];
  barefoot_trad_badge: string;
  barefoot_trad_title: string;
  barefoot_bf_badge: string;
  barefoot_bf_title: string;
  why_badge: string;
  why_title: string;
  why_title_highlight: string;
  why_description: string;
  why_image: string;
  why_cta_title: string;
  why_cta_description: string;
  why_cta_text: string;
  why_cta_link: string;
  announce_phone: string;
  announce_email: string;
  announce_about_text: string;
  announce_about_url: string;
  announce_stores_text: string;
  announce_stores_url: string;
  testimonials_title: string;
  testimonials_subtitle: string;
  faq_cta_title: string;
  faq_cta_desc: string;
  faq_cta_button: string;
  bf_hero_title1: string;
  bf_hero_title2: string;
  bf_hero_desc: string;
  bf_hero_image: string;
  bf_hero_stat: string;
  bf_hero_stat_label: string;
  bf_benefits_title: string;
  bf_benefits_subtitle: string;
  bf_comp_title: string;
  bf_comp_subtitle: string;
  bf_essentials_title: string;
  bf_essentials_subtitle: string;
  bf_stages_title: string;
  bf_stages_subtitle: string;
  bf_faq_title: string;
  bf_faq_subtitle: string;
  bf_cta_title: string;
  bf_cta_desc: string;
  pdp_shipping_1: string;
  pdp_shipping_2: string;
  pdp_shipping_3: string;
  pdp_shipping_4: string;
  pdp_shipping_5: string;
  pdp_pack_title: string;
  pdp_pack_desc: string;
  pdp_related_title: string;
  pdp_related_subtitle: string;
  collection_page_title: string;
  collection_page_subtitle: string;
  collection_cta_title: string;
  collection_cta_description: string;
  collection_cta_text: string;
  collection_cta_link: string;
  footer_description: string;
  footer_phone: string;
  footer_email: string;
  footer_location: string;
}

export interface HomepageContent {
  slides: HeroSlide[];
  benefits: Benefit[];
  categories: Category[];
  testimonials: Testimonial[];
  barefoot_features: ContentBlock[];
  why_barefoot: ContentBlock[];
  limitations: ContentBlock[];
  barefoot_benefits: ContentBlock[];
  why_barefoot_features: ContentBlock[];
  collections: Collection[];
  featured_products: Product[];
  favorites_products: Product[];
  config: HomepageConfig;
}
