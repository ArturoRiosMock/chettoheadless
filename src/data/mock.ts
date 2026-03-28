import type {
  Product,
  Category,
  Testimonial,
  HeroSlide,
  Benefit,
  BarefootFeature,
  WhyBarefootCard,
  NavItem,
  FooterColumn,
} from "@/types";

export const NAV_ITEMS: NavItem[] = [
  { label: "Novedades", href: "/colecciones/novedades" },
  { label: "Botas/Botines", href: "/colecciones/botas" },
  { label: "Sneakers", href: "/colecciones/sneakers" },
  { label: "Sandalias", href: "/colecciones/sandalias" },
  { label: "Casual / Classic", href: "/colecciones/casual" },
  { label: "¿Porqué Barefoot?", href: "/porque-barefoot" },
  { label: "Ofertas", href: "/ofertas" },
];

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    badge: "Ofertas Especiales",
    subtitle: "Camina sin límites",
    title: "Hasta 30% de descuento",
    description: "Calzado barefoot de calidad a precios únicos",
    cta: "Ver Ofertas",
    ctaLink: "/ofertas",
    image: "/images/hero-home.png",
  },
  {
    id: 2,
    badge: "Nueva Colección",
    subtitle: "Primavera 2026",
    title: "Sneakers para toda la familia",
    description: "Descubre los nuevos modelos de temporada",
    cta: "Explorar",
    ctaLink: "/colecciones/sneakers",
    image: "/images/hero-slide-2.png",
  },
];

export const BENEFITS: Benefit[] = [
  {
    id: 1,
    icon: "Truck",
    title: "Envío Gratis",
    description: "En pedidos +50€",
  },
  {
    id: 2,
    icon: "RotateCcw",
    title: "Devoluciones",
    description: "30 días garantía",
  },
  {
    id: 3,
    icon: "ShieldCheck",
    title: "Pago Seguro",
    description: "100% protegido",
  },
  {
    id: 4,
    icon: "CreditCard",
    title: "Pago Fácil",
    description: "Múltiples métodos",
  },
];

export const CATEGORIES: Category[] = [
  {
    id: 1,
    name: "Sneakers",
    description: "Versatilidad diaria",
    image: "/images/cat-sneakers.png",
    slug: "sneakers",
  },
  {
    id: 2,
    name: "Sandalias",
    description: "Para el verano",
    image: "/images/cat-sandalias.png",
    slug: "sandalias",
  },
  {
    id: 3,
    name: "Casual",
    description: "Estilo clásico",
    image: "/images/cat-casual.png",
    slug: "casual",
  },
];

export const FEATURED_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Sneaker Kaki Kids",
    slug: "sneaker-kaki-kids",
    price: 54.95,
    image: "/images/products/sneaker-kaki-kids.png",
    colors: 4,
    badge: "Nuevo",
    category: "sneakers",
  },
  {
    id: 2,
    name: "Sneaker Maroon",
    slug: "sneaker-maroon",
    price: 54.95,
    image: "/images/products/sneaker-maroon.png",
    colors: 3,
    category: "sneakers",
  },
  {
    id: 3,
    name: "Sneaker Grey",
    slug: "sneaker-grey",
    price: 54.95,
    image: "",
    colors: 2,
    category: "sneakers",
  },
  {
    id: 4,
    name: "Sneaker Light Pink",
    slug: "sneaker-light-pink",
    price: 54.95,
    image: "/images/products/sneaker-light-pink.png",
    colors: 3,
    badge: "Nuevo",
    category: "sneakers",
  },
];

export const FAVORITE_PRODUCTS: Product[] = [
  {
    id: 10,
    name: "Botín Explorador",
    slug: "botin-explorador",
    price: 52.99,
    originalPrice: 69.99,
    discount: "-25%",
    image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=280&h=373&fit=crop",
    category: "botas",
  },
  {
    id: 11,
    name: "Sandalia Verano",
    slug: "sandalia-verano",
    price: 39.99,
    originalPrice: 54.99,
    discount: "-27%",
    image: "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=280&h=373&fit=crop",
    category: "sandalias",
  },
  {
    id: 12,
    name: "Casual Clásico",
    slug: "casual-clasico",
    price: 44.99,
    originalPrice: 59.99,
    discount: "-25%",
    image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=280&h=373&fit=crop",
    category: "casual",
  },
  {
    id: 13,
    name: "Sneaker Premium",
    slug: "sneaker-premium",
    price: 49.99,
    originalPrice: 64.99,
    discount: "-23%",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=280&h=373&fit=crop",
    category: "sneakers",
  },
  {
    id: 14,
    name: "Botín Aventura",
    slug: "botin-aventura",
    price: 54.99,
    originalPrice: 74.99,
    discount: "-27%",
    image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=280&h=373&fit=crop",
    category: "botas",
  },
  {
    id: 15,
    name: "Sandalia Minimalista",
    slug: "sandalia-minimalista",
    price: 36.99,
    originalPrice: 49.99,
    discount: "-26%",
    image: "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=280&h=373&fit=crop",
    category: "sandalias",
  },
];

export const BAREFOOT_FEATURES: BarefootFeature[] = [
  {
    id: 1,
    icon: "Waves",
    title: "Suela Flexible",
    shortDescription: "Dobla en todas las direcciones",
    longDescription:
      "La suela flexible permite que el pie se mueva de forma natural, fortaleciendo la musculatura y mejorando el equilibrio.",
  },
  {
    id: 2,
    icon: "ArrowDownToLine",
    title: "Drop Cero",
    shortDescription: "Sin elevación del talón",
    longDescription:
      "La misma altura en talón y puntera favorece una postura natural y alineación correcta de la columna vertebral.",
  },
  {
    id: 3,
    icon: "Maximize",
    title: "Horma Amplia",
    shortDescription: "Espacio para los dedos",
    longDescription:
      "Una puntera amplia permite que los dedos se extiendan de forma natural, mejorando la estabilidad y el agarre.",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "María González",
    location: "Madrid",
    rating: 5,
    text: '"Los mejores zapatos para mi hijo. Desde que usa barefoot, ha mejorado su postura y ya no se queja de dolor de pies."',
    initial: "M",
  },
  {
    id: 2,
    name: "Carlos Ruiz",
    location: "Barcelona",
    rating: 5,
    text: '"Calidad excepcional y atención al cliente increíble. La diferencia con el calzado tradicional es notable."',
    initial: "C",
  },
  {
    id: 3,
    name: "Ana Martínez",
    location: "Valencia",
    rating: 5,
    text: '"Mi hija está encantada con sus nuevas zapatillas. Son cómodas, bonitas y sé que están cuidando sus pies."',
    initial: "A",
  },
  {
    id: 4,
    name: "David López",
    location: "Sevilla",
    rating: 5,
    text: '"Compra recomendada al 100%. El equipo me ayudó a elegir la talla perfecta y el envío fue rapidísimo."',
    initial: "D",
  },
];

export const WHY_BAREFOOT_CARDS: WhyBarefootCard[] = [
  {
    id: 1,
    icon: "Sprout",
    title: "Desarrollo Natural",
    description:
      "Permite que los pies de tu hijo se desarrollen de forma natural, sin restricciones artificiales.",
  },
  {
    id: 2,
    icon: "Heart",
    title: "Salud y Bienestar",
    description:
      "Mejora la postura, el equilibrio y fortalece la musculatura del pie desde pequeños.",
  },
  {
    id: 3,
    icon: "Footprints",
    title: "Conexión Natural",
    description:
      "Sensibilidad al terreno que favorece el desarrollo sensorial y la propiocepción.",
  },
  {
    id: 4,
    icon: "Shield",
    title: "Protección Respetuosa",
    description:
      "Protección necesaria sin comprometer la libertad de movimiento natural del pie.",
  },
];

export const LIMITATIONS = [
  "Suela rígida que limita el movimiento natural",
  "Elevación del talón que afecta la postura",
  "Puntera estrecha que comprime los dedos",
  "Debilita la musculatura del pie",
];

export const BAREFOOT_BENEFITS = [
  "Suela flexible que respeta el movimiento natural",
  "Drop cero para una postura alineada",
  "Horma amplia que permite libertad de movimiento",
  "Fortalece la musculatura del pie",
  "Sin contrafuertes para un desarrollo más natural",
];

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Compra",
    links: [
      { label: "Novedades", href: "/colecciones/novedades" },
      { label: "Botas", href: "/colecciones/botas" },
      { label: "Sneakers", href: "/colecciones/sneakers" },
      { label: "Sandalias", href: "/colecciones/sandalias" },
      { label: "Casual / Classic", href: "/colecciones/casual" },
      { label: "Ofertas", href: "/ofertas" },
    ],
  },
  {
    title: "Información",
    links: [
      { label: "¿Qué es barefoot?", href: "/porque-barefoot" },
      { label: "Guía de tallas", href: "/guia-tallas" },
      { label: "Materiales", href: "/materiales" },
      { label: "Cuidado del calzado", href: "/cuidado" },
      { label: "Política de cambios", href: "/politica-cambios" },
      { label: "Envíos y devoluciones", href: "/envios" },
    ],
  },
  {
    title: "Ayuda",
    links: [
      { label: "Contacto", href: "/contacto" },
      { label: "Tiendas", href: "/tiendas" },
      { label: "FAQ", href: "/faq" },
      { label: "Mi cuenta", href: "/cuenta" },
      { label: "Estado del pedido", href: "/pedidos" },
      { label: "Atención al cliente", href: "/atencion" },
    ],
  },
];

export const STATS = [
  { value: "4.8/5", label: "+2.500 reseñas" },
  { value: "98%", label: "Clientes satisfechos" },
  { value: "5.000+", label: "Familias felices" },
];
