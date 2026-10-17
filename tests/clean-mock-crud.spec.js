const { test, expect } = require('@playwright/test');

test.use({
  channel: 'chrome',
  viewport: { width: 1280, height: 850 }
});

test.describe('Clean Mock Data & Self-Managed CRUD Workflow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:8080/kelola-toko-secret-8899.html?key=owner8899');
    await page.evaluate(() => {
      try {
        localStorage.clear();
      } catch (e) {}
    });
  });

  test.afterEach(async ({ page }) => {
    try {
      await page.evaluate(async () => {
        try {
          if (window.__supabaseClient) {
            await window.__supabaseClient.from('products').delete().eq('slug', 'buket-mawar-asli-raachoco');
          }
        } catch (e) {}
      });
    } catch (e) {}
  });

  test('Owner can clean mock data, see clean empty state, and add their own product', async ({ page }) => {
    // 1. Visit admin and unlock
    await page.goto('http://localhost:8080/kelola-toko-secret-8899.html?key=owner8899');
    await page.waitForFunction(() => window.__adminState !== undefined);
    await page.evaluate(() => {
      window.__adminState.unlock();
    });
    await page.waitForFunction(() => window.__adminDataReady === true);
    await page.waitForTimeout(300);

    // Initial catalog has demo items
    const initialCount = await page.locator('.admin-card').count();
    expect(initialCount).toBeGreaterThan(0);

    // 2. Click "Bersihkan Data Mock" button
    const btnCleanMock = page.locator('#btn-clean-mock');
    await expect(btnCleanMock).toBeVisible();
    await btnCleanMock.click();

    // Verify confirmation creative dialog appears
    const dialog = page.locator('#creative-dialog-backdrop');
    await expect(dialog).toHaveClass(/active/);
    const dialogTitle = page.locator('#dialog-title');
    await expect(dialogTitle).toHaveText(/Kosongkan Katalog Contoh/);

    // 3. Confirm clean
    await page.click('#btn-dialog-confirm');
    await page.waitForTimeout(300);

    // Dialog closes
    await expect(dialog).not.toHaveClass(/active/);

    // 4. Verify clean state in Admin
    // Bento stats should now show 0
    await expect(page.locator('#stat-total-count')).toHaveText('0');
    await expect(page.locator('#stat-ready-count')).toHaveText('0');

    // Admin empty catalog banner should be displayed
    const emptyCatalog = page.locator('.admin-empty-catalog');
    await expect(emptyCatalog).toBeVisible();
    await expect(emptyCatalog.locator('.admin-empty-title')).toHaveText('Katalog Buket Masih Bersih');

    // 5. Test adding owner's own bouquet product from empty state
    await page.click('#btn-empty-add-product');
    await page.waitForTimeout(300);

    // Product modal should open
    const prodModal = page.locator('#product-modal-backdrop');
    await expect(prodModal).toHaveClass(/active/);

    // Fill in product details
    await page.fill('#prod-name', 'Buket Mawar Asli Raachoco');
    await page.fill('#prod-price', '350000');
    await page.fill('#prod-stems', '10 Mawar Merah Segar, Daun Ruscus, Wrapping Hitam Elegan');
    await page.fill('#prod-desc', 'Rangkaian mawar merah segar asli pilihan untuk hari spesial.');

    // Save product
    await page.click('.btn-modal-save');
    await page.waitForTimeout(400);

    // Modal closes
    await expect(prodModal).not.toHaveClass(/active/);

    // Verify newly added product appears in Admin Grid
    await expect(page.locator('#stat-total-count')).toHaveText('1');
    await expect(page.locator('#stat-ready-count')).toHaveText('1');

    const firstCard = page.locator('.admin-card').first();
    await expect(firstCard).toBeVisible();
    await expect(firstCard.locator('.card-prod-title')).toHaveText('Buket Mawar Asli Raachoco');
    await expect(firstCard.locator('.price-val-btn')).toContainText('350.000');

    // 6. Verify Storefront (index.html) reflects the owner's real product
    await page.goto('http://localhost:8080');
    await page.waitForTimeout(400);

    const storeProducts = page.locator('.product-card');
    await expect(storeProducts).toHaveCount(1);
    await expect(storeProducts.first().locator('.product-title')).toHaveText('Buket Mawar Asli Raachoco');
    await expect(storeProducts.first().locator('.price-val')).toHaveText('Rp 350.000');
  });

  test('Owner can restore demo data if ever needed', async ({ page }) => {
    await page.goto('http://localhost:8080/kelola-toko-secret-8899.html?key=owner8899');
    await page.waitForFunction(() => window.__adminState !== undefined);
    await page.evaluate(() => {
      window.__adminState.unlock();
    });
    await page.waitForFunction(() => window.__adminDataReady === true);
    await page.waitForTimeout(200);

    // Clean mock
    await page.click('#btn-clean-mock');
    await page.click('#btn-dialog-confirm');
    await page.waitForTimeout(300);

    await expect(page.locator('#stat-total-count')).toHaveText('0');

    // Click "Muat Contoh Demo" in empty catalog
    await page.click('#btn-reload-demo');
    await page.waitForTimeout(300);

    // Bento stats and cards should be restored
    const totalCount = await page.locator('#stat-total-count').textContent();
    expect(parseInt(totalCount, 10)).toBeGreaterThan(0);
    const cardCount = await page.locator('.admin-card').count();
    expect(cardCount).toBeGreaterThan(0);
  });
});
