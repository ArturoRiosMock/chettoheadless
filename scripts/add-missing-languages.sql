-- Añadir idiomas 2..5 en local con los mismos id_lang que producción chetto.es
-- Origen GET https://chetto.es/api/languages: DE=2, NL=3, FR=4, IT=5 (todos inactivos en prod)
-- Inactive (active=0) en local para replicar comportamiento prod (solo ES visible al usuario final).

INSERT INTO ps_lang (id_lang, name, active, iso_code, language_code, locale, date_format_lite, date_format_full, is_rtl)
VALUES
  (2, 'Deutsch (German)',      0, 'de', 'de-de', 'de-DE', 'd.m.Y',  'd.m.Y H:i:s',  0),
  (3, 'Nederlands (Dutch)',    0, 'nl', 'nl-nl', 'nl-NL', 'd-m-Y',  'd-m-Y H:i:s',  0),
  (4, 'Français (French)',     0, 'fr', 'fr-fr', 'fr-FR', 'd/m/Y',  'd/m/Y H:i:s',  0),
  (5, 'Italiano (Italian)',    0, 'it', 'it-it', 'it-IT', 'd/m/Y',  'd/m/Y H:i:s',  0);

-- Multitienda: asociar cada lang nueva a id_shop=1 (único shop local).
INSERT INTO ps_lang_shop (id_lang, id_shop) VALUES (2,1),(3,1),(4,1),(5,1);
