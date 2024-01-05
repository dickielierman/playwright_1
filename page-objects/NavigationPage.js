import { UserWill } from '../utils/UserWill.js';
import { isDesktopVeiwport } from '../utils/isDesktopViewport.js';

export class NavigationPage {
  constructor(page) {
    this.page = page;
    this.userWill = new UserWill();
    this.basketCounter = page.locator('[data-qa="header-basket-count"]');
    this.burgerBtn = page.locator('[data-qa="burger-button"]');
    this.checkoutLink = page.getByRole('link', { name: 'Checkout' });
  }

  goToCheckout = async () => {
    if (!isDesktopVeiwport(this.page)) {
      await this.userWill.click(this.burgerBtn);
    }
    await this.userWill.click(this.checkoutLink);
    await this.userWill.verifyUrl(this.page, '/basket');
  };

  getBasketCount = async () => {
    await this.basketCounter.waitFor();
    const text = await this.basketCounter.innerText();
    return parseInt(text, 10);
  };
}
