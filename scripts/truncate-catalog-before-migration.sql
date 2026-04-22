-- Limpia tablas de catálogo/ventas para arrancar migración limpia desde chetto.es.
-- CONSERVA: configuración, idiomas, countries, currencies, zones, taxes, tax_rules,
--           carriers, order_states, groups, webservice keys, módulo chettoheadless (chetto_*),
--           back office (ps_tab*, ps_employee, ps_profile, ps_shop*), CMS (ps_cms*).
-- Backup previo: migration_snapshots/local-db-backup-pre-full-import-20260416.sql

SET FOREIGN_KEY_CHECKS=0;

-- ============ CATÁLOGO: productos + categorías + fabricantes ============
TRUNCATE ps_product;
TRUNCATE ps_product_lang;
TRUNCATE ps_product_shop;
TRUNCATE ps_product_tag;
TRUNCATE ps_product_carrier;
TRUNCATE ps_product_download;
TRUNCATE ps_product_supplier;
TRUNCATE ps_product_country_tax;
TRUNCATE ps_product_group_reduction_cache;
TRUNCATE ps_product_sale;

-- Combinaciones (tallas) + asociaciones
TRUNCATE ps_product_attribute;
TRUNCATE ps_product_attribute_lang;
TRUNCATE ps_product_attribute_shop;
TRUNCATE ps_product_attribute_combination;
TRUNCATE ps_product_attribute_image;

-- Atributos (talla, color, etc.)
TRUNCATE ps_attribute;
TRUNCATE ps_attribute_lang;
TRUNCATE ps_attribute_shop;
TRUNCATE ps_attribute_group;
TRUNCATE ps_attribute_group_lang;
TRUNCATE ps_attribute_group_shop;

-- Características
TRUNCATE ps_feature;
TRUNCATE ps_feature_lang;
TRUNCATE ps_feature_shop;
TRUNCATE ps_feature_value;
TRUNCATE ps_feature_value_lang;
TRUNCATE ps_feature_product;

-- Imágenes
TRUNCATE ps_image;
TRUNCATE ps_image_lang;
TRUNCATE ps_image_shop;
TRUNCATE ps_image_type;

-- Stock
TRUNCATE ps_stock_available;
TRUNCATE ps_stock;
TRUNCATE ps_stock_mvt;
TRUNCATE ps_stock_mvt_reason;
TRUNCATE ps_stock_mvt_reason_lang;
TRUNCATE ps_warehouse_product_location;

-- Categorías (dejamos id 1=Root y 2=Home que son del install, se reinsertarán solos si chocan)
DELETE FROM ps_category WHERE id_category > 0;
DELETE FROM ps_category_lang;
DELETE FROM ps_category_shop;
DELETE FROM ps_category_group;
DELETE FROM ps_category_product;

-- Fabricantes y proveedores
TRUNCATE ps_manufacturer;
TRUNCATE ps_manufacturer_lang;
TRUNCATE ps_manufacturer_shop;
TRUNCATE ps_supplier;
TRUNCATE ps_supplier_lang;
TRUNCATE ps_supplier_shop;

-- Precios específicos
TRUNCATE ps_specific_price;
TRUNCATE ps_specific_price_priority;
TRUNCATE ps_specific_price_rule;
TRUNCATE ps_specific_price_rule_condition;
TRUNCATE ps_specific_price_rule_condition_group;

-- Tags
TRUNCATE ps_tag;
TRUNCATE ps_tag_count;

-- Search index
TRUNCATE ps_search_index;
TRUNCATE ps_search_word;
TRUNCATE ps_search_engine;

-- ============ CLIENTES + DIRECCIONES ============
TRUNCATE ps_customer;
TRUNCATE ps_customer_group;
TRUNCATE ps_customer_message;
TRUNCATE ps_customer_message_sync_imap;
TRUNCATE ps_customer_session;
TRUNCATE ps_customer_thread;
-- ps_address: borrar solo direcciones de clientes; conservar direcciones de manufacturer/supplier/warehouse (id_customer=0)
DELETE FROM ps_address WHERE id_customer > 0;

-- ============ PEDIDOS + CARRITOS + FACTURACIÓN ============
TRUNCATE ps_orders;
TRUNCATE ps_order_detail;
TRUNCATE ps_order_detail_tax;
TRUNCATE ps_order_history;
TRUNCATE ps_order_carrier;
TRUNCATE ps_order_cart_rule;
TRUNCATE ps_order_invoice;
TRUNCATE ps_order_invoice_payment;
TRUNCATE ps_order_invoice_tax;
TRUNCATE ps_order_payment;
TRUNCATE ps_order_slip;
TRUNCATE ps_order_slip_detail;
TRUNCATE ps_order_return;
TRUNCATE ps_order_return_detail;
TRUNCATE ps_order_message;
TRUNCATE ps_order_message_lang;

-- Carritos
TRUNCATE ps_cart;
TRUNCATE ps_cart_product;
TRUNCATE ps_cart_rule;
TRUNCATE ps_cart_rule_carrier;
TRUNCATE ps_cart_rule_country;
TRUNCATE ps_cart_rule_group;
TRUNCATE ps_cart_rule_lang;
TRUNCATE ps_cart_rule_product_rule;
TRUNCATE ps_cart_rule_product_rule_group;
TRUNCATE ps_cart_rule_shop;

-- Connections (estadística de visitas, no relevante)
TRUNCATE ps_connections;
TRUNCATE ps_connections_source;
TRUNCATE ps_connections_page;
TRUNCATE ps_page_viewed;
TRUNCATE ps_statssearch;

SET FOREIGN_KEY_CHECKS=1;
