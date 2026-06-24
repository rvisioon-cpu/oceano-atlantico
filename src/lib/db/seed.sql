-- ============================================================================
-- SANTA FE 190 — Complete Database Seed
-- Source of truth for D1 (Cloudflare Workers)
-- Schema: src/lib/db/schema.ts
-- ============================================================================

-- ============================================================================
-- 1. CLEANUP — Delete existing data in dependency order
-- ============================================================================
PRAGMA foreign_keys = OFF;

DELETE FROM prospect_units;
DELETE FROM appointments;
DELETE FROM prospects;
DELETE FROM calendar_transfers;
DELETE FROM availabilities;
DELETE FROM logs;
DELETE FROM tours;
DELETE FROM units;
DELETE FROM floors;
DELETE FROM building_faces;
DELETE FROM construction_progress;
DELETE FROM gallery_collections;
DELETE FROM locations_poi;
DELETE FROM media;
DELETE FROM brochures;
DELETE FROM global_settings;

-- ============================================================================
-- 2. FLOORS (10 floors: PB + 1-9)
-- ============================================================================
INSERT INTO floors (id, name, level, type, image_path) VALUES ('floor_pb', 'PB', 0, 'Planta Baja', '/plants/floor_pb.png');
INSERT INTO floors (id, name, level, type, image_path) VALUES ('floor_1', '1', 1, 'Piso', '/plants/floor_1.png');
INSERT INTO floors (id, name, level, type, image_path) VALUES ('floor_2', '2', 2, 'Piso', '/plants/floor_2.png');
INSERT INTO floors (id, name, level, type, image_path) VALUES ('floor_3', '3', 3, 'Piso', '/plants/floor_3.png');
INSERT INTO floors (id, name, level, type, image_path) VALUES ('floor_4', '4', 4, 'Piso', '/plants/floor_4.png');
INSERT INTO floors (id, name, level, type, image_path) VALUES ('floor_5', '5', 5, 'Piso', '/plants/floor_5.png');
INSERT INTO floors (id, name, level, type, image_path) VALUES ('floor_6', '6', 6, 'Piso', '/plants/floor_6.png');
INSERT INTO floors (id, name, level, type, image_path) VALUES ('floor_7', '7', 7, 'Piso', '/plants/floor_7.png');
INSERT INTO floors (id, name, level, type, image_path) VALUES ('floor_8', '8', 8, 'Piso', '/plants/floor_duplex_1.png');
INSERT INTO floors (id, name, level, type, image_path) VALUES ('floor_9', '9', 9, 'Piso', '/plants/floor_duplex_2.png');

-- ============================================================================
-- 3. UNITS — Planta Baja (Bodegas/Storage)
-- ============================================================================
INSERT INTO units (id, floor_id, identifier, type, bedrooms, bathrooms, area_sqm, coordinates, state, tour_url, photos_furnished, photos_unfurnished, photos_plans, gallery) VALUES ('unit_pb_pb7', 'floor_pb', 'PB 7', 'STORAGE', NULL, NULL, 3.31, '{"path":"M 67.1,32.2 L 62.7,32.2 L 62.7,42.2 L 67.1,42.4 Z"}', 'AVAILABLE', NULL, '[]', '[]', '[]', '[]');
INSERT INTO units (id, floor_id, identifier, type, bedrooms, bathrooms, area_sqm, coordinates, state, tour_url, photos_furnished, photos_unfurnished, photos_plans, gallery) VALUES ('unit_pb_pb6', 'floor_pb', 'PB 6', 'STORAGE', NULL, NULL, 3.36, '{"path":"M 62.6,42.9 L 67.2,43 L 67.3,53.2 L 62.8,53.1 Z"}', 'AVAILABLE', NULL, '[]', '[]', '[]', '[]');
INSERT INTO units (id, floor_id, identifier, type, bedrooms, bathrooms, area_sqm, coordinates, state, tour_url, photos_furnished, photos_unfurnished, photos_plans, gallery) VALUES ('unit_pb_pb5', 'floor_pb', 'PB 5', 'STORAGE', NULL, NULL, 3.36, '{"path":"M 67.3,63.8 L 67.2,53.6 L 62.7,53.6 L 62.7,64.3 Z"}', 'AVAILABLE', NULL, '[]', '[]', '[]', '[]');
INSERT INTO units (id, floor_id, identifier, type, bedrooms, bathrooms, area_sqm, coordinates, state, tour_url, photos_furnished, photos_unfurnished, photos_plans, gallery) VALUES ('unit_pb_pb4', 'floor_pb', 'PB 4', 'STORAGE', NULL, NULL, 5.55, '{"path":"M 57.7,64.2 L 67.1,64.6 L 67.3,72.7 L 57.6,72.5 Z"}', 'SOLD', NULL, '[]', '[]', '[]', '[]');
INSERT INTO units (id, floor_id, identifier, type, bedrooms, bathrooms, area_sqm, coordinates, state, tour_url, photos_furnished, photos_unfurnished, photos_plans, gallery) VALUES ('unit_pb_pb3', 'floor_pb', 'PB 3', 'STORAGE', NULL, NULL, 4.01, '{"path":"M 52.9,60 L 57.4,60 L 57.5,72.5 L 52.9,72.7 Z"}', 'AVAILABLE', NULL, '[]', '[]', '[]', '[]');
INSERT INTO units (id, floor_id, identifier, type, bedrooms, bathrooms, area_sqm, coordinates, state, tour_url, photos_furnished, photos_unfurnished, photos_plans, gallery) VALUES ('unit_pb_pb2', 'floor_pb', 'PB 2', 'STORAGE', NULL, NULL, 3.23, '{"path":"M 57.5,49.9 L 52.6,50.3 L 52.8,59.4 L 57.5,59.5 Z"}', 'SOLD', NULL, '[]', '[]', '[]', '[]');
INSERT INTO units (id, floor_id, identifier, type, bedrooms, bathrooms, area_sqm, coordinates, state, tour_url, photos_furnished, photos_unfurnished, photos_plans, gallery) VALUES ('unit_pb_pb1', 'floor_pb', 'PB 1', 'STORAGE', NULL, NULL, 3.31, '{"path":"M 57.4,40 L 52.6,40.1 L 52.6,49.6 L 57.5,49.5 Z"}', 'SOLD', NULL, '[]', '[]', '[]', '[]');

-- Floor 1
INSERT INTO units (id, floor_id, identifier, type, bedrooms, bathrooms, area_sqm, coordinates, state, tour_url, photos_furnished, photos_unfurnished, photos_plans, gallery) VALUES ('unit_1_101', 'floor_1', '101', 'APARTMENT', 2, 2, 52.9, '{"x":30,"y":40,"path":"M 62,39.5 L 30.6,39.1 L 31,61 L 62.4,61.2 Z"}', 'SOLD', 'https://kuula.co/share/collection/7HQ9d?logo=1&card=1&info=0&logosize=175&fs=1&vr=1&zoom=1&initload=0&thumbs=3&alpha=0.91&inst=es', '["https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/101/furnished.jpg"]', '["https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/101/unfurnished.jpg"]', '["https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/101/plans.jpg"]', '["https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/101/gallery/101.main_hall.png","https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/101/gallery/101.diner.png","https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/101/gallery/101.bedroom_2.png","https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/101/gallery/101.kitchen.png","https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/101/gallery/101.bedroom.png"]');

-- Floor 2
INSERT INTO units (id, floor_id, identifier, type, bedrooms, bathrooms, area_sqm, coordinates, state, tour_url, photos_furnished, photos_unfurnished, photos_plans, gallery) VALUES ('unit_2_201', 'floor_2', '201', 'APARTMENT', 3, 2, 64.34, '{"x":25,"y":35,"path":"M 69.1,22.9 L 52.5,22.7 L 52.6,73.4 L 69,75 Z"}', 'SOLD', 'https://kuula.co/share/collection/7HQ9H?logo=1&card=1&info=0&logosize=175&fs=1&vr=1&zoom=1&initload=0&thumbs=3&alpha=0.91&inst=es', '["https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/x01/furnished.jpg"]', '["https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/x01/unfurnished.jpg"]', '["https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/x01/plans.jpg"]', '["https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/x01/gallery/701.1.png","https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/x01/gallery/701.3.png","https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/x01/gallery/701.2.png","https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/x01/gallery/701.5.png","https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/x01/gallery/701.4.png"]');
INSERT INTO units (id, floor_id, identifier, type, bedrooms, bathrooms, area_sqm, coordinates, state, tour_url, photos_furnished, photos_unfurnished, photos_plans, gallery) VALUES ('unit_2_202', 'floor_2', '202', 'APARTMENT', 2, 2, 56.66, '{"x":55,"y":55,"path":"M 31.2,39.9 L 52.3,39 L 52.2,73.9 L 30.2,73.5 Z"}', 'SOLD', 'https://kuula.co/share/collection/7HQ9D?logo=1&card=1&info=0&logosize=175&fs=1&vr=1&zoom=1&initload=0&thumbs=3&alpha=0.91&inst=es', '["https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/x02/furnished.jpg"]', '["https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/x02/unfurnished.jpg"]', '["https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/x02/plans.jpg"]', '["https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/x02/gallery/702.1.png","https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/x02/gallery/702.2.png","https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/x02/gallery/702.3.png","https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/x02/gallery/702.4.png","https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/x02/gallery/702.5.png"]');

-- Floor 3
INSERT INTO units (id, floor_id, identifier, type, bedrooms, bathrooms, area_sqm, coordinates, state, tour_url, photos_furnished, photos_unfurnished, photos_plans, gallery) VALUES ('unit_3_301', 'floor_3', '301', 'APARTMENT', 3, 2, 64.34, '{"path":"M 69.1,22.9 L 52.5,22.7 L 52.6,73.4 L 69,75 Z"}', 'SOLD', 'https://kuula.co/share/collection/7HQ9b?logo=1&card=1&info=0&logosize=175&fs=1&vr=1&zoom=1&initload=0&thumbs=3&alpha=0.91&inst=es', '["https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/x01/furnished.jpg"]', '["https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/x01/unfurnished.jpg"]', '["https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/x01/plans.jpg"]', '["https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/x01/gallery/701.1.png","https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/x01/gallery/701.3.png","https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/x01/gallery/701.2.png","https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/x01/gallery/701.5.png","https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/x01/gallery/701.4.png"]');
INSERT INTO units (id, floor_id, identifier, type, bedrooms, bathrooms, area_sqm, coordinates, state, tour_url, photos_furnished, photos_unfurnished, photos_plans, gallery) VALUES ('unit_3_302', 'floor_3', '302', 'APARTMENT', 2, 2, 56.66, '{"path":"M 31.2,39.9 L 52.3,39 L 52.2,73.9 L 30.2,73.5 Z"}', 'AVAILABLE', 'https://kuula.co/share/collection/7HQ9Z?logo=1&card=1&info=0&logosize=175&fs=1&vr=1&zoom=1&initload=0&thumbs=3&alpha=0.91&inst=es', '["https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/x02/furnished.jpg"]', '["https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/x02/unfurnished.jpg"]', '["https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/x02/plans.jpg"]', '["https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/x02/gallery/702.1.png","https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/x02/gallery/702.2.png","https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/x02/gallery/702.3.png","https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/x02/gallery/702.4.png","https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/x02/gallery/702.5.png"]');

-- Floor 4
INSERT INTO units (id, floor_id, identifier, type, bedrooms, bathrooms, area_sqm, coordinates, state, tour_url, photos_furnished, photos_unfurnished, photos_plans, gallery) VALUES ('unit_4_401', 'floor_4', '401', 'APARTMENT', 3, 2, 64.34, '{"path":"M 69.1,22.9 L 52.5,22.7 L 52.6,73.4 L 69,75 Z"}', 'SOLD', 'https://kuula.co/share/collection/7HQ9K?logo=1&card=1&info=0&logosize=175&fs=1&vr=1&zoom=1&initload=0&thumbs=3&alpha=0.91&inst=es', '["https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/x01/furnished.jpg"]', '["https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/x01/unfurnished.jpg"]', '["https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/x01/plans.jpg"]', '["https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/x01/gallery/701.1.png","https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/x01/gallery/701.3.png","https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/x01/gallery/701.2.png","https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/x01/gallery/701.5.png","https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/x01/gallery/701.4.png"]');
INSERT INTO units (id, floor_id, identifier, type, bedrooms, bathrooms, area_sqm, coordinates, state, tour_url, photos_furnished, photos_unfurnished, photos_plans, gallery) VALUES ('unit_4_402', 'floor_4', '402', 'APARTMENT', 2, 2, 56.66, '{"path":"M 31.2,39.9 L 52.3,39 L 52.2,73.9 L 30.2,73.5 Z"}', 'SOLD', 'https://kuula.co/share/collection/7HQ9c?logo=1&card=1&info=0&logosize=175&fs=1&vr=1&zoom=1&initload=0&thumbs=3&alpha=0.91&inst=es', '["https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/x02/furnished.jpg"]', '["https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/x02/unfurnished.jpg"]', '["https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/x02/plans.jpg"]', '["https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/x02/gallery/702.1.png","https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/x02/gallery/702.2.png","https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/x02/gallery/702.3.png","https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/x02/gallery/702.4.png","https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/x02/gallery/702.5.png"]');

-- Floor 5
INSERT INTO units (id, floor_id, identifier, type, bedrooms, bathrooms, area_sqm, coordinates, state, tour_url, photos_furnished, photos_unfurnished, photos_plans, gallery) VALUES ('unit_5_501', 'floor_5', '501', 'APARTMENT', 3, 2, 64.34, '{"path":"M 69.1,22.9 L 52.5,22.7 L 52.6,73.4 L 69,75 Z"}', 'SOLD', 'https://kuula.co/share/collection/7HQ9X?logo=1&card=1&info=0&logosize=175&fs=1&vr=1&zoom=1&initload=0&thumbs=3&alpha=0.91&inst=es', '["https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/x01/furnished.jpg"]', '["https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/x01/unfurnished.jpg"]', '["https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/x01/plans.jpg"]', '["https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/x01/gallery/701.1.png","https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/x01/gallery/701.3.png","https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/x01/gallery/701.2.png","https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/x01/gallery/701.5.png","https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/x01/gallery/701.4.png"]');
INSERT INTO units (id, floor_id, identifier, type, bedrooms, bathrooms, area_sqm, coordinates, state, tour_url, photos_furnished, photos_unfurnished, photos_plans, gallery) VALUES ('unit_5_502', 'floor_5', '502', 'APARTMENT', 2, 2, 56.66, '{"path":"M 31.2,39.9 L 52.3,39 L 52.2,73.9 L 30.2,73.5 Z"}', 'AVAILABLE', 'https://kuula.co/share/collection/7HQ9J?logo=1&card=1&info=0&logosize=175&fs=1&vr=1&zoom=1&initload=0&thumbs=3&alpha=0.91&inst=es', '["https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/x02/furnished.jpg"]', '["https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/x02/unfurnished.jpg"]', '["https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/x02/plans.jpg"]', '["https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/x02/gallery/702.1.png","https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/x02/gallery/702.2.png","https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/x02/gallery/702.3.png","https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/x02/gallery/702.4.png","https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/x02/gallery/702.5.png"]');

-- Floor 6
INSERT INTO units (id, floor_id, identifier, type, bedrooms, bathrooms, area_sqm, coordinates, state, tour_url, photos_furnished, photos_unfurnished, photos_plans, gallery) VALUES ('unit_6_601', 'floor_6', '601', 'APARTMENT', 3, 2, 64.34, '{"path":"M 69.1,22.9 L 52.5,22.7 L 52.6,73.4 L 69,75 Z"}', 'SOLD', 'https://kuula.co/share/collection/7HQ9v?logo=1&card=1&info=0&logosize=175&fs=1&vr=1&zoom=1&initload=0&thumbs=3&alpha=0.91&inst=es', '["https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/x01/furnished.jpg"]', '["https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/x01/unfurnished.jpg"]', '["https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/x01/plans.jpg"]', '["https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/x01/gallery/701.1.png","https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/x01/gallery/701.3.png","https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/x01/gallery/701.2.png","https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/x01/gallery/701.5.png","https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/x01/gallery/701.4.png"]');
INSERT INTO units (id, floor_id, identifier, type, bedrooms, bathrooms, area_sqm, coordinates, state, tour_url, photos_furnished, photos_unfurnished, photos_plans, gallery) VALUES ('unit_6_602', 'floor_6', '602', 'APARTMENT', 2, 2, 56.66, '{"path":"M 31.2,39.9 L 52.3,39 L 52.2,73.9 L 30.2,73.5 Z"}', 'AVAILABLE', 'https://kuula.co/share/collection/7HQ9q?logo=1&card=1&info=0&logosize=175&fs=1&vr=1&zoom=1&initload=0&thumbs=3&alpha=0.91&inst=es', '["https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/x02/furnished.jpg"]', '["https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/x02/unfurnished.jpg"]', '["https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/x02/plans.jpg"]', '["https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/x02/gallery/702.1.png","https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/x02/gallery/702.2.png","https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/x02/gallery/702.3.png","https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/x02/gallery/702.4.png","https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/x02/gallery/702.5.png"]');

-- Floor 7
INSERT INTO units (id, floor_id, identifier, type, bedrooms, bathrooms, area_sqm, coordinates, state, tour_url, photos_furnished, photos_unfurnished, photos_plans, gallery) VALUES ('unit_7_701', 'floor_7', '701', 'APARTMENT', 3, 2, 64.34, '{"path":"M 69.1,22.9 L 52.5,22.7 L 52.6,73.4 L 69,75 Z"}', 'SOLD', 'https://kuula.co/share/collection/7HQ9k?logo=1&card=1&info=0&logosize=175&fs=1&vr=1&zoom=1&initload=0&thumbs=3&alpha=0.91&inst=es', '["https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/x01/furnished.jpg"]', '["https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/x01/unfurnished.jpg"]', '["https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/x01/plans.jpg"]', '["https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/x01/gallery/701.1.png","https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/x01/gallery/701.3.png","https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/x01/gallery/701.2.png","https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/x01/gallery/701.5.png","https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/x01/gallery/701.4.png"]');
INSERT INTO units (id, floor_id, identifier, type, bedrooms, bathrooms, area_sqm, coordinates, state, tour_url, photos_furnished, photos_unfurnished, photos_plans, gallery) VALUES ('unit_7_702', 'floor_7', '702', 'APARTMENT', 2, 2, 56.66, '{"path":"M 31.2,39.9 L 52.3,39 L 52.2,73.9 L 30.2,73.5 Z"}', 'AVAILABLE', 'https://kuula.co/share/collection/7HQ9Y?logo=1&card=1&info=0&logosize=175&fs=1&vr=1&zoom=1&initload=0&thumbs=3&alpha=0.91&inst=es', '["https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/x02/furnished.jpg"]', '["https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/x02/unfurnished.jpg"]', '["https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/x02/plans.jpg"]', '["https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/x02/gallery/702.1.png","https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/x02/gallery/702.2.png","https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/x02/gallery/702.3.png","https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/x02/gallery/702.4.png","https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/x02/gallery/702.5.png"]');

-- Floor 8 (Duplex lower)
INSERT INTO units (id, floor_id, identifier, type, bedrooms, bathrooms, area_sqm, coordinates, state, tour_url, photos_furnished, photos_unfurnished, photos_plans, gallery) VALUES ('unit_8_801', 'floor_8', '801', 'APARTMENT', 3, 2, 134.5, '{"path":"M 52.5,22.1 L 52.6,74.3 L 68,74.1 L 67.6,66.9 L 69.2,67.1 L 69,22.6 Z"}', 'SOLD', 'https://kuula.co/share/collection/7HQ9P?logo=1&card=1&info=0&logosize=175&fs=1&vr=1&zoom=1&initload=0&thumbs=3&alpha=0.91&inst=es', '["https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/801/furnished.jpg"]', '["https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/801/unfurnished.jpg"]', '["https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/801/plans.jpg"]', '["https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/801/gallery/801.4.png","https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/801/gallery/801.5.png","https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/801/gallery/801.2.png","https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/801/gallery/801.3.png","https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/801/gallery/801.1.png"]');
INSERT INTO units (id, floor_id, identifier, type, bedrooms, bathrooms, area_sqm, coordinates, state, tour_url, photos_furnished, photos_unfurnished, photos_plans, gallery) VALUES ('unit_8_802', 'floor_8', '802', 'APARTMENT', 2, 2, 56.66, '{"path":"M 31.2,39.9 L 52.3,39 L 52.2,73.9 L 30.2,73.5 Z"}', 'AVAILABLE', 'https://kuula.co/share/collection/7HQ9G?logo=1&card=1&info=0&logosize=175&fs=1&vr=1&zoom=1&initload=0&thumbs=3&alpha=0.91&inst=es', '["https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/x02/furnished.jpg"]', '["https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/x02/unfurnished.jpg"]', '["https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/x02/plans.jpg"]', '["https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/x02/gallery/702.1.png","https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/x02/gallery/702.2.png","https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/x02/gallery/702.3.png","https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/x02/gallery/702.4.png","https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/x02/gallery/702.5.png"]');

-- Floor 9 (Duplex upper + Terraza)
INSERT INTO units (id, floor_id, identifier, type, bedrooms, bathrooms, area_sqm, coordinates, state, tour_url, photos_furnished, photos_unfurnished, photos_plans, gallery) VALUES ('unit_9_901', 'floor_9', '801', 'APARTMENT', 1, 2, 110, '{"path":"M 52.7,22.8 L 52.4,43.8 L 48,44 L 47.9,58.6 L 52.4,58.6 L 52.5,73.9 L 69,73.6 L 68.9,22.6 Z"}', 'SOLD', 'https://kuula.co/share/collection/7HQ9P?logo=1&card=1&info=0&logosize=175&fs=1&vr=1&zoom=1&initload=0&thumbs=3&alpha=0.91&inst=es', '["https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/901/furnished.jpg"]', '["https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/901/unfurnished.jpg"]', '["https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/901/plans.jpg"]', '["https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/901/gallery/801.8.png","https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/901/gallery/801.7.png","https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/901/gallery/801.6.png"]');
INSERT INTO units (id, floor_id, identifier, type, bedrooms, bathrooms, area_sqm, coordinates, state, tour_url, photos_furnished, photos_unfurnished, photos_plans, gallery) VALUES ('unit_9_terraza', 'floor_9', 'Terraza', 'COMMON_AREA', NULL, NULL, NULL, '{"path":"M 31.1,40.2 L 31,73.9 L 52.3,74.1 L 52.1,59.5 L 47.6,59.2 L 47.6,44.1 L 52.2,43.8 L 52.3,39.1 Z"}', 'AVAILABLE', 'https://kuula.co/share/collection/7HQ90?logo=1&card=1&info=0&logosize=175&fs=1&vr=1&zoom=1&initload=0&thumbs=3&alpha=0.91&inst=es', '["https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/902/furnished.jpg"]', '[]', '["https://pub-44777f1e13a04cbaa9c6d275228617c2.r2.dev/plants/details/902/plans.jpg"]', '[]');

-- ============================================================================
-- 4. BUILDING FACES (3 faces: Central, Derecha, Izquierda)
-- Schema: id, name, day_*, night_*, transitions, order
-- Assets are relative paths resolved via NEXT_PUBLIC_ASSET_BASE_URL at runtime
-- ============================================================================
INSERT INTO building_faces (id, name, day_background, day_background_video, day_intro_video, day_to_left_transition, day_to_right_transition, night_background, night_background_video, night_intro_video, night_to_left_transition, night_to_right_transition, day_to_night_transition, night_to_day_transition, "order") VALUES
  (1, 'Cara Central', 'building/photos/face_0_daylight.png', 'building/videos/face_0_daylight.mp4', 'videos/walks/walk_center_daylight.mp4', 'building/transitions/trans_0_to_2_daylight.mp4', 'building/transitions/trans_0_to_1_daylight.mp4', 'building/photos/face_0_nightlight.png', 'building/videos/face_0_nightlight.mp4', 'videos/walks/walk_center_nightlight.mp4', 'building/transitions/trans_0_to_2_nightlight.mp4', 'building/transitions/trans_0_to_1_nightlight.mp4', 'building/transitions/trans_0_day_to_night.mp4', 'building/transitions/trans_0_night_to_day.mp4', 0);

INSERT INTO building_faces (id, name, day_background, day_intro_video, day_to_left_transition, day_to_right_transition, night_background, night_intro_video, night_to_left_transition, night_to_right_transition, day_to_night_transition, night_to_day_transition, "order") VALUES
  (2, 'Cara Derecha', 'building/photos/face_1_daylight.png', 'videos/walks/walk_right_daylight.mp4', 'building/transitions/trans_1_to_0_daylight.mp4', 'building/transitions/trans_1_to_0_daylight.mp4', 'building/photos/face_1_nightlight.png', 'videos/walks/walk_right_nightlight.mp4', 'building/transitions/trans_1_to_0_nightlight.mp4', 'building/transitions/trans_1_to_0_nightlight.mp4', 'building/transitions/trans_1_day_to_night.mp4', 'building/transitions/trans_1_night_to_day.mp4', 1);

INSERT INTO building_faces (id, name, day_background, day_intro_video, day_to_left_transition, day_to_right_transition, night_background, night_intro_video, night_to_left_transition, night_to_right_transition, day_to_night_transition, night_to_day_transition, "order") VALUES
  (3, 'Cara Izquierda', 'building/photos/face_2_daylight.png', 'videos/walks/walk_left_daylight.mp4', 'building/transitions/trans_2_to_0_daylight.mp4', 'building/transitions/trans_2_to_0_daylight.mp4', 'building/photos/face_2_nightlight.png', 'videos/walks/walk_left_nightlight.mp4', 'building/transitions/trans_2_to_0_nightlight.mp4', 'building/transitions/trans_2_to_0_nightlight.mp4', 'building/transitions/trans_2_day_to_night.mp4', 'building/transitions/trans_2_night_to_day.mp4', 2);

-- ============================================================================
-- 5. TOURS
-- Building tour + unit tours (deduplicated by assetId)
-- Thumbnails use the poster.png from plant details
-- ============================================================================
INSERT INTO tours (id, title, subtitle, thumbnail_url, type, target_url, unit_id, is_active, "order") VALUES
  ('tour_building', 'Edificio Principal', 'Showroom Virtual', 'building/photos/face_0_daylight.png', 'building', 'https://kuula.co/share/collection/7HQY1?logo=1&card=1&info=0&logosize=175&fs=1&vr=1&zoom=1&initload=0&thumbs=3&alpha=0.91&inst=es', NULL, 1, 0);

-- Unit 101 (Floor 1 — unique layout)
INSERT INTO tours (id, title, subtitle, thumbnail_url, type, target_url, unit_id, is_active, "order") VALUES
  ('tour_unit_101', 'Unidad 101', 'Flat', 'plants/details/101/poster.png', 'unit', 'https://kuula.co/share/collection/7HQ9d?logo=1&card=1&info=0&logosize=175&fs=1&vr=1&zoom=1&initload=0&thumbs=3&alpha=0.91&inst=es', 'unit_1_101', 1, 1);

-- Unit 201 (assetId=x01 — shared across floors 2-7)
INSERT INTO tours (id, title, subtitle, thumbnail_url, type, target_url, unit_id, is_active, "order") VALUES
  ('tour_unit_201', 'Unidad 201', 'Flat', 'plants/details/x01/poster.png', 'unit', 'https://kuula.co/share/collection/7HQ9H?logo=1&card=1&info=0&logosize=175&fs=1&vr=1&zoom=1&initload=0&thumbs=3&alpha=0.91&inst=es', 'unit_2_201', 1, 2);

-- Unit 202 (assetId=x02 — shared across floors 2-7)
INSERT INTO tours (id, title, subtitle, thumbnail_url, type, target_url, unit_id, is_active, "order") VALUES
  ('tour_unit_202', 'Unidad 202', 'Flat', 'plants/details/x02/poster.png', 'unit', 'https://kuula.co/share/collection/7HQ9D?logo=1&card=1&info=0&logosize=175&fs=1&vr=1&zoom=1&initload=0&thumbs=3&alpha=0.91&inst=es', 'unit_2_202', 1, 3);

-- Unit 301
INSERT INTO tours (id, title, subtitle, thumbnail_url, type, target_url, unit_id, is_active, "order") VALUES
  ('tour_unit_301', 'Unidad 301', 'Flat', 'plants/details/x01/poster.png', 'unit', 'https://kuula.co/share/collection/7HQ9b?logo=1&card=1&info=0&logosize=175&fs=1&vr=1&zoom=1&initload=0&thumbs=3&alpha=0.91&inst=es', 'unit_3_301', 1, 4);

-- Unit 302
INSERT INTO tours (id, title, subtitle, thumbnail_url, type, target_url, unit_id, is_active, "order") VALUES
  ('tour_unit_302', 'Unidad 302', 'Flat', 'plants/details/x02/poster.png', 'unit', 'https://kuula.co/share/collection/7HQ9Z?logo=1&card=1&info=0&logosize=175&fs=1&vr=1&zoom=1&initload=0&thumbs=3&alpha=0.91&inst=es', 'unit_3_302', 1, 5);

-- Unit 401
INSERT INTO tours (id, title, subtitle, thumbnail_url, type, target_url, unit_id, is_active, "order") VALUES
  ('tour_unit_401', 'Unidad 401', 'Flat', 'plants/details/x01/poster.png', 'unit', 'https://kuula.co/share/collection/7HQ9K?logo=1&card=1&info=0&logosize=175&fs=1&vr=1&zoom=1&initload=0&thumbs=3&alpha=0.91&inst=es', 'unit_4_401', 1, 6);

-- Unit 402
INSERT INTO tours (id, title, subtitle, thumbnail_url, type, target_url, unit_id, is_active, "order") VALUES
  ('tour_unit_402', 'Unidad 402', 'Flat', 'plants/details/x02/poster.png', 'unit', 'https://kuula.co/share/collection/7HQ9c?logo=1&card=1&info=0&logosize=175&fs=1&vr=1&zoom=1&initload=0&thumbs=3&alpha=0.91&inst=es', 'unit_4_402', 1, 7);

-- Unit 501
INSERT INTO tours (id, title, subtitle, thumbnail_url, type, target_url, unit_id, is_active, "order") VALUES
  ('tour_unit_501', 'Unidad 501', 'Flat', 'plants/details/x01/poster.png', 'unit', 'https://kuula.co/share/collection/7HQ9X?logo=1&card=1&info=0&logosize=175&fs=1&vr=1&zoom=1&initload=0&thumbs=3&alpha=0.91&inst=es', 'unit_5_501', 1, 8);

-- Unit 502
INSERT INTO tours (id, title, subtitle, thumbnail_url, type, target_url, unit_id, is_active, "order") VALUES
  ('tour_unit_502', 'Unidad 502', 'Flat', 'plants/details/x02/poster.png', 'unit', 'https://kuula.co/share/collection/7HQ9J?logo=1&card=1&info=0&logosize=175&fs=1&vr=1&zoom=1&initload=0&thumbs=3&alpha=0.91&inst=es', 'unit_5_502', 1, 9);

-- Unit 601
INSERT INTO tours (id, title, subtitle, thumbnail_url, type, target_url, unit_id, is_active, "order") VALUES
  ('tour_unit_601', 'Unidad 601', 'Flat', 'plants/details/x01/poster.png', 'unit', 'https://kuula.co/share/collection/7HQ9v?logo=1&card=1&info=0&logosize=175&fs=1&vr=1&zoom=1&initload=0&thumbs=3&alpha=0.91&inst=es', 'unit_6_601', 1, 10);

-- Unit 602
INSERT INTO tours (id, title, subtitle, thumbnail_url, type, target_url, unit_id, is_active, "order") VALUES
  ('tour_unit_602', 'Unidad 602', 'Flat', 'plants/details/x02/poster.png', 'unit', 'https://kuula.co/share/collection/7HQ9q?logo=1&card=1&info=0&logosize=175&fs=1&vr=1&zoom=1&initload=0&thumbs=3&alpha=0.91&inst=es', 'unit_6_602', 1, 11);

-- Unit 701
INSERT INTO tours (id, title, subtitle, thumbnail_url, type, target_url, unit_id, is_active, "order") VALUES
  ('tour_unit_701', 'Unidad 701', 'Flat', 'plants/details/x01/poster.png', 'unit', 'https://kuula.co/share/collection/7HQ9k?logo=1&card=1&info=0&logosize=175&fs=1&vr=1&zoom=1&initload=0&thumbs=3&alpha=0.91&inst=es', 'unit_7_701', 1, 12);

-- Unit 702
INSERT INTO tours (id, title, subtitle, thumbnail_url, type, target_url, unit_id, is_active, "order") VALUES
  ('tour_unit_702', 'Unidad 702', 'Flat', 'plants/details/x02/poster.png', 'unit', 'https://kuula.co/share/collection/7HQ9Y?logo=1&card=1&info=0&logosize=175&fs=1&vr=1&zoom=1&initload=0&thumbs=3&alpha=0.91&inst=es', 'unit_7_702', 1, 13);

-- Unit 801 (Duplex)
INSERT INTO tours (id, title, subtitle, thumbnail_url, type, target_url, unit_id, is_active, "order") VALUES
  ('tour_unit_801', 'Unidad 801', 'Duplex', 'plants/details/801/poster.png', 'unit', 'https://kuula.co/share/collection/7HQ9P?logo=1&card=1&info=0&logosize=175&fs=1&vr=1&zoom=1&initload=0&thumbs=3&alpha=0.91&inst=es', 'unit_8_801', 1, 14);

-- Unit 802
INSERT INTO tours (id, title, subtitle, thumbnail_url, type, target_url, unit_id, is_active, "order") VALUES
  ('tour_unit_802', 'Unidad 802', 'Flat', 'plants/details/x02/poster.png', 'unit', 'https://kuula.co/share/collection/7HQ9G?logo=1&card=1&info=0&logosize=175&fs=1&vr=1&zoom=1&initload=0&thumbs=3&alpha=0.91&inst=es', 'unit_8_802', 1, 15);

-- Terraza (Floor 9)
INSERT INTO tours (id, title, subtitle, thumbnail_url, type, target_url, unit_id, is_active, "order") VALUES
  ('tour_unit_terraza', 'Terraza', 'Terraza', 'plants/details/902/poster.png', 'unit', 'https://kuula.co/share/collection/7HQ90?logo=1&card=1&info=0&logosize=175&fs=1&vr=1&zoom=1&initload=0&thumbs=3&alpha=0.91&inst=es', 'unit_9_terraza', 1, 16);

-- ============================================================================
-- 6. CONSTRUCTION PROGRESS
-- ============================================================================
INSERT INTO construction_progress (id, title, date, media_url, description) VALUES
  ('progress_march_2026', 'Avance de Obra - Marzo', 1709251200, 'progress/march_2026.mp4', 'Registro visual de los avances logrados durante el mes de marzo en Thompson Pueblo Libre.');
INSERT INTO construction_progress (id, title, date, media_url, description) VALUES
  ('progress_april_2026', 'Avance de Obra - Abril', 1711929600, 'progress/april_2026.mp4', 'Continuamos con el progreso de la edificación, mostrando los hitos alcanzados en el mes de abril.');

-- ============================================================================
-- 7. GALLERY COLLECTIONS
-- ============================================================================
INSERT INTO gallery_collections (id, title, description, cover_image, is_active) VALUES
  ('general', 'General', 'Vista general del proyecto Santa Fe 190.', 'https://placehold.co/600x400/1a1a1a/ffffff?text=General+Cover', 1);
INSERT INTO gallery_collections (id, title, description, cover_image, is_active) VALUES
  ('amenities', 'Amenities', 'Áreas comunes y amenidades del edificio.', 'https://placehold.co/600x400/1a1a1a/ffffff?text=Amenities+Cover', 1);

-- ============================================================================
-- 8. LOCATIONS POI (70 Points of Interest)
-- ============================================================================
INSERT INTO locations_poi (id, name, category, image_path, longitude, latitude, is_active) VALUES ('0d6dd416b022ec425411c6e6440e3dfd', 'Interbank', 'Finanzas', 'icons/FINANZAS/interbank.png', -77.064667, -12.077828, 1);
INSERT INTO locations_poi (id, name, category, image_path, longitude, latitude, is_active) VALUES ('0d8350fa4447b50ae7504b60f2318160', 'Inkafarma', 'Salud y bienestar', 'icons/SALUD_Y_BIENESTAR/inkafarma.png', -77.064755, -12.078001, 1);
INSERT INTO locations_poi (id, name, category, image_path, longitude, latitude, is_active) VALUES ('0f4e68df495d50ca3e9f2298b48a5413', 'Tambo', 'Comercio', 'icons/COMERCIO/tambo.png', -77.074779, -12.07736, 1);
INSERT INTO locations_poi (id, name, category, image_path, longitude, latitude, is_active) VALUES ('10b8f43e4e30e8e7a46a971e4bd10d18', 'BBVA', 'Finanzas', 'icons/FINANZAS/bbva.png', -77.065183, -12.077816, 1);
INSERT INTO locations_poi (id, name, category, image_path, longitude, latitude, is_active) VALUES ('18c7baabb6f62f23ffcfe0a9edb6f0fd', 'Norky''s', 'Restaurantes', 'icons/RESTAURANTES/norkys.png', -77.063563, -12.075661, 1);
INSERT INTO locations_poi (id, name, category, image_path, longitude, latitude, is_active) VALUES ('1b1b41fda6a1a2f6b5fece85dd30e02e', 'Tailoy', 'Comercio', 'icons/COMERCIO/tailoy.png', -77.063651, -12.07555, 1);
INSERT INTO locations_poi (id, name, category, image_path, longitude, latitude, is_active) VALUES ('1c3a5c3e0d93f93cbbb25f57b0e15b4e', 'Parque La Luna', 'Áreas verdes y Recreación', 'icons/AREAS_VERDES_Y_RECREACION/parque_7.png', -77.069281, -12.079321, 1);
INSERT INTO locations_poi (id, name, category, image_path, longitude, latitude, is_active) VALUES ('43c223e3620ff54d6e3ed0988b9e7142', 'Villa Chicken', 'Restaurantes', 'icons/RESTAURANTES/villa_chicken.png', -77.063495, -12.075848, 1);
INSERT INTO locations_poi (id, name, category, image_path, longitude, latitude, is_active) VALUES ('451b483734f6391a3f68f27a9ed03972', 'Veterinaria Hurón Azul', 'Salud y bienestar', 'icons/SALUD_Y_BIENESTAR/huron_azul.png', -77.065332, -12.078276, 1);
INSERT INTO locations_poi (id, name, category, image_path, longitude, latitude, is_active) VALUES ('459e9a496eba4a20e11668eb3db216bb', 'Banco Pichincha', 'Finanzas', 'icons/FINANZAS/pichincha.png', -77.05454, -12.086912, 1);
INSERT INTO locations_poi (id, name, category, image_path, longitude, latitude, is_active) VALUES ('4b1cf7b53c56d6733a591420d5148213', 'Universidad San Martín de Porres', 'Educación', 'icons/EDUCACION/san_martin.png', -77.062196, -12.071962, 1);
INSERT INTO locations_poi (id, name, category, image_path, longitude, latitude, is_active) VALUES ('4b8c55c295b61be1fd157f65c7e222ea', 'Parque Daniel Hernández', 'Áreas verdes y Recreación', 'icons/AREAS_VERDES_Y_RECREACION/parque_1.png', -77.068771, -12.076559, 1);
INSERT INTO locations_poi (id, name, category, image_path, longitude, latitude, is_active) VALUES ('4c6ff10fbca230e8e0e95c27cc77229d', 'Parque Rochdale', 'Áreas verdes y Recreación', 'icons/AREAS_VERDES_Y_RECREACION/parque_6.png', -77.072733, -12.075321, 1);
INSERT INTO locations_poi (id, name, category, image_path, longitude, latitude, is_active) VALUES ('5011d189d82b70a4abaa3d0fac086114', 'Mercado Pachacutec', 'Comercio', 'icons/COMERCIO/mercado.png', -77.07227, -12.076306, 1);
INSERT INTO locations_poi (id, name, category, image_path, longitude, latitude, is_active) VALUES ('519b579d7f0420d44c37bb024334de01', 'Mercado de Pueblo Libre', 'Comercio', 'icons/COMERCIO/mercado.png', -77.058966, -12.078425, 1);
INSERT INTO locations_poi (id, name, category, image_path, longitude, latitude, is_active) VALUES ('534d93b92375bb856e32d1216b7cdf78', 'Guardería Creative Kids', 'Educación', 'icons/EDUCACION/preescolar_2.png', -77.071221, -12.075672, 1);
INSERT INTO locations_poi (id, name, category, image_path, longitude, latitude, is_active) VALUES ('57747a21a2b8ea520116d0ed2bbab44f', 'Organa', 'Comercio', 'icons/COMERCIO/organa.png', -77.063806, -12.07546, 1);
INSERT INTO locations_poi (id, name, category, image_path, longitude, latitude, is_active) VALUES ('58caba9363b624c8838fa4a8818fb37f', 'El Bolivariano', 'Restaurantes', 'icons/RESTAURANTES/bolivariano.png', -77.063854, -12.076768, 1);
INSERT INTO locations_poi (id, name, category, image_path, longitude, latitude, is_active) VALUES ('64920e3c55054d2d239d92d1513a282b', 'Cancha Sintética Arena 7', 'Lifestyle', 'icons/LIFESTYLE/estadio.png', -77.075515, -12.081005, 1);
INSERT INTO locations_poi (id, name, category, image_path, longitude, latitude, is_active) VALUES ('6bea0d9bc295d7f2c48919620c73635b', 'Estadio La Unión', 'Lifestyle', 'icons/LIFESTYLE/estadio.png', -77.076631, -12.07302, 1);
INSERT INTO locations_poi (id, name, category, image_path, longitude, latitude, is_active) VALUES ('6de1c0238c6d6c109db67ffbc9ddfd3b', 'Plaza San Miguel', 'Comercio', 'icons/COMERCIO/plaza_san_miguel.png', -77.083439, -12.077439, 1);
INSERT INTO locations_poi (id, name, category, image_path, longitude, latitude, is_active) VALUES ('6e8341a0c157fe68565452d983a53d7e', 'Tottus', 'Comercio', 'icons/COMERCIO/tottus.png', -77.088416, -12.079392, 1);
INSERT INTO locations_poi (id, name, category, image_path, longitude, latitude, is_active) VALUES ('72542dc438813f125e44e9312de930bc', 'Cajero Interbank', 'Finanzas', 'icons/FINANZAS/cajeros.png', -77.065583, -12.072702, 1);
INSERT INTO locations_poi (id, name, category, image_path, longitude, latitude, is_active) VALUES ('745ce753df5567bb638dceac84bc7535', 'Oxxo', 'Comercio', 'icons/COMERCIO/oxxo.png', -77.066612, -12.07255, 1);
INSERT INTO locations_poi (id, name, category, image_path, longitude, latitude, is_active) VALUES ('784e5f6cf3fd6a7b9107fdd8bb11a259', 'Cajero Scotiabank', 'Finanzas', 'icons/FINANZAS/cajeros.png', -77.079853, -12.074275, 1);
INSERT INTO locations_poi (id, name, category, image_path, longitude, latitude, is_active) VALUES ('7d136b9678d6ebf5994a7229521dea08', 'Centro Cultural Peruano Japonés', 'Educación', 'icons/EDUCACION/peruano_japones.png', -77.055263, -12.087486, 1);
INSERT INTO locations_poi (id, name, category, image_path, longitude, latitude, is_active) VALUES ('7d5e45c42c7385f6a157cfe71d8ae7de', 'Colegio San Martín de Porres', 'Educación', 'icons/EDUCACION/colegio_1.png', -77.063276, -12.077993, 1);
INSERT INTO locations_poi (id, name, category, image_path, longitude, latitude, is_active) VALUES ('826a7278a0286797344721267e1b7fbe', 'Preescolar Santísima Virgen del Carmen', 'Educación', 'icons/EDUCACION/preescolar_4.png', -77.069062, -12.075191, 1);
INSERT INTO locations_poi (id, name, category, image_path, longitude, latitude, is_active) VALUES ('88ad43e3484cc97d518e88ad3e4de0ed', 'Complejo Deportivo Túpac Amaru', 'Lifestyle', 'icons/LIFESTYLE/estadio.png', -77.072848, -12.073436, 1);
INSERT INTO locations_poi (id, name, category, image_path, longitude, latitude, is_active) VALUES ('89b8f869f0ff670e96f53ad10282a598', 'Tambo', 'Comercio', 'icons/COMERCIO/tambo.png', -77.068963, -12.072066, 1);
INSERT INTO locations_poi (id, name, category, image_path, longitude, latitude, is_active) VALUES ('93c6b6fb2b8da0482799eaa6bac597b3', 'Smartfit San Miguel', 'Lifestyle', 'icons/LIFESTYLE/smartfit.png', -77.081044, -12.07665, 1);
INSERT INTO locations_poi (id, name, category, image_path, longitude, latitude, is_active) VALUES ('97171c938c9f0567a8f9258dbe62e571', 'Inkafarma', 'Salud y bienestar', 'icons/SALUD_Y_BIENESTAR/inkafarma.png', -77.064907, -12.075426, 1);
INSERT INTO locations_poi (id, name, category, image_path, longitude, latitude, is_active) VALUES ('99c74b64743db4f57b83ae1809821889', 'Universidad del Pacífico', 'Educación', 'icons/EDUCACION/pacifico.png', -77.048522, -12.082959, 1);
INSERT INTO locations_poi (id, name, category, image_path, longitude, latitude, is_active) VALUES ('9cf397c8b2e81726413a18200897ebf6', 'Plaza Vea Sucre', 'Comercio', 'icons/COMERCIO/plaza_vea.png', -77.064622, -12.076064, 1);
INSERT INTO locations_poi (id, name, category, image_path, longitude, latitude, is_active) VALUES ('a5476417e9eef65e6a0b01aaced652d4', 'Bembos', 'Restaurantes', 'icons/RESTAURANTES/bembos.png', -77.063254, -12.075401, 1);
INSERT INTO locations_poi (id, name, category, image_path, longitude, latitude, is_active) VALUES ('a6b9b8a11ad5642e2b18721bfa8f306b', 'Master Kong', 'Restaurantes', 'icons/RESTAURANTES/master_kong.png', -77.063299, -12.075685, 1);
INSERT INTO locations_poi (id, name, category, image_path, longitude, latitude, is_active) VALUES ('a8db27ac26e86350a170934ffd1499b5', 'BCP', 'Finanzas', 'icons/FINANZAS/bcp.png', -77.064871, -12.077489, 1);
INSERT INTO locations_poi (id, name, category, image_path, longitude, latitude, is_active) VALUES ('abc6c122d1ef3ca88ad3acd07a1282f0', 'Parque Gianoli', 'Áreas verdes y Recreación', 'icons/AREAS_VERDES_Y_RECREACION/parque_3.png', -77.066401, -12.077542, 1);
INSERT INTO locations_poi (id, name, category, image_path, longitude, latitude, is_active) VALUES ('ae1766672f1e0115adbf3d4a2bbdb1c4', 'Mifarma', 'Salud y bienestar', 'icons/SALUD_Y_BIENESTAR/mifarma.png', -77.063962, -12.075482, 1);
INSERT INTO locations_poi (id, name, category, image_path, longitude, latitude, is_active) VALUES ('aee17551a5e7ba4ba42e4f475a767d06', 'Parque Santa Fé', 'Áreas verdes y Recreación', 'icons/AREAS_VERDES_Y_RECREACION/parque_2.png', -77.066679, -12.076344, 1);
INSERT INTO locations_poi (id, name, category, image_path, longitude, latitude, is_active) VALUES ('afca829a32da0a76ff53ed01f73f0ee6', 'Tambo', 'Comercio', 'icons/COMERCIO/tambo.png', -77.06443, -12.077714, 1);
INSERT INTO locations_poi (id, name, category, image_path, longitude, latitude, is_active) VALUES ('b1b1ae4420e9c3166d1e38210d9807b8', 'Santa Fe', '', 'santa_fe', -77.067632, -12.07592, 1);
INSERT INTO locations_poi (id, name, category, image_path, longitude, latitude, is_active) VALUES ('b61bd158cf8fd9fb1d94dc6c2407abf3', 'Parque El Carmen', 'Áreas verdes y Recreación', 'icons/AREAS_VERDES_Y_RECREACION/parque_4.png', -77.06745, -12.074064, 1);
INSERT INTO locations_poi (id, name, category, image_path, longitude, latitude, is_active) VALUES ('b839724e385205de7d0ae3c49111358f', 'Scotiabank', 'Finanzas', 'icons/FINANZAS/scotiabank.png', -77.065148, -12.077981, 1);
INSERT INTO locations_poi (id, name, category, image_path, longitude, latitude, is_active) VALUES ('be00127fffe8897532c549b1a57f405f', 'UPC San Miguel', 'Educación', 'icons/EDUCACION/upc.png', -77.093714, -12.076745, 1);
INSERT INTO locations_poi (id, name, category, image_path, longitude, latitude, is_active) VALUES ('bff3707763cfd7d5a7ce39913e46f0a0', 'Mass', 'Comercio', 'icons/COMERCIO/mass_1.png', -77.064507, -12.075439, 1);
INSERT INTO locations_poi (id, name, category, image_path, longitude, latitude, is_active) VALUES ('c7576800aed825326dcb2fd6e2b85470', 'PUCP', 'Educación', 'icons/EDUCACION/pucp.png', -77.078517, -12.069061, 1);
INSERT INTO locations_poi (id, name, category, image_path, longitude, latitude, is_active) VALUES ('c94200722d610ec04e900629b1c45f25', 'Preescolar Caritas Alegres', 'Educación', 'icons/EDUCACION/preescolar_1.png', -77.063796, -12.07949, 1);
INSERT INTO locations_poi (id, name, category, image_path, longitude, latitude, is_active) VALUES ('cb6e7bc278760fdbc2aa67921f324867', 'Parque Héroes de la Policía Nacional', 'Áreas verdes y Recreación', 'icons/AREAS_VERDES_Y_RECREACION/parque_8.png', -77.065328, -12.076574, 1);
INSERT INTO locations_poi (id, name, category, image_path, longitude, latitude, is_active) VALUES ('cbf25a81a8130f42fe5d85a9e51151a1', 'Shalom', 'Lifestyle', 'icons/LIFESTYLE/shalom.png', -77.064887, -12.072441, 1);
INSERT INTO locations_poi (id, name, category, image_path, longitude, latitude, is_active) VALUES ('ceb43f945be6d57389813f35f9691f46', 'Cajero BCP', 'Finanzas', 'icons/FINANZAS/cajeros.png', -77.067127, -12.083385, 1);
INSERT INTO locations_poi (id, name, category, image_path, longitude, latitude, is_active) VALUES ('cf562f00dc726843891aa2832019e3e5', 'Parque Santa María Magdalena', 'Áreas verdes y Recreación', 'icons/AREAS_VERDES_Y_RECREACION/parque_5.png', -77.070911, -12.075844, 1);
INSERT INTO locations_poi (id, name, category, image_path, longitude, latitude, is_active) VALUES ('d073bf1753e854c66ed6f7f7ee905668', 'Colegio San Genaro', 'Educación', 'icons/EDUCACION/colegio_2.png', -77.067566, -12.077431, 1);
INSERT INTO locations_poi (id, name, category, image_path, longitude, latitude, is_active) VALUES ('d10cfb097c18de318a487636de020774', 'Mass', 'Comercio', 'icons/COMERCIO/mass_2.png', -77.068127, -12.077883, 1);
INSERT INTO locations_poi (id, name, category, image_path, longitude, latitude, is_active) VALUES ('d234a92aa212edf04af6a9de0c875933', 'Museo Larco Cafe', 'Restaurantes', 'icons/RESTAURANTES/museo_larco.png', -77.070721, -12.072223, 1);
INSERT INTO locations_poi (id, name, category, image_path, longitude, latitude, is_active) VALUES ('d9ca5fae722bfe099e2853b21d4e5558', 'Cineplanet', 'Lifestyle', 'icons/LIFESTYLE/cineplanet.png', -77.083389, -12.076213, 1);
INSERT INTO locations_poi (id, name, category, image_path, longitude, latitude, is_active) VALUES ('dfb81f162e21fe0aa80596e097f04862', 'Cajero BBVA', 'Finanzas', 'icons/FINANZAS/cajeros.png', -77.066334, -12.072166, 1);
INSERT INTO locations_poi (id, name, category, image_path, longitude, latitude, is_active) VALUES ('e75bc1b8fba1960e8fd841647a724bbf', 'Parque de las Leyendas', 'Áreas verdes y Recreación', 'icons/AREAS_VERDES_Y_RECREACION/parque_9.png', -77.0868, -12.07271, 1);
INSERT INTO locations_poi (id, name, category, image_path, longitude, latitude, is_active) VALUES ('e92531a2160619f33a29e5176b6d120d', 'Oxxo', 'Comercio', 'icons/COMERCIO/oxxo.png', -77.067626, -12.078405, 1);
INSERT INTO locations_poi (id, name, category, image_path, longitude, latitude, is_active) VALUES ('eac4fb38c28f8c79cb4e12e9a646c3fd', 'Policlínico San Miguel', 'Salud y bienestar', 'icons/SALUD_Y_BIENESTAR/hospital.png', -77.079772, -12.078831, 1);
INSERT INTO locations_poi (id, name, category, image_path, longitude, latitude, is_active) VALUES ('f0b21eb270d9a2bb0ef96d1df049e665', 'Preescolar Ciclo Uno', 'Educación', 'icons/EDUCACION/preescolar_3.png', -77.067834, -12.077354, 1);
INSERT INTO locations_poi (id, name, category, image_path, longitude, latitude, is_active) VALUES ('f7677d20f20c58cdcd798957ad6600d0', 'Municipalidad de Pueblo Libre', 'Lifestyle', 'icons/LIFESTYLE/municipalidad.png', -77.062485, -12.078094, 1);

-- ============================================================================
-- 9. GLOBAL SETTINGS (App Configuration as JSON)
-- ============================================================================
INSERT INTO global_settings (id, config) VALUES ('app_config', '{
  "appName": "Santa Fe",
  "appDescription": "Santa Fe 190 Edificio boutique de lujo en Pueblo Libre, Lima.",
  "domainName": "santa-fe.pe",
  "resend": {
    "fromNoReply": "Santa Fe <noreply@kayen.work>",
    "fromAdmin": "Admin at Kayen <admin@kayen.work>",
    "supportEmail": "ventas@kayeninmobiliaria.com"
  },
  "colors": {
    "theme": "light",
    "main": "#F59C1D"
  },
  "company": {
    "name": "Santa Fe",
    "address": "Pueblo Libre, Lima",
    "buildingName": "Santa Fe 190",
    "buildingAddress": "Santa Fe 190, Pueblo Libre, Lima",
    "email": "ventas@santafe.kayeninmobiliaria.com",
    "website": "https://santafe.kayeninmobiliaria.com/",
    "maquetaUrl": "https://rvisioon.shapespark.com/edificio_santa_fe/",
    "buildingSocials": {
      "facebook": "https://www.facebook.com/kayengrupoinmobiliario?ref=1",
      "instagram": "https://www.instagram.com/kayen_grupoinmobiliario",
      "tiktok": "https://www.tiktok.com/@kayen_grupoinmobiliario"
    },
    "realStateName": "Kayen",
    "realStateSlogan": "Construimos experiencias, diseñando hogares.",
    "realStateSocials": {
      "facebook": "https://www.facebook.com/kayengrupoinmobiliario?ref=1",
      "instagram": "https://www.instagram.com/kayen_grupoinmobiliario",
      "tiktok": "https://www.tiktok.com/@kayen_grupoinmobiliario"
    },
    "developer": "RVISIOON.pe",
    "developerSlogan": "Convertimos tus ideas en experiencias que inspiran, emocionan y comunican.",
    "developerSocials": {
      "facebook": "https://www.facebook.com/rvisioon",
      "instagram": "https://www.instagram.com/rvisioon",
      "tiktok": "https://www.tiktok.com/@rvisioon"
    }
  }
}');

-- ============================================================================
-- 9. ANALYTICS & PROSPECTS DUMMY DATA
-- ============================================================================
-- Prospects
INSERT INTO prospects (id, name, email, phone, address, created_at, updated_at) VALUES
  ('prospect_1', 'Juan Pérez', 'juan.perez@example.com', '987654321', 'Av. Larco 123, Miraflores', strftime('%s', 'now') * 1000 - 3600000 * 24 * 5, strftime('%s', 'now') * 1000 - 3600000 * 24 * 5),
  ('prospect_2', 'María Rodríguez', 'maria.r@example.com', '912345678', 'Calle Las Flores 456, San Isidro', strftime('%s', 'now') * 1000 - 3600000 * 24 * 12, strftime('%s', 'now') * 1000 - 3600000 * 24 * 12),
  ('prospect_3', 'Carlos Mendoza', 'carlos.mendoza@example.com', '955443322', 'Av. Arequipa 3500, Lince', strftime('%s', 'now') * 1000 - 3600000 * 24 * 35, strftime('%s', 'now') * 1000 - 3600000 * 24 * 35),
  ('prospect_4', 'Ana Gómez', 'ana.gomez@example.com', '944332211', 'Calle Grau 789, Barranco', strftime('%s', 'now') * 1000 - 3600000 * 24 * 40, strftime('%s', 'now') * 1000 - 3600000 * 24 * 40);

-- Prospect Units
INSERT INTO prospect_units (id, prospect_id, unit_id, created_at) VALUES
  ('pu_1', 'prospect_1', 'unit_2_201', strftime('%s', 'now') * 1000 - 3600000 * 24 * 5),
  ('pu_2', 'prospect_2', 'unit_2_202', strftime('%s', 'now') * 1000 - 3600000 * 24 * 12),
  ('pu_3', 'prospect_3', 'unit_8_801', strftime('%s', 'now') * 1000 - 3600000 * 24 * 35);

-- Logs (Unit State Transitions)
INSERT INTO logs (id, user_id, user_name, action, entity_type, entity_id, details, created_at) VALUES
  ('log_seed_1', 'df1e78a6-56a7-47b2-bdcf-88aefcd19a6b', 'Super Admin', 'UPDATE', 'unit', 'unit_2_201', '{"identifier":"201","transition":"AVAILABLE -> RESERVED"}', strftime('%s', 'now') * 1000 - 3600000 * 24 * 4),
  ('log_seed_2', 'df1e78a6-56a7-47b2-bdcf-88aefcd19a6b', 'Super Admin', 'UPDATE', 'unit', 'unit_2_202', '{"identifier":"202","transition":"AVAILABLE -> RESERVED"}', strftime('%s', 'now') * 1000 - 3600000 * 24 * 10),
  ('log_seed_3', 'df1e78a6-56a7-47b2-bdcf-88aefcd19a6b', 'Super Admin', 'UPDATE', 'unit', 'unit_8_801', '{"identifier":"801","transition":"AVAILABLE -> RESERVED"}', strftime('%s', 'now') * 1000 - 3600000 * 24 * 32);

-- Page Views (Current month vs last month, different devices)
-- Desktop Views
INSERT INTO page_views (id, path, unit_id, device_type, created_at) VALUES
  ('pv_d_1', '/', NULL, 'desktop', strftime('%s', 'now') * 1000 - 3600000 * 24 * 1),
  ('pv_d_2', '/showroom', NULL, 'desktop', strftime('%s', 'now') * 1000 - 3600000 * 24 * 2),
  ('pv_d_3', '/unidad/unit_2_201', 'unit_2_201', 'desktop', strftime('%s', 'now') * 1000 - 3600000 * 24 * 2),
  ('pv_d_4', '/unidad/unit_2_202', 'unit_2_202', 'desktop', strftime('%s', 'now') * 1000 - 3600000 * 24 * 3),
  ('pv_d_5', '/unidad/unit_8_801', 'unit_8_801', 'desktop', strftime('%s', 'now') * 1000 - 3600000 * 24 * 4),
  ('pv_d_6', '/unidad/unit_4_402', 'unit_4_402', 'desktop', strftime('%s', 'now') * 1000 - 3600000 * 24 * 5),
  ('pv_d_7', '/unidad/unit_3_301', 'unit_3_301', 'desktop', strftime('%s', 'now') * 1000 - 3600000 * 24 * 6),
  ('pv_d_8', '/unidad/unit_2_201', 'unit_2_201', 'desktop', strftime('%s', 'now') * 1000 - 3600000 * 24 * 7),
  -- Last Month Desktop
  ('pv_lm_d_1', '/', NULL, 'desktop', strftime('%s', 'now') * 1000 - 3600000 * 24 * 32),
  ('pv_lm_d_2', '/showroom', NULL, 'desktop', strftime('%s', 'now') * 1000 - 3600000 * 24 * 33);

-- Mobile Views
INSERT INTO page_views (id, path, unit_id, device_type, created_at) VALUES
  ('pv_m_1', '/', NULL, 'mobile', strftime('%s', 'now') * 1000 - 3600000 * 24 * 1),
  ('pv_m_2', '/showroom', NULL, 'mobile', strftime('%s', 'now') * 1000 - 3600000 * 24 * 1),
  ('pv_m_3', '/unidad/unit_2_201', 'unit_2_201', 'mobile', strftime('%s', 'now') * 1000 - 3600000 * 24 * 2),
  ('pv_m_4', '/unidad/unit_2_201', 'unit_2_201', 'mobile', strftime('%s', 'now') * 1000 - 3600000 * 24 * 2),
  ('pv_m_5', '/unidad/unit_2_202', 'unit_2_202', 'mobile', strftime('%s', 'now') * 1000 - 3600000 * 24 * 3),
  ('pv_m_6', '/unidad/unit_8_801', 'unit_8_801', 'mobile', strftime('%s', 'now') * 1000 - 3600000 * 24 * 3),
  ('pv_m_7', '/unidad/unit_8_801', 'unit_8_801', 'mobile', strftime('%s', 'now') * 1000 - 3600000 * 24 * 4),
  ('pv_m_8', '/unidad/unit_4_402', 'unit_4_402', 'mobile', strftime('%s', 'now') * 1000 - 3600000 * 24 * 5),
  ('pv_m_9', '/unidad/unit_3_301', 'unit_3_301', 'mobile', strftime('%s', 'now') * 1000 - 3600000 * 24 * 6),
  -- Last Month Mobile
  ('pv_lm_m_1', '/', NULL, 'mobile', strftime('%s', 'now') * 1000 - 3600000 * 24 * 32),
  ('pv_lm_m_2', '/showroom', NULL, 'mobile', strftime('%s', 'now') * 1000 - 3600000 * 24 * 34),
  ('pv_lm_m_3', '/unidad/unit_2_201', 'unit_2_201', 'mobile', strftime('%s', 'now') * 1000 - 3600000 * 24 * 35);

-- Tablet Views
INSERT INTO page_views (id, path, unit_id, device_type, created_at) VALUES
  ('pv_t_1', '/', NULL, 'tablet', strftime('%s', 'now') * 1000 - 3600000 * 24 * 2),
  ('pv_t_2', '/unidad/unit_2_201', 'unit_2_201', 'tablet', strftime('%s', 'now') * 1000 - 3600000 * 24 * 3),
  -- Last Month Tablet
  ('pv_lm_t_1', '/', NULL, 'tablet', strftime('%s', 'now') * 1000 - 3600000 * 24 * 36);

-- ============================================================================
-- 10. MEDIA (Amenities, Video Portada, Video Principal)
-- ============================================================================
INSERT INTO media (id, title, url, type, category, is_active) VALUES
  ('a1111111-2222-3333-4444-555555555551', 'Amenidad 1', 'amenities/1.png', 'image/png', 'AMENITIES_GALLERY', 1),
  ('a1111111-2222-3333-4444-555555555552', 'Amenidad 2', 'amenities/2.png', 'image/png', 'AMENITIES_GALLERY', 1),
  ('a1111111-2222-3333-4444-555555555553', 'Amenidad 3', 'amenities/3.png', 'image/png', 'AMENITIES_GALLERY', 1),
  ('a1111111-2222-3333-4444-555555555554', 'Amenidad 4', 'amenities/4.png', 'image/png', 'AMENITIES_GALLERY', 1),
  ('a1111111-2222-3333-4444-555555555555', 'Amenidad 5', 'amenities/5.png', 'image/png', 'AMENITIES_GALLERY', 1),
  ('a1111111-2222-3333-4444-555555555556', 'Amenidad 6', 'amenities/6.png', 'image/png', 'AMENITIES_GALLERY', 1),
  ('a1111111-2222-3333-4444-555555555557', 'Amenidad 7', 'amenities/7.png', 'image/png', 'AMENITIES_GALLERY', 1),
  ('a1111111-2222-3333-4444-555555555558', 'Amenidad 8', 'amenities/8.png', 'image/png', 'AMENITIES_GALLERY', 1),
  ('a1111111-2222-3333-4444-555555555559', 'Amenidad 12', 'amenities/12.png', 'image/png', 'AMENITIES_GALLERY', 1),
  ('v1111111-2222-3333-4444-555555555551', 'Vídeo Portada Principal', '/videos/walk.mp4', 'video/mp4', 'VIDEO_PORTADA', 1),
  ('v1111111-2222-3333-4444-555555555552', 'Vídeo Principal Showroom', '/videos/walk.mp4', 'video/mp4', 'VIDEO_SIDEBAR', 1);

PRAGMA foreign_keys = ON;

