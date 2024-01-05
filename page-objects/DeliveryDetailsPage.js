import { expect } from '@playwright/test';
import { UserWill } from '../utils/UserWill';

export class DeliveryDetailsPage {
  constructor(page) {
    this.page = page;
    this.userWill = new UserWill();
    this.cityFld = page.getByPlaceholder('City');
    this.continueBtn = page.locator('[data-qa="continue-to-payment-button"]');
    this.countryDrop = page.getByRole('combobox');
    this.firstNameFld = page.getByPlaceholder('First name');
    this.lastNameFld = page.getByPlaceholder('Last name');
    this.postCodeFld = page.getByPlaceholder('Post code');
    this.saveAddressBtn = page.locator('[data-qa="save-address-button"]');
    this.savedAddressContainer = page.locator('[data-qa="saved-address-container"]');
    this.savedCity = page.locator('[data-qa="saved-address-city"]');
    this.savedCountry = page.locator('[data-qa="saved-address-country"]');
    this.savedFirstName = page.locator('[data-qa="saved-address-firstName"]');
    this.savedLastName = page.locator('[data-qa="saved-address-lastName"]');
    this.savedPostCode = page.locator('[data-qa="saved-address-postcode"]');
    this.savedStreet = page.locator('[data-qa="saved-address-street"]');
    this.streetFld = page.getByPlaceholder('Street');
  }

  fillDetails = async (info) => {
    await this.userWill.fillAndVerify(this.firstNameFld, info.firstName);
    await this.userWill.fillAndVerify(this.lastNameFld, info.lastName);
    await this.userWill.fillAndVerify(this.streetFld, info.street);
    await this.userWill.fillAndVerify(this.postCodeFld, info.postCode);
    await this.userWill.fillAndVerify(this.cityFld, info.city);
    await this.userWill.selectDropOption(this.countryDrop, info.country);
  };

  verifySaveAddress = async () => {
    const countBeforSaving = await this.savedAddressContainer.count();
    await this.userWill.click(this.saveAddressBtn);
    await expect(this.savedAddressContainer).toHaveCount(countBeforSaving + 1);
    await this.userWill.expectInnerText(this.savedFirstName.first(), await this.firstNameFld.inputValue());
    await this.userWill.expectInnerText(this.savedLastName.first(), await this.lastNameFld.inputValue());
    await this.userWill.expectInnerText(this.savedStreet.first(), await this.streetFld.inputValue());
    await this.userWill.expectInnerText(this.savedPostCode.first(), await this.postCodeFld.inputValue());
    await this.userWill.expectInnerText(this.savedCity.first(), await this.cityFld.inputValue());
    await this.userWill.expectInnerText(this.savedCountry.first(), await this.countryDrop.inputValue());
  };

  continueToPayment = async () => {
    await this.userWill.click(this.continueBtn);
    await this.userWill.verifyUrl(this.page, /\/payment/);
  };
}
