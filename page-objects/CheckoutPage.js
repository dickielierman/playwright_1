import { expect } from '@playwright/test';

export class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.basketCards = page.locator('[data-qa="basket-card"]');
    this.basketItemPrice = page.locator('[data-qa="basket-item-price"]');
    this.basketRemoveItemBtn = page.locator('[data-qa="basket-card-remove-item"]');
    this.continueToCheckoutBtn = page.locator('[data-qa="continue-to-checkout"]');
  }

  removeCheapestProduct = async () => {
    await this.basketCards.first().waitFor();
    await this.basketItemPrice.first().waitFor();
    const initLength = await this.basketCards.count();
    const allPriceText = await this.basketItemPrice.allInnerTexts();
    const priceNums = allPriceText.map((priceText) => {
      return parseInt(priceText.replace('$', ''), 10);
    });
    const lowestPriceRemoveBtn = this.basketRemoveItemBtn.nth(priceNums.indexOf(Math.min(priceNums)));
    await lowestPriceRemoveBtn.waitFor();
    await lowestPriceRemoveBtn.click();
    await expect(this.basketCards).toHaveCount(initLength - 1);
  };

  continueToCheckout = async () => {
    await this.continueToCheckoutBtn.waitFor();
    await this.continueToCheckoutBtn.click();
    await this.page.waitForURL(/\/login/);
  };
}
