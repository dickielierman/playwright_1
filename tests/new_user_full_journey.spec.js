// Module Imports
import { test } from '@playwright/test';
import { v4 as uuidv4 } from 'uuid';

// Page imports
import { CheckoutPage } from '../page-objects/CheckoutPage';
import { DeliveryDetailsPage } from '../page-objects/DeliveryDetailsPage';
import { LoginPage } from '../page-objects/LoginPage';
import { NavigationPage } from '../page-objects/NavigationPage';
import { PaymentPage } from '../page-objects/PaymentPage';
import { ProductsPage } from '../page-objects/ProductsPage';
import { RegisterPage } from '../page-objects/RegisterPage';

// Data imports
import { deliveryDetails as userInfo } from '../data/deliveryDetails';
import { creditDetails as creditInfo } from '../data/creditData';

test('New user journey (E2E)', async ({ page }) => {
  // Page Objects
  const checkoutPage = new CheckoutPage(page);
  const deliveryDetailsPage = new DeliveryDetailsPage(page);
  const loginPage = new LoginPage(page);
  const navigation = new NavigationPage(page);
  const paymentPage = new PaymentPage(page);
  const productsPage = new ProductsPage(page);
  const registerPage = new RegisterPage(page);

  // Constants
  const newUserEmail = `${uuidv4()}@mctesterson.com`;
  const newUserPass = uuidv4();

  // Test Steps
  await productsPage.visit();
  await productsPage.sortByCheapest();
  await productsPage.addProductToBasket(0);
  await productsPage.addProductToBasket(1);
  await productsPage.addProductToBasket(2);
  await navigation.goToCheckout();
  await checkoutPage.removeCheapestProduct();
  await checkoutPage.continueToCheckout();
  await loginPage.clickRegister();
  await registerPage.signUpNewUser(newUserEmail, newUserPass);
  await deliveryDetailsPage.fillDetails(userInfo);
  await deliveryDetailsPage.verifySaveAddress();
  await deliveryDetailsPage.continueToPayment();
  await paymentPage.activateDiscount();
  await paymentPage.enterCreditDetails(creditInfo);
  await paymentPage.clickPayBtn();

  // await page.pause();
});
