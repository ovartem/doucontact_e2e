import { expect } from '@playwright/test';
import { test } from '../fixtures/fixture';
import { MainPage } from '../pageObjects/Main.page';
import { AddContactPage } from '../pageObjects/AddContact.page';
import { ContactsPage } from '../pageObjects/Contacts.page';
import { Footer } from '../pageObjects/Footer.fragment';
import { launchBrowserWithFakeMedia } from '../otherBrowserInstance/launchBrowser';
import { main } from '../jpegToMjpegConverter';
import { UserData } from '../typings/userData';

test.skip('Add default contact with all data without profile creation', async ({ page, browser, appObjects, pageOpenAddMyCard }) => {
  const userData: UserData = {
    name: 'Test User',
    title: 'Product Manager',
    link1: '+38 050-1112233',
    link2: 'https://github.com/testuser',
    link3: '@mynik',

  }
  await appObjects.createProfilePage.createProfileData(userData);
  await appObjects.mainPage.verifyQrCodeAndButtons();
  const fileName = `${Date.now()}`;
  await appObjects.mainPage.qrCode.screenshot({ path: `${fileName}.jpg` });


  // Navigate to the application
  await main(`${fileName}.jpg`, `${fileName}.mjpeg`);
  const { page: page2 } = await launchBrowserWithFakeMedia(`${fileName}.mjpeg`);
  const mainPage2 = new MainPage(page2);
  const contactsPage2 = new ContactsPage(page2);
  const addContactPage2 = new AddContactPage(page2);
  const Footer2 = new Footer(page2);

  await mainPage2.goto();
  await Footer2.contactsBtn.click();
  await contactsPage2.addContactBtn.click();

  // Verify video input is visible and working
  await expect(addContactPage2.videoInput).toBeVisible();

  console.log('[page2] URL:', page2.url());
  console.log('[page2] Content:', await page2.content());

  await expect(addContactPage2.cardPage.name).toHaveText(userData.name);
  await expect(addContactPage2.cardPage.title).toHaveText(userData.title!);
  await expect(addContactPage2.cardPage.link1).toHaveText(userData.link1!);
  await expect(addContactPage2.cardPage.link2).toHaveText(userData.link2!);
  await expect(addContactPage2.cardPage.link3).toHaveText(userData.link3!);

  // Take photo and save
  // await addContactPage.takePhotoAndSave.click();

  // TODO: add verification of the saved contact
});
