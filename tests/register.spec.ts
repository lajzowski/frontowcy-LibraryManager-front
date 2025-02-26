import { expect, test } from '@playwright/test';

test('Displaying the registration page', async ({ page }) => {
  await page.goto('/register');

  await expect(page.locator('h1')).toHaveText('Rejestracja');
});

test('Displaying errors about missing data', async ({ page }) => {
  await page.goto('/register');

  await page.locator('.content').locator('button').click();

  await expect(page.locator('.content')).toContainText('Proszę wpisać imię.');
  await expect(page.locator('.content')).toContainText(
    'Proszę wpisać nazwisko.'
  );
  await expect(page.locator('.content')).toContainText('Proszę wpisać e-mail.');
  await expect(page.locator('.content')).toContainText('Proszę wpisać hasło.');
  await expect(page.locator('.content')).toContainText(
    'Proszę powtórzyć hasło.'
  );
});

test('Message about different passwords', async ({ page }) => {
  await page.goto('/register');

  await page.locator('#password').fill('dosadosasaodoao2132112');
  await page.locator('#confirmPassword').fill('dosadosasaodoao2132112x');

  await expect(page.locator('.content')).toContainText(
    'Hasła muszą być takie same.'
  );
});

test('Registration', async ({ page }) => {
  await page.goto('/register');

  await page.locator('#firstname').fill('Jan');
  await page.locator('#lastname').fill('Kowalski');
  const randomLetters = Math.random().toString(36).substring(2, 6);
  await page.locator('#email').fill(`${randomLetters}@testowy.xy`);
  await page.locator('#password').fill('testtest1234');
  await page.locator('#confirmPassword').fill('testtest1234');
  await page.locator('.content').locator('button').click();
  await expect(page.locator('h3')).toContainText('Dziękujemy za rejestrację!');
});
