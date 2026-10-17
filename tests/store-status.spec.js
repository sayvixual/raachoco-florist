const { test, expect } = require('@playwright/test');

test.use({
  channel: 'chrome'
});

test.describe('Live Business Hours Store Status (PRD §3, §5 US-05, §8)', () => {
  test('Hero section renders live store status badge with pulsing dot and smooth scroll', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('http://localhost:8080');

    const heroStatus = page.locator('#hero-store-status');
    await expect(heroStatus).toBeVisible();

    const pulseDot = heroStatus.locator('.status-pulse-dot');
    await expect(pulseDot).toBeVisible();

    const badgeText = page.locator('#status-badge-text');
    await expect(badgeText).toBeVisible();
    const textContent = await badgeText.textContent();
    console.log('Current live store status in Hero:', textContent);
    expect(textContent).toMatch(/Buka Sekarang|Toko Tutup/);

    // Verify click triggers navigation to #lokasi
    await heroStatus.click();
    await page.waitForTimeout(500);

    // Check location section badge sync
    const locationStatus = page.locator('#location-store-status');
    await expect(locationStatus).toBeVisible();
    const locText = await locationStatus.textContent();
    expect(locText).toMatch(/Buka Sekarang|Sedang Tutup/);
  });

  test('Simulate Open status during business hours (14:00 WIB)', async ({ page }) => {
    await page.goto('http://localhost:8080');

    // Simulate 14:00 WIB (07:00 UTC)
    const simulatedDate = new Date('2026-10-03T07:00:00Z');
    await page.evaluate((dateStr) => {
      window.__updateLiveStoreStatus(new Date(dateStr));
    }, simulatedDate.toISOString());

    const heroStatus = page.locator('#hero-store-status');
    await expect(heroStatus).toHaveClass(/is-open/);
    await expect(heroStatus).not.toHaveClass(/is-closed/);

    const badgeText = page.locator('#status-badge-text');
    await expect(badgeText).toContainText('Buka Sekarang');
    await expect(badgeText).toContainText('Tutup 20.00 WIB');
  });

  test('Simulate Closed status after hours (22:30 WIB) showing next opening tomorrow', async ({ page }) => {
    await page.goto('http://localhost:8080');

    // Simulate 22:30 WIB (15:30 UTC)
    const simulatedDate = new Date('2026-10-03T15:30:00Z');
    await page.evaluate((dateStr) => {
      window.__updateLiveStoreStatus(new Date(dateStr));
    }, simulatedDate.toISOString());

    const heroStatus = page.locator('#hero-store-status');
    await expect(heroStatus).toHaveClass(/is-closed/);
    await expect(heroStatus).not.toHaveClass(/is-open/);

    const badgeText = page.locator('#status-badge-text');
    await expect(badgeText).toContainText('Toko Tutup');
    await expect(badgeText).toContainText('Buka besok 08.00 WIB');

    // Tooltip confirms WA remains active per PRD §8
    const titleAttr = await heroStatus.getAttribute('title');
    expect(titleAttr).toContain('WhatsApp');
  });

  test('Simulate Closed status early morning (06:30 WIB) showing opens today', async ({ page }) => {
    await page.goto('http://localhost:8080');

    // Simulate 06:30 WIB (23:30 UTC previous day)
    const simulatedDate = new Date('2026-10-02T23:30:00Z');
    await page.evaluate((dateStr) => {
      window.__updateLiveStoreStatus(new Date(dateStr));
    }, simulatedDate.toISOString());

    const heroStatus = page.locator('#hero-store-status');
    await expect(heroStatus).toHaveClass(/is-closed/);

    const badgeText = page.locator('#status-badge-text');
    await expect(badgeText).toContainText('Toko Tutup');
    await expect(badgeText).toContainText('Buka jam 08.00 WIB');
  });

  test('Responsive check on mobile viewport (397x551)', async ({ page }) => {
    await page.setViewportSize({ width: 397, height: 551 });
    await page.goto('http://localhost:8080');

    const heroStatus = page.locator('#hero-store-status');
    await expect(heroStatus).toBeVisible();

    const bounding = await heroStatus.boundingBox();
    expect(bounding.width).toBeGreaterThan(120);
    expect(bounding.height).toBeGreaterThan(25);
  });
});
