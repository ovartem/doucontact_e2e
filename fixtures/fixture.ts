import { test as base, expect, Page } from '@playwright/test';
import { App } from '../typings/appClass';
import { userDataWith2Links } from '../utils/testData';
import { ContactsFile, ContactCard } from '../typings/userData';
import * as fs from 'fs';
type Fixtures = {
    appObjects: App;
    pageOpenAddMyCard: Page;
    pageMyProfilewithQR: Page;
    pageCardsWithSavedContacts: {
        page: Page;
        savedContacts: ContactCard[];
    };
    pageCardsWithContacktAllFields: {
        savedContacts: ContactCard[];
    };
    pageCardsWithContacktOnlyRequiredFields: {
        savedContacts: ContactCard[];
    };
};


export const test = base.extend<Fixtures>({
    appObjects: async ({ page }, use) => {
        const app = new App(page);
        await use(app);
    },

    pageOpenAddMyCard: async ({ page, appObjects }, use) => {
        await appObjects.mainPage.goto();
        await appObjects.mainPage.createProfileBtn.click();
        await use(page);
    },

    pageMyProfilewithQR: async ({ page, appObjects }, use) => {

        await appObjects.mainPage.goto();
        await appObjects.mainPage.createProfileBtn.click();
        await appObjects.createProfilePage.createProfileData(userDataWith2Links);
        await appObjects.mainPage.verifyQrCodeAndButtons();
        await use(page);
    },

    pageCardsWithSavedContacts: async ({ page, appObjects }, use) => {

        const fileContent = fs.readFileSync('utils/savedCards.json', 'utf-8');
        const parsed = JSON.parse(fileContent) as ContactsFile;
        const savedContacts = parsed.savedContacts;
        await appObjects.contactsPage.goto();
        await page.evaluate((contactsStr) => {
            localStorage.setItem('savedContacts', JSON.stringify(contactsStr));
        }, savedContacts);

        await page.reload();
        await use({ page, savedContacts });
    },

    pageCardsWithContacktAllFields: async ({ page, appObjects }, use) => {

        const fileContent = fs.readFileSync('utils/cardWithAllfields.json', 'utf-8');
        const parsed = JSON.parse(fileContent) as ContactsFile;
        const savedContacts = parsed.savedContacts;
        await appObjects.contactsPage.goto();
        await page.evaluate((contactsStr) => {
            localStorage.setItem('savedContacts', JSON.stringify(contactsStr));
        }, savedContacts);

        await page.reload();
        await use({ savedContacts });
    },
    pageCardsWithContacktOnlyRequiredFields: async ({ page, appObjects }, use) => {

        const fileContent = fs.readFileSync('utils/cardWithNameAndOneLink.json', 'utf-8');
        const parsed = JSON.parse(fileContent) as ContactsFile;
        const savedContacts = parsed.savedContacts;
        await appObjects.contactsPage.goto();
        await page.evaluate((contactsStr) => {
            localStorage.setItem('savedContacts', JSON.stringify(contactsStr));
        }, savedContacts);

        await page.reload();
        await use({ savedContacts });
    },


});