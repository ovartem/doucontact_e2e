import { Page, Locator } from '@playwright/test';
import { PageHolder } from './PageHolder.page';
export class ContactsPage extends PageHolder {
    readonly addContactBtn: Locator = this.page.locator('.button[href="/add-contact"]');
    cardNames: Locator = this.page.locator('.contact-card h4');
    cardTitles: Locator = this.page.locator('.contact-title');
    async getNames(): Promise<string[]> {
        return await this.cardNames.allTextContents();
    };
    async getTitles(): Promise<string[]> {
        return await this.cardTitles.allTextContents();
    };
    async goto(): Promise<void> {
        await this.page.goto('/contacts');
    };

}