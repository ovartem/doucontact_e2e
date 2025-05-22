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
        this.link1 = page.getByRole('textbox').nth(2);
        this.link2 = page.getByRole('textbox').nth(3);
        this.link3 = page.getByRole('textbox').nth(4);
        this.submitBtn = page.getByRole('button', { name: 'Зберегти мої дані' });
        this.errorMessage = page.locator('.error-message');
    }

    async fillName(name: string) {
        await this.nameInput.fill(name);
    }

    async createProfileData({name, title = '', link1, link2, link3 }: {name: string, title?: string, link1?: string, link2?: string, link3?: string}) {
        await this.fillName(name);
        if (title) {
            await this.titleInput.fill(title);
        }
        if (link1) {
            await this.link1.fill(link1);
        }
        if (link2) {
            await this.link2.fill(link2);
        }
        if (link3) {
            await this.link3.fill(link3);
        }
        await this.submit();
    }

    async submit() {
        await this.submitBtn.click();
    }
}