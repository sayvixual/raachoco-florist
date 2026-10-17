const { test, expect } = require('@playwright/test');

test.use({
  channel: 'chrome'
});

const viewports = [
  { name: 'desktop-wide', width: 1440, height: 900 },
  { name: 'desktop-standard', width: 1280, height: 800 },
  { name: 'tablet-landscape', width: 1024, height: 768 },
  { name: 'tablet-portrait', width: 768, height: 1024 },
  { name: 'mobile-large', width: 412, height: 915 },
  { name: 'mobile-medium', width: 375, height: 812 },
  { name: 'mobile-small', width: 320, height: 568 }
];

test.describe('Responsive Layout & Visual QA Audit', () => {
  for (const vp of viewports) {
    test(`Check layout integrity on ${vp.name} (${vp.width}x${vp.height})`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto('http://localhost:8080', { waitUntil: 'networkidle' });

      // 1. Check for horizontal overflow
      const overflowData = await page.evaluate(() => {
        const docEl = document.documentElement;
        const body = document.body;
        const scrollWidth = Math.max(docEl.scrollWidth, body.scrollWidth);
        const clientWidth = docEl.clientWidth;
        const hasOverflow = scrollWidth > clientWidth;

        // If overflow exists, locate overflowing elements
        const overflowingElements = [];
        if (hasOverflow) {
          const all = document.querySelectorAll('*');
          all.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.right > clientWidth + 1) {
              overflowingElements.push({
                tag: el.tagName,
                className: el.className,
                id: el.id,
                right: rect.right,
                clientWidth: clientWidth
              });
            }
          });
        }

        return {
          scrollWidth,
          clientWidth,
          hasOverflow,
          overflowingElements: overflowingElements.slice(0, 10)
        };
      });

      console.log(`[${vp.name}] Overflow status:`, overflowData);
      expect(overflowData.hasOverflow, `Page has horizontal overflow on ${vp.name}! Overflow elements: ${JSON.stringify(overflowData.overflowingElements)}`).toBe(false);

      // 2. Check for stretched images or distorted aspect ratio
      const imageIssues = await page.evaluate(() => {
        const imgs = Array.from(document.querySelectorAll('img'));
        const issues = [];
        imgs.forEach(img => {
          if (!img.complete || img.naturalWidth === 0) return;
          const rect = img.getBoundingClientRect();
          if (rect.width === 0 || rect.height === 0) return;
          
          const computedStyle = window.getComputedStyle(img);
          const objectFit = computedStyle.objectFit;

          // If object-fit is not cover/contain/scale-down, check if aspect ratio is distorted by > 15%
          if (!['cover', 'contain', 'scale-down'].includes(objectFit)) {
            const naturalRatio = img.naturalWidth / img.naturalHeight;
            const renderedRatio = rect.width / rect.height;
            const ratioDiff = Math.abs(naturalRatio - renderedRatio) / naturalRatio;
            if (ratioDiff > 0.15 && rect.width > 30 && rect.height > 30) {
              issues.push({
                src: img.src.split('/').pop(),
                naturalRatio: naturalRatio.toFixed(2),
                renderedRatio: renderedRatio.toFixed(2),
                ratioDiff: (ratioDiff * 100).toFixed(1) + '%',
                rect: { w: rect.width, h: rect.height },
                objectFit
              });
            }
          }
        });
        return issues;
      });

      console.log(`[${vp.name}] Image aspect ratio issues:`, imageIssues);
      expect(imageIssues.length, `Found distorted/stretched images on ${vp.name}: ${JSON.stringify(imageIssues)}`).toBe(0);

      // 3. Check for text clipping / hidden overflow without ellipsis or broken buttons
      const brokenButtons = await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button, a.btn-primary, a.btn-secondary, a.btn-gold-cta, a.btn-header-wa'));
        const issues = [];
        btns.forEach(btn => {
          const rect = btn.getBoundingClientRect();
          if (rect.width > 0 && rect.height > 0) {
            // Check if text is clipped or height is unreasonably small
            if (rect.height < 32 && !btn.classList.contains('mobile-toggle')) {
              issues.push({ text: btn.textContent.trim(), height: rect.height, tag: btn.tagName });
            }
          }
        });
        return issues;
      });
      console.log(`[${vp.name}] Broken/too small buttons:`, brokenButtons);
    });
  }

  test('Check modal layout responsiveness on mobile (375x812)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('http://localhost:8080');

    // Open peek modal
    await page.locator('.product-card .product-peek-btn').first().click();
    await page.waitForTimeout(400);

    const modalBox = await page.locator('.peek-dialog').boundingBox();
    const viewport = page.viewportSize();

    console.log('Mobile Modal bounding box:', modalBox);
    expect(modalBox.width).toBeLessThanOrEqual(viewport.width);
    
    // Check that close button is visible and clickable
    const closeBtn = page.locator('#peek-close-btn');
    await expect(closeBtn).toBeVisible();

    // Check greeting textarea and WhatsApp button
    await expect(page.locator('#greeting-textarea')).toBeVisible();
    await expect(page.locator('#peek-wa-btn')).toBeVisible();
  });

  test('Check modal layout responsiveness on tablet (768x1024)', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('http://localhost:8080');

    // Open peek modal
    await page.locator('.product-card .product-peek-btn').first().click();
    await page.waitForTimeout(400);

    const modalBox = await page.locator('.peek-dialog').boundingBox();
    console.log('Tablet Modal bounding box:', modalBox);
  });
});
