# Chetto Headless — Guía de Inicio Rápido

## Requisitos previos

- **Node.js** >= 18
- **Docker Desktop** (con WSL2 habilitado en Windows)
- **Git**

## Arquitectura

```
Frontend (Next.js 16)  ←→  API JSON  ←→  PrestaShop 9 (Docker)
localhost:3000              :8090/index.php?fc=module&module=chettoheadless&controller=api
```

(El puerto del front PS coincide con `docker-compose.yml`, hoy **8090**. Para revisar conteos, logs de migración y URLs mientras avanza un import: [scripts/LOCAL-PROGRESO.md](scripts/LOCAL-PROGRESO.md).)

| Servicio       | URL                              | Credenciales                     |
|----------------|----------------------------------|----------------------------------|
| Next.js        | http://localhost:3000             | —                                |
| PrestaShop     | http://localhost:8090             | —                                |
| Admin PS       | http://localhost:8090/admin-chetto | Ver nota abajo (instalación limpia vs dump) |
| phpMyAdmin     | http://localhost:8081             | root / admin                     |

Tras **restaurar un dump de producción**, el back office usa las **cuentas y contraseñas del dump**, no necesariamente `admin@chetto.es` / `Chetto2026!` (esas son de la auto-instalación Docker en BD vacía).

## Restaurar desde dump SQL de producción (`.sql` / `.sql.bz2`)

PrestaShop en Docker va fijado a **9.0.3** en `docker-compose.yml` para coincidir con un dump de esa versión.

**Exportación completa:** el `.sql` debe incluir **todas** las tablas de la base (cientos de `CREATE TABLE`, y entre ellas `ps_configuration` y `ps_shop_url`). Si solo exportas un subconjunto (p. ej. 60 tablas), PrestaShop dará error 500 y el back office no abrirá. En phpMyAdmin: Exportar la base con método rápido o “Personalizado” con **todas** las tablas seleccionadas. Para dumps grandes, usa `.\scripts\import-mysql-dump.ps1` en lugar del importador web.

1. **No subas el dump al repo** (déjalo en Descargas u otra carpeta fuera de Git).
2. Cierra el stack si hace falta: `docker compose down` (si quieres BD nueva: `docker compose down -v` — borra también datos del volumen MySQL).
3. Importa (solo MySQL primero; luego levanta todo con `-UpAll`). También puedes usar `npm run db:import -- -DumpPath "...\tu_backup.sql.bz2" -UpAll` (Windows); ver [scripts/IMPORT-DUMP.md](scripts/IMPORT-DUMP.md).

```powershell
.\scripts\import-mysql-dump.ps1 -DumpPath "$env:USERPROFILE\Downloads\tu_backup.sql.bz2" -UpAll
```

En Linux/macOS:

```bash
chmod +x scripts/import-mysql-dump.sh scripts/post-import-localhost.sh
./scripts/import-mysql-dump.sh /ruta/al/backup.sql.bz2 --up-all
```

4. Ajusta dominio y caché para `http://localhost:8090`:

```powershell
.\scripts\post-import-localhost.ps1
```

```bash
./scripts/post-import-localhost.sh
```

El SQL aplicado está en [`scripts/sql/post-import-localhost-8080.sql`](scripts/sql/post-import-localhost-8080.sql) (si tu prefijo de tablas no es `ps_`, edítalo).

5. **Imágenes del catálogo**: el dump no incluye ficheros. Copia desde producción la carpeta **`img/`** al contenedor (ejemplo con una copia local previa en `.\\prod-img\\`):

```powershell
docker cp -- .\\prod-img\\. chetto-prestashop:/var/www/html/img/
docker exec chetto-prestashop chown -R www-data:www-data /var/www/html/img
```

(Sustituye la ruta origen por donde tengas el `img` descargado por FTP/rsync.)

6. **Next.js**: copia [`/.env.example`](.env.example) a `.env.local` y pon `PRESTASHOP_API_KEY` con la clave del webservice que traiga el dump (Back Office → Webservice) o la que generes allí.

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

Ir a http://localhost:8090/admin-chetto → Módulos → Module Manager → buscar "Chetto" → Instalar.

Si el módulo ya está instalado (persistido en volumen Docker), este paso se omite.

## Paso 4 — Habilitar Webservice API (si es primera vez)

```bash
docker exec chetto-prestashop php /var/www/html/scripts/enable-webservice.php
```

Anota la API key generada y ponla en `.env.local`.

## Paso 5 — Seed de datos (si la BD está vacía)

Omitir si **restauraste un dump de producción** (el catálogo y la config ya vienen en el SQL).

```bash
docker exec chetto-prestashop php /var/www/html/scripts/seed-cms-data.php
docker exec chetto-prestashop php /var/www/html/scripts/seed-products-and-config.php
docker exec chetto-prestashop php /var/www/html/scripts/seed-layout-config.php
```

## Paso 6 — Configurar variables de entorno

Crear `.env.local` en la raíz del proyecto:

```env
NEXT_PUBLIC_PRESTASHOP_URL=http://localhost:8090
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
├── scripts/                      # PHP + importación BD
│   ├── enable-webservice.php
│   ├── import-mysql-dump.ps1 / import-mysql-dump.sh
│   ├── post-import-localhost.ps1 / post-import-localhost.sh
│   ├── sql/post-import-localhost-8080.sql
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
| Menú principal           | CMS: Global → Menú principal      | Tabla `chetto_nav_item` |
| Enlaces footer (3 cols)  | CMS: Global → Enlaces footer      | Tabla `chetto_footer_link` |
| Logo header/footer, buscador | CMS: Global → Footer y Newsletter | Config + subida a `views/img/header/` |
| FAQ                      | CMS: Global → Página FAQ          | CRUD + CTA en el mismo menú |
| Bloques páginas info     | CMS: Global → Bloques páginas info | `page_key`: materiales, envios, cuidado, sobre_nosotros |
| Tiendas                  | CMS: Global → Tiendas             | Tabla `chetto_store` |
| Overlay PDP              | CMS: Producto → Overlays PDP      | Por `id_product` PrestaShop |

Instalaciones antiguas: ejecutar `scripts/migrate-chetto-cms-v2.php` y registrar pestañas nuevas (o reinstalar el módulo). Ver también README → «Menú CMS» y «Qué edita cada pantalla».

## Notas técnicas

- **Imágenes localhost**: El componente `CmsImage` usa `<img>` estándar para URLs de localhost (Next.js Image Optimization rechaza IPs privadas). En producción con dominio real, usa `next/image` optimizado.
- **Cache**: `getHomepageContent()` usa `cache: "no-store"` para el home (cambios inmediatos en desarrollo). `getCachedHomepageContent()` y `getSiteConfig()` usan `revalidate: 300` (5 min) para FAQ, páginas info, tiendas y layout global.
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
| Tras importar dump, PS reinstala y pisa la BD | Levantar solo `mysql`, importar, luego el stack; si el contenedor sigue instalando solo, poner temporalmente `PS_INSTALL_AUTO: 0` en `docker-compose.yml` y volver a crear el contenedor |
| Redirección a dominio de producción | Ejecutar `post-import-localhost.ps1` / `.sh` (SQL de dominio + limpiar caché) |
