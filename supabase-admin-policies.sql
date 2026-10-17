-- ============================================================
-- RAACHOCO FLORIST — Kebijakan Keamanan RLS (Production Hardened)
-- ============================================================
-- PRD.md §7 & OWASP API Security:
-- 1. Publik (anon) HANYA diizinkan MEMBACA (SELECT / Read-Only).
-- 2. Modifikasi (INSERT, UPDATE, DELETE) HANYA untuk role authenticated (Owner yang login).
-- 3. Mencegah penghapusan atau pengubahan katalog & nomor WhatsApp oleh pihak tak berwenang.
-- ============================================================

-- 1. Cabut semua hak tulis dari role anon (Mencegah Database Defacement / Hijacking)
revoke insert, update, delete on products from anon;
revoke insert, update, delete on site_config from anon;
revoke insert, update, delete on categories from anon;
revoke insert, update, delete on testimonials from anon;
revoke insert, update, delete on social_links from anon;

-- Pastikan anon dan authenticated tetap bisa membaca katalog toko
grant select on products to anon, authenticated;
grant select on site_config to anon, authenticated;
grant select on categories to anon, authenticated;
grant select on testimonials to anon, authenticated;
grant select on social_links to anon, authenticated;

-- Berikan izin tulis HANYA ke role authenticated (Owner/Admin)
grant insert, update, delete on products to authenticated;
grant insert, update, delete on site_config to authenticated;
grant insert, update, delete on categories to authenticated;
grant insert, update, delete on testimonials to authenticated;
grant insert, update, delete on social_links to authenticated;

-- ============================================================
-- 2. HAPUS POLICY TIDAK AMAN LAMA (Yang mengizinkan anon write)
-- ============================================================
drop policy if exists "Admin insert: products" on products;
drop policy if exists "Admin update: products" on products;
drop policy if exists "Admin delete: products" on products;
drop policy if exists "Admin update: site_config" on site_config;
drop policy if exists "Admin insert: categories" on categories;
drop policy if exists "Admin update: categories" on categories;
drop policy if exists "Admin delete: categories" on categories;

-- ============================================================
-- 3. BUAT POLICY BARU: HANYA AUTHENTICATED YANG BISA TULIS
-- ============================================================

-- Tabel: products
create policy "Authenticated insert: products" on products
  for insert to authenticated with check (true);

create policy "Authenticated update: products" on products
  for update to authenticated using (true) with check (true);

create policy "Authenticated delete: products" on products
  for delete to authenticated using (true);

-- Tabel: site_config (Pengaturan Toko & Nomor WhatsApp)
create policy "Authenticated update: site_config" on site_config
  for update to authenticated using (true) with check (true);

-- Tabel: categories
create policy "Authenticated insert: categories" on categories
  for insert to authenticated with check (true);

create policy "Authenticated update: categories" on categories
  for update to authenticated using (true) with check (true);

create policy "Authenticated delete: categories" on categories
  for delete to authenticated using (true);

-- Tabel: testimonials & social_links
create policy "Authenticated insert: testimonials" on testimonials
  for insert to authenticated with check (true);
create policy "Authenticated update: testimonials" on testimonials
  for update to authenticated using (true) with check (true);
create policy "Authenticated delete: testimonials" on testimonials
  for delete to authenticated using (true);

-- ============================================================
-- 4. STORAGE BUCKET "product-images" KEAMANAN FOTO BUKET
-- ============================================================
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do update set public = true;

-- Hapus policy storage lama yang tidak aman
drop policy if exists "Public Upload: product-images" on storage.objects;
drop policy if exists "Public Update: product-images" on storage.objects;
drop policy if exists "Public Delete: product-images" on storage.objects;
drop policy if exists "Public Read: product-images" on storage.objects;
drop policy if exists "Authenticated Upload: product-images" on storage.objects;
drop policy if exists "Authenticated Update: product-images" on storage.objects;
drop policy if exists "Authenticated Delete: product-images" on storage.objects;

-- Publik hanya boleh MELIHAT foto buket (SELECT)
create policy "Public Read: product-images" on storage.objects
  for select to anon, authenticated using (bucket_id = 'product-images');

-- HANYA Owner terotentikasi yang boleh upload foto dengan ekstensi valid (MIME hardening)
create policy "Authenticated Upload: product-images" on storage.objects
  for insert to authenticated
  with check (
    bucket_id = 'product-images' 
    and lower(storage.extension(name)) in ('jpg', 'jpeg', 'png', 'webp')
  );

create policy "Authenticated Update: product-images" on storage.objects
  for update to authenticated
  using (bucket_id = 'product-images')
  with check (
    bucket_id = 'product-images'
    and lower(storage.extension(name)) in ('jpg', 'jpeg', 'png', 'webp')
  );

create policy "Authenticated Delete: product-images" on storage.objects
  for delete to authenticated
  using (bucket_id = 'product-images');

-- Selesai! Basis data dan media toko kini terlindungi dari akses publik liar.
