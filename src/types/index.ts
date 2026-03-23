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
