import { Page, Locator } from '@playwright/test';
import { PageHolder } from './PageHolder.page';

export class Footer extends PageHolder {

    readonly myProfileBtn: Locator = this.page.locator('[href="/"]');
    readonly contactsBtn: Locator = this.page.locator('[href="/contacts"]');

}