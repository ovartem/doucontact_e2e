import { Page, Locator } from '@playwright/test';
import { CardPage } from './Card.page';

export class MainPage {
    readonly page: Page;

    readonly myProfileBtn: Locator;
    readonly contactsBtn: Locator;
    readonly createProfileBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.myProfileBtn = page.locator('[href="/"]');
        this.contactsBtn = page.locator('[href="/contacts"]');
        this.createProfileBtn = page.locator('[href="/edit"]');
    }

    async goto() {
        await this.page.goto('https://doucontact.netlify.app');
    }
}