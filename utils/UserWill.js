import { expect } from '@playwright/test';

export class UserWill {
  click = async (elem) => {
    await elem.waitFor();
    await elem.click();
  };

  expectInnerText = async (elem, val) => {
    await elem.waitFor();
    await expect(await elem.innerText()).toBe(val);
  };

  expectToContainText = async (elem, val) => {
    await elem.waitFor();
    await expect(elem).toContainText(val);
  };

  expectToHaveText = async (elem, val) => {
    await elem.waitFor();
    await expect(elem).toHaveText(val);
  };

  expectToSee = async (elem, bool = true) => {
    expect(await elem.isVisible()).toBe(bool);
  };

  fillAndVerify = async (elem, val) => {
    await elem.waitFor();
    await elem.fill(val);
    await expect(await elem).toHaveValue(val);
  };

  getIntFromDollars = async (dollars) => {
    return parseInt(dollars.replace('$', ''), 10);
  };

  lookForElement = async (elem) => {
    await elem.waitFor();
    await expect(elem).toBeVisible();
  };

  selectDropOption = async (elem, val) => {
    await elem.waitFor();
    await elem.selectOption(val);
    await expect(elem).toHaveValue(val);
  };

  // Example: await this.userWill.typeSlowAndVerify(this.page, this.discCodeFld, userDiscountCode);
  typeSlowAndVerify = async (page, elem, val, delay = 1000) => {
    await elem.waitFor();
    await elem.focus();
    await page.keyboard.type(val, { delay: delay });
    await expect(elem).toHaveValue(val);
  };

  // Example: await this.userWill.useKeyboardControls(this.page, 'Control+A');
  useKeyboardControls = async (page, keys) => {
    await page.keyboard.press(keys);
  };

  verifyUrl = async (page, url) => {
    await page.waitForURL(url, { timeout: 3000 });
  };
}
