import { test, expect } from '@playwright/test';
import { CreateProfilePage } from '../pageObjects/createProfile.page';
import { CardPage } from '../pageObjects/Card.page';
import { MainPage } from '../pageObjects/Main.page';

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

test('Create profile with Cyrillic name', async ({ page }) => {
  const mainPage = new MainPage(page);
  const createProfilePage = new CreateProfilePage(page);
  const cardPage = new CardPage(page);

  await mainPage.goto();
  await mainPage.createProfileBtn.click();

  const cyrillicName = 'Іван Петров';
  await createProfilePage.fillName(cyrillicName);
  await createProfilePage.link1.fill('https://example.com');

  await createProfilePage.submit();

  // Verify profile is created with Cyrillic name
  await expect(cardPage.name).toHaveText(cyrillicName);
  await expect(cardPage.qrCode).toBeVisible();
});

test('Create profile with Cyrillic title', async ({ page }) => {
  const mainPage = new MainPage(page);
  const createProfilePage = new CreateProfilePage(page);
  const cardPage = new CardPage(page);

  await mainPage.goto();
  await mainPage.createProfileBtn.click();

  const testName = 'Test User';
  const cyrillicTitle = 'Інженер Програмного Забезпечення';

  await createProfilePage.fillName(testName);
  await createProfilePage.titleInput.fill(cyrillicTitle);
  await createProfilePage.link1.fill('https://example.com');

  await createProfilePage.submit();

  // Verify profile is created with Cyrillic title
  await expect(cardPage.name).toHaveText(testName);
  await expect(cardPage.title).toHaveText(cyrillicTitle);
  await expect(cardPage.qrCode).toBeVisible();
});

test('Create profile with special characters in title', async ({ page }) => {
  const mainPage = new MainPage(page);
  const createProfilePage = new CreateProfilePage(page);
  const cardPage = new CardPage(page);

  await mainPage.goto();
  await mainPage.createProfileBtn.click();

  const testName = 'Test User';
  const specialCharsTitle = '✨ Senior Developer #1 || JS/TS @CompanyName 🚀';

  await createProfilePage.fillName(testName);
  await createProfilePage.titleInput.fill(specialCharsTitle);
  await createProfilePage.link1.fill('https://example.com');

  await createProfilePage.submit();

  // Verify profile is created with special characters in title
  await expect(cardPage.name).toHaveText(testName);
  await expect(cardPage.title).toHaveText(specialCharsTitle);
  await expect(cardPage.qrCode).toBeVisible();
});
