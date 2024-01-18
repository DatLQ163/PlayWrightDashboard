import { test , expect } from '@playwright/test';
import DashboardMainPage from 'pages/dashboard-main-page';
import LoginPage from 'pages/login-page';

test('TC067 Verify that Data Profiles are listed alphabetically', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardMainPage = new DashboardMainPage(page);
    await loginPage.go();
    await loginPage.login('administrator', '');
  
    await dashboardMainPage.openProfilePage();
  })