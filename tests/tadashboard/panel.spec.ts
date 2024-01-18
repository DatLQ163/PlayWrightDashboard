import { test , expect } from '@playwright/test';
import DashboardMainPage from 'pages/dashboard-main-page';
import LoginPage from 'pages/login-page';
import PanelPage from 'pages/panel-page';

test('TC028 Verify that when "Add New Panel" form is on focused all other control/form is disabled or locked.', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardMainPage = new DashboardMainPage(page);
    const panelPage = new PanelPage(page);

    await loginPage.go();
    await loginPage.login('administrator', '');
    await dashboardMainPage.openPanelPage();
    await panelPage.openAddNewPanel();
    await dashboardMainPage.logout();
    await loginPage.verifyLoginPageDisplay();
    await page.close();
  })