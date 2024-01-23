import { test , expect } from '@playwright/test';
import DashboardMainPage from 'pages/dashboard-main-page';
import LoginPage from 'pages/login-page';
import message from '../../data/message.json';

test('TC014 Verify that user can login specific repository successfully via Dashboard login page with correct credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardMainPage =  new DashboardMainPage(page);
    const pageName = 'Page1';
    await loginPage.go();
    await loginPage.login('administrator', '','SampleRepository');
  
    await dashboardMainPage.createPage(pageName);
    await dashboardMainPage.logout();

    await loginPage.login('john', '','SampleRepository');
    await dashboardMainPage.checkPageExistOrNot(pageName,true);

    await dashboardMainPage.logout();
    await loginPage.login('administrator', '','SampleRepository');
    await dashboardMainPage.deletePage(pageName);
  })


  test('TC017 Verify that user can remove any main parent page except "Overview" page successfully and the order of pages stays persistent as long as there is not children page under it', async ({page})=>{
    const loginPage = new LoginPage(page);
    const dashboardMainPage =  new DashboardMainPage(page);
    const parentName = 'Test';
    const childName = 'Test Child';

    await loginPage.go();
    await loginPage.login('administrator','','SampleRepository');
    await dashboardMainPage.createPage(parentName);
    await dashboardMainPage.createPage(childName, parentName);
    await dashboardMainPage.deletePage(parentName,'',message.removePageConfirmMessage,message.cannotDeletePageMessage);
    await dashboardMainPage.deletePage(childName,parentName,message.removePageConfirmMessage);
    await dashboardMainPage.checkPageExistOrNot(childName,false);
    await dashboardMainPage.deletePage(parentName);
    await dashboardMainPage.checkPageExistOrNot(parentName,false);
    await dashboardMainPage.overviewPage.click();
    await expect(dashboardMainPage.deletePageBtn).toBeHidden();
  })