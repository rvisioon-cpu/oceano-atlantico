-- Floor plans ("4. PLANTAS EL EDIFICIO" delivery) + building -> floors entry walks.
--
-- Floors: every plan now points at the WebP renders in R2 (plants/floor_*.webp).
-- The two basements are the client's S1 / S2 sheets (they replace the legacy
-- "PB 1" / "PB 2" rows, which had no units), and PISO 6 — the floor the entry
-- animations land on — is added where it was missing.
--
-- Building faces: each explorable face gets its own day/night walk into the
-- building (1.x = central, 2.x = left, 3.x = right; .1 = day, .2 = night).
-- Idempotent: safe to run on both the local and the remote D1.

DELETE FROM floors WHERE id IN ('floor_PB1', 'floor_PB2');

INSERT INTO floors (id, name, level, type, image_path) VALUES
  ('floor_S2', 'S2', -2, 'Sótano', '/plants/floor_s2.webp'),
  ('floor_S1', 'S1', -1, 'Sótano', '/plants/floor_s1.webp'),
  ('floor_1',  '1',   1, 'Piso',   '/plants/floor_1.webp'),
  ('floor_2',  '2',   2, 'Piso',   '/plants/floor_2.webp'),
  ('floor_3',  '3',   3, 'Piso',   '/plants/floor_3.webp'),
  ('floor_4',  '4',   4, 'Piso',   '/plants/floor_4.webp'),
  ('floor_5',  '5',   5, 'Piso',   '/plants/floor_5.webp'),
  ('floor_6',  '6',   6, 'Piso',   '/plants/floor_6.webp')
ON CONFLICT(id) DO UPDATE SET
  name = excluded.name,
  level = excluded.level,
  type = excluded.type,
  image_path = excluded.image_path,
  deleted_at = NULL,
  updated_at = unixepoch();

-- Upper level of the 501 / 502 duplexes (same identifiers as floor 5).
INSERT INTO units (id, floor_id, identifier, type, bedrooms, bathrooms, area_sqm, coordinates, state, tour_url) VALUES
  ('unit_6_601', 'floor_6', '501', 'APARTMENT', 3, 2, 250.95, NULL, 'AVAILABLE', NULL),
  ('unit_6_602', 'floor_6', '502', 'APARTMENT', 2, 2, 267.89, NULL, 'AVAILABLE', NULL)
ON CONFLICT(id) DO NOTHING;

UPDATE building_faces
SET day_intro_video = 'building/transitions/2.1_a_PISO_6.mp4',
    night_intro_video = 'building/transitions/2.2_a_PISO_6.mp4',
    updated_at = unixepoch()
WHERE name = 'Cara Izquierda';

UPDATE building_faces
SET day_intro_video = 'building/transitions/1.1_a_PISO_6.mp4',
    night_intro_video = 'building/transitions/1.2_a_PISO_6.mp4',
    updated_at = unixepoch()
WHERE name = 'Cara Central';

UPDATE building_faces
SET day_intro_video = 'building/transitions/3.1_a_PISO_6.mp4',
    night_intro_video = 'building/transitions/3.2_a_PISO_6.mp4',
    updated_at = unixepoch()
WHERE name = 'Cara Derecha';
