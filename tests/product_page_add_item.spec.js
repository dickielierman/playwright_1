import { test, expect } from '@playwright/test';

function logger(message = []) {
  console.log('\x1b[36m%s\x1b[0m', `##### ${message} #####`);
}
test.skip('Product Page Add To Basket', async ({ page }) => {
  await page.goto('/');

  const addToBasketButton = page.locator('[data-qa="product-button"]').first();
  const basketCountBadge = page.locator('[data-qa="header-basket-count"]');
  const checkoutLink = page.locator('[data-qa="desktop-nav-link"]:has-text("Checkout")');

  logger('wait for elems to load');
  await basketCountBadge.waitFor();
  await addToBasketButton.waitFor();

  logger('verify init data');
  await checkoutLink.waitFor();
  await expect(basketCountBadge).toHaveText('0');
  await expect(addToBasketButton).toHaveText('Add to Basket');

  logger('take action (click the first add to basket button)');
  await addToBasketButton.click();

  logger('verify changes to count badge and button text');
  await expect(basketCountBadge).toHaveText('1');
  await expect(addToBasketButton).toHaveText('Remove from Basket');

  logger('verfiy checkout link works');
  await checkoutLink.click();
  await page.waitForURL('/basket');
  // await page.pause();
});
