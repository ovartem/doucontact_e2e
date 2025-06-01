import { Page, Locator } from '@playwright/test';
import { PageHolder } from './PageHolder.page';
export class CardPage extends PageHolder {



    readonly name: Locator = this.page.locator('h4.text-lg');
    readonly title: Locator = this.page.locator('.card p').nth(0);
    readonly link1: Locator = this.page.locator('.card a:not(.button)').nth(0);
    readonly link2: Locator = this.page.locator('.card a:not(.button)').nth(1);
    readonly link3: Locator = this.page.locator('.card a:not(.button)').nth(2);
    readonly links: Locator = this.page.locator('.card a:not(.button)');
    readonly note: Locator = this.page.getByRole('textbox');
    readonly deleteButton: Locator = this.page.getByRole('button', { name: 'Видалити картку' });
    readonly confirmDeleteButton: Locator = this.page.getByRole('button', { name: 'Так' });

    async getLinks(): Promise<string[]> {
        return await this.links.allTextContents();
    };


}