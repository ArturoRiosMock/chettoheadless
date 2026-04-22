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

### Importar un dump SQL (MySQL, archivos grandes)

No uses phpMyAdmin para dumps pesados. En **Windows**, desde la raíz del repo:

```powershell
docker compose stop prestashop phpmyadmin
npm run db:import -- -DumpPath "$env:USERPROFILE\Downloads\tu_backup.sql" -UpAll
npm run db:post-import
```

Guía detallada: [scripts/IMPORT-DUMP.md](scripts/IMPORT-DUMP.md).

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
docker exec chetto-prestashop php /var/www/html/scripts/migrate-chetto-cms-v2.php
docker exec chetto-prestashop php /var/www/html/scripts/register-cms-extended-tabs.php
```

Si el módulo ya estaba instalado antes de añadir las tablas nuevas, el script `migrate-chetto-cms-v2.php` crea las tablas de menú, footer, FAQ, bloques de página, tiendas y overlay PDP. Vuelve a ejecutar `seed-all-cms.php` para datos iniciales en esas tablas (solo rellena si están vacías).

Limpia caché después:

```bash
docker exec chetto-prestashop bash -c "rm -rf /var/www/html/var/cache/* && chown -R www-data:www-data /var/www/html/var"
```

### 4. Variables de entorno

Crea `.env.local` en la raíz:

```env
NEXT_PUBLIC_PRESTASHOP_URL=http://localhost:8090
PRESTASHOP_API_KEY=cualquier-valor
NEXT_PUBLIC_PRESTASHOP_LANG_ID=1
```

`PRESTASHOP_API_KEY` debe ser la clave del **webservice** de PrestaShop (necesaria para cargar productos reales en `/producto/[slug]`). `NEXT_PUBLIC_PRESTASHOP_LANG_ID` es el `id_lang` del idioma del enlace amigable (`link_rewrite`).

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
| PrestaShop (tienda) | http://localhost:8090 |
| PrestaShop Admin | http://localhost:8090/admin-chetto/ |
| API CMS (JSON) | http://localhost:8090/index.php?fc=module&module=chettoheadless&controller=api |
| phpMyAdmin | http://localhost:8081 |

Para revisar en local el avance de un import o migración de catálogo (conteos, ficheros de estado, comandos): [scripts/LOCAL-PROGRESO.md](scripts/LOCAL-PROGRESO.md).

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
- **CMS: Producto** → Secciones editables del PDP, **Overlays PDP** (HTML extra por `id` de producto PrestaShop)
- **CMS: Por qué Barefoot** → Secciones de la página
- **CMS: Colecciones** → Página y tarjetas de colecciones
- **CMS: Global** → Footer/Newsletter (incl. logo cabecera, logo footer, placeholder buscador), **Menú principal**, **Enlaces footer**, Bloques de contenido, **Página FAQ** (CRUD + CTA), **Bloques páginas info**, **Tiendas**, Páginas Info, Páginas Extra

### Qué edita cada pantalla (resumen)

| Contenido en el storefront | Dónde editarlo en PrestaShop |
|----------------------------|------------------------------|
| Menú superior horizontal | CMS: Global → Menú principal |
| Columnas de enlaces del footer | CMS: Global → Enlaces footer |
| Logo header, logo footer, texto del buscador | CMS: Global → Footer y Newsletter |
| Preguntas FAQ | CMS: Global → Página FAQ |
| Bloques Materiales / Envíos / Cuidado / Sobre nosotros | CMS: Global → Bloques páginas info (`page_key`) |
| Listado de tiendas | CMS: Global → Tiendas |
| Texto marketing extra en una ficha de producto | CMS: Producto → Overlays PDP (`id` producto PS) |
| JSON principal del home (slides, config, etc.) | API `controller=api` (según secciones del módulo) |

### PDP y catálogo

La ficha `/producto/[slug]` usa el **webservice** de PrestaShop (`link_rewrite` = `slug` de la URL). Los textos genéricos del PDP (envíos, pack, relacionados) siguen en **CMS: Producto → Secciones editables**. Duplicar todo el catálogo solo en tablas del módulo no está recomendado: mantén precio, stock y variantes en el producto nativo de PrestaShop.

---

## Stack

- **Frontend:** Next.js 16, TypeScript, Tailwind CSS 4, Swiper
- **Backend:** PrestaShop 9, módulo custom `chettoheadless`
- **Infra:** Docker Compose (MySQL 5.7, PrestaShop, phpMyAdmin)
- **Deploy:** Vercel (frontend), Webempresa (PrestaShop futuro)
