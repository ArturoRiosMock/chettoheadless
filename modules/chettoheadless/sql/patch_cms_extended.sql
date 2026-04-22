CREATE TABLE IF NOT EXISTS `PREFIX_chetto_nav_item` (
    `id_chetto_nav_item` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    `label` VARCHAR(255) NOT NULL,
    `href` VARCHAR(512) NOT NULL,
    `position` INT(11) UNSIGNED NOT NULL DEFAULT 0,
    `active` TINYINT(1) UNSIGNED NOT NULL DEFAULT 1,
    `date_add` DATETIME NOT NULL,
    `date_upd` DATETIME NOT NULL,
    PRIMARY KEY (`id_chetto_nav_item`)
) ENGINE=ENGINE_TYPE DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `PREFIX_chetto_footer_link` (
    `id_chetto_footer_link` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    `column_index` TINYINT(2) UNSIGNED NOT NULL DEFAULT 1,
    `column_title` VARCHAR(128) NOT NULL,
    `label` VARCHAR(255) NOT NULL,
    `href` VARCHAR(512) NOT NULL,
    `position` INT(11) UNSIGNED NOT NULL DEFAULT 0,
    `active` TINYINT(1) UNSIGNED NOT NULL DEFAULT 1,
    `date_add` DATETIME NOT NULL,
    `date_upd` DATETIME NOT NULL,
    PRIMARY KEY (`id_chetto_footer_link`),
    KEY `column_index` (`column_index`)
) ENGINE=ENGINE_TYPE DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `PREFIX_chetto_faq` (
    `id_chetto_faq` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    `category` VARCHAR(128) NOT NULL,
    `question` VARCHAR(512) NOT NULL,
    `answer` TEXT NOT NULL,
    `position` INT(11) UNSIGNED NOT NULL DEFAULT 0,
    `active` TINYINT(1) UNSIGNED NOT NULL DEFAULT 1,
    `date_add` DATETIME NOT NULL,
    `date_upd` DATETIME NOT NULL,
    PRIMARY KEY (`id_chetto_faq`),
    KEY `category` (`category`)
) ENGINE=ENGINE_TYPE DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `PREFIX_chetto_page_block` (
    `id_chetto_page_block` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    `page_key` VARCHAR(64) NOT NULL,
    `block_key` VARCHAR(64) DEFAULT NULL,
    `title` VARCHAR(255) NOT NULL,
    `body` TEXT,
    `image` VARCHAR(255) DEFAULT NULL,
    `meta_json` TEXT DEFAULT NULL,
    `position` INT(11) UNSIGNED NOT NULL DEFAULT 0,
    `active` TINYINT(1) UNSIGNED NOT NULL DEFAULT 1,
    `date_add` DATETIME NOT NULL,
    `date_upd` DATETIME NOT NULL,
    PRIMARY KEY (`id_chetto_page_block`),
    KEY `page_key` (`page_key`)
) ENGINE=ENGINE_TYPE DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `PREFIX_chetto_store` (
    `id_chetto_store` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `address_line1` VARCHAR(255) NOT NULL,
    `address_line2` VARCHAR(255) DEFAULT NULL,
    `phone` VARCHAR(64) DEFAULT NULL,
    `maps_query` VARCHAR(512) DEFAULT NULL,
    `image` VARCHAR(255) DEFAULT NULL,
    `position` INT(11) UNSIGNED NOT NULL DEFAULT 0,
    `active` TINYINT(1) UNSIGNED NOT NULL DEFAULT 1,
    `date_add` DATETIME NOT NULL,
    `date_upd` DATETIME NOT NULL,
    PRIMARY KEY (`id_chetto_store`)
) ENGINE=ENGINE_TYPE DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `PREFIX_chetto_product_overlay` (
    `id_chetto_product_overlay` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    `id_product` INT(11) UNSIGNED NOT NULL,
    `marketing_html` TEXT,
    `date_add` DATETIME NOT NULL,
    `date_upd` DATETIME NOT NULL,
    PRIMARY KEY (`id_chetto_product_overlay`),
    UNIQUE KEY `id_product` (`id_product`)
) ENGINE=ENGINE_TYPE DEFAULT CHARSET=utf8mb4;
