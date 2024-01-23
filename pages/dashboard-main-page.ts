import { Page, expect ,Locator} from "@playwright/test";
import { Dialog } from "puppeteer";

export default class DashboardMainPage {
  readonly overviewPage: Locator = this.page.getByRole('link',{name:'Overview',exact: true});
  readonly administer: Locator = this.page.getByText('Administer');
  readonly panelBtn: Locator = this.page.locator("a[href ='panels.jsp']");
  readonly profileBtn: Locator = this.page.locator("a[href ='profiles.jsp']");
  readonly globalSettingBtn: Locator  = this.page.locator('#main-menu li.mn-setting');
  readonly addPageBtn: Locator  = this.page.getByText('Add Page');
  readonly createPanelBtn: Locator  = this.page.getByText('Create Panel');
  readonly deletePageBtn: Locator  = this.page.locator('.delete');
  readonly pageNameTxb: Locator = this.page.locator('.page_txt_name');
  readonly publicBoxRb: Locator = this.page.locator('#ispublic');
  readonly okBtn: Locator = this.page.locator('#OK');
  readonly accountBtn: Locator  = this.page.locator("a[href ='#Welcome']");
  readonly logoutBtn: Locator  = this.page.getByText('Logout');
  readonly parentSelection: Locator = this.page.locator('#parent');
  readonly parentPage: Locator = this.page.getByRole('link', { name: 'Test', exact: true });
  readonly childPage: Locator = this.page.getByRole('link', { name: 'Test Child' });
  constructor(private readonly page: Page) {}

  async displays(): Promise<void> {
    await expect(this.page.locator('#main-menu li.active a.active')).toHaveText('Execution Dashboard');
  }

  async openPanelPage(): Promise<void> {
    await this.administer.click();
    await this.panelBtn.click();
  }

  async openDataProfilePage(): Promise<void> {
    await this.administer.click();
    await this.profileBtn.click();
  }

  async checkPageExistOrNot(pageName: string, isExist:boolean): Promise<void>{
    if(isExist==true){
      await expect(this.page.getByRole('link', { name: pageName , exact:true })).toBeVisible();
    }else{
      await expect(this.page.getByRole('link', { name: pageName , exact:true })).toBeHidden();
    }
  }

  async createPage(pageName: string, parentPage?:string): Promise<void>{
    await this.globalSettingBtn.hover();
    await this.addPageBtn.click();
    await this.pageNameTxb.fill(pageName)
    if (parentPage !== null && parentPage !== undefined) await this.parentSelection.selectOption(parentPage);
    await this.publicBoxRb.click();
    await this.okBtn.click();
  }

  async deletePage(childName: string , parentName?: string, dialogMessage1?: string, dialogMessage2?: string): Promise<void>{
    if(parentName != null && this.parentPage != undefined) await this.parentPage.hover();
    await this.page.getByRole('link', { name: childName , exact:true }).click();
    await this.globalSettingBtn.hover();
    if(dialogMessage1 != null){
      this.page.once('dialog',async(dialog) =>{
      await expect.soft(dialog.message()).toContain(dialogMessage1);
      await dialog.accept();
      if(dialogMessage2 != null){
        this.page.once('dialog',async(dialog) => {
          await expect.soft(dialog.message()).toContain(dialogMessage2);
          await dialog.accept();
        })
      }
      }  
      );
    } else {
      this.page.once('dialog',async(dialog) =>
        await dialog.accept());
    }
    await this.deletePageBtn.click();
  }

  async logout(): Promise<void>{
    await this.accountBtn.hover();
    await this.logoutBtn.click();
  }

}