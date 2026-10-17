const { test, expect } = require('@playwright/test');

test.use({
  channel: 'chrome'
});

test.describe('Mobile Catalog Horizontal Swipe Rail (PRD §1, §3)', () => {
  test('Mobile viewport (397x551) renders horizontal swipe rail with peek affordance', async ({ page }) => {
    await page.setViewportSize({ width: 397, height: 551 });
    await page.goto('http://localhost:8080');

    const grid = page.locator('#products-grid');
    await expect(grid).toBeVisible();

    // Verify CSS styles on mobile
    const railStyles = await grid.evaluate(el => {
      const s = window.getComputedStyle(el);
      return {
        display: s.display,
        overflowX: s.overflowX,
        scrollSnapType: s.scrollSnapType
      };
    });

    expect(railStyles.display).toBe('flex');
    expect(['auto', 'scroll']).toContain(railStyles.overflowX);

    // Verify card peek affordance
    const cards = page.locator('.product-card');
    const firstCard = cards.first();
    const firstCardBox = await firstCard.boundingBox();
    console.log('Mobile product card dimensions:', firstCardBox);

    // Card should occupy ~78vw (around 280-310px), leaving remaining width for next card peek
    expect(firstCardBox.width).toBeLessThan(350);
    expect(firstCardBox.width).toBeGreaterThan(240);

    // Verify mobile nav count and hint
    const mobileNav = page.locator('#catalog-mobile-nav');
    await expect(mobileNav).toBeVisible();

    const activeIdx = page.locator('#catalog-active-idx');
    const totalCount = page.locator('#catalog-total-num');
    await expect(activeIdx).toHaveText('1');
    const totalNumText = await totalCount.textContent();
    console.log('Total products rendered on mobile:', totalNumText);
    expect(parseInt(totalNumText, 10)).toBeGreaterThanOrEqual(6);

    // Scroll to second card and verify indicator update
    await grid.evaluate(el => {
      el.scrollLeft = 320;
    });
    await page.waitForTimeout(300);

    const updatedActiveIdx = await activeIdx.textContent();
    console.log('Updated active card index after scroll:', updatedActiveIdx);
    expect(parseInt(updatedActiveIdx, 10)).toBeGreaterThanOrEqual(2);

    // Check no horizontal overflow on page
    const overflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(overflow).toBe(false);

    // Scroll directly to catalog section
    await page.locator('#katalog').scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
  });

  test('Category filter resets scroll to 0 and updates count pill', async ({ page }) => {
    await page.setViewportSize({ width: 397, height: 551 });
    await page.goto('http://localhost:8080');

    const grid = page.locator('#products-grid');
    // Scroll first
    await grid.evaluate(el => el.scrollLeft = 300);

    // Click "Buket Andalan" category
    const bouquetBtn = page.locator('.cat-btn[data-category="bouquet"]');
    await bouquetBtn.click();
    await page.waitForTimeout(300);

    // Scroll should be reset near 0 (within container padding)
    const scrollLeft = await grid.evaluate(el => el.scrollLeft);
    expect(scrollLeft).toBeLessThanOrEqual(20);

    // Total count should be updated
    const totalCount = page.locator('#catalog-total-num');
    const bouquetCount = await totalCount.textContent();
    expect(parseInt(bouquetCount, 10)).toBeGreaterThanOrEqual(2);
  });

  test('Desktop viewport (1280x800) remains a responsive grid and hides mobile nav', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('http://localhost:8080');

    const grid = page.locator('#products-grid');
    const isGrid = await grid.evaluate(el => window.getComputedStyle(el).display === 'grid');
    expect(isGrid).toBe(true);

    const mobileNav = page.locator('#catalog-mobile-nav');
    await expect(mobileNav).toBeHidden();
  });

  test('iPhone standard (390x844) captures catalog header, rail, and count indicator together', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('http://localhost:8080');

    await page.evaluate(() => {
      const el = document.getElementById('katalog');
      el.scrollIntoView({ behavior: 'instant', block: 'start' });
    });
    await page.waitForTimeout(300);

    const mobileNav = page.locator('#catalog-mobile-nav');
    await expect(mobileNav).toBeVisible();
  });
});
