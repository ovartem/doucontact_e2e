  
import { expect } from '@playwright/test';
import { test } from '../fixtures/fixture';

  
  
  test('Add new card from Cards page', async ({ page, appObjects }) => {
   
    await appObjects.contactsPage.goto();
    await expect(appObjects.contactsPage.addContactBtn).toBeVisible();

    await appObjects.contactsPage.addContactBtn.click();
    await expect(page).toHaveURL(/\/add-contact/);   
    await expect(appObjects.addContactPage.videoInput).toBeVisible();
  });
  
  