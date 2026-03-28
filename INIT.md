# Chetto Headless — Guía de Inicio Rápido

## Requisitos previos

- **Node.js** >= 18
- **Docker Desktop** (con WSL2 habilitado en Windows)
- **Git**

## Arquitectura

```
Frontend (Next.js 16)  ←→  API JSON  ←→  PrestaShop 9 (Docker)
localhost:3000              :8080/index.php?fc=module&module=chettoheadless&controller=api
```

| Servicio       | URL                              | Credenciales                     |
|----------------|----------------------------------|----------------------------------|
| Next.js        | http://localhost:3000             | —                                |
| PrestaShop     | http://localhost:8080             | —                                |
| Admin PS       | http://localhost:8080/admin-chetto | admin@chetto.es / Chetto2026!   |
| phpMyAdmin     | http://localhost:8081             | root / admin                     |

## Paso 1 — Levantar Docker (PrestaShop + MySQL + phpMyAdmin)

```bash
docker compose up -d
```

Esperar ~2 minutos a que PrestaShop termine la auto-instalación. Verificar:

```bash
docker logs chetto-prestashop --tail 5
```

Cuando veas `apache2 -D FOREGROUND`, está listo.

## Paso 2 — Permisos de PrestaShop

```bash
docker exec chetto-prestashop chown -R www-data:www-data /var/www/html/var
docker exec chetto-prestashop chmod -R 775 /var/www/html/var
```

## Paso 3 — Instalar el módulo Chetto CMS

Ir a http://localhost:8080/admin-chetto → Módulos → Module Manager → buscar "Chetto" → Instalar.

Si el módulo ya está instalado (persistido en volumen Docker), este paso se omite.

## Paso 4 — Habilitar Webservice API (si es primera vez)

```bash
docker exec chetto-prestashop php /var/www/html/scripts/enable-webservice.php
```

Anota la API key generada y ponla en `.env.local`.

## Paso 5 — Seed de datos (si la BD está vacía)

```bash
docker exec chetto-prestashop php /var/www/html/scripts/seed-cms-data.php
docker exec chetto-prestashop php /var/www/html/scripts/seed-products-and-config.php
docker exec chetto-prestashop php /var/www/html/scripts/seed-layout-config.php
```

## Paso 6 — Configurar variables de entorno

Crear `.env.local` en la raíz del proyecto:

```env
NEXT_PUBLIC_PRESTASHOP_URL=http://localhost:8080
PRESTASHOP_API_KEY=TU_API_KEY_AQUI
```

## Paso 7 — Instalar dependencias e iniciar frontend

```bash
npm install
npm run dev
```

Abrir http://localhost:3000.

---

## Estructura del proyecto

```
chettoheadless/
├── src/                          # Frontend Next.js
│   ├── app/                      # Pages (App Router)
│   │   ├── page.tsx              # Homepage (consume API del CMS)
│   │   └── test-api/page.tsx     # Página de prueba de conexión
│   ├── components/
│   │   ├── layout/               # Header, Footer, Navigation, AnnouncementBar
│   │   ├── sections/             # HeroSlider, FeaturedProducts, BarefootEducation, etc.
│   │   └── ui/                   # Button, Badge, ProductCard, CmsImage, etc.
│   ├── data/mock.ts              # Datos mock (fallback si la API falla)
│   ├── lib/prestashop.ts         # Cliente API PrestaShop + CMS
│   └── types/index.ts            # Interfaces TypeScript
├── modules/chettoheadless/       # Módulo PrestaShop (montado via Docker volume)
│   ├── chettoheadless.php        # Módulo principal + Config general
│   ├── classes/                  # ObjectModels (Slide, Benefit, Category, Product, etc.)
│   ├── controllers/
│   │   ├── admin/                # Admin CRUD controllers (Slides, Benefits, etc.)
│   │   └── front/api.php         # API JSON endpoint
│   ├── sql/                      # install.sql / uninstall.sql
│   └── views/img/                # Imágenes subidas desde el backoffice
├── scripts/                      # PHP scripts de utilidad
│   ├── enable-webservice.php
│   ├── seed-cms-data.php
│   ├── seed-products-and-config.php
│   └── setup-products.php
├── public/images/                # Imágenes estáticas del frontend
├── docker-compose.yml            # Docker: PrestaShop + MySQL + phpMyAdmin
└── .env.local                    # Variables de entorno (NO commitear)
```

## Secciones editables desde el Backoffice

| Sección del Home         | Menú en Admin                     | Tipo                  |
|--------------------------|-----------------------------------|-----------------------|
| Hero Slider              | Chetto CMS → Slides del Hero      | CRUD con imágenes     |
| Barra de Beneficios      | Chetto CMS → Beneficios           | CRUD                  |
| Categorías               | Chetto CMS → Categorías Homepage  | CRUD con imágenes     |
| Productos Destacados     | Chetto CMS → Productos Homepage   | CRUD (section=featured) |
| Favoritos de Clientes    | Chetto CMS → Productos Homepage   | CRUD (section=favorites)|
| Barefoot Education       | Chetto CMS → Bloques de Contenido | Tipos: barefoot_feature, limitation, barefoot_benefit |
| Testimonios              | Chetto CMS → Testimonios          | CRUD                  |
| ¿Por qué Barefoot?      | Chetto CMS → Bloques de Contenido | Tipos: why_barefoot, why_barefoot_feature |
| Newsletter               | Módulo → Configurar               | Configuration keys    |
| Estadísticas             | Módulo → Configurar               | Configuration keys    |
| Títulos de secciones     | Módulo → Configurar               | Configuration keys    |
| Imágenes de secciones    | Módulo → Configurar               | File upload           |
| Barra de anuncio (top)   | Módulo → Configurar               | Configuration keys    |
| Testimonios (título)     | Módulo → Configurar               | Configuration keys    |

## Notas técnicas

- **Imágenes localhost**: El componente `CmsImage` usa `<img>` estándar para URLs de localhost (Next.js Image Optimization rechaza IPs privadas). En producción con dominio real, usa `next/image` optimizado.
- **Cache**: `getHomepageContent()` usa `cache: "no-store"` para desarrollo (cambios inmediatos). En producción, cambiar a `next: { revalidate: 60 }`. El layout usa `getSiteConfig()` con revalidate de 5 min.
- **PrestaShop 9**: No soporta `$this->l()` en `ModuleAdminController`. Los strings van directos.
- **Front controller**: El archivo debe llamarse `api.php` (minúsculas), no `ApiController.php`.
- **Colores Figma**: Los tokens de color en `globals.css` coinciden con el diseño Figma (neutrales cálidos: `#2d2d2d`, `#6b6b6b`, `#f7f6f4`, `#e8e6e3`).
- **Newsletter**: En Figma, el newsletter es parte del footer, no una sección independiente. Se eliminó la sección `Newsletter` de `page.tsx` y el footer usa los datos CMS (`newsletter_title`/`newsletter_description`).

## Troubleshooting

| Problema | Solución |
|----------|----------|
| Error 500 en admin PS | `docker exec chetto-prestashop chown -R www-data:www-data /var/www/html/var` |
| Imagen no carga en frontend | Verificar que `next.config.ts` tiene `http://localhost` en `remotePatterns` y reiniciar `npm run dev` |
| Datos no actualizan | `getHomepageContent()` debe tener `cache: "no-store"` en desarrollo |
| Módulo no aparece | Reinstalar: Admin → Módulos → buscar "Chetto" → Instalar |
