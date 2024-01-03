import { expect } from '@playwright/test';
import { UserWill } from './UserWill/';

export class DeliveryDetailsPage {
  constructor(page) {
    this.page = page;
    this.userWill = new UserWill(page);
    this.firstNameFld = page.getByPlaceholder('First name');
    this.lastNameFld = page.getByPlaceholder('Last name');
    this.streetFld = page.getByPlaceholder('Street');
    this.postCodeFld = page.getByPlaceholder('Post code');
    this.cityFld = page.getByPlaceholder('City');
    this.countryDrop = page.getByRole('combobox');
    this.saveAddressBtn = page.locator('[data-qa="save-address-button"]');
    this.continueBtn = page.locator('[data-qa="continue-to-payment-button"]');
    this.savedAddressContainer = page.locator('[data-qa="saved-address-container"]');
    this.savedFirstName = page.locator('[data-qa="saved-address-firstName"]');
    this.savedLastName = page.locator('[data-qa="saved-address-lastName"]');
    this.savedStreet = page.locator('[data-qa="saved-address-street"]');
    this.savedPostCode = page.locator('[data-qa="saved-address-postcode"]');
    this.savedCity = page.locator('[data-qa="saved-address-city"]');
    this.savedCountry = page.locator('[data-qa="saved-address-country"]');
  }

  fillDetails = async (info) => {
    await this.userWill.typeAndVerify(this.firstNameFld, info.firstName);
    await this.userWill.typeAndVerify(this.lastNameFld, info.lastName);
    await this.userWill.typeAndVerify(this.streetFld, info.street);
    await this.userWill.typeAndVerify(this.postCodeFld, info.postCode);
    await this.userWill.typeAndVerify(this.cityFld, info.city);
    await this.userWill.selectDropOption(this.countryDrop, info.country);
  };

  verifySaveAddress = async () => {
    const countBeforSaving = await this.savedAddressContainer.count();
    await this.userWill.click(this.saveAddressBtn);
    await expect(this.savedAddressContainer).toHaveCount(countBeforSaving + 1);
    await this.savedFirstName.first().waitFor();
    expect(await this.savedFirstName.first().innerText()).toBe(await this.firstNameFld.inputValue());
    await this.savedLastName.first().waitFor();
    expect(await this.savedLastName.first().innerText()).toBe(await this.lastNameFld.inputValue());
    await this.savedStreet.first().waitFor();
    expect(await this.savedStreet.first().innerText()).toBe(await this.streetFld.inputValue());
    await this.savedPostCode.first().waitFor();
    expect(await this.savedPostCode.first().innerText()).toBe(await this.postCodeFld.inputValue());
    await this.savedCity.first().waitFor();
    expect(await this.savedCity.first().innerText()).toBe(await this.cityFld.inputValue());
    await this.savedCountry.first().waitFor();
    expect(await this.savedCountry.first().innerText()).toBe(await this.countryDrop.inputValue());
  };

  continueToPayment = async () => {
    await this.userWill.click(this.continueBtn);
    await this.page.waitForURL(/\/payment/, { timeout: 3000 });
  };
}
