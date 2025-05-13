import { Page, Locator } from '@playwright/test';

export class CardPage {
    readonly page: Page;

    readonly contactsBtn: Locator;
    readonly name: Locator;
    readonly title: Locator;
    readonly link1: Locator;
    readonly link2: Locator;
    readonly link3: Locator;
    readonly qrCode: Locator;
    readonly addContactBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.contactsBtn = page.locator('nav [href="/contacts"]');
        this.name = page.locator('.card h2');
        this.title = page.locator('.card p').nth(0);
        this.link1 = page.locator('.card a').nth(0);
        this.link2 = page.locator('.card a').nth(1);
        this.link3 = page.locator('.card a').nth(2);
        this.qrCode = page.locator('.card .qr-code');
        this.addContactBtn = page.locator('.button.fab')
    }
}