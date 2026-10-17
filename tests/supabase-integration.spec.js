const { test, expect } = require('@playwright/test');

test.use({
  channel: 'chrome'
});

test.describe('Supabase Database & Backend Integration (PRD §6, §7, §8)', () => {
  test('Supabase client is loaded and initialized with correct credentials', async ({ page }) => {
    await page.goto('http://localhost:8080/');

    // Check supabase global exists from CDN
    const hasSupabaseGlobal = await page.evaluate(() => typeof window.supabase !== 'undefined');
    expect(hasSupabaseGlobal).toBe(true);

    // Check client hook is initialized
    const clientInfo = await page.evaluate(() => {
      if (!window.__supabaseClient) return null;
      return {
        supabaseUrl: window.__supabaseClient.supabaseUrl,
        hasAuth: typeof window.__supabaseClient.auth !== 'undefined',
        hasFrom: typeof window.__supabaseClient.from === 'function'
      };
    });

    expect(clientInfo).not.toBeNull();
    expect(clientInfo.supabaseUrl).toBe('https://uqalpnxykqwauizpwwnf.supabase.co');
    expect(clientInfo.hasFrom).toBe(true);
  });

  test('Catalog renders with instant fallback and handles Supabase data gracefully', async ({ page }) => {
    await page.goto('http://localhost:8080/');

    // Ensure products rendered
    const cards = page.locator('.product-card');
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);

    // Verify first product has all PRD fields
    const firstCardTitle = await cards.first().locator('.product-title').textContent();
    expect(firstCardTitle.trim()).not.toBe('');

    // Trigger loadSupabaseData hook and verify no unhandled rejection
    const syncResult = await page.evaluate(async () => {
      try {
        if (typeof window.__loadSupabaseData === 'function') {
          await window.__loadSupabaseData();
          return { success: true };
        }
        return { success: false, reason: 'Hook not found' };
      } catch (err) {
        return { success: false, error: err.message };
      }
    });

    expect(syncResult.success).toBe(true);

    // Products should still be rendered (fallback or fresh data)
    const cardCount = await cards.count();
    expect(cardCount).toBeGreaterThan(0);
  });
});
