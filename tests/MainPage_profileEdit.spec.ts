import { expect } from '@playwright/test';
import { test } from '../fixtures/fixture';
import { userDataWith2Links, userDataWith1Link, userDataAllFields} from '../utils/testData';


// TBD Negative TCs for Update
test('Edit page contains all fileds populated after update', async ({ appObjects, pageMyProfilewithQR  }) => {

  await appObjects.mainPage.editProfileBtn.click();
  await expect(pageMyProfilewithQR).toHaveURL(/\/edit/);
  await appObjects.createProfilePage.verifyDataOnEditPageIsCorrect(userDataWith2Links);

  await appObjects.createProfilePage.createProfileData(userDataWith1Link);
  const savedData = await pageMyProfilewithQR.evaluate(() => localStorage.getItem('myProfile'));
  const parsedSavedData = JSON.parse(savedData!)as { name: string; title?: string; links: string[] };
  expect(parsedSavedData.name).toBe(userDataWith1Link.name);
  expect(parsedSavedData.title).toBe(userDataWith1Link.title);
  expect(parsedSavedData.links[0]).toBe(userDataWith1Link.link1);
  await appObjects.mainPage.editProfileBtn.click();
  await appObjects.createProfilePage.verifyDataOnEditPageIsCorrect(userDataWith1Link);



  await appObjects.createProfilePage.createProfileData(userDataAllFields);
  await appObjects.mainPage.editProfileBtn.click();
  await appObjects.createProfilePage.verifyDataOnEditPageIsCorrect(userDataAllFields);

});


