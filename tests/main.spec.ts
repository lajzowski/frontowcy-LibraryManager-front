import { expect, test } from '@playwright/test';

test('title in selector logo is rendered', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('.logo')).toHaveText('Frontowcy Library Manager');
});

test('Menu position are rendered', async ({ page }) => {
  await page.goto('/');

  // sprawdzanie, czy wyświetla się menu
  await expect(page.locator('.menu')).toBeVisible();

  // czy pozycje się wyświetlają poprawnie

  await expect(page.locator('.menu')).toContainText('Lista Książek');
  await expect(page.locator('.menu')).toContainText('Statystyki');
  await expect(page.locator('.menu')).toContainText('Moje wypożyczenia');
});
