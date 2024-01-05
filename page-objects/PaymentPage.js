import { expect } from '@playwright/test';
import { UserWill } from '../utils/UserWill';

export class PaymentPage {
  constructor(page) {
    this.page = page;
    this.userWill = new UserWill();
    this.cardCvvFld = page.locator('[data-qa="credit-card-cvc"]');
    this.cardExpirationFld = page.locator('[data-qa="valid-until"]');
    this.cardHolderFld = page.locator('[data-qa="credit-card-owner"]');
    this.cardNumberFld = page.locator('[data-qa="credit-card-number"]');
    this.discActiveTag = page.locator('[data-qa="discount-active-message"]');
    this.discCodeDiv = page.frameLocator('[data-qa="active-discount-container"]').locator('[data-qa="discount-code"]');
    this.discCodeFld = page.locator('[data-qa="discount-code-input"]');
    this.discPrice = page.locator('[data-qa="total-with-discount-value"]');
    this.payBtn = page.locator('[data-qa="pay-button"]');
    this.submitDiscBtn = page.locator('[data-qa="submit-discount-button"]');
    this.totalPrice = page.locator('[data-qa="total-value"]');
  }

  activateDiscount = async () => {
    await this.pageLoad();
    await this.userWill.expectToSee(this.discActiveTag, false);
    const totalNoDiscount = await this.userWill.getIntFromDollars(await this.totalPrice.innerText());
    const userDiscountCode = await this.discCodeDiv.innerText();
    await this.userWill.fillAndVerify(await this.discCodeFld, userDiscountCode);
    await this.userWill.click(await this.submitDiscBtn);
    await this.userWill.expectInnerText(await this.discActiveTag, 'Discount activated!');
    await this.discPrice.waitFor();
    const totalWithDiscount = await this.userWill.getIntFromDollars(await this.discPrice.innerText());
    await expect(totalWithDiscount).toBeLessThan(totalNoDiscount);
  };

  clickPayBtn = async () => {
    await this.pageLoad();
    await this.userWill.click(this.payBtn);
    await this.userWill.verifyUrl(this.page, /\/thank-you/);
  };

  enterCreditDetails = async (creditInfo) => {
    await this.pageLoad();
    await this.userWill.fillAndVerify(this.cardHolderFld, creditInfo.cardHolder);
    await this.userWill.fillAndVerify(this.cardNumberFld, creditInfo.cardNumber);
    await this.userWill.fillAndVerify(this.cardExpirationFld, creditInfo.expDate);
    await this.userWill.fillAndVerify(this.cardCvvFld, creditInfo.cvv);
  };

  pageLoad = async () => {
    await this.discCodeDiv.waitFor();
    await this.submitDiscBtn.waitFor();
    await this.payBtn.waitFor();
  };
}
