import { Locator, Page ,expect} from "@playwright/test";


export default class LoginPage {
  readonly repoCbx: Locator = this.page.locator('#repository');
  readonly usernameTxt: Locator = this.page.getByRole('textbox', { name: 'username' });
  readonly passwordTxt: Locator = this.page.getByRole('textbox', { name: 'password' });
  readonly loginBtn: Locator = this.page.locator('.btn-login');
  constructor(private readonly page: Page) {}

  async go(): Promise<void> {
    await this.page.goto('/TADashboard/login.jsp');
  }

  async verifyLoginPageDisplay(){
    await expect.soft(this.usernameTxt).not.toBeVisible();
  }


  async getLoginDialogText(): Promise<String>{
    let dialogMessage: String = '';
    this.page.on('dialog',async(dialog)=>{
      dialogMessage = dialog.message();
    })
    console.log(dialogMessage);
    return dialogMessage;
  }

  async login(username: string, password: string, repo?: string): Promise<void> {
    if (repo !== null && repo !== undefined) await this.repoCbx.selectOption(repo);
    await this.usernameTxt.fill(username);
    await this.passwordTxt.fill(password);
    await this.loginBtn.click();
  }
}