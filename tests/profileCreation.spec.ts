import { test, expect } from '@playwright/test';
import { CreateProfilePage } from '../pageObjects/createProfile.page';
import { MainPage } from '../pageObjects/Main.page';
import { getUserData } from '../utils/testData';

test('Create profile with name and one link', async ({ page }) => {
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
  await expect(mainPage.editProfileBtn).toBeVisible();
  await expect(mainPage.scanQrCodeBtn).toBeVisible();
});

test('Create profile with name, title and two links', async ({ page }) => {
  const mainPage = new MainPage(page);
  const createProfilePage = new CreateProfilePage(page);

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

  await expect(mainPage.qrCode).toBeVisible();
  await expect(mainPage.editProfileBtn).toBeVisible();
  await expect(mainPage.scanQrCodeBtn).toBeVisible();
});

test('Create profile with name, title and three links', async ({ page }) => {
  const mainPage = new MainPage(page);
  const createProfilePage = new CreateProfilePage(page);

  await mainPage.goto();
  await mainPage.createProfileBtn.click();

  const testData = getUserData()

  await createProfilePage.createProfileData(testData);
  // await createProfilePage.titleInput.fill(testTitle);
  // await createProfilePage.link1.fill(testLink1);
  // await createProfilePage.link2.fill(testLink2);
  // await createProfilePage.link3.fill(testLink3);

  // await createProfilePage.submit();

  await expect(mainPage.qrCode).toBeVisible();
  await expect(mainPage.editProfileBtn).toBeVisible();
  await expect(mainPage.scanQrCodeBtn).toBeVisible();
});

test('Create profile with Cyrillic name', async ({ page }) => {
  const mainPage = new MainPage(page);
  const createProfilePage = new CreateProfilePage(page);

  await mainPage.goto();
  await mainPage.createProfileBtn.click();

  const cyrillicName = 'Іван Петров';
  await createProfilePage.fillName(cyrillicName);
  await createProfilePage.link1.fill('https://example.com');

  await createProfilePage.submit();

  // Verify profile is created with Cyrillic name
  await expect(mainPage.qrCode).toBeVisible();
  await expect(mainPage.editProfileBtn).toBeVisible();
  await expect(mainPage.scanQrCodeBtn).toBeVisible();
});

test('Create profile with Cyrillic title', async ({ page }) => {
  const mainPage = new MainPage(page);
  const createProfilePage = new CreateProfilePage(page);

  await mainPage.goto();
  await mainPage.createProfileBtn.click();

  const testName = 'Test User';
  const cyrillicTitle = 'Інженер Програмного Забезпечення';

  await createProfilePage.fillName(testName);
  await createProfilePage.titleInput.fill(cyrillicTitle);
  await createProfilePage.link1.fill('https://example.com');

  await createProfilePage.submit();

  // Verify profile is created with Cyrillic title
  await expect(mainPage.qrCode).toBeVisible();
  await expect(mainPage.editProfileBtn).toBeVisible();
  await expect(mainPage.scanQrCodeBtn).toBeVisible();
});

test('Can create profile with extremely long inputs', async ({ page }) => {
  const mainPage = new MainPage(page);
  const createProfilePage = new CreateProfilePage(page);

  await mainPage.goto();
  await mainPage.createProfileBtn.click();

  // Try extremely long name (e.g. 256 characters)
  const longString = 'a'.repeat(256);
  await createProfilePage.fillName(longString);
  await createProfilePage.titleInput.fill(longString);
  await createProfilePage.link1.fill('https://example.com');

  await createProfilePage.submit();

  // Verify profile is created with Cyrillic title
  await expect(mainPage.qrCode).toBeVisible();
  await expect(mainPage.editProfileBtn).toBeVisible();
  await expect(mainPage.scanQrCodeBtn).toBeVisible();
});

test('Create profile with special characters in title', async ({ page }) => {
  const mainPage = new MainPage(page);
  const createProfilePage = new CreateProfilePage(page);

  await mainPage.goto();
  await mainPage.createProfileBtn.click();

  const testName = 'Test User';
  const specialCharsTitle = '✨ Senior Developer #1 || JS/TS @CompanyName 🚀';

  await createProfilePage.fillName(testName);
  await createProfilePage.titleInput.fill(specialCharsTitle);
  await createProfilePage.link1.fill('https://example.com');

  await createProfilePage.submit();

  // Verify profile is created with special characters in title
  await expect(mainPage.qrCode).toBeVisible();
  await expect(mainPage.editProfileBtn).toBeVisible();
  await expect(mainPage.scanQrCodeBtn).toBeVisible();
});

test('Can create profile with invalid links', async ({ page }) => {
  const mainPage = new MainPage(page);
  const createProfilePage = new CreateProfilePage(page);

  await mainPage.goto();
  await mainPage.createProfileBtn.click();

  // Fill required name
  await createProfilePage.fillName('Test User');

  // Try invalid link formats
  const invalidLinks = [
    'not-a-url',
    'http://',
    'google.com',
  ];

  await createProfilePage.link1.fill(invalidLinks[0]);
  await createProfilePage.link2.fill(invalidLinks[1]);
  await createProfilePage.link3.fill(invalidLinks[2]);


  await createProfilePage.submit();

  // Verify profile is created with special characters in title
  await expect(mainPage.qrCode).toBeVisible();
  await expect(mainPage.editProfileBtn).toBeVisible();
  await expect(mainPage.scanQrCodeBtn).toBeVisible();
});
