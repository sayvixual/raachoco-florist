const { test, expect } = require('@playwright/test');

test.use({
  channel: 'chrome'
});

test('Verify mobile footer has no white space underneath', async ({ page }) => {
  await page.setViewportSize({ width: 397, height: 551 });
  await page.goto('http://localhost:8080', { waitUntil: 'networkidle' });

  // Scroll to bottom
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(500);

  const measurements = await page.evaluate(() => {
    const footer = document.getElementById('site-footer');
    const bodyComputed = window.getComputedStyle(document.body);
    const footerComputed = window.getComputedStyle(footer);
    const scrollHeight = document.documentElement.scrollHeight;
    const bodyHeight = document.body.offsetHeight;
    const footerBottom = footer.offsetTop + footer.offsetHeight;

    return {
      bodyPaddingBottom: bodyComputed.paddingBottom,
      footerPaddingBottom: footerComputed.paddingBottom,
      scrollHeight,
      bodyHeight,
      footerBottom,
      diff: bodyHeight - footerBottom,
      viewportHeight: window.innerHeight,
      scrollY: window.scrollY
    };
  });

  console.log('Measurements:', measurements);

  // Body padding-bottom should be 0px
  expect(measurements.bodyPaddingBottom).toBe('0px');
  // There should be no gap between footer bottom and body bottom
  expect(measurements.diff).toBeLessThanOrEqual(1);
});
