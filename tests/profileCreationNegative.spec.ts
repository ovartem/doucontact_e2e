import { test, expect } from '@playwright/test';
import { CreateProfilePage } from '../pageObjects/createProfile.page';
import { CardPage } from '../pageObjects/Card.page';
import { MainPage } from '../pageObjects/Main.page';

test('Cannot create profile without name', async ({ page }) => {
  const mainPage = new MainPage(page);
  const createProfilePage = new CreateProfilePage(page);

  await mainPage.goto();
  await mainPage.createProfileBtn.click();

  // Try to submit without entering name
  await createProfilePage.submit();

  // Verify form nothing happens
  await expect(createProfilePage.submitBtn).toBeVisible();
});

test('Create profile with name and title, but without link', async ({ page }) => {
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

  await expect(createProfilePage.errorMessage).toHaveText('Необхідно вказати хоча б одне посилання.');
});

test('Cannot create profile without link', async ({ page }) => {
  const mainPage = new MainPage(page);
  const createProfilePage = new CreateProfilePage(page);

  await mainPage.goto();
  await mainPage.createProfileBtn.click();

  // Try to submit without entering name
  await createProfilePage.submit();

  // Verify form nothing happens
  await expect(createProfilePage.submitBtn).toBeVisible();
});

test('Cannot create profile with invalid links', async ({ page }) => {
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
    'www.',
    'google.com',
  ];

  for (const invalidLink of invalidLinks) {
    await createProfilePage.link1.fill(invalidLink);
    await createProfilePage.submit();

    // Verify form nothing happens
    await expect(createProfilePage.submitBtn).toBeVisible();
  }
});

test.fail('Cannot create profile with extremely long inputs', async ({ page }) => {
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

  // Verify form nothing happens
  await expect(createProfilePage.submitBtn).toBeVisible();
});

test('Form maintains input values after failed submission', async ({ page }) => {
  const mainPage = new MainPage(page);
  const createProfilePage = new CreateProfilePage(page);

  await mainPage.goto();
  await mainPage.createProfileBtn.click();

  const testName = 'Test User';
  const invalidLink = 'not-a-url';

  await createProfilePage.fillName(testName);
  await createProfilePage.link1.fill(invalidLink);

  await createProfilePage.submit();

  // Verify inputs maintain their values after failed submission
  await expect(createProfilePage.nameInput).toHaveValue(testName);
  await expect(createProfilePage.link1).toHaveValue(invalidLink);
});
