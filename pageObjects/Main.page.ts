import { Locator, expect } from '@playwright/test';
import { PageHolder } from './PageHolder.page';

export class MainPage extends PageHolder {

    readonly createProfileBtn: Locator = this.page.locator('[href="/edit"]');
    readonly qrCode: Locator = this.page.locator('img.qr-code');
    readonly editProfileBtn: Locator = this.page.getByRole('link', { name: 'Редагувати мою картку' });
    readonly scanQrCodeBtn: Locator = this.page.getByRole('link', { name: 'QR Code Сканувати' });;


    async goto(): Promise<void> {
        await this.page.goto('/'); // https://kartka.app https://doucontact.netlify.app
    }
    async verifyQrCodeAndButtons(): Promise<void> {
        await expect(this.qrCode).toBeVisible();
        await expect(this.editProfileBtn).toBeVisible();
        await expect(this.scanQrCodeBtn).toBeVisible();
    }



}