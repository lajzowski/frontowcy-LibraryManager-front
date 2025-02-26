import { test } from '@playwright/test';

test('rent book', async ({ page }) => {
  await page.goto('/login');
  await page.locator('#cardNumber').fill('1111111111');
  await page.locator('#password').fill('testtest1234');
  await page.getByTestId('button-submit').click();
  await page.waitForSelector('.card');

  await page.goto('/books/test-ksiazki');

  const numberText = (
    await page
      .locator(
        'xpath=//*[@id="root"]/div/main/main/div/div/div[2]/div[2]/div/table/tbody/tr[1]/td/span/div/p/span/span[2]/p'
      )
      .textContent()
  )?.replace(/\D/g, '');

  await page.locator('button span:has-text("Wypożycz książkę!")').click();

  await page.locator('button span:has-text("Potwierdzam")').click();

  await page.waitForTimeout(2000);
  await test.step('Verify the number decreases by one', async () => {
    const updatedNumberText = (
      await page
        .locator(
          'xpath=//*[@id="root"]/div/main/main/div/div/div[2]/div[2]/div/table/tbody/tr[1]/td/span/div/p/span/span[2]/p'
        )
        .textContent()
    )?.replace(/\D/g, '');

    test.expect(numberText).not.toBeNull();
    test.expect(updatedNumberText).not.toBeNull();

    const previousNumber = parseInt(numberText || '0', 10);
    const updatedNumber = parseInt(updatedNumberText || '0', 10);

    test.expect(updatedNumber).toBe(previousNumber - 1);
  });
});

test('return book', async ({ page }) => {
  await test.step('', async () => {
    await test.step('login process', async () => {
      await page.goto('/login');
      await page.locator('#cardNumber').fill('1111111111');
      await page.locator('#password').fill('testtest1234');
      await page.getByTestId('button-submit').click();
      await page.waitForSelector('.card');
    });
  });

  await page.goto('/rents');

  await test.step('clicking the hide returned checkbox', async () => {
    await page.locator('.ant-checkbox-input').click();
  });

  await test.step('returning the book from the first row', async () => {
    const key = await page.locator('tr').first().getAttribute('data-row-key');

    await page.locator('tbody').locator('tr').first().locator('button').click();

    await page.locator('button span:has-text("Potwierdź zwrot")').click();

    await test.step('checking if a row has disappeared from the table', async () => {
      const rowExists = await page.locator(`tr[data-row-key="${key}"]`).count();
      test.expect(rowExists).toBe(0);
    });
  });
});
