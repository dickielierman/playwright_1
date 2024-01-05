import { expect } from '@playwright/test';
import { NavigationPage } from './NavigationPage.js';
import { UserWill } from '../utils/UserWill.js';
import { isDesktopVeiwport } from '../utils/isDesktopViewport.js';

export class ProductsPage {
  constructor(page) {
    this.page = page;
    this.userWill = new UserWill();
    this.addButtons = page.locator('[data-qa="product-button"]');
    this.productTitle = page.locator('[data-qa="product-title"]');
    this.sortDropdown = page.locator('[data-qa="sort-dropdown"]');
  }

  addProductToBasket = async (i) => {
    const navi = new NavigationPage(this.page);
    const specificAddButton = this.addButtons.nth(i);
    let basketCountBeforeAdding;
    let basketCountAfterAdding;
    if (isDesktopVeiwport(this.page)) {
      basketCountBeforeAdding = await navi.getBasketCount();
    }
    await this.userWill.expectToHaveText(specificAddButton, 'Add to Basket');
    await this.userWill.click(specificAddButton);
    await this.userWill.expectToHaveText(specificAddButton, 'Remove from Basket');
    if (isDesktopVeiwport(this.page)) {
      basketCountAfterAdding = await navi.getBasketCount();
      await expect(basketCountAfterAdding).toEqual(basketCountBeforeAdding + 1);
    }
  };

  pageLoad = async () => {
    await this.sortDropdown.waitFor();
    await this.productTitle.first().waitFor();
  };

  sortByCheapest = async () => {
    await this.pageLoad();
    const preSortProdTitles = await this.productTitle.allInnerTexts();
    await this.userWill.selectDropOption(this.sortDropdown, 'price-asc');
    const postSortProdTitles = await this.productTitle.allInnerTexts();
    expect(postSortProdTitles).not.toEqual(preSortProdTitles);
  };

  visit = async () => {
    await this.page.goto('/');
  };
}
