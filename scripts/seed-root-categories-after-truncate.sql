-- Tras scripts/truncate-catalog-before-migration.sql, ps_category queda vacío.
-- migrate push con --map-categories 1:1,2:2 requiere que existan Root (1) y Home (2).
SET FOREIGN_KEY_CHECKS=0;
INSERT INTO ps_category (
  id_category, id_parent, id_shop_default, level_depth, nleft, nright, active,
  date_add, date_upd, redirect_type, id_type_redirected, position, is_root_category
) VALUES
  (1, 0, 1, 0, 1, 48, 1, NOW(), NOW(), '301', 0, 0, 1),
  (2, 1, 1, 1, 2, 47, 1, NOW(), NOW(), '301', 0, 0, 0)
ON DUPLICATE KEY UPDATE id_parent = VALUES(id_parent);

INSERT IGNORE INTO ps_category_lang (id_category, id_shop, id_lang, name, description, additional_description, link_rewrite, meta_title, meta_description) VALUES
  (1, 1, 1, 'Root', '', '', 'root', '', ''),
  (1, 1, 2, 'Root', '', '', 'root', '', ''),
  (1, 1, 3, 'Root', '', '', 'root', '', ''),
  (1, 1, 4, 'Root', '', '', 'root', '', ''),
  (1, 1, 5, 'Root', '', '', 'root', '', ''),
  (2, 1, 1, 'Home', '', '', 'home', '', ''),
  (2, 1, 2, 'Home', '', '', 'home', '', ''),
  (2, 1, 3, 'Home', '', '', 'home', '', ''),
  (2, 1, 4, 'Home', '', '', 'home', '', ''),
  (2, 1, 5, 'Home', '', '', 'home', '', '');

INSERT IGNORE INTO ps_category_group (id_category, id_group) VALUES
  (1, 1), (1, 2), (1, 3),
  (2, 1), (2, 2), (2, 3);

INSERT IGNORE INTO ps_category_shop (id_category, id_shop, position) VALUES
  (1, 1, 0),
  (2, 1, 0);
SET FOREIGN_KEY_CHECKS=1;
