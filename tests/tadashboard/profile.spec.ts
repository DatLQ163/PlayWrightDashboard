import { test } from '@playwright/test';
import DashboardMainPage from 'pages/dashboard-main-page';
import LoginPage from 'pages/login-page';
import ProfilePage from 'pages/profile-page';

test('TC067 Verify that Data Profiles are listed alphabetically', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardMainPage = new DashboardMainPage(page);
    const profilePage = new ProfilePage(page);

    await loginPage.go();
    await loginPage.login('administrator', '');
  
    await dashboardMainPage.openDataProfilePage();
    await profilePage.verifyDataProfileSort();
    await page.close();
  })

  test('TC082 Verify that user is able to add levels of fields ',async({page})=> {
    const loginPage = new LoginPage(page);
    const dashboardMainPage = new DashboardMainPage(page);
    const profilePage = new ProfilePage(page);
    const dataProfileName = 'Test1';

    await loginPage.go();
    await loginPage.login('administrator', '');

    await dashboardMainPage.openDataProfilePage();
    await profilePage.addNewDataProfile(dataProfileName);
    await profilePage.nextBtn.click();
    await profilePage.sortFieldsLink.click();
    await profilePage.addSortFields('Name');
    await profilePage.verifySortFiledNameIsAdd('Name');
    await profilePage.addSortFields('Location');
    await profilePage.verifySortFiledNameIsAdd('Location');
    await page.close();
  })
