#!/usr/bin/env bash
# Para cada tabla ps_*_lang, duplicar filas id_lang=1 a id_langs 2..5.
# Se ejecuta idempotente: usa INSERT IGNORE para no pisar filas ya existentes.
# Objetivo: evitar errores de back office al tener nuevos id_langs sin entradas en tablas _lang.
set -euo pipefail
MYSQL="mysql -uroot -padmin prestashop --batch --skip-column-names"

TABLES=$($MYSQL -e "SELECT TABLE_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA='prestashop' AND COLUMN_NAME='id_lang' AND TABLE_NAME LIKE 'ps_%_lang' ORDER BY TABLE_NAME")

for table in $TABLES; do
  # Obtener lista de columnas preservando orden original
  COLS=$($MYSQL -e "SELECT GROUP_CONCAT(COLUMN_NAME ORDER BY ORDINAL_POSITION SEPARATOR ',') FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA='prestashop' AND TABLE_NAME='$table'")
  # Construir SELECT con id_lang sustituido por literal
  SELECT_EXPR=$(echo "$COLS" | awk -v RS=',' -v N='' 'BEGIN{ORS=","} {if($0=="id_lang") print N; else print $0}' | sed 's/,$//')
  for N in 2 3 4 5; do
    SEL_N=$(echo "$COLS" | awk -v RS=',' -v N="$N" 'BEGIN{ORS=","} {if($0=="id_lang") print N; else print $0}' | sed 's/,$//')
    SQL="INSERT IGNORE INTO $table ($COLS) SELECT $SEL_N FROM $table WHERE id_lang=1"
    COUNT_BEFORE=$($MYSQL -e "SELECT COUNT(*) FROM $table WHERE id_lang=$N")
    $MYSQL -e "$SQL" 2>/dev/null || echo "  ! skip $table lang=$N (probably column mismatch)"
    COUNT_AFTER=$($MYSQL -e "SELECT COUNT(*) FROM $table WHERE id_lang=$N")
    ADDED=$((COUNT_AFTER - COUNT_BEFORE))
    if [ "$ADDED" -gt 0 ]; then
      printf "  %-40s lang=%s  +%d\n" "$table" "$N" "$ADDED"
    fi
  done
done
echo "DONE"
