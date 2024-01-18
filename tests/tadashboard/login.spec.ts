import { test , expect } from '@playwright/test';
import DashboardMainPage from 'pages/dashboard-main-page';
import LoginPage from 'pages/login-page';

test('TC001 Verify that user can login specific repository successfully via Dashboard login page with correct credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.go();
  await loginPage.login('administrator', '');

  const dashboardMainPage = new DashboardMainPage(page);
  await dashboardMainPage.displays();
  await page.close();
})

test('TC002 Verify that user fails to login specific repository successfully via Dashboard login page with incorrect credentials', async ({ page }) =>{
  const verifyDialogMessage : string = 'Username or password is invalid';
  const loginPage = new LoginPage(page);
  
  await loginPage.go();
  await loginPage.login('abc','abc');
  await page.once('dialog',async(dialog) => {
    expect(dialog.message()).toBe(verifyDialogMessage);
    dialog.accept();
  })
  await page.close();
})