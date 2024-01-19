import { Locator, Page ,expect} from "@playwright/test";
export default class ProfilePage {
    readonly addNewBtn: Locator  = this.page.getByText('Add New');
    readonly nameField: Locator = this.page.locator('#txtProfileName');
    readonly nextBtn: Locator = this.page.getByRole('button', {name: 'Next'} );
    readonly sortFieldsLink: Locator = this.page.getByRole('listitem').filter({hasText: 'Sort Field'});
    readonly selectFields: Locator = this.page.locator('#cbbFields');
    readonly addLevelBtn: Locator = this.page.locator('#btnAddSortField');
    // readonly listDataProfile: Locator = this.page.locator("//table[@class = 'GridView']//td[count(//th[.='Data Profile'])+1]");
    constructor(private readonly page: Page) {}

    async verifyTableSort(): Promise<void>{
        const table = await this.page.$("xpath=//table[@class='GridView']");
        const tdElements = await table?.$$eval('td',tds => tds.map(td => td.textContent));
        const tdElementsSort = tdElements?.slice().sort();
        console.log(tdElements);
        console.log(tdElementsSort);
        const isSorted = JSON.stringify(tdElements) === JSON.stringify(tdElementsSort);
        console.log(isSorted);
    }

    async verifyDataProfileSort(): Promise<void>{
        const listDataProfile = await this.page.$("//table[@class='GridView']/tbody");
        const tdElements = await listDataProfile?.$$eval("//td[count(//th[.='Data Profile'])+1]",tds => tds.map(n => n.textContent));
        const tdElementsSort = tdElements?.slice().sort();
        console.log(tdElements);
        console.log(tdElementsSort);
        const isSorted = JSON.stringify(tdElements) === JSON.stringify(tdElementsSort);
        console.log(isSorted);
    }

    async addNewDataProfile(name: string): Promise<void>{
        await this.addNewBtn.click();
        await this.nameField.fill(name);
    }

    async addSortFields(fieldName: string): Promise<void>{
        await this.selectFields.selectOption(fieldName);
        await this.addLevelBtn.click();
    }

    async verifySortFiledNameIsAdd(fieldName: string): Promise<void>{
        await expect(this.page.locator("//span[@class = 'sortFieldName' and text()='"+ fieldName +"']")).toBeVisible();
    }
}