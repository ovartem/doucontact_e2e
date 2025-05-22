import { Page, Locator } from '@playwright/test';
import { CardPage } from './Card.page';

export class MainPage {
    readonly page: Page;

    readonly myProfileBtn: Locator;
    readonly contactsBtn: Locator;
    readonly createProfileBtn: Locator;
    readonly qrCode: Locator;
    readonly editProfileBtn: Locator;
    readonly scanQrCodeBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.myProfileBtn = page.locator('[href="/"]');
        this.contactsBtn = page.locator('[href="/contacts"]');
        this.createProfileBtn = page.locator('[href="/edit"]');

        this.qrCode = page.getByRole('img', { name: 'QR Code' });
        this.editProfileBtn = page.getByRole('link', { name: 'Редагувати мої дані' });
        this.scanQrCodeBtn = page.getByRole('link', { name: 'Відсканувати QR' });
    }

    async goto() {
        await this.page.goto('https://kartka.app'); // https://doucontact.netlify.app
    }
}