-- Ejecutar DESPUÉS de importar el dump de producción (MySQL ya apuntando a BD `prestashop`).
-- Ajusta el prefijo `ps_` si tu dump usa otro (busca en el SQL `CREATE TABLE`).

UPDATE `ps_shop_url`
SET
  `domain` = 'localhost:8090',
  `domain_ssl` = 'localhost:8090';

UPDATE `ps_configuration`
SET `value` = 'localhost:8090'
WHERE `name` IN ('PS_SHOP_DOMAIN', 'PS_SHOP_DOMAIN_SSL');

-- HTTP en local (evita redirecciones forzadas a https://localhost si no tienes cert).
UPDATE `ps_configuration`
SET `value` = '0'
WHERE `name` = 'PS_SSL_ENABLED';

-- Sin certificado local: si queda en 1, el BO carga enlaces https y falla navegación/widgets.
UPDATE `ps_configuration`
SET `value` = '0'
WHERE `name` = 'PS_SSL_ENABLED_EVERYWHERE';

-- Evita restricciones de “modo demo” si la clave quedó en BD.
UPDATE `ps_configuration`
SET `value` = '0'
WHERE `name` = '_PS_MODE_DEMO_';
