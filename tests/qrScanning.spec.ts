import { test, expect } from '@playwright/test';
import { MainPage } from '../pageObjects/Main.page';
import { AddContactPage } from '../pageObjects/AddContact.page';
import { ContactsPage } from '../pageObjects/Contacts.page';

test('Add default contact with all data without profile creation', async ({ page, browser }) => {
  const mainPage = new MainPage(page);
  const contactsPage = new ContactsPage(page);
  const addContactPage = new AddContactPage(page);

  const defaultTestData = {
    name: 'Name LastName',
    title: 'Test Automation Engineer From Kyiv with Love',
    link1: 'https://www.linkedin.com',
    link2: 'https://www.facebook.com',
    link3: 'https://t.me',
  }

  // Navigate to the application
  await mainPage.goto();

  // Click on the "Contacts" button
  await mainPage.contactsBtn.click();

  // Click on the "Add Contact" button
  await contactsPage.addContactBtn.click();

  // Verify video input is visible and working
  await expect(addContactPage.videoInput).toBeVisible();

  await expect(addContactPage.cardPage.name).toHaveText(defaultTestData.name);;
  await expect(addContactPage.cardPage.title).toHaveText(defaultTestData.title);;
  await expect(addContactPage.cardPage.link1).toHaveText(defaultTestData.link1);;
  await expect(addContactPage.cardPage.link2).toHaveText(defaultTestData.link2);;
  await expect(addContactPage.cardPage.link3).toHaveText(defaultTestData.link3);;

  // Take photo and save
  await addContactPage.takePhotoAndSave.click();





  // const pixel5Context = await browser.newContext({
  //   viewport: { width: 393, height: 851 },
  //   deviceScaleFactor: 2.75,
  //   isMobile: true,
  //   hasTouch: true,
  //   userAgent: 'Mozilla/5.0 (Linux; Android 12; Pixel 5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.41 Mobile Safari/537.36'
  // });
  // const page2 = await pixel5Context.newPage();
});
