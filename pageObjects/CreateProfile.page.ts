import { Page, Locator } from '@playwright/test';

export class CreateProfilePage {
    readonly page: Page;
    readonly nameInput: Locator;
    readonly titleInput: Locator;
    readonly link1: Locator;
    readonly link2: Locator;
    readonly link3: Locator;
    readonly submitBtn: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.nameInput = page.locator('[id="name"]');
        this.titleInput = page.locator('[id="title"]');
        this.link1 = page.locator('[placeholder="Link 1"]');
        this.link2 = page.locator('[placeholder="Link 2"]');
        this.link3 = page.locator('[placeholder="Link 3"]');
        this.submitBtn = page.locator('[form="edit-profile"][type="submit"]');
        this.errorMessage = page.locator('.error-message');
    }

    async fillName(name: string) {
        await this.nameInput.fill(name);
    }

    async submit() {
        await this.submitBtn.click();
    }
}