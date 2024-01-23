import { test, expect } from '@playwright/test';
import DashboardMainPage from 'pages/dashboard-main-page';
import LoginPage from 'pages/login-page';
import users from "../../data/users.json";

test('TC001 Verify that user can login specific repository successfully via Dashboard login page with correct credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.go();
  await loginPage.login(users.validUser.id,users.validUser.password);

  const dashboardMainPage = new DashboardMainPage(page);
  await dashboardMainPage.displays();
})

test('TC002 Verify that user fails to login specific repository successfully via Dashboard login page with incorrect credentials', async ({ page }) => {
  const verifyDialogMessage: string = 'Username or password is invalid';
  const loginPage = new LoginPage(page);

  await loginPage.go();
  await loginPage.login(users.invalidUser.id, users.invalidUser.password);
  await page.once('dialog', async (dialog) => {
    expect(dialog.message()).toBe(verifyDialogMessage);
    dialog.accept();
  })
})