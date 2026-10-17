const { test, expect } = require('@playwright/test');

test.use({
  channel: 'chrome',
  viewport: { width: 1280, height: 850 }
});

test.describe('Stealth URL Cloaking, Decoy 404, Anti-Bruteforce & Security Gatekeeper', () => {

  test('Accessing /admin or /admin.html displays 404 decoy page and hides all admin features', async ({ page }) => {
    await page.goto('http://localhost:8080/admin');
    await page.waitForTimeout(400);

    // Expect 404 error card
    const errorTitle = page.locator('.error-title');
    await expect(errorTitle).toBeVisible();
    await expect(errorTitle).toContainText('Halaman Tidak Ditemukan');

    // Gatekeeper must NOT be in the DOM or visible
    const gatekeeper = page.locator('#admin-gatekeeper');
    await expect(gatekeeper).not.toBeVisible();
  });

  test('Tapping brand logo 5 times on storefront opens secret admin with token', async ({ page }) => {
    await page.goto('http://localhost:8080');
    const logoLink = page.locator('.brand-link');
    await expect(logoLink).toBeVisible();

    for (let i = 0; i < 5; i++) {
      await logoLink.click();
      await page.waitForTimeout(80);
    }
    await page.waitForTimeout(600);

    expect(page.url()).toContain('kelola-toko-secret-8899.html?key=owner8899');
    await expect(page.locator('#admin-gatekeeper')).toBeVisible();
  });

  test('Keyboard shortcut Ctrl+Shift+A on storefront opens secret admin with token', async ({ page }) => {
    await page.goto('http://localhost:8080');
    await page.keyboard.press('Control+Shift+A');
    await page.waitForTimeout(600);

    expect(page.url()).toContain('kelola-toko-secret-8899.html?key=owner8899');
    await expect(page.locator('#admin-gatekeeper')).toBeVisible();
  });

  test('Owner can enter strong master PIN Raachoco#8899 and unlock dashboard', async ({ page }) => {
    await page.goto('http://localhost:8080/kelola-toko-secret-8899.html?key=owner8899');

    const gatekeeper = page.locator('#admin-gatekeeper');
    await expect(gatekeeper).toBeVisible();

    // 1. Test wrong PIN shows security alert
    const pinInput = page.locator('#pin-input');
    await expect(pinInput).toBeVisible();
    await pinInput.fill('WrongPass#123');
    await page.click('#pin-btn-submit');
    await page.waitForTimeout(800);

    const errorMsg = page.locator('#pin-error');
    await expect(errorMsg).toBeVisible();
    await expect(errorMsg).toContainText(/PIN salah/);

    const secAlert = page.locator('#security-alert-box');
    await expect(secAlert).toBeVisible();

    // 2. Test correct strong Master PIN Raachoco#8899
    await pinInput.fill('Raachoco#8899');
    await page.click('#pin-btn-submit');
    await page.waitForTimeout(900);

    // Gatekeeper should now be unlocked (hidden)
    await expect(gatekeeper).not.toBeVisible();

    // 3. Test Manual Lock
    await page.click('#btn-lock');
    await page.waitForTimeout(300);
    await expect(gatekeeper).toBeVisible();
  });
});
