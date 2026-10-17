/**
 * RAACHOCO FLORIST — INTERACTIVE CLIENT APP
 * High-performance, zero-bloat vanilla JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  // Brand Configuration
  const CONFIG = {
    whatsappNumber: '62895355302840',
    storeName: 'Raachoco Florist',
    businessHours: {
      openHour: 8,
      closeHour: 20,
      timezone: 'Asia/Jakarta',
      timezoneLabel: 'WIB'
    }
  };

  // Product Catalog Data
  const PRODUCTS = [
    {
      id: 'peony-silk-whisper',
      name: 'Peony & Silk Whisper Bouquet',
      category: 'bouquet',
      categoryLabel: 'Buket Andalan',
      badge: 'Best Seller',
      price: 550000,
      priceFormatted: 'Rp 550.000',
      image: 'assets/images/hero-bouquet.jpg',
      stems: 'Peoni Putih, Blush Garden Roses, Eucalyptus Cinerea, Pita Sutra Champagne',
      description: 'Rangkaian megah dengan bunga peoni impor pilihan yang mekar sempurna dipadukan dengan mawar taman lembut dan helaian pita sutra champagne.',
      size: 'Diameter ±38cm, Tinggi ±48cm',
      care: 'Potong tangkai 1cm tiap 2 hari & letakkan di ruangan ber-AC.',
      availability: 'Ready Stock (Same Day Delivery)'
    },
    {
      id: 'royal-emerald-box',
      name: 'The Royal Emerald Box',
      category: 'flower-box',
      categoryLabel: 'Flower Box',
      badge: 'Exclusive',
      price: 485000,
      priceFormatted: 'Rp 485.000',
      image: 'assets/images/product-flower-box.jpg',
      stems: 'Champagne Roses, Buttercup Ranunculus, White Lisianthus, Velvet Pine Ribbon',
      description: 'Kotak silinder matte cream berbalut pita beludru pine green mewah dengan inisial monogram gold foil. Menghadirkan kesan agung dan penuh kehangatan.',
      size: 'Box D 20cm, Bloom Height ±30cm',
      care: 'Siram floral foam dengan 50ml air sejuk setiap pagi.',
      availability: 'Ready Stock'
    },
    {
      id: 'seoul-blossom-bloom',
      name: 'Seoul Blossom Chic Posy',
      category: 'pastel',
      categoryLabel: 'Pastel Manis',
      badge: 'Trending',
      price: 280000,
      priceFormatted: 'Rp 280.000',
      image: 'assets/images/product-pastel-bouquet.jpg',
      stems: 'Peach Ranunculus, Sweet Peas, Baby Sweet Breath, Frosted Wrapping',
      description: 'Inspirasi gaya florist Korea minimalis berbalut kertas frosted translucent dan pita sutra hijau pinus. Pilihan favorit untuk wisuda dan ulang tahun.',
      size: 'Tinggi ±42cm',
      care: 'Hindari sinar matahari langsung.',
      availability: 'Ready Stock'
    },
    {
      id: 'eternal-glass-keepsake',
      name: 'Eternal Clear Acrylic Keepsake',
      category: 'keepsake',
      categoryLabel: 'Kado Kenangan',
      badge: 'Tahan 3+ Tahun',
      price: 650000,
      priceFormatted: 'Rp 650.000',
      image: 'assets/images/product-gift-box.jpg',
      stems: 'Preserved White Eternal Roses, Gold Foliage, Dried Baby Breath, Gold Wax Seal',
      description: 'Bunga mawar abadi asli yang diawetkan khusus dalam kotak akrilik bening berpita satin dan wax seal emas. Bertahan cantik tanpa perlu air.',
      size: '22cm x 22cm x 18cm',
      care: 'Simpan di ruangan kering bebas kelembaban tinggi.',
      availability: 'Ready Stock'
    },
    {
      id: 'parisian-tulip-bliss',
      name: 'Parisian Spring Tulip Bliss',
      category: 'bouquet',
      categoryLabel: 'Buket Andalan',
      badge: 'Fresh Bloom',
      price: 360000,
      priceFormatted: 'Rp 360.000',
      image: 'assets/images/product-tulips.jpg',
      stems: 'French Cream & Peach Holland Tulips (10 Stems), Crisp White Wrapping',
      description: 'Kombinasi 10 tangkai bunga tulip Holland warna pastel cream dan peach segar dengan gaya pembungkusan Parisian yang sangat bersih dan berkelas.',
      size: 'Tinggi ±40cm',
      care: 'Berikan air es dingin agar mekar tahan lama.',
      availability: 'Ready Stock'
    },
    {
      id: 'ribbed-ceramic-centerpiece',
      name: 'Artisan Ribbed Ceramic Centerpiece',
      category: 'vase',
      categoryLabel: 'Vas & Hiasan Meja',
      badge: 'Home Decor',
      price: 520000,
      priceFormatted: 'Rp 520.000',
      image: 'assets/images/product-vase.jpg',
      stems: 'White Hydrangea, Champagne Roses, Dusted Gold Leaves, Ribbed Ceramic Vase',
      description: 'Vas keramik bertekstur estetik dengan rangkaian hydrangea putih bervolume dan sentuhan aksen dedaunan emas. Siap mempercantik meja tamu atau meja kerja.',
      size: 'Tinggi total ±45cm, Vas D 15cm',
      care: 'Ganti air vas setiap 2 hari sekali.',
      availability: 'Ready Stock'
    },
    {
      id: 'cascading-orchid-bridal',
      name: 'Cascading Orchid & Lily Grace',
      category: 'wedding',
      categoryLabel: 'Pernikahan',
      badge: 'Atelier Bridal',
      price: 1250000,
      priceFormatted: 'Rp 1.250.000',
      image: 'assets/images/product-wedding.jpg',
      stems: 'Cascading White Phalaenopsis, Calla Lilies, Gold Eucalyptus, Satin Silk Ribbons',
      description: 'Hand bouquet pengantin couture yang menjuntai dramatis nan agung. Simbol kesucian cinta abadi dirancang khusus dengan bunga-bunga premium.',
      size: 'Tinggi juntaian ±55cm',
      care: 'Dirangkai segar pada pagi hari sebelum prosesi pernikahan.',
      availability: 'Pre-Order H-3'
    },
    {
      id: 'artisan-atelier-craft',
      name: 'Custom Bespoke Florist Arrangement',
      category: 'keepsake',
      categoryLabel: 'Buket Custom',
      badge: 'Personalized',
      price: 350000,
      priceFormatted: 'Mulai Rp 350.000',
      image: 'assets/images/gallery-craft.jpg',
      stems: 'Bunga pilihan sesuai request warna, preferensi penerima, dan occasion',
      description: 'Konsultasikan langsung rangkaian idamanmu bersama floral stylist Raachoco. Kami rancang khusus sesuai palet warna dan budget terbaikmu.',
      size: 'Custom sesuai pesanan',
      care: 'Petunjuk perawatan lengkap disertakan di dalam kartu.',
      availability: 'Same Day Order Available',
      isAvailable: true
    },
    {
      id: 'vintage-crimson-velvet',
      name: 'Vintage Crimson Velvet Rose',
      category: 'bouquet',
      categoryLabel: 'Buket Andalan',
      badge: 'Habis',
      price: 420000,
      priceFormatted: 'Rp 420.000',
      image: 'assets/images/hero-bouquet.jpg',
      stems: 'Crimson Red Roses, Black Bacara Foliage, Velvet Wine Ribbon',
      description: 'Rangkaian mawar merah beludru edisi khusus musiman. Saat ini stok bunga segar untuk varian ini telah habis dipesan.',
      size: 'Diameter ±35cm, Tinggi ±45cm',
      care: 'Edisi terbatas musiman.',
      availability: 'Stok Habis (Sold Out)',
      isAvailable: false
    }
  ];

  // DOM Elements
  const productsContainer = document.getElementById('products-grid');
  const categoryRail = document.querySelector('.category-rail');
  
  // Peek Modal Elements
  const peekBackdrop = document.getElementById('peek-modal-backdrop');
  const peekCloseBtn = document.getElementById('peek-close-btn');
  const peekImg = document.getElementById('peek-dialog-img');
  const peekCategory = document.getElementById('peek-category');
  const peekTitle = document.getElementById('peek-title');
  const peekPrice = document.getElementById('peek-price');
  const peekDesc = document.getElementById('peek-desc');
  const peekStems = document.getElementById('peek-stems');
  const peekSize = document.getElementById('peek-size');
  const peekCare = document.getElementById('peek-care');
  const peekStockAlert = document.getElementById('peek-stock-alert');
  const peekCtaText = document.getElementById('peek-cta-text');
  const greetingBox = document.getElementById('greeting-box');
  const greetingTextarea = document.getElementById('greeting-textarea');
  const peekWaBtn = document.getElementById('peek-wa-btn');

  // Lightbox Elements
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');

  // Mobile Menu & Sticky Elements
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navBackdrop = document.getElementById('nav-backdrop');
  const mobileStickyBar = document.getElementById('mobile-sticky-bar');
  const siteFooter = document.getElementById('site-footer');
  const toastMsg = document.getElementById('toast-msg');

  let currentSelectedProduct = null;
  let currentActiveCategory = 'all';

  // Security Helpers: HTML Escaping to prevent XSS & URL Sanitization
  function escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function sanitizeUrl(url, fallback = 'assets/images/hero-bouquet.jpg') {
    if (!url || typeof url !== 'string') return fallback;
    const trimmed = url.trim();
    if (
      trimmed.startsWith('assets/') ||
      trimmed.startsWith('/') ||
      trimmed.startsWith('https://') ||
      trimmed.startsWith('http://') ||
      trimmed.startsWith('data:image/')
    ) {
      if (/^(javascript|vbscript|data:(?!image\/))/i.test(trimmed)) {
        return fallback;
      }
      return trimmed.replace(/[<>"']/g, '');
    }
    return fallback;
  }

  // 1. Render Products
  function renderProducts(category = 'all', resetScroll = true) {
    currentActiveCategory = category;
    if (!productsContainer) return;

    const filtered = category === 'all' 
      ? PRODUCTS 
      : PRODUCTS.filter(p => p.category === category);

    productsContainer.innerHTML = '';

    // Handle zero products edge case (PRD §8)
    const mobileNavEl = document.getElementById('catalog-mobile-nav');
    if (filtered.length === 0) {
      if (mobileNavEl) mobileNavEl.style.display = 'none';
      productsContainer.innerHTML = `
        <div class="empty-products-card">
          <div class="empty-flower-icon">✿</div>
          <h3 class="empty-products-title">Belum Ada Buket di Kategori Ini</h3>
          <p class="empty-products-desc">
            Punya referensi atau warna buket impian sendiri? Tenang, kami siap merangkai buket kustom khusus untukmu sesuai budget.
          </p>
          <a href="https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent('Halo Raachoco Florist, saya ingin tanya dan pesan buket custom untuk kategori ini.')}" 
             target="_blank" rel="noopener noreferrer" class="btn-primary empty-wa-btn">
            <svg class="icon" viewBox="0 0 24 24"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c4.56 0 8.25 3.69 8.25 8.24 0 2.2-.86 4.28-2.42 5.84l-.59.59-.35.35-3.32.87.89-3.39-.38-.6a8.216 8.216 0 0 1-1.48-4.71c0-4.55 3.69-8.25 8.25-8.25"/></svg>
            Pesan Buket Custom via WhatsApp
          </a>
        </div>
      `;
      return;
    }

    filtered.forEach((product, idx) => {
      const isAvailable = product.isAvailable !== false;
      const card = document.createElement('article');
      card.className = `product-card ${!isAvailable ? 'is-unavailable' : ''}`;
      card.setAttribute('data-id', escapeHtml(product.id));
      card.style.animationDelay = `${idx * 60}ms`;

      const safeImage = sanitizeUrl(product.image);
      const safeName = escapeHtml(product.name);
      const safeBadge = escapeHtml(product.badge);
      const safeCategoryLabel = escapeHtml(product.categoryLabel);
      const safeStems = escapeHtml(product.stems);
      const safePriceFormatted = escapeHtml(product.priceFormatted);

      card.innerHTML = `
        <div class="product-media">
          <img src="${safeImage}" alt="${safeName}" class="product-img" loading="lazy" decoding="async" onerror="this.onerror=null; this.src='assets/images/hero-bouquet.jpg';">
          <span class="product-badge-tag ${!isAvailable ? 'badge-unavailable' : ''}">${safeBadge}</span>
          ${!isAvailable ? '<div class="unavailable-watermark">Stok Habis</div>' : ''}
          <button class="product-peek-btn" aria-label="Lihat detail ${safeName}">
            <svg class="icon" viewBox="0 0 24 24"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
            Detail
          </button>
        </div>
        <div class="product-body">
          <span class="product-category-meta">${safeCategoryLabel}</span>
          <h3 class="product-title">${safeName}</h3>
          <span class="product-options-badge"><span class="options-icon">✦</span> Bunga Segar &amp; Buket Artifisial</span>
          <p class="product-stems-desc">${safeStems}</p>
          <div class="product-footer">
            <div class="product-price-box">
              <span class="price-sub">Harga</span>
              <span class="price-val">${safePriceFormatted}</span>
            </div>
            ${isAvailable ? `
              <button class="btn-card-order" aria-label="Pesan ${safeName}">
                <svg class="icon" viewBox="0 0 24 24"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c4.56 0 8.25 3.69 8.25 8.24 0 2.2-.86 4.28-2.42 5.84l-.59.59-.35.35-3.32.87.89-3.39-.38-.6a8.216 8.216 0 0 1-1.48-4.71c0-4.55 3.69-8.25 8.25-8.25"/></svg>
                Pesan
              </button>
            ` : `
              <button class="btn-card-order btn-unavailable" disabled aria-disabled="true" title="Stok varian ini saat ini sedang habis">
                Habis
              </button>
            `}
          </div>
        </div>
      `;

      // Event listener to open modal
      const peekBtn = card.querySelector('.product-peek-btn');
      const orderBtn = card.querySelector('.btn-card-order');
      const media = card.querySelector('.product-media');

      [peekBtn, media].forEach(el => {
        el.addEventListener('click', (e) => {
          e.stopPropagation();
          openProductPeek(product);
        });
      });

      if (orderBtn && isAvailable) {
        orderBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          openProductPeek(product);
        });
      }

      productsContainer.appendChild(card);
    });

    // Reset scroll position on filter change & update indicator
    if (resetScroll) {
      productsContainer.scrollLeft = 0;
    }
    updateCatalogSwipeIndicator();
  }

  // 2. Mobile Catalog Swipe Rail Sync & Indicator (PRD §3)
  function updateCatalogSwipeIndicator() {
    const totalCountEl = document.getElementById('catalog-total-num');
    const activeIdxEl = document.getElementById('catalog-active-idx');
    const mobileNavEl = document.getElementById('catalog-mobile-nav');
    if (!productsContainer) return;

    const cards = productsContainer.querySelectorAll('.product-card');
    if (cards.length === 0) {
      if (mobileNavEl) mobileNavEl.style.display = 'none';
      return;
    }
    if (mobileNavEl) mobileNavEl.style.display = '';

    if (totalCountEl) totalCountEl.textContent = cards.length;

    const scrollLeft = productsContainer.scrollLeft;
    const firstCard = cards[0];
    if (!firstCard) return;

    const cardWidth = firstCard.offsetWidth + 16;
    const activeIdx = Math.min(
      cards.length,
      Math.max(1, Math.round(scrollLeft / cardWidth) + 1)
    );

    if (activeIdxEl) activeIdxEl.textContent = activeIdx;
  }

  if (productsContainer) {
    let isCatalogTicking = false;
    productsContainer.addEventListener('scroll', () => {
      if (!isCatalogTicking) {
        window.requestAnimationFrame(() => {
          updateCatalogSwipeIndicator();
          isCatalogTicking = false;
        });
        isCatalogTicking = true;
      }
    }, { passive: true });
  }

  const STORAGE_KEY_DELETED_CATEGORIES = 'raachoco_deleted_categories_v1';

  function getDeletedCategorySlugs() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_DELETED_CATEGORIES);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return new Set(parsed);
      }
    } catch (e) {}
    return new Set();
  }

  // 3. Category Buttons Filter Logic with Dynamic Delegation
  function renderStorefrontCategories(categories) {
    if (!categoryRail || !Array.isArray(categories)) return;

    const deletedSlugs = getDeletedCategorySlugs();
    const activeCats = categories.filter(c => !deletedSlugs.has(c.slug));

    // Check if currentActiveCategory still exists, otherwise fallback to 'all'
    const exists = currentActiveCategory === 'all' || activeCats.some(c => c.slug === currentActiveCategory);
    if (!exists) currentActiveCategory = 'all';

    let html = `<button class="cat-btn ${currentActiveCategory === 'all' ? 'active' : ''}" data-category="all">Semua</button>`;
    activeCats.forEach(cat => {
      const isActive = currentActiveCategory === cat.slug;
      html += `<button class="cat-btn ${isActive ? 'active' : ''}" data-category="${escapeHtml(cat.slug)}">${escapeHtml(cat.name)}</button>`;
    });

    categoryRail.innerHTML = html;
  }

  if (categoryRail) {
    categoryRail.addEventListener('click', (e) => {
      const btn = e.target.closest('.cat-btn');
      if (!btn) return;
      categoryRail.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const targetCategory = btn.getAttribute('data-category') || 'all';
      currentActiveCategory = targetCategory;
      renderProducts(targetCategory);
    });
  }

  // Hydrate categories from local storage cache if available
  try {
    const cachedCats = localStorage.getItem('raachoco_admin_categories_v1');
    const deletedSlugs = getDeletedCategorySlugs();
    if (cachedCats) {
      const parsedCats = JSON.parse(cachedCats);
      if (Array.isArray(parsedCats)) {
        renderStorefrontCategories(parsedCats);
      }
    } else if (deletedSlugs.size > 0 && categoryRail) {
      categoryRail.querySelectorAll('.cat-btn').forEach(btn => {
        const cat = btn.getAttribute('data-category');
        if (cat && deletedSlugs.has(cat)) {
          btn.remove();
        }
      });
    }
  } catch (e) {}

  window.addEventListener('storage', (e) => {
    if ((e.key === 'raachoco_admin_categories_v1' || e.key === 'raachoco_deleted_categories_v1') && e.newValue) {
      try {
        const cachedCats = localStorage.getItem('raachoco_admin_categories_v1');
        const parsedCats = cachedCats ? JSON.parse(cachedCats) : [];
        renderStorefrontCategories(parsedCats);
      } catch (err) {}
    }
    if (e.key === 'raachoco_admin_products_v1' && e.newValue) {
      try {
        const updatedProds = JSON.parse(e.newValue);
        if (Array.isArray(updatedProds)) {
          PRODUCTS.length = 0;
          PRODUCTS.push(...updatedProds);
          renderProducts(currentActiveCategory, false);
        }
      } catch (err) {}
    }
    if (e.key === 'raachoco_clean_slate' && e.newValue === 'true') {
      const localCached = localStorage.getItem('raachoco_admin_products_v1');
      PRODUCTS.length = 0;
      if (localCached) {
        try {
          const parsed = JSON.parse(localCached);
          if (Array.isArray(parsed)) PRODUCTS.push(...parsed);
        } catch (err) {}
      }
      renderProducts(currentActiveCategory, false);
    }
  });

  // Flower Type Choice Selector (Bunga Segar Asli vs Buket Artifisial)
  let selectedFlowerType = 'Bunga Segar Asli';
  const flowerOptBtns = document.querySelectorAll('.flower-opt-btn');
  const flowerTypeBox = document.getElementById('flower-type-box');

  flowerOptBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      flowerOptBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-checked', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-checked', 'true');
      selectedFlowerType = btn.getAttribute('data-flowertype') || 'Bunga Segar Asli';
      updatePeekWhatsAppUrl();
    });
  });

  // 4. Product Peek Modal Logic
  function getProductAbsoluteImageUrl(imagePath) {
    if (!imagePath || typeof imagePath !== 'string') return '';
    const trimmed = imagePath.trim();
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
      return trimmed;
    }
    try {
      if (typeof window !== 'undefined' && window.location && window.location.origin && window.location.origin !== 'null' && !window.location.origin.startsWith('file')) {
        return new URL(trimmed, window.location.origin).href;
      }
    } catch (e) {}
    return trimmed;
  }

  function buildWhatsAppUrl(product, customCardNote = '', flowerType = selectedFlowerType) {
    const fullImageUrl = getProductAbsoluteImageUrl(product.image);
    const photoLine = fullImageUrl ? `*Foto Buket:* ${fullImageUrl}\n` : '';

    if (product.isAvailable === false) {
      const inquiryText = `Halo ${CONFIG.storeName}, saya tertarik untuk menanyakan info buket:\n\n*Produk:* ${product.name}\n*Harga:* ${product.priceFormatted}\n*Status:* Stok Habis\n${photoLine}\nApakah bunga untuk varian ini bisa dirangkai kembali atau ada rekomendasi pengganti serupa? Terima kasih!`;
      return `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(inquiryText)}`;
    }

    const flowerTypeLine = flowerType ? `*Pilihan Rangkaian:* ${flowerType}\n` : '';
    const cardNoteLine = customCardNote && customCardNote.trim() ? `*Pesan Kartu Ucapan:* "${customCardNote.trim()}"\n` : '';
    const greetingText = `Halo ${CONFIG.storeName}, saya tertarik untuk memesan:\n\n*Produk:* ${product.name}\n*Harga:* ${product.priceFormatted}\n*Kategori:* ${product.categoryLabel}\n${flowerTypeLine}${cardNoteLine}${photoLine}\nMohon info ketersediaan slot pengantaran ya. Terima kasih!`;
    return `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(greetingText)}`;
  }

  function openProductPeek(product) {
    currentSelectedProduct = product;
    const isAvailable = product.isAvailable !== false;

    // Reset flower choice selector to default
    selectedFlowerType = 'Bunga Segar Asli';
    if (flowerOptBtns && flowerOptBtns.length > 0) {
      flowerOptBtns.forEach((b, idx) => {
        if (idx === 0) {
          b.classList.add('active');
          b.setAttribute('aria-checked', 'true');
        } else {
          b.classList.remove('active');
          b.setAttribute('aria-checked', 'false');
        }
      });
    }

    if (flowerTypeBox) {
      flowerTypeBox.style.display = isAvailable ? 'block' : 'none';
    }

    if (peekImg) peekImg.src = sanitizeUrl(product.image);
    if (peekImg) peekImg.alt = product.name || 'Buket Raachoco Florist';
    if (peekCategory) peekCategory.textContent = product.categoryLabel;
    if (peekTitle) peekTitle.textContent = product.name;
    if (peekPrice) peekPrice.textContent = product.priceFormatted;
    if (peekDesc) peekDesc.textContent = product.description;
    if (peekStems) peekStems.textContent = product.stems;
    if (peekSize) peekSize.textContent = product.size;
    if (peekCare) peekCare.textContent = product.care;

    if (peekStockAlert) {
      peekStockAlert.style.display = isAvailable ? 'none' : 'flex';
    }

    if (greetingBox) {
      greetingBox.style.display = isAvailable ? 'block' : 'none';
    }

    if (peekCtaText) {
      peekCtaText.textContent = isAvailable ? 'Pesan Buket Ini' : 'Tanya Restock via WhatsApp';
    }

    if (greetingTextarea) {
      greetingTextarea.value = '';
    }

    updatePeekWhatsAppUrl();

    if (peekBackdrop) {
      peekBackdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
      if (mobileStickyBar) mobileStickyBar.classList.add('hide');
    }
  }

  function updatePeekWhatsAppUrl() {
    if (!currentSelectedProduct || !peekWaBtn) return;
    const note = greetingTextarea ? greetingTextarea.value : '';
    peekWaBtn.href = buildWhatsAppUrl(currentSelectedProduct, note, selectedFlowerType);
  }

  if (greetingTextarea) {
    greetingTextarea.addEventListener('input', updatePeekWhatsAppUrl);
  }

  function closeProductPeek() {
    if (peekBackdrop) {
      peekBackdrop.classList.remove('active');
      document.body.style.overflow = '';
      if (typeof updateStickyBarState === 'function') {
        updateStickyBarState();
      }
    }
    currentSelectedProduct = null;
  }

  if (peekCloseBtn) {
    peekCloseBtn.addEventListener('click', closeProductPeek);
  }

  if (peekBackdrop) {
    peekBackdrop.addEventListener('click', (e) => {
      if (e.target === peekBackdrop) {
        closeProductPeek();
      }
    });
  }

  // Helper to copy product image to clipboard if supported
  async function copyProductImageToClipboard(imageUrl) {
    if (!imageUrl || !navigator.clipboard || typeof ClipboardItem === 'undefined') return false;
    try {
      const res = await fetch(imageUrl, { mode: 'cors' });
      if (!res.ok) return false;
      const blob = await res.blob();

      let pngBlob = blob;
      if (blob.type !== 'image/png') {
        pngBlob = await new Promise((resolve, reject) => {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.naturalWidth || img.width;
            canvas.height = img.naturalHeight || img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            canvas.toBlob(b => b ? resolve(b) : reject(new Error('Canvas blob failed')), 'image/png');
          };
          img.onerror = reject;
          img.src = URL.createObjectURL(blob);
        });
      }

      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': pngBlob })
      ]);
      return true;
    } catch (e) {
      return false;
    }
  }

  if (peekWaBtn) {
    peekWaBtn.addEventListener('click', () => {
      if (!currentSelectedProduct) return;
      if (typeof window.showToast === 'function') {
        window.showToast('📸 Foto buket & rincian pesanan siap di WhatsApp!');
      }
      try {
        const fullImageUrl = getProductAbsoluteImageUrl(currentSelectedProduct.image);
        copyProductImageToClipboard(fullImageUrl);
      } catch (err) {}
    });
  }

  function closeMobileNav() {
    if (navMenu) navMenu.classList.remove('open');
    if (mobileToggle) mobileToggle.classList.remove('open');
    if (navBackdrop) navBackdrop.classList.remove('open');
    document.body.classList.remove('menu-open');
  }

  // Close modals on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProductPeek();
      closeLightbox();
      closeMobileNav();
    }
  });

  // 5. Gallery Lightbox Logic
  const mosaicItems = document.querySelectorAll('.mosaic-item');
  mosaicItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('.mosaic-img');
      if (img && lightboxImg && lightboxModal) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt || 'Koleksi Raachoco Florist';
        lightboxModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        if (mobileStickyBar) mobileStickyBar.classList.add('hide');
      }
    });
  });

  function closeLightbox() {
    if (lightboxModal) {
      lightboxModal.classList.remove('active');
      document.body.style.overflow = '';
      if (typeof updateStickyBarState === 'function') {
        updateStickyBarState();
      }
    }
  }

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        closeLightbox();
      }
    });
  }

  // 6. Header Scrolled Style & Active Nav State
  const siteHeader = document.getElementById('site-header');
  window.addEventListener('scroll', () => {
    if (!siteHeader) return;
    if (window.scrollY > 20) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  }, { passive: true });

  // Mobile Menu Toggle & Backdrop
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      mobileToggle.classList.toggle('open', isOpen);
      if (navBackdrop) navBackdrop.classList.toggle('open', isOpen);
      document.body.classList.toggle('menu-open', isOpen);
    });

    if (navBackdrop) {
      navBackdrop.addEventListener('click', closeMobileNav);
    }

    // Close menu when clicking nav links
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', closeMobileNav);
    });
  }

  // 7. Smart Sticky Mobile Bar:
  // Hides during Hero (avoids double WhatsApp CTA buttons) and hides near footer
  let heroInView = false;
  let footerInView = false;

  function updateStickyBarState() {
    if (!mobileStickyBar) return;
    if (peekBackdrop && peekBackdrop.classList.contains('active')) {
      mobileStickyBar.classList.add('hide');
      return;
    }
    if (lightboxModal && lightboxModal.classList.contains('active')) {
      mobileStickyBar.classList.add('hide');
      return;
    }
    if (heroInView || footerInView) {
      mobileStickyBar.classList.add('hide');
    } else {
      mobileStickyBar.classList.remove('hide');
    }
  }

  if (mobileStickyBar) {
    // Observe Hero CTA buttons to prevent duplicate button collision on load
    const heroSection = document.getElementById('hero');
    if (heroSection) {
      const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          heroInView = entry.isIntersecting;
          updateStickyBarState();
        });
      }, { threshold: 0.25 });
      heroObserver.observe(heroSection);
    }

    if (siteFooter) {
      const footerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          footerInView = entry.isIntersecting;
          updateStickyBarState();
        });
      }, { threshold: 0.1 });
      footerObserver.observe(siteFooter);
    }
  }

  // 8. Toast Helper
  window.showToast = function(message) {
    if (!toastMsg) return;
    toastMsg.textContent = message;
    toastMsg.classList.add('show');
    setTimeout(() => {
      toastMsg.classList.remove('show');
    }, 3000);
  };

  // 9. Interactive Trust Strip & Proof Mini -> Scroll & Pulse Testimonials (PRD §3)
  const testimonialLinks = document.querySelectorAll('a[href="#ulasan"]');
  const testimonialsSection = document.getElementById('ulasan');
  testimonialLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (!testimonialsSection) return;
      testimonialsSection.classList.remove('section-pulse');
      void testimonialsSection.offsetWidth; // trigger reflow
      testimonialsSection.classList.add('section-pulse');
      setTimeout(() => {
        testimonialsSection.classList.remove('section-pulse');
      }, 1600);
    });
  });

  // 10. Mobile Testimonials Swipe Rail Sync & Dot Navigation (PRD §3 & §5 US-04)
  const testimonialsGrid = document.getElementById('testimonials-grid');
  const testimonialDots = document.querySelectorAll('#testimonial-dots .dot-btn');

  if (testimonialsGrid && testimonialDots.length) {
    let isTicking = false;

    function updateActiveTestimonialDot() {
      const scrollLeft = testimonialsGrid.scrollLeft;
      const firstCard = testimonialsGrid.querySelector('.testimonial-card');
      if (!firstCard) return;

      const cardWidth = firstCard.offsetWidth + 14;
      const activeIndex = Math.min(
        testimonialDots.length - 1,
        Math.max(0, Math.round(scrollLeft / cardWidth))
      );

      testimonialDots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === activeIndex);
      });
      isTicking = false;
    }

    testimonialsGrid.addEventListener('scroll', () => {
      if (!isTicking) {
        window.requestAnimationFrame(updateActiveTestimonialDot);
        isTicking = true;
      }
    }, { passive: true });

    testimonialDots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        const cards = testimonialsGrid.querySelectorAll('.testimonial-card');
        if (cards[idx]) {
          cards[idx].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
      });
    });
  }

  // 11. Live Store Business Hours Status (PRD §3, §5 US-05, §8)
  function getWIBTimeParts(date = new Date()) {
    try {
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: CONFIG.businessHours.timezone,
        hour12: false,
        hour: 'numeric',
        minute: 'numeric'
      });
      const parts = formatter.formatToParts(date);
      const timeObj = {};
      parts.forEach(p => {
        timeObj[p.type] = p.value;
      });
      return {
        hour: parseInt(timeObj.hour, 10),
        minute: parseInt(timeObj.minute, 10)
      };
    } catch (e) {
      return {
        hour: date.getHours(),
        minute: date.getMinutes()
      };
    }
  }

  function getStoreBusinessStatus(customDate = null) {
    const { hour, minute } = getWIBTimeParts(customDate || new Date());
    const openH = CONFIG.businessHours.openHour;
    const closeH = CONFIG.businessHours.closeHour;
    const isOpen = hour >= openH && hour < closeH;

    let heroBadgeHtml = '';
    let locationBadgeText = '';
    let titleTooltip = '';

    if (isOpen) {
      const closeFormatted = `${String(closeH).padStart(2, '0')}.00 ${CONFIG.businessHours.timezoneLabel}`;
      heroBadgeHtml = `<strong>Buka Sekarang</strong> <span>• Tutup ${closeFormatted}</span>`;
      locationBadgeText = 'Buka Sekarang';
      titleTooltip = `Toko bunga sedang beroperasi (08.00 - 20.00 ${CONFIG.businessHours.timezoneLabel}). Silakan klik untuk petunjuk arah & lokasi.`;
    } else {
      let nextOpeningText = '';
      if (hour < openH) {
        nextOpeningText = `Buka jam ${String(openH).padStart(2, '0')}.00 ${CONFIG.businessHours.timezoneLabel}`;
      } else {
        nextOpeningText = `Buka besok ${String(openH).padStart(2, '0')}.00 ${CONFIG.businessHours.timezoneLabel}`;
      }
      heroBadgeHtml = `<strong>Toko Tutup</strong> <span>• ${nextOpeningText}</span>`;
      locationBadgeText = 'Sedang Tutup';
      titleTooltip = `Toko fisik sedang istirahat. Anda tetap bisa memesan via WhatsApp 24 jam untuk pengiriman esok hari.`;
    }

    return {
      isOpen,
      heroBadgeHtml,
      locationBadgeText,
      titleTooltip,
      hour,
      minute
    };
  }

  let activeSimulatedDate = null;

  function updateLiveStoreStatus(customDate = undefined) {
    if (customDate !== undefined) {
      activeSimulatedDate = customDate;
    }
    const heroStatusEl = document.getElementById('hero-store-status');
    const heroStatusText = document.getElementById('status-badge-text');
    const locationStatusEl = document.getElementById('location-store-status');

    const status = getStoreBusinessStatus(activeSimulatedDate);

    if (heroStatusEl && heroStatusText) {
      heroStatusText.innerHTML = status.heroBadgeHtml;
      heroStatusEl.setAttribute('title', status.titleTooltip);
      if (status.isOpen) {
        heroStatusEl.classList.add('is-open');
        heroStatusEl.classList.remove('is-closed');
      } else {
        heroStatusEl.classList.add('is-closed');
        heroStatusEl.classList.remove('is-open');
      }
    }

    if (locationStatusEl) {
      locationStatusEl.textContent = status.locationBadgeText;
      if (status.isOpen) {
        locationStatusEl.classList.add('is-open');
        locationStatusEl.classList.remove('is-closed');
      } else {
        locationStatusEl.classList.add('is-closed');
        locationStatusEl.classList.remove('is-open');
      }
    }

    return status;
  }

  // Initial status calculation and periodic update every 60s
  updateLiveStoreStatus();
  setInterval(updateLiveStoreStatus, 60000);

  // Expose hooks for verification and tests
  window.__updateLiveStoreStatus = updateLiveStoreStatus;
  window.__getStoreBusinessStatus = getStoreBusinessStatus;

  // ============================================================
  // Supabase Backend & Database Integration (PRD §6, §7, §8)
  // ============================================================
  const SUPABASE_CONFIG = {
    url: 'https://uqalpnxykqwauizpwwnf.supabase.co',
    anonKey: 'sb_publishable_6P2-dbabENqXJJEi2iJpJg_3HRyvC5v'
  };

  let supabaseClient = null;
  if (window.supabase && typeof window.supabase.createClient === 'function') {
    try {
      supabaseClient = window.supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
    } catch (err) {
      console.warn('Supabase client initialization warning:', err);
    }
  }

  async function loadSupabaseData() {
    if (!supabaseClient) return;

    try {
      // 1. Fetch site_config from Supabase
      const { data: configRows, error: configErr } = await supabaseClient
        .from('site_config')
        .select('*')
        .limit(1);

      if (!configErr && configRows && configRows.length > 0) {
        const sc = configRows[0];
        if (sc.whatsapp_number) {
          const cleanWa = String(sc.whatsapp_number).replace(/[^0-9]/g, '');
          if (cleanWa.length >= 9 && cleanWa.length <= 15) {
            CONFIG.whatsappNumber = cleanWa;
          }
        }
        if (sc.brand_name) CONFIG.storeName = String(sc.brand_name).slice(0, 80);
        if (sc.opening_hours_json) {
          CONFIG.businessHours.openHour = sc.opening_hours_json.openHour ?? CONFIG.businessHours.openHour;
          CONFIG.businessHours.closeHour = sc.opening_hours_json.closeHour ?? CONFIG.businessHours.closeHour;
        }
        if (sc.timezone) CONFIG.businessHours.timezone = sc.timezone;
        if (sc.timezone_label) CONFIG.businessHours.timezoneLabel = sc.timezone_label;
        updateLiveStoreStatus();
      }

      // 2. Fetch products from Supabase
      const { data: productRows, error: prodErr } = await supabaseClient
        .from('products')
        .select('*')
        .order('sort_order', { ascending: true });

      if (!prodErr && productRows && productRows.length > 0) {
        const mappedProducts = productRows.map(p => ({
          id: p.slug,
          name: p.name,
          category: p.category_slug,
          categoryLabel: p.category_label || p.category_slug,
          badge: p.badge || '',
          price: p.price_from,
          priceFormatted: p.price_formatted || `Rp ${Number(p.price_from).toLocaleString('id-ID')}`,
          image: p.image_url || 'assets/images/hero-bouquet.jpg',
          stems: p.stems || '',
          description: p.description || '',
          size: p.size || '',
          care: p.care || '',
          availability: p.availability || (p.is_available ? 'Ready Stock' : 'Stok Habis'),
          isAvailable: p.is_available !== false
        }));

        PRODUCTS.length = 0;
        PRODUCTS.push(...mappedProducts);

        // Re-render catalog with fresh database products
        renderProducts(currentActiveCategory, false);
      } else if (!prodErr && productRows && productRows.length === 0 && localStorage.getItem('raachoco_clean_slate') === 'true') {
        const localCached = localStorage.getItem('raachoco_admin_products_v1');
        let hasLocal = false;
        if (localCached) {
          try {
            const parsed = JSON.parse(localCached);
            if (Array.isArray(parsed) && parsed.length > 0) {
              PRODUCTS.length = 0;
              PRODUCTS.push(...parsed);
              hasLocal = true;
            }
          } catch (e) {}
        }
        if (!hasLocal) {
          PRODUCTS.length = 0;
        }
        renderProducts(currentActiveCategory, false);
      }

      // 3. Fetch categories from Supabase
      const { data: catRows, error: catErr } = await supabaseClient
        .from('categories')
        .select('*')
        .order('sort_order', { ascending: true });

      if (!catErr && catRows && catRows.length > 0) {
        const deletedSlugs = getDeletedCategorySlugs();
        const activeRows = catRows.filter(c => !deletedSlugs.has(c.slug));
        renderStorefrontCategories(activeRows);
        try {
          localStorage.setItem('raachoco_admin_categories_v1', JSON.stringify(activeRows));
        } catch (e) {}
      }
    } catch (err) {
      console.warn('Supabase data sync notice: Falling back to offline seed data.');
    }
  }

  // Hydrate local cache if available before network
  try {
    const isCleanSlate = localStorage.getItem('raachoco_clean_slate') === 'true';
    const localCached = localStorage.getItem('raachoco_admin_products_v1');
    if (isCleanSlate) {
      PRODUCTS.length = 0;
      if (localCached) {
        const parsed = JSON.parse(localCached);
        if (Array.isArray(parsed)) {
          PRODUCTS.push(...parsed);
        }
      }
    } else if (localCached) {
      const parsed = JSON.parse(localCached);
      if (Array.isArray(parsed) && parsed.length > 0) {
        PRODUCTS.length = 0;
        PRODUCTS.push(...parsed);
      }
    }
  } catch (e) {
    // Ignore
  }

  // Initial render (instant paint with offline fallback)
  renderProducts('all');

  // Hydrate from Supabase database
  loadSupabaseData();

  // Expose Supabase hooks for verification
  window.__supabaseClient = supabaseClient;
  window.__loadSupabaseData = loadSupabaseData;

  // Secret Owner Gesture: Tap brand logo 5 times in 3s to open Ruang Kelola with Secret Token
  let logoTapCount = 0;
  let logoTapTimer = null;
  const brandLogoLink = document.querySelector('.brand-link');
  if (brandLogoLink) {
    brandLogoLink.addEventListener('click', (e) => {
      e.preventDefault();
      logoTapCount++;
      if (logoTapTimer) clearTimeout(logoTapTimer);

      if (logoTapCount >= 5) {
        try {
          sessionStorage.setItem('raachoco_stealth_token_verified', 'true');
        } catch (err) {}
        
        window.location.href = 'kelola-toko-secret-8899.html?key=owner8899';
        logoTapCount = 0;
        return;
      }

      logoTapTimer = setTimeout(() => {
        logoTapCount = 0;
      }, 3000);
    });
  }

  // Helper: Open Stealth Admin
  function openStealthAdmin() {
    try {
      sessionStorage.setItem('raachoco_stealth_token_verified', 'true');
    } catch (err) {}
    window.location.href = 'kelola-toko-secret-8899.html?key=owner8899';
  }

  // Stealth Trigger 1: Keyboard Shortcut (Ctrl + Shift + A or Cmd + Shift + A)
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
      e.preventDefault();
      openStealthAdmin();
    }
  });

  // Stealth Trigger 2: 3-Click on Copyright Text in Footer
  const copyrightTextEl = document.getElementById('copyright-text');
  if (copyrightTextEl) {
    let copyClickCount = 0;
    let copyClickTimer = null;
    copyrightTextEl.addEventListener('click', () => {
      copyClickCount++;
      if (copyClickTimer) clearTimeout(copyClickTimer);
      if (copyClickCount >= 3) {
        copyClickCount = 0;
        openStealthAdmin();
        return;
      }
      copyClickTimer = setTimeout(() => {
        copyClickCount = 0;
      }, 1500);
    });
  }
});
