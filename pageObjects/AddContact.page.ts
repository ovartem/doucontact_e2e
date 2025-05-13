import { Page, Locator } from '@playwright/test';
import { CardPage } from './Card.page';

export class AddContactPage {
    readonly page: Page;

    readonly videoInput: Locator;
    readonly cardPage: CardPage;
    readonly takePhotoAndSave: Locator;

    constructor(page: Page) {
        this.page = page;
        this.videoInput = page.locator('div video');
        this.cardPage = new CardPage(page);
        this.takePhotoAndSave = page.locator('.button.big-button.full-width');
    }
}