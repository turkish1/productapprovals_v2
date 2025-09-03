import { test, expect } from '@playwright/test';

test.describe('Shingles page (Vue 3)', () => {
    test('end-to-end form interaction', async ({ page }) => {
        // Navigate to the page
        await page.goto('http://127.0.0.1:5173/shingles');

        // Sanity: main section visible
        const mainSection = page.locator('div#shingle').first();
        await expect(mainSection).toBeVisible();

        // ----- Deck Select (PrimeVue) -----
        const deckCombo = page.locator('#pv_id_17 [role="combobox"]');
        await deckCombo.click();
        // Pick first available option (works with PrimeVue teleported panel)
        await page.getByRole('option').first().click();

        // ----- Roof Slope / Area / Height -----
        await page.fill('#slope', '6');
        await expect(page.locator('#area')).toHaveValue('1200'); // readonly as per markup
        await page.fill('#height', '15');

        // ----- Underlayment (S/A) Select -----
        const saCombo = page.locator('#pv_id_18 [role="combobox"]');
        await saCombo.click();
        await page.getByRole('option').first().click();

        // ----- Drip Edge Material & Size Selects -----
        const dripMaterialCombo = page.locator('#pv_id_20 [role="combobox"]');
        await dripMaterialCombo.click();
        await page.getByRole('option').first().click();

        const dripSizeCombo = page.locator('#pv_id_21 [role="combobox"]');
        await dripSizeCombo.click();
        await page.getByRole('option').first().click();

        // ----- Shingle NOA -----
        const shingleNoa = page.locator('#shinglenoa');
        await shingleNoa.fill('21032316');
        // Click the Submit button scoped to the container that has #shinglenoa
        await page.locator('.w-96:has(#shinglenoa)').getByRole('button', { name: 'Submit' }).click();
        await expect(shingleNoa).toHaveValue('21032316');

        // ----- UDL NOA -----
        // const udlNoa = page.locator('#udlInput');
        // await udlNoa.fill('21022203');
        // await page.locator('.w-96:has(#udlInput)').getByRole('button', { name: 'Submit' }).click();
        // await expect(udlNoa).toHaveValue('21022203');

        // ----- Stepper "Next" (if enabled) -----
        // const nextBtn = page.getByRole('button', { name: 'Next' });
        // await expect(nextBtn).toBeEnabled();
        // await nextBtn.click();

        // (Optional) add an assertion here if your app shows a Summary view/state change.
    });
});
