import { UserWill } from '../utils/UserWill';

export class LoginPage {
  constructor(page) {
    this.page = page;
    this.userWill = new UserWill();
    this.registerBtn = page.locator('[data-qa="go-to-signup-button"]');
  }

  clickRegister = async () => {
    await this.userWill.click(this.registerBtn);
    await this.userWill.verifyUrl(this.page, /\/signup/);
  };
}
