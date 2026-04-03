# Chetto Headless — Tienda Barefoot

Frontend Next.js 16 + PrestaShop 9 headless con módulo CMS editable.

**Demo en Vercel:** https://chettoheadless.vercel.app

---

## Despliegue local (Mac o Windows)

### Requisitos

- Docker Desktop
- Node.js 18+
- Git

### 1. Clonar y arrancar

```bash
git clone https://github.com/ArturoRiosMock/chettoheadless.git
cd chettoheadless
docker compose up -d
```

Espera ~2 min a que PrestaShop termine. Verifica con `docker logs chetto-prestashop --tail 3`.

### 2. Permisos (solo la primera vez)

```bash
docker exec chetto-prestashop chown -R www-data:www-data /var/www/html/var
docker exec chetto-prestashop chmod -R 775 /var/www/html/var
```

### 3. Seed de datos CMS (solo la primera vez)

```bash
docker exec chetto-prestashop php /var/www/html/scripts/seed-all-cms.php
docker exec chetto-prestashop php /var/www/html/scripts/seed-collections.php
docker exec chetto-prestashop php /var/www/html/scripts/register-extra-pages-tab.php
docker exec chetto-prestashop php /var/www/html/scripts/register-info-pages-tab.php
docker exec chetto-prestashop php /var/www/html/scripts/register-faq-tab.php
docker exec chetto-prestashop php /var/www/html/scripts/register-product-tab.php
docker exec chetto-prestashop php /var/www/html/scripts/register-porque-barefoot-tab.php
docker exec chetto-prestashop php /var/www/html/scripts/migrate-menu-structure.php
```

Limpia caché después:

```bash
docker exec chetto-prestashop bash -c "rm -rf /var/www/html/var/cache/* && chown -R www-data:www-data /var/www/html/var"
```

### 4. Variables de entorno

Crea `.env.local` en la raíz:

```env
NEXT_PUBLIC_PRESTASHOP_URL=http://localhost:8080
PRESTASHOP_API_KEY=cualquier-valor
```

### 5. Iniciar frontend

```bash
npm install
npm run dev
```

---

## URLs

| Servicio | URL |
|----------|-----|
| Frontend | http://localhost:3000 |
| PrestaShop Admin | http://localhost:8080/admin-chetto/ |
| API CMS (JSON) | http://localhost:8080/index.php?fc=module&module=chettoheadless&controller=api |
| phpMyAdmin | http://localhost:8081 |

**Admin PrestaShop:** `admin@chetto.es` / `Chetto2026!`

---

## Páginas del frontend (17)

| Ruta | Página |
|------|--------|
| `/` | Home |
| `/colecciones` | Índice de colecciones |
| `/colecciones/[slug]` | Colección individual |
| `/producto/[slug]` | Detalle de producto |
| `/porque-barefoot` | ¿Por qué Barefoot? |
| `/faq` | Preguntas frecuentes |
| `/materiales` | Materiales |
| `/envios-devoluciones` | Envíos y devoluciones |
| `/cuidado-calzado` | Cuidado del calzado |
| `/guia-tallas` | Guía de tallas |
| `/atencion-cliente` | Atención al cliente |
| `/contacto` | Contacto (formulario) |
| `/tiendas` | Mapa de tiendas |
| `/sobre-nosotros` | Sobre nosotros |
| `/mi-cuenta` | Mi cuenta |
| `/estado-pedido` | Estado del pedido |
| `/test-api` | Test de conexión API |

---

## Menú CMS en PrestaShop

En el admin, bajo **Mejorar**:

- **CMS: Home** → Hero Slider, Beneficios, Categorías, Productos, Las 3 Claves, Familias Felices, Por qué Barefoot
- **CMS: Producto** → Secciones editables del PDP
- **CMS: Por qué Barefoot** → Secciones de la página
- **CMS: Colecciones** → Página y tarjetas de colecciones
- **CMS: Global** → Footer/Newsletter, Bloques de contenido, FAQ, Páginas Info, Páginas Extra

---

## Stack

- **Frontend:** Next.js 16, TypeScript, Tailwind CSS 4, Swiper
- **Backend:** PrestaShop 9, módulo custom `chettoheadless`
- **Infra:** Docker Compose (MySQL 5.7, PrestaShop, phpMyAdmin)
- **Deploy:** Vercel (frontend), Webempresa (PrestaShop futuro)
