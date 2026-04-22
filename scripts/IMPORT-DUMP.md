# Importar un dump SQL en MySQL (Docker) — opción recomendada

Evita phpMyAdmin para archivos **grandes**: el importador web suele fallar en la barra de progreso o por límites de tiempo/tamaño. Este flujo usa el cliente `mysql` **dentro del contenedor** (misma lógica que [import-mysql-dump.ps1](import-mysql-dump.ps1)).

## Requisitos

- Docker Desktop con el stack del repo levantado al menos una vez (`docker compose up -d`).
- Ruta absoluta o relativa al fichero `.sql`, `.sql.bz2` o `.sql.gz`.

## Windows (PowerShell)

Desde la **raíz del repositorio**:

1. (Opcional) Para que no haya escrituras en la BD mientras importas:

   ```powershell
   docker compose stop prestashop phpmyadmin
   ```

2. Importar y levantar PrestaShop + phpMyAdmin:

   ```powershell
   npm run db:import -- -DumpPath "$env:USERPROFILE\Downloads\tu_backup.sql" -UpAll
   ```

   Equivale a:

   ```powershell
   .\scripts\import-mysql-dump.ps1 -DumpPath "$env:USERPROFILE\Downloads\tu_backup.sql" -UpAll
   ```

3. Ajustar dominio a `http://localhost:8080` y limpiar caché de `var/`:

   ```powershell
   npm run db:post-import
   ```

El script **valida** que el SQL parezca un PrestaShop **completo** (tablas core como `ps_configuration`). Si tu dump es parcial, fallará a propósito; solo en casos excepcionales: `-SkipValidation`.

## macOS / Linux

Usa el script shell (no los comandos `npm` anteriores, que dependen de PowerShell):

```bash
chmod +x scripts/import-mysql-dump.sh scripts/post-import-localhost.sh
docker compose stop prestashop phpmyadmin
./scripts/import-mysql-dump.sh /ruta/al/backup.sql --up-all
./scripts/post-import-localhost.sh
```

## Después del import

- Copiar **`img/`** desde producción si necesitas imágenes del catálogo (el SQL no incluye ficheros).
- Configurar `.env.local` con `PRESTASHOP_API_KEY` (webservice) según el dump o generar una nueva en el back office.
- La versión del dump debe ser **compatible** con la imagen PrestaShop del `docker-compose` (p. ej. 9.0.3).
