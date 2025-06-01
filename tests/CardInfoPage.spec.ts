import { expect } from '@playwright/test';
import { test } from '../fixtures/fixture';


test('Open the card and check that all fields are populated', async ({ pageCardsWithContacktAllFields, appObjects }) => {
    const { savedContacts } = pageCardsWithContacktAllFields;
    await appObjects.contactsPage.cardNames.nth(0).click();

    const expectedName = savedContacts[0].name;
    const expectedTitle = savedContacts[0].title;
    const expectedLinks = savedContacts[0].links;
    const expectedNote = savedContacts[0].note;

    const actualName = await appObjects.cardPage.name.textContent();
    const actualTitle = await appObjects.cardPage.title.textContent();
    const actualLinks = await appObjects.cardPage.getLinks();
    const actualNote = await appObjects.cardPage.note.inputValue();

    expect(actualName).toEqual(expectedName);
    expect(actualTitle).toEqual(expectedTitle);
    expect(actualLinks).toEqual(expectedLinks);
    expect(actualNote).toEqual(expectedNote);
});

test('Open the card and check that only required fields are populated', async ({ pageCardsWithContacktOnlyRequiredFields, appObjects }) => {
    const { savedContacts } = pageCardsWithContacktOnlyRequiredFields;
    await appObjects.contactsPage.cardNames.nth(0).click();

    const expectedName = savedContacts[0].name;
    const expectedLinks = savedContacts[0].links;

    const actualName = await appObjects.cardPage.name.textContent();
    const actualLinks = await appObjects.cardPage.getLinks();
    const actualNote = await appObjects.cardPage.note.inputValue();

    await expect(appObjects.cardPage.title).not.toBeVisible();
    expect(actualNote).toBe('');
    expect(actualName).toEqual(expectedName);
    expect(actualLinks).toEqual(expectedLinks);
});

test('Open the card and edit the note', async ({ page, pageCardsWithContacktAllFields, appObjects }) => {
    const newNoteValue = 'Updated in test value';
    await appObjects.contactsPage.cardNames.nth(0).click();
    await appObjects.cardPage.note.fill(newNoteValue);
    await appObjects.cardPage.note.blur();
    await page.waitForTimeout(300);
    await appObjects.footer.contactsBtn.click();
    await appObjects.contactsPage.cardNames.nth(0).click();

    const actualNote = await appObjects.cardPage.note.inputValue();
    expect(actualNote).toEqual(newNoteValue);
});

// TBD Delete Card -> NO
test('Card could be deleted', async ({ pageCardsWithSavedContacts, appObjects }) => {
    const { savedContacts } = pageCardsWithSavedContacts;
    const numberOfContacts = savedContacts.length;
    const numberOfCardToDelete = 2;
    const nameOfDeletedCard = savedContacts[numberOfCardToDelete-1].name;

    await appObjects.contactsPage.cardNames.nth(numberOfCardToDelete-1).click();
    await appObjects.cardPage.deleteButton.click();
    await appObjects.cardPage.confirmDeleteButton.click();

    const actualNames = await appObjects.contactsPage.getNames();
    expect(actualNames.length).toBe(numberOfContacts-1);
    expect(actualNames).not.toContain(nameOfDeletedCard);

});


