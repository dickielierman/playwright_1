import { test } from '@playwright/test';
import { getLoginToken } from '../api-calls/getLoginToken';
import { MyAccountPage } from '../page-objects/MyAccountPage';
import { adminDetails } from '../data/userDetails';

test('My Account using cookie injection and mocking network request', async ({ page }) => {
  const loginToken = await getLoginToken(adminDetails.username, adminDetails.password);

  await page.route('**/api/user**', async (route, request) => {
    await route.fulfill({
      status: 500,
      contentType: 'application/json',
      body: JSON.stringify({ message: 'PLAYWRIGHT ERROR FROM MOCKING' }),
    });
  });

  // Page Objects
  const myAccount = new MyAccountPage(page);

  // Test Steps
  await myAccount.visit();
  await page.evaluate(
    ([loginTokenInsideBrowser]) => {
      document.cookie = `token=${loginTokenInsideBrowser}`;
    },
    [loginToken]
  );
  await myAccount.visit();
  await myAccount.addressesHeader.waitFor();
  await myAccount.waitForErrorMessage();
});
