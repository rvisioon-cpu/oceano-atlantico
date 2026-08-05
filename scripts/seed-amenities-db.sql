-- Amenities shown on /galeria ("7. AMENIDADES" delivery).
-- This set has a single image per amenity (no day/night pair), so url_night stays
-- NULL and the gallery renders plain slides instead of the comparison slider.
--
-- getGalleryImages() no lleva ORDER BY, así que la galería muestra las imágenes
-- en el orden de inserción de esta lista: la primera fila es la primera slide.
-- Por eso este script borra y reinserta el set completo en vez de añadir filas.
DELETE FROM media WHERE category = 'AMENITIES_GALLERY' OR category = 'amenities';

INSERT INTO media (id, title, url, url_night, type, category, is_active) VALUES
  ('oa-amenity-0', 'Fachada principal', 'amenities/0.webp', NULL, 'image/webp', 'AMENITIES_GALLERY', 1),
  ('oa-amenity-1', 'Lobby', 'amenities/1.webp', NULL, 'image/webp', 'AMENITIES_GALLERY', 1),
  ('oa-amenity-2', 'Estacionamiento', 'amenities/2.webp', NULL, 'image/webp', 'AMENITIES_GALLERY', 1),
  ('oa-amenity-3', 'Estacionamiento 2', 'amenities/3.webp', NULL, 'image/webp', 'AMENITIES_GALLERY', 1),
  ('oa-amenity-4', 'Hall de ascensores', 'amenities/4.webp', NULL, 'image/webp', 'AMENITIES_GALLERY', 1),
  ('oa-amenity-5', 'Ingreso vehicular', 'amenities/5.webp', NULL, 'image/webp', 'AMENITIES_GALLERY', 1),
  ('oa-amenity-6', 'Fachada', 'amenities/6.webp', NULL, 'image/webp', 'AMENITIES_GALLERY', 1),
  ('oa-amenity-7', 'Recepción', 'amenities/7.webp', NULL, 'image/webp', 'AMENITIES_GALLERY', 1);
