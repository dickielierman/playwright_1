import { expect } from '@playwright/test';
import { UserWill } from './UserWill/';

export class RegisterPage {
  constructor(page) {
    this.page = page;
    this.userWill = new UserWill(page);
    this.emailFld = page.getByPlaceholder('E-Mail');
    this.passFld = page.getByPlaceholder('Password');
    this.registerBtn = page.getByRole('button', { name: 'Register' });
  }

  signUpNewUser = async (user, password) => {
    await this.userWill.typeAndVerify(this.emailFld, user);
    await this.userWill.typeAndVerify(this.passFld, password);
    await this.userWill.click(this.registerBtn);
  };
}
