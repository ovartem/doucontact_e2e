
import { expect } from '@playwright/test';
import { test } from '../fixtures/fixture';

// TBD ADD IMAGES;
// TBD Verify if No Title
test('Cards page view', async ({ pageCardsWithSavedContacts, appObjects }) => {
    const { savedContacts } = pageCardsWithSavedContacts;
    const expectedNames = savedContacts.map(obj => obj.name);
    const expectedTitles = savedContacts.map(obj => obj.title ?? '');

    await appObjects.contactsPage.cardNames.nth(0).waitFor();

    const actualNames = await appObjects.contactsPage.getNames();
    const actualTitles = await appObjects.contactsPage.getTitles();

    expect(actualNames).toEqual(expectedNames);
    expect(actualTitles).toEqual(expectedTitles);

});

