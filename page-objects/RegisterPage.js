import { expect } from '@playwright/test';
import { UserWill } from '../utils/UserWill';

export class RegisterPage {
  constructor(page) {
    this.page = page;
    this.userWill = new UserWill();
    this.emailFld = page.getByPlaceholder('E-Mail');
    this.passFld = page.getByPlaceholder('Password');
    this.registerBtn = page.getByRole('button', { name: 'Register' });
  }

  signUpNewUser = async (user, password) => {
    await this.userWill.fillAndVerify(this.emailFld, user);
    await this.userWill.fillAndVerify(this.passFld, password);
    await this.userWill.click(this.registerBtn);
  };
}
