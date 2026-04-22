#!/usr/bin/env bash
# Ajusta dominio a localhost:8080 y limpia caché (tras import-mysql-dump).
set -euo pipefail
REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SQL="$REPO_ROOT/scripts/sql/post-import-localhost-8080.sql"
MYSQL_C=chetto-mysql
PS_C=chetto-prestashop
DB=prestashop
USER_=root
PASS=admin

docker cp "$SQL" "${MYSQL_C}:/tmp/post-import-localhost.sql"
docker exec "$MYSQL_C" sh -c "mysql -u$USER_ -p$PASS $DB < /tmp/post-import-localhost.sql"
docker exec "$MYSQL_C" rm -f /tmp/post-import-localhost.sql

docker exec "$PS_C" sh -c "rm -rf /var/www/html/var/cache/prod /var/www/html/var/cache/dev 2>/dev/null; true"
docker exec "$PS_C" chown -R www-data:www-data /var/www/html/var
docker exec "$PS_C" chmod -R 775 /var/www/html/var

echo "Listo: http://localhost:8080"
