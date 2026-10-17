const { test, expect } = require('@playwright/test');

test.use({
  channel: 'chrome'
});

test.describe('Ruang Kelola Owner Dashboard (/admin.html)', () => {

  test('PIN Gatekeeper enforces security and unlocks with correct PIN', async ({ page }) => {
    await page.goto('http://localhost:8080/kelola-toko-secret-8899.html?key=owner8899');

    const gatekeeper = page.locator('#admin-gatekeeper');
    await expect(gatekeeper).toBeVisible();

    // 1. Try incorrect PIN
    const pinInput = page.locator('#pin-input');
    await pinInput.fill('0000');
    await page.click('#pin-btn-submit');

    const errorMsg = page.locator('#pin-error');
    await expect(errorMsg).toBeVisible();
    await expect(gatekeeper).toBeVisible();

    // 2. Try correct strong master PIN Raachoco#8899
    await pinInput.fill('Raachoco#8899');
    await page.click('#pin-btn-submit');
    await page.waitForTimeout(900);

    // Gatekeeper should now be unlocked (hidden)
    await expect(gatekeeper).not.toBeVisible();
  });

  test('Dashboard loads products, shows bento metrics, and allows 1-click stock toggle', async ({ page }) => {
    await page.goto('http://localhost:8080/kelola-toko-secret-8899.html?key=owner8899');

    // Unlock
    await page.evaluate(() => {
      window.__adminState.unlock();
    });
    await page.waitForFunction(() => window.__adminDataReady === true);
    await page.waitForTimeout(200);

    // Verify Bento Stats
    const totalCount = await page.locator('#stat-total-count').textContent();
    expect(parseInt(totalCount, 10)).toBeGreaterThan(0);

    // Verify products grid
    const cards = page.locator('.admin-card');
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);

    // Find the first card's stock switch
    const firstCard = cards.first();
    const switchWrap = firstCard.locator('.stock-switch-wrap');
    const switchLabel = firstCard.locator('.switch-label');
    const initialLabel = (await switchLabel.textContent()).trim();

    // 1-Click Toggle
    await switchWrap.click();
    await page.waitForTimeout(300);

    // Verify label changed
    const newLabel = (await page.locator('.admin-card').first().locator('.switch-label').textContent()).trim();
    expect(newLabel).not.toBe(initialLabel);

    // Verify toast showed up
    const toast = page.locator('#admin-toast');
    await expect(toast).toHaveClass(/show/);
  });

  test('Live Card Preview dynamically updates when typing in Add Product modal', async ({ page }) => {
    await page.goto('http://localhost:8080/kelola-toko-secret-8899.html?key=owner8899');
    await page.evaluate(() => window.__adminState.unlock());
    await page.waitForFunction(() => window.__adminDataReady === true);
    await page.waitForTimeout(200);

    // Open Add Product modal
    await page.click('#btn-add-product');
    const modal = page.locator('#product-modal-backdrop');
    await expect(modal).toHaveClass(/active/);

    // Type new product name
    const prodNameInput = page.locator('#prod-name');
    await prodNameInput.fill('Moonlight Vanilla Rose Bouquet');

    // Type price
    const prodPriceInput = page.locator('#prod-price');
    await prodPriceInput.fill('475000');

    // Check Live Preview card updated
    const liveTitle = page.locator('#prev-title');
    await expect(liveTitle).toHaveText('Moonlight Vanilla Rose Bouquet');

    const livePrice = page.locator('#prev-price');
    await expect(livePrice).toHaveText('Rp 475.000');

    // Switch to preset tab and click 2nd preset photo
    await page.click('#tab-photo-preset');
    const secondThumb = page.locator('.preset-thumb-btn').nth(1);
    await secondThumb.click();

    // Submit form
    await page.click('.btn-modal-save');
    await page.waitForTimeout(400);

    // Verify modal closed and new product appears in grid
    await expect(modal).not.toHaveClass(/active/);
    const topCardTitle = await page.locator('.admin-card .card-prod-title').first().textContent();
    expect(topCardTitle).toBe('Moonlight Vanilla Rose Bouquet');
  });

  test('Owner can upload product image from device storage (gallery/laptop) with instant preview and save', async ({ page }) => {
    await page.goto('http://localhost:8080/kelola-toko-secret-8899.html?key=owner8899');
    await page.evaluate(() => window.__adminState.unlock());
    await page.waitForFunction(() => window.__adminDataReady === true);
    await page.waitForTimeout(200);

    // Open Add Product modal
    await page.click('#btn-add-product');
    const modal = page.locator('#product-modal-backdrop');
    await expect(modal).toHaveClass(/active/);

    // Check upload tab is active by default and dropzone is visible
    const uploadTab = page.locator('#tab-photo-upload');
    await expect(uploadTab).toHaveClass(/active/);
    const dropzone = page.locator('#upload-dropzone');
    await expect(dropzone).toBeVisible();

    // Select/upload an image file from local project assets
    const fileInput = page.locator('#prod-file-input');
    await fileInput.setInputFiles('assets/images/hero-bouquet.jpg');
    await page.waitForTimeout(500);

    // Verify uploaded file card is shown with thumbnail and file name
    const uploadedCard = page.locator('#uploaded-file-card');
    await expect(uploadedCard).toBeVisible();
    await expect(page.locator('#upload-file-name')).toContainText('hero-bouquet.jpg');
    await expect(page.locator('#upload-file-size')).toContainText('KB');

    // Verify Live Preview card updated with the uploaded data
    const liveImg = page.locator('#prev-img');
    const src = await liveImg.getAttribute('src');
    expect(src).toMatch(/^data:image\/jpeg/);

    // Fill product details
    await page.locator('#prod-name').fill('Sunset Coral Gardenia Bouquet');
    await page.locator('#prod-price').fill('490000');
    await page.locator('#prod-stems').fill('Coral Ranunculus, Fresh Ecuadorian Roses, Golden Eucalyptus');

    // Save
    await page.click('.btn-modal-save');
    await page.waitForTimeout(500);

    // Verify modal closes and new product exists in grid with uploaded photo
    await expect(modal).not.toHaveClass(/active/);
    const firstCard = page.locator('.admin-card').first();
    const cardTitle = await firstCard.locator('.card-prod-title').textContent();
    expect(cardTitle).toBe('Sunset Coral Gardenia Bouquet');

    const cardImgSrc = await firstCard.locator('.admin-card-img').getAttribute('src');
    expect(cardImgSrc).toMatch(/^(data:image|http|assets)/);

    // Verify Toast appears
    const toast = page.locator('#admin-toast');
    await expect(toast).toHaveClass(/show/);
  });

  test('Interactive Quick Price Editor modal opens, steppers, chips, presets, and saves without native prompt', async ({ page }) => {
    await page.goto('http://localhost:8080/kelola-toko-secret-8899.html?key=owner8899');
    await page.evaluate(() => window.__adminState.unlock());
    await page.waitForFunction(() => window.__adminDataReady === true);
    await page.waitForTimeout(200);

    // Find an available card (second card if available, else first)
    const cardCount = await page.locator('.admin-card').count();
    const card = cardCount > 1 ? page.locator('.admin-card').nth(1) : page.locator('.admin-card').first();
    const expectedTitle = (await card.locator('.card-prod-title').textContent()).trim();
    const priceBtn = card.locator('.price-val-btn');
    await expect(priceBtn).toBeVisible();

    // Click price button - must open the luxury modal, NOT window.prompt
    let dialogTriggered = false;
    page.on('dialog', async dialog => {
      dialogTriggered = true;
      await dialog.dismiss();
    });

    await priceBtn.click();
    await page.waitForTimeout(200);
    expect(dialogTriggered).toBe(false); // Zero native browser dialogs!

    // Modal is active
    const priceModal = page.locator('#price-modal-backdrop');
    await expect(priceModal).toHaveClass(/active/);

    // Verify product name
    const modalSubtitle = page.locator('#price-modal-prod-name');
    await expect(modalSubtitle).toContainText(expectedTitle);

    // Select preset 450rb to establish deterministic baseline
    const preset450 = page.locator('.preset-price-btn[data-price="450000"]');
    await preset450.click();
    await page.waitForTimeout(100);

    const priceInput = page.locator('#price-modal-input');
    await expect(priceInput).toHaveValue('450.000');
    await expect(preset450).toHaveClass(/is-active/);

    // Test + Stepper button: 450.000 + 10.000 = 460.000
    const stepPlusBtn = page.locator('#btn-step-plus');
    await stepPlusBtn.click();
    await page.waitForTimeout(100);
    await expect(priceInput).toHaveValue('460.000');

    // Test Quick Chip (+25 rb): 460.000 + 25.000 = 485.000
    const chip25k = page.locator('.chip-adjust-btn[data-add="25000"]');
    await chip25k.click();
    await page.waitForTimeout(100);
    await expect(priceInput).toHaveValue('485.000');

    // Test Stepper Minus button: 485.000 - 10.000 = 475.000
    const stepMinusBtn = page.locator('#btn-step-minus');
    await stepMinusBtn.click();
    await page.waitForTimeout(100);
    await expect(priceInput).toHaveValue('475.000');

    // Test Promo Percent (+10% Valentine)
    const chipPromo10 = page.locator('.chip-promo-plus[data-percent="10"]');
    await chipPromo10.click();
    await page.waitForTimeout(100);
    const promoVal = await priceInput.inputValue();
    expect(parseInt(promoVal.replace(/\./g, ''), 10)).toBeGreaterThan(450000);

    // Select Preset Price (550rb)
    const preset550 = page.locator('.preset-price-btn[data-price="550000"]');
    await preset550.click();
    await page.waitForTimeout(100);
    await expect(priceInput).toHaveValue('550.000');
    await expect(preset550).toHaveClass(/is-active/);

    // Click Terapkan Harga Baru
    const saveBtn = page.locator('#btn-save-price');
    await saveBtn.click();
    await page.waitForTimeout(400);

    // Modal should close
    await expect(priceModal).not.toHaveClass(/active/);

    // Card in grid should now reflect Rp 550.000
    const updatedPriceText = await card.locator('.price-val-btn').textContent();
    expect(updatedPriceText).toContain('550.000');

    // Toast notification should display
    const toast = page.locator('#admin-toast');
    await expect(toast).toHaveClass(/show/);
    await expect(toast).toContainText('550.000');
  });

  test('Category / Collection Management (CRUD) allows adding new category, safe delete protection, and deleting empty category', async ({ page }) => {
    await page.goto('http://localhost:8080/kelola-toko-secret-8899.html?key=owner8899');
    await page.evaluate(() => window.__adminState.unlock());
    await page.waitForFunction(() => window.__adminDataReady === true);
    await page.waitForTimeout(200);

    // 1. Open Kelola Kategori modal
    const manageCatsBtn = page.locator('#btn-manage-categories');
    await expect(manageCatsBtn).toBeVisible();
    await manageCatsBtn.click();

    const catModal = page.locator('#categories-modal-backdrop');
    await expect(catModal).toHaveClass(/active/);

    // 2. Verify categories list rendered with counts
    const catCards = page.locator('.cat-item-card');
    const initialCatCount = await catCards.count();
    expect(initialCatCount).toBeGreaterThanOrEqual(5);

    // 3. Test safe guard on category with products:
    // When clicking delete on active category, creative dialog modal must open!
    const activeCatDeleteBtn = page.locator('.cat-item-card').filter({ hasText: 'Buket Andalan' }).locator('.btn-cat-delete');
    if (await activeCatDeleteBtn.count() > 0) {
      await activeCatDeleteBtn.first().click();
      await page.waitForTimeout(300);

      const creativeDialog = page.locator('#creative-dialog-backdrop');
      await expect(creativeDialog).toHaveClass(/active/);

      // Verify title & message
      const dialogTitle = page.locator('#dialog-title');
      await expect(dialogTitle).toContainText('Kategori Dilindungi');

      const dialogPill = page.locator('#dialog-highlight-pill');
      await expect(dialogPill).toBeVisible();
      await expect(dialogPill).toContainText('Buket Aktif Terhubung');

      const dialogMsg = page.locator('#dialog-message');
      await expect(dialogMsg).toContainText('masih memiliki');

      // Dismiss dialog
      await page.click('#btn-dialog-confirm');
      await page.waitForTimeout(300);
      await expect(creativeDialog).not.toHaveClass(/active/);
    }

    // 4. Create a new category
    const catNameInput = page.locator('#new-cat-name');
    const catSlugInput = page.locator('#new-cat-slug');
    await catNameInput.fill('Buket Balon & Snack');

    // Auto slug verification
    const slugVal = await catSlugInput.inputValue();
    expect(slugVal).toBe('buket-balon-snack');

    // Submit form
    await page.click('#btn-submit-cat');
    await page.waitForTimeout(400);

    // Verify new category card appeared in modal
    const newCatCard = page.locator('.cat-item-card').filter({ hasText: 'Buket Balon & Snack' });
    await expect(newCatCard).toBeVisible();
    await expect(newCatCard.locator('.cat-product-count')).toContainText('0 Buket');

    // Close category modal
    await page.click('#btn-close-cat-modal');
    await expect(catModal).not.toHaveClass(/active/);

    // 5. Verify filter rail updated
    const railBtn = page.locator('#category-filter-rail .filter-tab-btn').filter({ hasText: 'Buket Balon & Snack' });
    await expect(railBtn).toBeVisible();

    // 6. Verify Add Product dropdown has new option
    await page.click('#btn-add-product');
    const prodCatSelect = page.locator('#prod-category');
    const selectOptions = await prodCatSelect.innerText();
    expect(selectOptions).toContain('Buket Balon & Snack');
    await page.click('#product-modal-close');

    // 7. Re-open category modal and test deleting the new empty category
    await page.click('#btn-manage-categories');
    await expect(catModal).toHaveClass(/active/);

    const deleteNewBtn = page.locator('.cat-item-card').filter({ hasText: 'Buket Balon & Snack' }).locator('.btn-cat-delete');
    await deleteNewBtn.click();
    await page.waitForTimeout(300);

    // Creative confirmation dialog must be shown
    const confirmDialog = page.locator('#creative-dialog-backdrop');
    await expect(confirmDialog).toHaveClass(/active/);
    await expect(page.locator('#dialog-title')).toContainText('Hapus Kategori');

    // Click confirm deletion
    await page.click('#btn-dialog-confirm');
    await page.waitForTimeout(400);

    // Verify category removed
    const removedCheck = page.locator('.cat-item-card').filter({ hasText: 'Buket Balon & Snack' });
    await expect(removedCheck).toHaveCount(0);
  });

});
