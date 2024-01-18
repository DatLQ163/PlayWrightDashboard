import { Locator, Page } from "@playwright/test";
export default class PanelPage {
    readonly addNewPanelBtn: Locator = this.page.getByText('Add New');
    readonly deletePanelBtn: Locator = this.page.locator("a[href = 'javascript:Dashboard.deletePanels();']");
    readonly addNewPanelTitle: Locator = this.page.getByText('Add New Panel');
    readonly txtDisplayName: Locator = this.page.locator('#txtDisplayName');
    constructor(private readonly page: Page) {}

    async openAddNewPanel(): Promise<void> {
        await this.addNewPanelBtn.click();
      }
}