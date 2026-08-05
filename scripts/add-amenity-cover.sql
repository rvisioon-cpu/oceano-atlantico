-- Añade el render de fachada como PRIMERA imagen de la galería de amenidades.
--
-- getGalleryImages() (src/app/actions/galleries.ts) no lleva ORDER BY, así que
-- D1 devuelve las filas por rowid y ese es el orden en que se ven las slides.
-- Por eso la fila se inserta con rowid = 0: queda por debajo de las existentes
-- (oa-amenity-1..7, rowids positivos) sin tener que borrar y reinsertar el set
-- completo como hace scripts/seed-amenities-db.sql.
--
-- El archivo ya está en R2 como amenities/0.webp (2560x1440, webp q82,
-- convertido desde el PNG 4K entregado por el cliente).

DELETE FROM media WHERE id = 'oa-amenity-0';

INSERT INTO media (rowid, id, title, url, url_night, type, category, is_active)
VALUES (0, 'oa-amenity-0', 'Fachada principal', 'amenities/0.webp', NULL, 'image/webp', 'AMENITIES_GALLERY', 1);
