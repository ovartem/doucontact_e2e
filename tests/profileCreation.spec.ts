import { expect } from '@playwright/test';
import { test } from '../fixtures/fixture';
import { getUserData } from '../utils/testData';
import { UserData } from '../typings/userData';

test('Create profile with name and one link', async ({ page, appObjects }) => {
  const userData: UserData = {
    name: 'Test User',
    link1: 'https://github.com/testuser',
  }
  await appObjects.mainPage.goto();
  await appObjects.mainPage.createProfileBtn.click();
  await expect(page).toHaveURL(/\/edit/);
  await appObjects.createProfilePage.createProfileData(userData);
  await expect(page).toHaveURL('https://kartka.app/');
  await appObjects.mainPage.verifyQrCodeAndButtons()

  const savedData = await page.evaluate(() => localStorage.getItem('myProfile'));
  const parsedSavedData = JSON.parse(savedData!) as { name: string; title?: string; links: string[] };
  expect(parsedSavedData.name).toBe(userData.name);
  expect(parsedSavedData.links[0]).toBe(userData.link1);

});

test('Create profile with name, title, 1st and 3rd links', async ({ appObjects, pageOpenAddMyCard }) => {
    const userData: UserData = {
    name: 'Test User',
    title: 'Product Manager',
    link1: '+38 050-1112233',
    link3: '@mynik',
  }

  await appObjects.createProfilePage.createProfileData(userData);
  await appObjects.mainPage.verifyQrCodeAndButtons();

  const savedData = await pageOpenAddMyCard.evaluate(() => localStorage.getItem('myProfile'));
  const parsedSavedData = JSON.parse(savedData!) as { name: string; title?: string; links: string[] };
  expect(parsedSavedData.name).toBe(userData.name);
  expect(parsedSavedData.title).toBe(userData.title);
  expect(parsedSavedData.links[0]).toBe(userData.link1);
  expect(parsedSavedData.links[1]).toBe(userData.link3);
});

test('Create profile with name, title and three links', async ({ appObjects, pageOpenAddMyCard }) => {
  const testData = getUserData()
  await appObjects.createProfilePage.createProfileData(testData);
  await appObjects.mainPage.verifyQrCodeAndButtons();

  const savedData = await pageOpenAddMyCard.evaluate(() => localStorage.getItem('myProfile'));
  const parsedSavedData = JSON.parse(savedData!) as { name: string; title?: string; links: string[] };
  expect(parsedSavedData.name).toBe(testData.name);
  expect(parsedSavedData.title).toBe(testData.title);
  expect(parsedSavedData.links[0]).toBe(testData.link1);
  expect(parsedSavedData.links[1]).toBe(testData.link2);
  expect(parsedSavedData.links[2]).toBe(testData.link3);  
});

test('Create profile with Cyrillic name and title', async ({ appObjects, pageOpenAddMyCard }) => {
  const userData: UserData = {
    name: 'Іван Петров',
    title: 'Інженер Програмного Забезпечення',
    link1: 'https://github.com/testuser',
  }

  await appObjects.createProfilePage.createProfileData(userData);
  await appObjects.mainPage.verifyQrCodeAndButtons()

  const savedData = await pageOpenAddMyCard.evaluate(() => localStorage.getItem('myProfile'));
  const parsedSavedData = JSON.parse(savedData!) as { name: string; title?: string; links: string[] };
  expect(parsedSavedData.name).toBe(userData.name);
  expect(parsedSavedData.title).toBe(userData.title);
});

// Already tested

// test('Create profile with Cyrillic title', async ({ page }) => {
//   const mainPage = new MainPage(page);
//   const createProfilePage = new CreateProfilePage(page);

//   await mainPage.goto();
//   await mainPage.createProfileBtn.click();

//   const testName = 'Test User';
//   const cyrillicTitle = 'Інженер Програмного Забезпечення';

//   await createProfilePage.fillName(testName);
//   await createProfilePage.titleInput.fill(cyrillicTitle);
//   await createProfilePage.link1.fill('https://example.com');

//   await createProfilePage.submit();

//   // Verify profile is created with Cyrillic title
//   await expect(mainPage.qrCode).toBeVisible();
//   await expect(mainPage.editProfileBtn).toBeVisible();
//   await expect(mainPage.scanQrCodeBtn).toBeVisible();
// });

test('Can create profile with extremely long inputs', async ({ appObjects, pageOpenAddMyCard }) => {
  // Try extremely long name (e.g. 256 characters)
  const symbols128 = 'a'.repeat(128);
  const symbols256 = 'a'.repeat(256);

    const userData: UserData = {
    name: symbols128,
    title: symbols128,
    link1: symbols256,

  }

  await appObjects.createProfilePage.createProfileData(userData);
  await appObjects.mainPage.verifyQrCodeAndButtons();

  const savedData = await pageOpenAddMyCard.evaluate(() => localStorage.getItem('myProfile'));
  const parsedSavedData = JSON.parse(savedData!) as { name: string; title?: string; links: string[] };
  expect(parsedSavedData.name).toBe(userData.name);
  expect(parsedSavedData.title).toBe(userData.title);
  expect(parsedSavedData.links[0]).toBe(userData.link1);


});

test('Create profile with special characters in title', async ({ appObjects, pageOpenAddMyCard }) => {
  const userData: UserData = {
    name: 'Test User',
    title: '✨ Senior Developer #1 || JS/TS @CompanyName 🚀Інженер Програмного Забезпечення',
    link1: 'https://github.com/testuser',
  }
  await appObjects.createProfilePage.createProfileData(userData);
  await appObjects.mainPage.verifyQrCodeAndButtons()

  const savedData = await pageOpenAddMyCard.evaluate(() => localStorage.getItem('myProfile'));
  const parsedSavedData = JSON.parse(savedData!) as { name: string; title?: string; links: string[] };
  expect(parsedSavedData.name).toBe(userData.name);
  expect(parsedSavedData.title).toBe(userData.title);
});


// Already tested

// test('Can create profile with invalid links', async ({ page }) => {
//   const createProfilePage = new CreateProfilePage(page);

//   await mainPage.goto();
//   await mainPage.createProfileBtn.click();

//   // Fill required name
//   await createProfilePage.fillName('Test User');

//   // Try invalid link formats
//   const invalidLinks = [
//     'not-a-url',
//     'http://',
//     'google.com',
//   ];

//   await createProfilePage.link1.fill(invalidLinks[0]);
//   await createProfilePage.link2.fill(invalidLinks[1]);
//   await createProfilePage.link3.fill(invalidLinks[2]);


//   await createProfilePage.submit();

//   // Verify profile is created with special characters in title
//   await expect(mainPage.qrCode).toBeVisible();
//   await expect(mainPage.editProfileBtn).toBeVisible();
//   await expect(mainPage.scanQrCodeBtn).toBeVisible();
// });
