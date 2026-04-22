#!/usr/bin/env bash
# Importa un .sql o .sql.bz2 en chetto-mysql (recrea la BD prestashop).
# Uso: ./scripts/import-mysql-dump.sh /ruta/al/dump.sql[.bz2] [--up-all]
set -euo pipefail

COMPOSE_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DUMP="${1:-}"
UP_ALL=false
if [[ "${2:-}" == "--up-all" ]]; then UP_ALL=true; fi

if [[ -z "$DUMP" || ! -f "$DUMP" ]]; then
  echo "Uso: $0 <dump.sql|dump.sql.bz2> [--up-all]" >&2
  exit 1
fi

MYSQL_C=chetto-mysql
DB=prestashop
USER_=root
PASS=admin

SQL_WORK="$DUMP"
if [[ "$DUMP" == *.bz2 ]]; then
  if ! command -v bunzip2 >/dev/null 2>&1; then
    echo "Instala bunzip2 o descomprime el .bz2 a .sql manualmente." >&2
    exit 1
  fi
  SQL_WORK="${DUMP%.bz2}"
  if [[ ! -f "$SQL_WORK" ]]; then
    bunzip2 -k "$DUMP"
  fi
fi

cd "$COMPOSE_ROOT"
docker compose up -d mysql

echo "Esperando a MySQL..."
for _ in $(seq 1 90); do
  if docker exec "$MYSQL_C" mysqladmin ping -h localhost -u"$USER_" -p"$PASS" 2>/dev/null | grep -q alive; then
    break
  fi
  sleep 2
done

docker cp "$SQL_WORK" "${MYSQL_C}:/tmp/dump_import.sql"
docker exec "$MYSQL_C" mysql -u"$USER_" -p"$PASS" -e "DROP DATABASE IF EXISTS \`$DB\`; CREATE DATABASE \`$DB\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

echo "Importando..."
docker exec "$MYSQL_C" sh -c "mysql -u$USER_ -p$PASS $DB < /tmp/dump_import.sql"
docker exec "$MYSQL_C" rm -f /tmp/dump_import.sql

echo "Importación terminada."

if $UP_ALL; then
  docker compose up -d
  echo "Siguiente: ./scripts/post-import-localhost.sh y copiar img/ desde producción."
fi
