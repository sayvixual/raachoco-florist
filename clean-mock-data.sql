-- ============================================================
-- RAACHOCO FLORIST — PEMBERSIHAN DATA MOCK / DUMMY
-- ============================================================
-- Jalankan skrip ini di Supabase Dashboard → SQL Editor
-- untuk mengosongkan semua data buket contoh/dummy sehingga Anda
-- dapat mulai menginput dan mengelola buket asli toko Anda sendiri.
-- ============================================================

-- 1. Kosongkan tabel produk buket (menghapus semua produk dummy)
TRUNCATE TABLE products CASCADE;

-- 2. Reset urutan ID produk (opsional, agar ID mulai rapi dari 1)
-- ALTER SEQUENCE products_id_seq RESTART WITH 1;

-- 3. (Opsional) Jika ingin mereset kategori ke default bersih:
-- TRUNCATE TABLE categories CASCADE;
-- INSERT INTO categories (name, slug, sort_order) VALUES
--   ('Buket Andalan', 'bouquet', 1),
--   ('Flower Box', 'flower-box', 2),
--   ('Pastel Manis', 'pastel', 3),
--   ('Vas & Meja', 'vase', 4),
--   ('Pernikahan', 'wedding', 5),
--   ('Kado Kenangan', 'keepsake', 6),
--   ('Buket Wisuda', 'graduation', 7),
--   ('Buket Custom', 'custom', 8);

-- Selesai! Sekarang database Anda bersih dan siap menerima data asli dari Ruang Kelola (kelola-toko-secret-8899.html).
