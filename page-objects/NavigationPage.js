export class NavigationPage {
  constructor(page) {
    this.page = page;
    this.checkoutLink = page.locator('[data-qa="desktop-nav-link"]:has-text("Checkout")');
    this.basketCounter = page.locator('[data-qa="header-basket-count"]');
  }

  goToCheckout = async () => {
    await this.checkoutLink.waitFor();
    await this.checkoutLink.click();
    await this.page.waitForURL('/basket');
  };

  getBasketCount = async () => {
    await this.basketCounter.waitFor();
    const text = await this.basketCounter.innerText();
    return parseInt(text, 10);
  };
}
