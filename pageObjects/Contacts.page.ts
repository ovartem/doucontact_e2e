import { Page, Locator } from '@playwright/test';

export class ContactsPage {
    readonly page: Page;

    readonly addContactBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.addContactBtn = page.locator('.button[href="/add-contact"]');
    }
}