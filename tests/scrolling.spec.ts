import { test, expect } from '@playwright/test';

test.describe('Meal Selection & Footer Stability', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should show footer when items are added and keep it fixed during scroll', async ({ page }) => {
    // 1. Wait for menu to load
    await expect(page.getByRole('heading', { name: 'القائمة' })).toBeVisible();

    // 2. Add an item to the cart
    // Use the aria-label "Add to cart"
    const addButton = page.getByLabel('Add to cart').first();
    await addButton.click();

    // 3. Verify footer appears
    const footer = page.locator('text=متابعة لإدخال البيانات');
    await expect(footer).toBeVisible();

    // 4. Verify footer is in a portal (direct child of body) or at least fixed
    // We can check the computed style of the footer container
    // The footer text is inside a button, which is inside a div with fixed positioning.
    // Let's find the container. The button is inside a div with class 'fixed'.
    // Since we used a portal, the fixed div should be a direct child of body (or close to it).
    
    // Let's find the fixed container.
    const fixedContainer = page.locator('div.fixed.bottom-0.left-0.right-0.z-50');
    await expect(fixedContainer).toBeVisible();
    
    // Check CSS properties
    await expect(fixedContainer).toHaveCSS('position', 'fixed');
    await expect(fixedContainer).toHaveCSS('bottom', '0px');

    // 5. Scroll the page
    // Get the scroll height
    const scrollHeight = await page.evaluate(() => document.body.scrollHeight);
    
    // Scroll down
    await page.mouse.wheel(0, scrollHeight);
    await page.waitForTimeout(500); // Wait for any potential jitter or layout shift
    
    // Verify footer is still visible and at the bottom
    // We can check if the bounding box is still at the bottom of the viewport
    const box = await fixedContainer.boundingBox();
    const viewport = await page.viewportSize();
    
    if (box && viewport) {
      // The bottom of the box should be close to the viewport height
      expect(Math.abs(box.y + box.height - viewport.height)).toBeLessThan(2);
    }

    // Scroll up
    await page.mouse.wheel(0, -scrollHeight);
    await page.waitForTimeout(500);

    // Verify again
    const box2 = await fixedContainer.boundingBox();
    if (box2 && viewport) {
      expect(Math.abs(box2.y + box2.height - viewport.height)).toBeLessThan(2);
    }
  });
});
