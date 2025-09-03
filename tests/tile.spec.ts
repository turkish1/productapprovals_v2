import { test, expect } from '@playwright/test';

test.describe('Tile page (Vue 3)', () => {
    test('end-to-end form interaction', async ({ page }) => {
        // Navigate
        await page.goto('http://127.0.0.1:5173/tile');
        await expect(page.locator('#tile')).toBeVisible();

        // --- Deck / UDL style Select (PrimeVue Select) ---
        // Click the first combobox and choose the "Prescriptive ASTM #90..." option
        const firstCombo = page.locator('[data-pc-name="select"] [data-pc-section="label"]').first();
        await firstCombo.click();

        // Teleported panel should render options with role="option"
        const optionToPick = /Prescriptive ASTM #90 hot mopped with Type IV Asphalt to a mechanically fastened ASTM #30/i;
        await page.getByRole('option', { name: optionToPick }).first().click();

        // Assert the visible label updated
        await expect(firstCombo).toHaveText(optionToPick);

        // --- Fill numeric inputs ---
        await page.fill('#slope', '5.5');
        await page.fill('#area', '200');
        await page.fill('#height', '15');

        // Perimeter is likely computed elsewhere; just ensure it's present
        await expect(page.locator('#perimeter')).toHaveValue(/.+/);

        // --- Exposure radios C/D ---
        await page.getByLabel('D').check(); // for="option4"
        await expect(page.locator('#option4')).toBeChecked();

        // --- Paddy Category radios Single/Double ---
        await page.getByLabel('Double').check(); // for="option2"
        await expect(page.locator('#option2')).toBeChecked();

        // --- Tile NOA ---
        const tileNoa = page.locator('#tilenoa');
        await tileNoa.fill('20102702');

        // Click the Submit button that belongs to the Tile NOA section.
        // Uses :has() to scope to the nearest .w-96 container that contains #tilenoa
        await page.locator('.w-96:has(#tilenoa)').getByRole('button', { name: 'Submit' }).click();

        // Basic post-submit sanity (tweak if your app shows a toast/modal/result)
        await expect(tileNoa).toHaveValue('20102702');
    });
});
