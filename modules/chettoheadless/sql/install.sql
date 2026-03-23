CREATE TABLE IF NOT EXISTS `PREFIX_chetto_slide` (
    `id_chetto_slide` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    `badge` VARCHAR(128) DEFAULT NULL,
    `subtitle` VARCHAR(255) DEFAULT NULL,
    `title` VARCHAR(255) NOT NULL,
    `description` VARCHAR(512) DEFAULT NULL,
    `cta` VARCHAR(128) DEFAULT NULL,
    `cta_link` VARCHAR(255) DEFAULT NULL,
    `image` VARCHAR(255) DEFAULT NULL,
    `position` INT(11) UNSIGNED NOT NULL DEFAULT 0,
    `active` TINYINT(1) UNSIGNED NOT NULL DEFAULT 1,
    `date_add` DATETIME NOT NULL,
    `date_upd` DATETIME NOT NULL,
    PRIMARY KEY (`id_chetto_slide`)
) ENGINE=ENGINE_TYPE DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `PREFIX_chetto_benefit` (
    `id_chetto_benefit` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    `icon` VARCHAR(64) NOT NULL,
    `title` VARCHAR(128) NOT NULL,
    `description` VARCHAR(255) DEFAULT NULL,
    `position` INT(11) UNSIGNED NOT NULL DEFAULT 0,
    `active` TINYINT(1) UNSIGNED NOT NULL DEFAULT 1,
    `date_add` DATETIME NOT NULL,
    `date_upd` DATETIME NOT NULL,
    PRIMARY KEY (`id_chetto_benefit`)
) ENGINE=ENGINE_TYPE DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `PREFIX_chetto_homepage_category` (
    `id_chetto_homepage_category` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(128) NOT NULL,
    `description` VARCHAR(255) DEFAULT NULL,
    `image` VARCHAR(255) DEFAULT NULL,
    `slug` VARCHAR(128) NOT NULL,
    `link` VARCHAR(255) DEFAULT NULL,
    `position` INT(11) UNSIGNED NOT NULL DEFAULT 0,
    `active` TINYINT(1) UNSIGNED NOT NULL DEFAULT 1,
    `date_add` DATETIME NOT NULL,
    `date_upd` DATETIME NOT NULL,
    PRIMARY KEY (`id_chetto_homepage_category`)
) ENGINE=ENGINE_TYPE DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `PREFIX_chetto_testimonial` (
    `id_chetto_testimonial` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(128) NOT NULL,
    `location` VARCHAR(128) DEFAULT NULL,
    `rating` TINYINT(1) UNSIGNED NOT NULL DEFAULT 5,
    `text` TEXT NOT NULL,
    `position` INT(11) UNSIGNED NOT NULL DEFAULT 0,
    `active` TINYINT(1) UNSIGNED NOT NULL DEFAULT 1,
    `date_add` DATETIME NOT NULL,
    `date_upd` DATETIME NOT NULL,
    PRIMARY KEY (`id_chetto_testimonial`)
) ENGINE=ENGINE_TYPE DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `PREFIX_chetto_content_block` (
    `id_chetto_content_block` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(64) NOT NULL,
    `icon` VARCHAR(64) DEFAULT NULL,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT DEFAULT NULL,
    `extra_text` TEXT DEFAULT NULL,
    `position` INT(11) UNSIGNED NOT NULL DEFAULT 0,
    `active` TINYINT(1) UNSIGNED NOT NULL DEFAULT 1,
    `date_add` DATETIME NOT NULL,
    `date_upd` DATETIME NOT NULL,
    PRIMARY KEY (`id_chetto_content_block`)
) ENGINE=ENGINE_TYPE DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `PREFIX_chetto_homepage_product` (
    `id_chetto_homepage_product` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    `section_type` VARCHAR(32) NOT NULL DEFAULT 'featured',
    `name` VARCHAR(255) NOT NULL,
    `slug` VARCHAR(255) NOT NULL,
    `price` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    `original_price` DECIMAL(10,2) DEFAULT NULL,
    `discount` VARCHAR(32) DEFAULT NULL,
    `image` VARCHAR(255) DEFAULT NULL,
    `badge` VARCHAR(64) DEFAULT NULL,
    `colors` INT(11) UNSIGNED DEFAULT NULL,
    `category` VARCHAR(128) DEFAULT NULL,
    `link` VARCHAR(255) DEFAULT NULL,
    `position` INT(11) UNSIGNED NOT NULL DEFAULT 0,
    `active` TINYINT(1) UNSIGNED NOT NULL DEFAULT 1,
    `date_add` DATETIME NOT NULL,
    `date_upd` DATETIME NOT NULL,
    PRIMARY KEY (`id_chetto_homepage_product`)
) ENGINE=ENGINE_TYPE DEFAULT CHARSET=utf8mb4;
