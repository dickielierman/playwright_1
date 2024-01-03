import { expect } from '@playwright/test';

export class LoginPage {
  constructor(page) {
    this.page = page;
    this.registerBtn = page.locator('[data-qa="go-to-signup-button"]');
  }

  clickRegister = async () => {
    await this.registerBtn.waitFor();
    await this.registerBtn.click();
    await this.page.waitForURL(/\/signup/);
  };
}
