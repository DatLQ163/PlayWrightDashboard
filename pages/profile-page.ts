import { Locator, Page } from "@playwright/test";
export default class ProfilePage {
    readonly listDataProfilt: Locator = this.page.getByText('Add New');
    constructor(private readonly page: Page) {}

}