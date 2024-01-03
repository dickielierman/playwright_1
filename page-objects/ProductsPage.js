import { expect } from '@playwright/test';
import { NavigationPage } from './NavigationPage.js';

export class ProductsPage {
  constructor(page) {
    this.page = page;
    this.addButtons = page.locator('[data-qa="product-button"]');
    this.sortDropdown = page.locator('[data-qa="sort-dropdown"]');
    this.productTitle = page.locator('[data-qa="product-title"]');
  }

  visit = async () => {
    await this.page.goto('/');
  };

  addProductToBasket = async (i) => {
    const navi = new NavigationPage(this.page);
    const specificAddButton = this.addButtons.nth(i);
    await specificAddButton.waitFor();
    const basketCountBeforeAdding = await navi.getBasketCount();
    await expect(specificAddButton).toHaveText('Add to Basket');
    await specificAddButton.click();
    const basketCountAfterAdding = await navi.getBasketCount();
    await expect(basketCountAfterAdding).toEqual(basketCountBeforeAdding + 1);
    await expect(specificAddButton).toHaveText('Remove from Basket');
  };

  sortByCheapest = async () => {
    await this.sortDropdown.waitFor();
    await this.productTitle.first().waitFor();
    const preSortProdTitles = await this.productTitle.allInnerTexts();
    await this.sortDropdown.selectOption('price-asc');
    const postSortProdTitles = await this.productTitle.allInnerTexts();
    expect(postSortProdTitles).not.toEqual(preSortProdTitles);
  };
}
