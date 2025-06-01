import { expect } from '@playwright/test';
import { test } from '../fixtures/fixture';
import { UserData } from '../typings/userData';

test('Cannot create profile without name', async ({ appObjects, pageOpenAddMyCard }) => {
   // Try to submit without entering name
  await appObjects.createProfilePage.submit();

  // Verify form nothing happens
  await expect(appObjects.createProfilePage.submitBtn).toBeVisible();
  await expect(pageOpenAddMyCard).toHaveURL(/\/edit/);
});

test('Create profile with name and title, but without link', async ({ appObjects, pageOpenAddMyCard }) => {
    const userData: UserData = {
    name: 'Test User',
    title: 'Product Manager',
  }
  await appObjects.createProfilePage.createProfileData(userData);

  await expect(appObjects.createProfilePage.errorMessage).toHaveText('Необхідно вказати хоча б одне посилання.');
});


//Already tested
// test('Cannot create profile without link', async ({ page }) => {
//   const mainPage = new MainPage(page);
//   const createProfilePage = new CreateProfilePage(page);

//   await mainPage.goto();
//   await mainPage.createProfileBtn.click();

//   // Try to submit without entering name
//   await createProfilePage.submit();

//   // Verify form nothing happens
//   await expect(createProfilePage.submitBtn).toBeVisible();
// });

test('Form maintains input values after failed submission', async ({ appObjects, pageOpenAddMyCard }) => {
  const title = 'Test User';
  const link = 'not-a-url';

  await appObjects.createProfilePage.titleInput.fill(title);
  await appObjects.createProfilePage.link1.fill(link);

  await appObjects.createProfilePage.submit();

  // Verify inputs maintain their values after failed submission
  await expect(appObjects.createProfilePage.titleInput).toHaveValue(title);
  await expect(appObjects.createProfilePage.link1).toHaveValue(link);
});
