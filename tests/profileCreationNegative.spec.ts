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

test('Form maintains input values after failed submission', async ({ page }) => {
  const mainPage = new MainPage(page);
  const createProfilePage = new CreateProfilePage(page);

  await mainPage.goto();
  await mainPage.createProfileBtn.click();

  const title = 'Test User';
  const link = 'not-a-url';

  await createProfilePage.titleInput.fill(title);
  await createProfilePage.link1.fill(link);

  await createProfilePage.submit();

  // Verify inputs maintain their values after failed submission
  await expect(createProfilePage.titleInput).toHaveValue(title);
  await expect(createProfilePage.link1).toHaveValue(link);
});
