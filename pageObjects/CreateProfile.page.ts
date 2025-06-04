import { Locator, expect } from '@playwright/test';
import { PageHolder } from './PageHolder.page';
import { UserData } from '../typings/userData';
export class CreateProfilePage extends PageHolder {
    readonly nameInput: Locator = this.page.locator('[id="name"]');;
    readonly titleInput: Locator =  this.page.locator('[id="title"]');;
    readonly link1: Locator =  this.page.getByRole('textbox').nth(2);;
    readonly link2: Locator = this.page.getByRole('textbox').nth(3);;
    readonly link3: Locator = this.page.getByRole('textbox').nth(4);;
    readonly submitBtn: Locator = this.page.getByRole('button', { name: 'Зберегти мої дані' });;
    readonly errorMessage: Locator =  this.page.locator('.error-message');;

    async fillName(name: string): Promise<void> {
        await this.nameInput.fill(name);
    }

    async createProfileData({name, title, link1, link2, link3 }: UserData): Promise<void> {
        await this.fillName(name);
        if (title !== undefined) {
            await this.titleInput.fill(title);
        }
        if (link1 !== undefined) {
            await this.link1.fill(link1);
        }
        if (link2 !== undefined) {
            await this.link2.fill(link2);
        }
        if (link3 !== undefined) {
            await this.link3.fill(link3);
        }
        await this.submit();
    }

    async submit() {
        await this.submitBtn.click();
    }

    async verifyDataOnEditPageIsCorrect (userData: UserData): Promise<void> {
        await expect(this.nameInput).toHaveValue(userData.name);
        await expect(this.titleInput).toHaveValue(userData.title ?? '');
        await expect(this.link1).toHaveValue(userData.link1 ?? '');
        await expect(this.link2).toHaveValue(userData.link2 ?? '');
        await expect(this.link3).toHaveValue(userData.link3 ?? '');
    }
}