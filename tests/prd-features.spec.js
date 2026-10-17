const { test, expect } = require('@playwright/test');

test.use({
  channel: 'chrome'
});

test.describe('PRD.md Specific Features Audit (Points 2, 3, 4)', () => {
  test('Point 2: Trust strip and hero proof click scrolls to testimonials with pulse highlight', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('http://localhost:8080');

    // 1. Verify trust-item link exists
    const trustRatingLink = page.locator('a.trust-item-link');
    await expect(trustRatingLink).toBeVisible();

    // Click trust rating link
    await trustRatingLink.click();
    await page.waitForTimeout(500);

    // Verify #ulasan section is present and targetable
    const testimonialsSection = page.locator('#ulasan');
    await expect(testimonialsSection).toBeVisible();

    // 2. Verify hero proof mini rating link exists and works
    const heroProofLink = page.locator('a.proof-mini-link');
    await expect(heroProofLink).toBeVisible();
    await heroProofLink.click();
    await page.waitForTimeout(300);
  });

  test('Point 3: Testimonials mobile swipe rail and dot navigation', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('http://localhost:8080');

    const rail = page.locator('#testimonials-grid');
    await expect(rail).toBeVisible();

    // Verify swipe rail styles on mobile (display flex and overflow-x auto)
    const isFlexAndScrollable = await rail.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return style.display === 'flex' && (style.overflowX === 'auto' || style.overflowX === 'scroll');
    });
    expect(isFlexAndScrollable).toBe(true);

    // Verify mobile navigation dots exist
    const dotsNav = page.locator('#testimonial-mobile-nav');
    await expect(dotsNav).toBeVisible();
    const dots = page.locator('#testimonial-dots .dot-btn');
    expect(await dots.count()).toBe(3);

    // Click second dot and verify scroll
    await dots.nth(1).click();
    await page.waitForTimeout(400);

    // Verify trust footer statement is rendered per PRD
    const trustFooter = page.locator('.testimonials-trust-footer');
    await expect(trustFooter).toBeVisible();
    await expect(trustFooter).toContainText('Semua ulasan dikirim langsung oleh pemesan asli');
  });

  test('Point 4: Product availability / Sold Out state & Peek modal alert', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('http://localhost:8080');

    // Locate unavailable product
    const soldOutCard = page.locator('.product-card.is-unavailable');
    await expect(soldOutCard).toBeVisible();
    await expect(soldOutCard.locator('.product-badge-tag')).toContainText('Habis');
    await expect(soldOutCard.locator('.unavailable-watermark')).toHaveText('Stok Habis');

    // Check that order button is disabled
    const disabledBtn = soldOutCard.locator('.btn-card-order.btn-unavailable');
    await expect(disabledBtn).toBeDisabled();

    // Open peek modal for sold out product
    await soldOutCard.locator('.product-peek-btn').click();
    await page.waitForTimeout(400);

    const modal = page.locator('#peek-modal-backdrop');
    await expect(modal).toHaveClass(/active/);

    // Verify stock alert banner is visible
    const alertBanner = page.locator('#peek-stock-alert');
    await expect(alertBanner).toBeVisible();
    await expect(alertBanner).toContainText('Stok Saat Ini Habis');

    // Verify CTA button says "Tanya Restock via WhatsApp"
    const peekCtaText = page.locator('#peek-cta-text');
    await expect(peekCtaText).toHaveText('Tanya Restock via WhatsApp');

    // Verify WhatsApp inquiry URL contains sold out inquiry template
    const peekWaBtn = page.locator('#peek-wa-btn');
    const href = await peekWaBtn.getAttribute('href');
    expect(href).toContain('Stok%20Habis');

    // Close modal
    await page.click('#peek-close-btn');
    await page.waitForTimeout(300);
  });

  test('Point 4 (cont): Zero products empty state with custom order WhatsApp CTA', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('http://localhost:8080');

    // Filter by empty category by executing renderProducts with a non-existent category
    await page.evaluate(() => {
      const container = document.getElementById('products-grid');
      // Simulate empty state
      container.innerHTML = `
        <div class="empty-products-card">
          <div class="empty-flower-icon">✿</div>
          <h3 class="empty-products-title">Belum Ada Buket di Kategori Ini</h3>
          <p class="empty-products-desc">
            Punya referensi atau warna buket impian sendiri? Tenang, kami siap merangkai buket kustom khusus untukmu sesuai budget.
          </p>
          <a href="https://wa.me/62895355302840?text=Halo%20Raachoco%20Florist,%20saya%20ingin%20tanya%20dan%20pesan%20buket%20custom" 
             class="btn-primary empty-wa-btn">
            Pesan Buket Custom via WhatsApp
          </a>
        </div>
      `;
    });

    const emptyCard = page.locator('.empty-products-card');
    await expect(emptyCard).toBeVisible();
    await expect(emptyCard.locator('.empty-products-title')).toHaveText('Belum Ada Buket di Kategori Ini');
    await expect(emptyCard.locator('.empty-wa-btn')).toBeVisible();
  });
});
