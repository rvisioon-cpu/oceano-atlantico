-- Insert default production users

-- 1. Super Admin
INSERT INTO users (id, name, email, password, role, admin_limit, created_by, created_at, updated_at)
VALUES (
  'df1e78a6-56a7-47b2-bdcf-88aefcd19a6b',
  'Super Admin',
  'super_admin@showroom-template.com',
  '$2b$10$1Yz/QZiIu/nx//mQwrTheu9F.m6/cOZn/DatGnYvwxlxrS6ByKeOG',
  'SUPER_ADMIN',
  0,
  NULL,
  strftime('%s', 'now') * 1000,
  strftime('%s', 'now') * 1000
);

-- 2. Super Admin (Andres Pluska)
INSERT INTO users (id, name, email, password, role, admin_limit, created_by, created_at, updated_at)
VALUES (
  'a64bd2e3-29e7-47b7-bdcf-88aefcd19a6b',
  'Andres Pluska',
  'pluskaandres@gmail.com',
  '$2b$10$m9QehmPyXvoygRe3bVeOoesgMFC9cOiZgB.2s6hh8CLeEGFkMviQC',
  'SUPER_ADMIN',
  0,
  NULL,
  strftime('%s', 'now') * 1000,
  strftime('%s', 'now') * 1000
);

-- 2.5 Admin (Rvisioon)
INSERT INTO users (id, name, email, password, role, admin_limit, created_by, created_at, updated_at)
VALUES (
  'e64bd2e3-29e7-47b7-bdcf-88aefcd19a6b',
  'Rvisioon',
  'rvisioon@gmail.com',
  '$2b$10$X5hNYS1aZ3AJgZy6sk7Uz.H6q8m0ROr39LBpDMmFFg1Pi5jA/FcsC',
  'ADMIN',
  5,
  'df1e78a6-56a7-47b2-bdcf-88aefcd19a6b',
  strftime('%s', 'now') * 1000,
  strftime('%s', 'now') * 1000
);

-- 3. Seller
INSERT INTO users (id, name, email, password, role, admin_limit, created_by, created_at, updated_at)
VALUES (
  '37a77b61-29e7-47b7-bdcf-88aefcd19a6b',
  'Seller',
  'seller@showroom-template.com',
  '$2b$10$2wgdaPvAUATljAndJ2NwMeWyaewVhyZNxcxqPDANB8OwpejtZQnJi',
  'SELLER',
  0,
  'a64bd2e3-29e7-47b7-bdcf-88aefcd19a6b',
  strftime('%s', 'now') * 1000,
  strftime('%s', 'now') * 1000
);
