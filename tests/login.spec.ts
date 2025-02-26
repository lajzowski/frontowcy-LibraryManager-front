import { expect, test } from '@playwright/test';

test('Checking if the login page is displayed', async ({ page }) => {
  await page.goto('/login');
  await expect(page.locator('h1')).toContainText('Logowanie');
});

test('Checking if an error occurs if we do not enter 10 digits', async ({
  page,
}) => {
  await page.goto('/login');

  // sprawdzanie, czy wyświetla się pole do wpisywania numeru karty
  await expect(page.locator('#cardNumber')).toBeVisible();

  /// sprawdzanie, czy po wpisaniu za małej ilości znaków pojawi się komunikat
  await page.locator('#cardNumber').fill('222');
  await expect(page.locator('.ant-form-item-explain-error')).toContainText(
    'Numer karty musi być liczbą i mieć dokładnie 10 znaków.'
  );
});

test('Checks whether we will receive an appropriate message when we provide incorrect login details', async ({
  page,
}) => {
  await page.goto('/login');

  await page.locator('#cardNumber').fill(Math.random().toString().slice(2, 12));
  await page.locator('#password').fill('fakePassword');
  await page.getByTestId('button-submit').click();
  await expect(page.locator('.login-error')).toContainText(
    'Błędne dane logowania!'
  );
});

test('Checks whether we get the appropriate messages when we do not enter anything and press the button', async ({
  page,
}) => {
  await page.goto('/login');
  await page.getByTestId('button-submit').click();

  await expect(page.locator('.content')).toContainText(
    'Proszę wpisać numer karty.'
  );
  await expect(page.locator('.content')).toContainText('Proszę wpisać hasło.');
});

test('Login and logout', async ({ page }) => {
  await page.goto('/login');
  await page.locator('#cardNumber').fill('1111111111');
  await page.locator('#password').fill('testtest1234');
  await page.getByTestId('button-submit').click();
  await expect(page.locator('.card')).toHaveText('1111111111');

  await page.locator('.login-link').getByText('Wyloguj').click();
  await expect(page.locator('h1')).toHaveText('Zostałeś wylogowany');
});
