import { test, expect } from '@playwright/test';
import { CreateProfilePage } from '../pageObjects/createProfile.page';
import { CardPage } from '../pageObjects/Card.page';
import { MainPage } from '../pageObjects/Main.page';
import { launchBrowserWithFakeMedia } from '../otherBrowserInstance/launchBrowser';
import { ContactsPage } from '../pageObjects/Contacts.page';

test('TEST', async () => {
  const { page } = await launchBrowserWithFakeMedia('screenshot_2sec.mjpeg');
  const mainPage = new MainPage(page);
  const contactsPage = new ContactsPage(page);

  await mainPage.goto();
  await mainPage.contactsBtn.click();
  await contactsPage.addContactBtn.click();
  console.log('test');
});

test('Create profile with only name', async ({ page }) => {
  const mainPage = new MainPage(page);
  const createProfilePage = new CreateProfilePage(page);
  const cardPage = new CardPage(page);

  // Navigate to the application and start profile creation
  await mainPage.goto();
  await mainPage.createProfileBtn.click();

  // Enter name only
  const testName = 'Test User';
  await createProfilePage.fillName(testName);

  // Submit the form
  await createProfilePage.submit();

  // Verify profile is created and displayed correctly
  await expect(cardPage.name).toHaveText(testName);

  // const pixel5Context = await browser.newContext({
  //   viewport: { width: 393, height: 851 },
  //   deviceScaleFactor: 2.75,
  //   isMobile: true,
  //   hasTouch: true,
  //   userAgent: 'Mozilla/5.0 (Linux; Android 12; Pixel 5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.41 Mobile Safari/537.36'
  // });
  // const page2 = await pixel5Context.newPage();
});

test('Create profile with name and title', async ({ page }) => {
  const mainPage = new MainPage(page);
  const createProfilePage = new CreateProfilePage(page);
  const cardPage = new CardPage(page);

  await mainPage.goto();
  await mainPage.createProfileBtn.click();

  const testName = 'Test User';
  const testTitle = 'Software Engineer';
  await createProfilePage.fillName(testName);
  await createProfilePage.titleInput.fill(testTitle);

  await createProfilePage.submit();

  await expect(cardPage.name).toHaveText(testName);
  await expect(cardPage.title).toHaveText(testTitle);
  await expect(cardPage.qrCode).toBeVisible();
});

test('Create profile with name and one link', async ({ page }) => {
  const mainPage = new MainPage(page);
  const createProfilePage = new CreateProfilePage(page);
  const cardPage = new CardPage(page);

  await mainPage.goto();
  await mainPage.createProfileBtn.click();

  const testName = 'Test User';
  const testLink = 'https://github.com/testuser';
  await createProfilePage.fillName(testName);
  await createProfilePage.link1.fill(testLink);

  await createProfilePage.submit();

  await expect(cardPage.name).toHaveText(testName);
  await expect(cardPage.title).toBeEmpty();
  await expect(cardPage.link1).toBeVisible();
  await expect(cardPage.link1).toHaveAttribute('href', testLink);
  await expect(cardPage.qrCode).toBeVisible();
});

test('Create profile with name, title and two links', async ({ page }) => {
  const mainPage = new MainPage(page);
  const createProfilePage = new CreateProfilePage(page);
  const cardPage = new CardPage(page);

  await mainPage.goto();
  await mainPage.createProfileBtn.click();

  const testName = 'Test User';
  const testTitle = 'Product Manager';
  const testLink1 = 'https://linkedin.com/testuser';
  const testLink2 = 'https://twitter.com/testuser';

  await createProfilePage.fillName(testName);
  await createProfilePage.titleInput.fill(testTitle);
  await createProfilePage.link1.fill(testLink1);
  await createProfilePage.link2.fill(testLink2);

  await createProfilePage.submit();

  await expect(cardPage.name).toHaveText(testName);
  await expect(cardPage.title).toHaveText(testTitle);
  await expect(cardPage.link1).toBeVisible();
  await expect(cardPage.link1).toHaveAttribute('href', testLink1);
  await expect(cardPage.link2).toBeVisible();
  await expect(cardPage.link2).toHaveAttribute('href', testLink2);
  await expect(cardPage.link3).not.toBeVisible();
  await expect(cardPage.qrCode).toBeVisible();
});

test('Create profile with name, title and three links', async ({ page }) => {
  const mainPage = new MainPage(page);
  const createProfilePage = new CreateProfilePage(page);
  const cardPage = new CardPage(page);

  await mainPage.goto();
  await mainPage.createProfileBtn.click();

  const testName = 'Test User';
  const testTitle = 'Tech Lead';
  const testLink1 = 'https://github.com/testuser';
  const testLink2 = 'https://linkedin.com/testuser';
  const testLink3 = 'https://twitter.com/testuser';

  await createProfilePage.fillName(testName);
  await createProfilePage.titleInput.fill(testTitle);
  await createProfilePage.link1.fill(testLink1);
  await createProfilePage.link2.fill(testLink2);
  await createProfilePage.link3.fill(testLink3);

  await createProfilePage.submit();

  await expect(cardPage.name).toHaveText(testName);
  await expect(cardPage.title).toHaveText(testTitle);
  await expect(cardPage.link1).toBeVisible();
  await expect(cardPage.link1).toHaveAttribute('href', testLink1);
  await expect(cardPage.link2).toBeVisible();
  await expect(cardPage.link2).toHaveAttribute('href', testLink2);
  await expect(cardPage.link3).toBeVisible();
  await expect(cardPage.link3).toHaveAttribute('href', testLink3);
  await expect(cardPage.qrCode).toBeVisible();
});
