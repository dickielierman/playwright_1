// Module Imports
import { test } from '@playwright/test';
import { v4 as uuidv4 } from 'uuid';

// Page imports
import { CheckoutPage } from '../page-objects/CheckoutPage';
import { DeliveryDetailsPage } from '../page-objects/DeliveryDetailsPage';
import { deliveryDetails as userInfo } from '../data/deliveryDetails';
import { LoginPage } from '../page-objects/LoginPage';
import { NavigationPage } from '../page-objects/NavigationPage';
import { ProductsPage } from '../page-objects/ProductsPage';
import { RegisterPage } from '../page-objects/RegisterPage';

test.only('New user journey (E2E)', async ({ page }) => {
  // Page Objects
  const productsPage = new ProductsPage(page);
  const navigation = new NavigationPage(page);
  const checkoutPage = new CheckoutPage(page);
  const loginPage = new LoginPage(page);
  const registerPage = new RegisterPage(page);
  const deliveryDetailsPage = new DeliveryDetailsPage(page);

  // Constants
  const newUserEmail = `${uuidv4()}@mctesterson.com`;
  const newUserPass = uuidv4();

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

  await page.pause();
});
