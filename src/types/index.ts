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
  barefoot_description: string;
  barefoot_image: string;
  barefoot_labels: string[];
  barefoot_trad_badge: string;
  barefoot_trad_title: string;
  barefoot_bf_badge: string;
  barefoot_bf_title: string;
  why_badge: string;
  why_title: string;
  why_description: string;
  why_image: string;
  why_cta_title: string;
  why_cta_description: string;
  why_cta_text: string;
  why_cta_link: string;
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
  featured_products: Product[];
  favorites_products: Product[];
  config: HomepageConfig;
}
