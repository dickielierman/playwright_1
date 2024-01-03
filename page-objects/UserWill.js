import { expect } from '@playwright/test';

export class UserWill {
  typeAndVerify = async (elem, val) => {
    await elem.waitFor();
    await elem.fill(val);
    expect(elem).toHaveValue(val);
  };

  click = async (elem) => {
    await elem.waitFor();
    await elem.click();
  };

  selectDropOption = async (elem, val) => {
    await elem.waitFor();
    await elem.selectOption(val);
    expect(elem).toHaveValue(val);
  };

  expectText = async (elem, val) => {
    await elem.waitFor();
    await expect(elem).toContainText(val);
  };

  lookForElement = async (elem) => {
    await elem.waitFor();
    await expect(elem).toBeVisible();
  };
}
