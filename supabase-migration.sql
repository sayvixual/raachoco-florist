-- ============================================================
-- RAACHOCO FLORIST — Supabase Database Migration
-- PRD.md §7: Data Model + §Security: RLS public read-only
-- ============================================================
-- Jalankan skrip ini di Supabase Dashboard → SQL Editor
-- ============================================================

-- 1. TABEL: site_config (konfigurasi toko, 1 baris)
create table if not exists site_config (
  id bigint generated always as identity primary key,
  brand_name text not null default 'Raachoco Florist',
  tagline text,
  description text,
  avatar_url text,
  phone text,
  whatsapp_number text not null,
  address text,
  latitude numeric(10,7),
  longitude numeric(10,7),
  opening_hours_json jsonb not null default '{"openHour": 8, "closeHour": 20}'::jsonb,
  timezone text not null default 'Asia/Jakarta',
  timezone_label text not null default 'WIB',
  rating numeric(2,1) default 5.0,
  review_count integer default 0,
  trust_stats_json jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 2. TABEL: categories (filter kategori produk)
create table if not exists categories (
  id bigint generated always as identity primary key,
  name text not null,
  slug text unique not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

-- 3. TABEL: products (data produk buket)
create table if not exists products (
  id bigint generated always as identity primary key,
  slug text unique not null,
  name text not null,
  category_slug text not null references categories(slug),
  category_label text,
  badge text,
  description text,
  stems text,
  price_from integer not null,
  price_formatted text,
  image_url text,
  size text,
  care text,
  availability text,
  is_featured boolean not null default true,
  is_available boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Index for category filtering (most common query pattern)
create index if not exists idx_products_category_slug on products(category_slug);
create index if not exists idx_products_sort_order on products(sort_order);

-- 4. TABEL: testimonials (ulasan pelanggan)
create table if not exists testimonials (
  id bigint generated always as identity primary key,
  customer_name text not null,
  avatar_initials text,
  quote text not null,
  rating integer not null default 5 check (rating between 1 and 5),
  occasion text,
  is_featured boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

-- 5. TABEL: social_links (link sosial media)
create table if not exists social_links (
  id bigint generated always as identity primary key,
  platform text not null,
  label text,
  url text not null,
  sort_order integer not null default 0,
  is_visible boolean not null default true,
  created_at timestamptz not null default now()
);

-- ============================================================
-- ROW LEVEL SECURITY (RLS) — Public Read-Only
-- PRD §7: "RLS enabled; public read-only data; no public write"
-- ============================================================

alter table site_config enable row level security;
alter table categories enable row level security;
alter table products enable row level security;
alter table testimonials enable row level security;
alter table social_links enable row level security;

-- Grant SELECT to anon and authenticated roles
grant select on site_config to anon, authenticated;
grant select on categories to anon, authenticated;
grant select on products to anon, authenticated;
grant select on testimonials to anon, authenticated;
grant select on social_links to anon, authenticated;

-- Public read-only policies (SELECT only, no INSERT/UPDATE/DELETE)
create policy "Public read: site_config" on site_config
  for select to anon, authenticated using (true);

create policy "Public read: categories" on categories
  for select to anon, authenticated using (true);

create policy "Public read: products" on products
  for select to anon, authenticated using (true);

create policy "Public read: testimonials" on testimonials
  for select to anon, authenticated using (true);

create policy "Public read: social_links" on social_links
  for select to anon, authenticated using (true);


-- ============================================================
-- SEED DATA — Migrasi dari data hardcoded di app.js & index.html
-- ============================================================

-- Site Config
insert into site_config (
  brand_name, tagline, description, avatar_url,
  phone, whatsapp_number, address,
  latitude, longitude,
  opening_hours_json, timezone, timezone_label,
  rating, review_count, trust_stats_json
) values (
  'Raachoco Florist',
  'Elegance in Every Bloom',
  'Florist independen di Bandar Lampung. Sejak 2020, kami merangkai bunga segar dan buket artifisial satu per satu dengan gaya modern yang hangat dan estetik.',
  'assets/images/logo-green.png',
  '+62895355302840',
  '62895355302840',
  'Gg. H. Rebo No.61, Pahoman, Kec. Teluk Betung Utara, Kota Bandar Lampung, Lampung 35228',
  -5.4336483,
  105.2714718,
  '{"openHour": 8, "closeHour": 20}'::jsonb,
  'Asia/Jakarta',
  'WIB',
  5.0,
  0,
  '{"buketsent": "2.500+", "since": "2020", "options": "2 Opsi"}'::jsonb
);

-- Categories (urutan sesuai filter rail di index.html)
insert into categories (name, slug, sort_order) values
  ('Buket Andalan', 'bouquet', 1),
  ('Flower Box', 'flower-box', 2),
  ('Pastel Manis', 'pastel', 3),
  ('Vas & Hiasan Meja', 'vase', 4),
  ('Pernikahan', 'wedding', 5),
  ('Kado Kenangan', 'keepsake', 6),
  ('Buket Custom', 'custom', 7);

-- Products (9 produk dari PRODUCTS array di app.js)
insert into products (
  slug, name, category_slug, category_label, badge,
  description, stems, price_from, price_formatted,
  image_url, size, care, availability,
  is_featured, is_available, sort_order
) values
(
  'peony-silk-whisper',
  'Peony & Silk Whisper Bouquet',
  'bouquet', 'Buket Andalan', 'Best Seller',
  'Rangkaian megah dengan bunga peoni impor pilihan yang mekar sempurna dipadukan dengan mawar taman lembut dan helaian pita sutra champagne.',
  'Peoni Putih, Blush Garden Roses, Eucalyptus Cinerea, Pita Sutra Champagne',
  550000, 'Rp 550.000',
  'assets/images/hero-bouquet.jpg',
  'Diameter ±38cm, Tinggi ±48cm',
  'Potong tangkai 1cm tiap 2 hari & letakkan di ruangan ber-AC.',
  'Ready Stock (Same Day Delivery)',
  true, true, 1
),
(
  'royal-emerald-box',
  'The Royal Emerald Box',
  'flower-box', 'Flower Box', 'Exclusive',
  'Kotak silinder matte cream berbalut pita beludru pine green mewah dengan inisial monogram gold foil. Menghadirkan kesan agung dan penuh kehangatan.',
  'Champagne Roses, Buttercup Ranunculus, White Lisianthus, Velvet Pine Ribbon',
  485000, 'Rp 485.000',
  'assets/images/product-flower-box.jpg',
  'Box D 20cm, Bloom Height ±30cm',
  'Siram floral foam dengan 50ml air sejuk setiap pagi.',
  'Ready Stock',
  true, true, 2
),
(
  'seoul-blossom-bloom',
  'Seoul Blossom Chic Posy',
  'pastel', 'Pastel Manis', 'Trending',
  'Inspirasi gaya florist Korea minimalis berbalut kertas frosted translucent dan pita sutra hijau pinus. Pilihan favorit untuk wisuda dan ulang tahun.',
  'Peach Ranunculus, Sweet Peas, Baby Sweet Breath, Frosted Wrapping',
  280000, 'Rp 280.000',
  'assets/images/product-pastel-bouquet.jpg',
  'Tinggi ±42cm',
  'Hindari sinar matahari langsung.',
  'Ready Stock',
  true, true, 3
),
(
  'eternal-glass-keepsake',
  'Eternal Clear Acrylic Keepsake',
  'keepsake', 'Kado Kenangan', 'Tahan 3+ Tahun',
  'Bunga mawar abadi asli yang diawetkan khusus dalam kotak akrilik bening berpita satin dan wax seal emas. Bertahan cantik tanpa perlu air.',
  'Preserved White Eternal Roses, Gold Foliage, Dried Baby Breath, Gold Wax Seal',
  650000, 'Rp 650.000',
  'assets/images/product-gift-box.jpg',
  '22cm x 22cm x 18cm',
  'Simpan di ruangan kering bebas kelembaban tinggi.',
  'Ready Stock',
  true, true, 4
),
(
  'parisian-tulip-bliss',
  'Parisian Spring Tulip Bliss',
  'bouquet', 'Buket Andalan', 'Fresh Bloom',
  'Kombinasi 10 tangkai bunga tulip Holland warna pastel cream dan peach segar dengan gaya pembungkusan Parisian yang sangat bersih dan berkelas.',
  'French Cream & Peach Holland Tulips (10 Stems), Crisp White Wrapping',
  360000, 'Rp 360.000',
  'assets/images/product-tulips.jpg',
  'Tinggi ±40cm',
  'Berikan air es dingin agar mekar tahan lama.',
  'Ready Stock',
  true, true, 5
),
(
  'ribbed-ceramic-centerpiece',
  'Artisan Ribbed Ceramic Centerpiece',
  'vase', 'Vas & Hiasan Meja', 'Home Decor',
  'Vas keramik bertekstur estetik dengan rangkaian hydrangea putih bervolume dan sentuhan aksen dedaunan emas. Siap mempercantik meja tamu atau meja kerja.',
  'White Hydrangea, Champagne Roses, Dusted Gold Leaves, Ribbed Ceramic Vase',
  520000, 'Rp 520.000',
  'assets/images/product-vase.jpg',
  'Tinggi total ±45cm, Vas D 15cm',
  'Ganti air vas setiap 2 hari sekali.',
  'Ready Stock',
  true, true, 6
),
(
  'cascading-orchid-bridal',
  'Cascading Orchid & Lily Grace',
  'wedding', 'Pernikahan', 'Atelier Bridal',
  'Hand bouquet pengantin couture yang menjuntai dramatis nan agung. Simbol kesucian cinta abadi dirancang khusus dengan bunga-bunga premium.',
  'Cascading White Phalaenopsis, Calla Lilies, Gold Eucalyptus, Satin Silk Ribbons',
  1250000, 'Rp 1.250.000',
  'assets/images/product-wedding.jpg',
  'Tinggi juntaian ±55cm',
  'Dirangkai segar pada pagi hari sebelum prosesi pernikahan.',
  'Pre-Order H-3',
  true, true, 7
),
(
  'artisan-atelier-craft',
  'Custom Bespoke Florist Arrangement',
  'keepsake', 'Buket Custom', 'Personalized',
  'Konsultasikan langsung rangkaian idamanmu bersama floral stylist Raachoco. Kami rancang khusus sesuai palet warna dan budget terbaikmu.',
  'Bunga pilihan sesuai request warna, preferensi penerima, dan occasion',
  350000, 'Mulai Rp 350.000',
  'assets/images/gallery-craft.jpg',
  'Custom sesuai pesanan',
  'Petunjuk perawatan lengkap disertakan di dalam kartu.',
  'Same Day Order Available',
  true, true, 8
),
(
  'vintage-crimson-velvet',
  'Vintage Crimson Velvet Rose',
  'bouquet', 'Buket Andalan', 'Habis',
  'Rangkaian mawar merah beludru edisi khusus musiman. Saat ini stok bunga segar untuk varian ini telah habis dipesan.',
  'Crimson Red Roses, Black Bacara Foliage, Velvet Wine Ribbon',
  420000, 'Rp 420.000',
  'assets/images/hero-bouquet.jpg',
  'Diameter ±35cm, Tinggi ±45cm',
  'Edisi terbatas musiman.',
  'Stok Habis (Sold Out)',
  true, false, 9
);

-- Testimonials (3 testimoni dari index.html)
insert into testimonials (customer_name, avatar_initials, quote, rating, occasion, is_featured, sort_order) values
(
  'Tasya Clarissa', 'TC',
  'Cantik banget, wanginya segar, dan wrapping-nya estetik! Pacarku sampai terharu waktu menerimanya di hari wisuda. Sampainya juga tepat waktu, lega banget.',
  5, 'Buket wisuda', true, 1
),
(
  'Kevin Pratama', 'KP',
  'Aku pesan The Royal Flower Box untuk anniversary pernikahan kami. Kotak krem dengan aksen hijaunya terlihat mewah, dan admin WhatsApp-nya ramah banget, sabar menjawab semua pertanyaanku.',
  5, 'Kado anniversary', true, 2
),
(
  'Aurelia & Dimas', 'AD',
  'Bridal bouquet dari Raachoco bikin hari bahagia kami terasa lengkap. Anggreknya menjuntai cantik, dan bunganya tetap segar sampai acara selesai.',
  5, 'Hand bouquet hari pernikahan', true, 3
);

-- Social Links
insert into social_links (platform, label, url, sort_order, is_visible) values
(
  'instagram',
  'Instagram @raachoco.florist',
  'https://www.instagram.com/raachoco.florist/',
  1, true
),
(
  'whatsapp',
  'WhatsApp Raachoco Florist',
  'https://wa.me/62895355302840',
  2, true
);

-- ============================================================
-- DONE! Semua tabel, RLS, dan data telah dibuat.
-- ============================================================
