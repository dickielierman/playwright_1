import { expect } from '@playwright/test';
import { UserWill } from '../utils/UserWill.js';

export class MyAccountPage {
  constructor(page) {
    this.page = page;
    this.userWill = new UserWill();
    this.addressesHeader = page.getByRole('heading', { name: 'Your addresses' });
    this.errorMessage = page.locator('[data-qa="error-message"]');
  }

  visit = async () => {
    await this.page.goto('/my-account');
  };

  waitForErrorMessage = async () => {
    await this.errorMessage.waitFor();
  };
}
