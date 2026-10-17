const { test, expect } = require('@playwright/test');

test.use({
  channel: 'chrome',
  viewport: { width: 1280, height: 850 }
});

test.describe('Category Deletion Persistence Across Hard Refresh', () => {

  test('Deleted category stays deleted permanently after hard refresh in both Admin and Storefront', async ({ page }) => {
    // 1. Visit admin and unlock
    await page.goto('http://localhost:8080/kelola-toko-secret-8899.html?key=owner8899');
    await page.waitForFunction(() => window.__adminState !== undefined);
    await page.evaluate(() => window.__adminState.unlock());
    await page.waitForFunction(() => window.__adminDataReady === true);
    await page.waitForTimeout(300);

    // 2. Open Category Management Modal
    await page.click('#btn-manage-categories');
    const catModal = page.locator('#categories-modal-backdrop');
    await expect(catModal).toHaveClass(/active/);

    // 3. Add a test category
    const testCatName = 'Koleksi Musim Gugur Test';
    const expectedSlug = 'koleksi-musim-gugur-test';
    await page.fill('#new-cat-name', testCatName);
    await page.click('#btn-submit-cat');
    await page.waitForTimeout(600);

    // Verify it was added
    const newCard = page.locator('.cat-item-card').filter({ hasText: testCatName });
    await expect(newCard).toBeVisible();

    // Close modal
    await page.click('#btn-close-cat-modal');
    await expect(catModal).not.toHaveClass(/active/);

    // Verify it exists in filter rail
    const railBtn = page.locator('#category-filter-rail .filter-tab-btn').filter({ hasText: testCatName });
    await expect(railBtn).toBeVisible();

    // 4. Hard reload Admin page to verify new category persisted
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForFunction(() => window.__adminState !== undefined);
    await page.evaluate(() => window.__adminState.unlock());
    await page.waitForFunction(() => window.__adminDataReady === true);
    await page.waitForTimeout(400);

    const reloadedRailBtn = page.locator('#category-filter-rail .filter-tab-btn').filter({ hasText: testCatName });
    await expect(reloadedRailBtn).toBeVisible();

    // 5. Delete the category in Admin
    await page.click('#btn-manage-categories');
    await expect(catModal).toHaveClass(/active/);

    const deleteBtn = page.locator('.cat-item-card').filter({ hasText: testCatName }).locator('.btn-cat-delete');
    await expect(deleteBtn).toBeVisible();
    await deleteBtn.click();
    await page.waitForTimeout(300);

    // Confirm dialog
    const confirmDialog = page.locator('#creative-dialog-backdrop');
    await expect(confirmDialog).toHaveClass(/active/);
    await page.click('#btn-dialog-confirm');
    await page.waitForTimeout(600);

    // Verify deleted in modal
    await expect(page.locator('.cat-item-card').filter({ hasText: testCatName })).toHaveCount(0);

    // Close modal
    await page.click('#btn-close-cat-modal');
    await page.waitForTimeout(200);

    // Verify removed from filter rail
    await expect(page.locator('#category-filter-rail .filter-tab-btn').filter({ hasText: testCatName })).toHaveCount(0);

    // 6. CRUCIAL TEST: Hard reload Admin page (Ctrl + Shift + R equivalent)
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForFunction(() => window.__adminState !== undefined);
    await page.evaluate(() => window.__adminState.unlock());
    await page.waitForFunction(() => window.__adminDataReady === true);
    await page.waitForTimeout(400);

    // Category MUST NOT reappear on Admin filter rail
    const revivedRailBtn = page.locator('#category-filter-rail .filter-tab-btn').filter({ hasText: testCatName });
    await expect(revivedRailBtn).toHaveCount(0);

    // Open Category Modal and verify it is NOT in categories list
    await page.click('#btn-manage-categories');
    await expect(catModal).toHaveClass(/active/);
    const revivedCatCard = page.locator('.cat-item-card').filter({ hasText: testCatName });
    await expect(revivedCatCard).toHaveCount(0);

    // 7. CRUCIAL TEST: Visit Storefront (index.html) and check category does not exist
    await page.goto('http://localhost:8080');
    await page.waitForTimeout(400);

    const storeRailBtn = page.locator('.cat-btn').filter({ hasText: testCatName });
    await expect(storeRailBtn).toHaveCount(0);

    // Hard reload Storefront
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForTimeout(400);

    const revivedStoreRailBtn = page.locator('.cat-btn').filter({ hasText: testCatName });
    await expect(revivedStoreRailBtn).toHaveCount(0);
  });

});
