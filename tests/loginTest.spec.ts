// @ts-check
const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
});
test.describe('test initial pages', () => {
    test('has title', async ({ page }) => {
        // await page.goto('http://localhost:5173/');

        // Expect a title "to contain" a substring.
        await expect(page).toHaveTitle(/Digital Solutions/);
    });

    // test('get started link', async ({ page }) => {
    // Click the get started link.

    // Expects page to have a heading with the name of Installation.
    //   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
    //     await page.getByLabel('Click to Register').click();
    // });
    // test('get started link', async ({ page }) => {
    //     // Click the get started link.
    //     await page.locator('#username').fill('jj');

    //     await page..locator('#password1')fill('jj');
    //     // Expects page to have a heading with the name of Installation.
    //     //   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
    //     await page.getByLabel('Sign In').click();
    // });

    test('Sigin', async ({ page }) => {
        // Click the get started link

        await page.getByPlaceholder('username').fill('jj');

        await page.getByPlaceholder('password').fill('jj');
        // new code
        const navigationPromise = page.waitForNavigation();
        // # is for id
        const singinButton = page.locator('#singin');
        await singinButton.click();

        await navigationPromise;
        const dialogBox = page.locator('.p-radiobutton');
        await dialogBox.click();
        expect(page.url()).toBe('http://localhost:5173/permitapp');

        console.log('Navigation successful');
        await page.getByPlaceholder('address').fill('7400 sw 98 street');
        const searchButton = page.locator('#search');

        await searchButton.click();

        const municipality = page.getByPlaceholder('municipality');
        await expect(municipality).toContainText('Pinecrest');

        const navsubmitPromise = page.waitForNavigation();
        await navsubmitPromise;
        const submitButton = page.locator('#submit');
        await submitButton.click();

        expect(page.url()).toBe('http://localhost:5173/roofsystem');

        console.log('Navigation successful to Roofsystem');
    });
});
