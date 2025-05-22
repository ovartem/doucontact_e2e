import { test, expect } from '@playwright/test';
import { MainPage } from '../pageObjects/Main.page';
import { AddContactPage } from '../pageObjects/AddContact.page';
import { ContactsPage } from '../pageObjects/Contacts.page';
import { launchBrowserWithFakeMedia } from '../otherBrowserInstance/launchBrowser';
import { main } from '../jpegToMjpegConverter';
import { CreateProfilePage } from '../pageObjects/createProfile.page';

test('Add default contact with all data without profile creation', async ({ page, browser }) => {
  const mainPage = new MainPage(page);
  const createProfilePage = new CreateProfilePage(page);

  await mainPage.goto();
  await mainPage.createProfileBtn.click();

  const testName = 'Test User';
  const testLink = 'https://github.com/testuser';
  await createProfilePage.fillName(testName);
  await createProfilePage.link1.fill(testLink);

  await createProfilePage.submit();

  await expect(mainPage.qrCode).toBeVisible();

  const fileName = `${Date.now()}`;
  await mainPage.qrCode.screenshot({ path: `${fileName}.jpg` });


  // Navigate to the application
  await main(`${fileName}.jpg`, `${fileName}.mjpeg`);
  const { page: page2 } = await launchBrowserWithFakeMedia(`${fileName}.mjpeg`);
  const mainPage2 = new MainPage(page2);
  const contactsPage2 = new ContactsPage(page2);
  const addContactPage2 = new AddContactPage(page2);

  await mainPage2.goto();
  await mainPage2.contactsBtn.click();
  await contactsPage2.addContactBtn.click();

  // Verify video input is visible and working
  await expect(addContactPage2.videoInput).toBeVisible();

  await expect(addContactPage2.cardPage.name).toHaveText(testName);
  await expect(addContactPage2.cardPage.title).toHaveText('');
  await expect(addContactPage2.cardPage.link1).toHaveText(testLink);
  await expect(addContactPage2.cardPage.link2).toHaveText('');
  await expect(addContactPage2.cardPage.link3).toHaveText('');

  // Take photo and save
  // await addContactPage.takePhotoAndSave.click();

  // TODO: add verification of the saved contact
});
