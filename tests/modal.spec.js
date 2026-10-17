const { test, expect } = require('@playwright/test');

test.use({
  channel: 'chrome',
  viewport: { width: 1280, height: 850 }
});

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    try {
      localStorage.clear();
    } catch (e) {}
  });
});

test('verify category filtering and product peek modal', async ({ page }) => {
  await page.goto('http://localhost:8080');

  // 1. Click filter 'Flower Box'
  await page.click('button[data-category="flower-box"]');
  await page.waitForTimeout(300);

  // Verify only flower box cards are rendered
  const cardTitle = await page.locator('.product-card .product-title').first().textContent();
  console.log('Filtered card title:', cardTitle);
  expect(cardTitle).toMatch(/(Royal Emerald Box|Roundie Bouquet)/);

  // 2. Open product peek modal
  await page.locator('.product-card .product-peek-btn').first().click();
  await page.waitForTimeout(400);

  const modal = page.locator('#peek-modal-backdrop');
  await expect(modal).toHaveClass(/active/);

  // 3. Type inside greeting card input
  const greetingInput = page.locator('#greeting-textarea');
  await greetingInput.fill('Happy Anniversary sayang! Semoga kita selalu bahagia & penuh cinta.');
  await page.waitForTimeout(200);

  // 4. Verify WhatsApp button has prefilled text including custom note and product image
  const waBtn = page.locator('#peek-wa-btn');
  const href = await waBtn.getAttribute('href');
  console.log('Generated WhatsApp URL:', href);
  expect(href).toContain('Happy%20Anniversary');
  expect(href).toContain('Foto%20Buket');

  // Verify visual indicator badge is visible
  const mediaNotice = page.locator('.peek-wa-media-notice');
  await expect(mediaNotice).toBeVisible();

  // 5. Close modal
  await page.click('#peek-close-btn');
  await page.waitForTimeout(300);
  await expect(modal).not.toHaveClass(/active/);
});

test('verify flower choice toggle switches between Bunga Segar and Buket Artifisial', async ({ page }) => {
  await page.goto('http://localhost:8080');

  // Open first product modal
  await page.locator('.product-card .product-peek-btn').first().click();
  await page.waitForTimeout(400);

  const modal = page.locator('#peek-modal-backdrop');
  await expect(modal).toHaveClass(/active/);

  // Verify selector box exists
  const artBtn = page.locator('.flower-opt-btn[data-flowertype="Buket Artifisial"]');
  const freshBtn = page.locator('.flower-opt-btn[data-flowertype="Bunga Segar Asli"]');
  await expect(artBtn).toBeVisible();
  await expect(freshBtn).toBeVisible();

  // Fresh is default active
  await expect(freshBtn).toHaveClass(/active/);

  // Click Buket Artifisial
  await artBtn.click();
  await expect(artBtn).toHaveClass(/active/);
  await expect(freshBtn).not.toHaveClass(/active/);

  // Verify WhatsApp URL contains Buket Artifisial
  const waBtn = page.locator('#peek-wa-btn');
  const href = await waBtn.getAttribute('href');
  console.log('WhatsApp URL after selecting Buket Artifisial:', href);
  expect(href).toContain('Buket%20Artifisial');
});

