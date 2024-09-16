// @ts-check
const { test, expect } = require('@playwright/test');

test('has title', async ({ page }) => {
    await page.goto('http://localhost:5173/');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Digital Solutions/);
});

test('get started link', async ({ page }) => {
    await page.goto('http://localhost:5173/');

    // Click the get started link.
    await page.getByTestId('username').fill('jj');

    await page.getByPlaceholder('Password').fill('jj');
    // Expects page to have a heading with the name of Installation.
    //   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
    await page.getByLabel('Sign In').click();
});
