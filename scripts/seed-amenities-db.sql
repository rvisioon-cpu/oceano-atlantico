DELETE FROM media WHERE category = 'AMENITIES_GALLERY' OR category = 'amenities';

INSERT INTO media (id, title, url, url_night, type, category, is_active) VALUES
  ('a1111111-2222-3333-4444-555555555551', 'Amenidad 1', 'amenities/1_day.png', 'amenities/1_night.png', 'image/png', 'AMENITIES_GALLERY', 1),
  ('a1111111-2222-3333-4444-555555555552', 'Amenidad 2', 'amenities/2.png', NULL, 'image/png', 'AMENITIES_GALLERY', 1),
  ('a1111111-2222-3333-4444-555555555553', 'Amenidad 3', 'amenities/3.png', NULL, 'image/png', 'AMENITIES_GALLERY', 1),
  ('a1111111-2222-3333-4444-555555555554', 'Amenidad 4', 'amenities/4.png', NULL, 'image/png', 'AMENITIES_GALLERY', 1),
  ('a1111111-2222-3333-4444-555555555555', 'Amenidad 5', 'amenities/5.png', NULL, 'image/png', 'AMENITIES_GALLERY', 1),
  ('a1111111-2222-3333-4444-555555555556', 'Amenidad 6', 'amenities/6.png', NULL, 'image/png', 'AMENITIES_GALLERY', 1),
  ('a1111111-2222-3333-4444-555555555557', 'Amenidad 7', 'amenities/7.png', NULL, 'image/png', 'AMENITIES_GALLERY', 1),
  ('a1111111-2222-3333-4444-555555555558', 'Amenidad 8', 'amenities/8.png', NULL, 'image/png', 'AMENITIES_GALLERY', 1),
  ('a1111111-2222-3333-4444-555555555559', 'Amenidad 12', 'amenities/12.png', NULL, 'image/png', 'AMENITIES_GALLERY', 1);
