import { Page, Locator } from "@playwright/test";

export class ProfilePage{
    
    readonly page: Page;
    readonly tracker_id_title: Locator;
    readonly back_button: Locator;
    readonly tracker_input: Locator;
    readonly my_profile_container: Locator;
    readonly sign_out_button: Locator;

    constructor (page: Page) {

        this.page = page;
        this.tracker_id_title = page.getByRole('heading', { name: 'Enter Tracker ID' });
        this.back_button = page.locator('#back-button').getByRole('button');
        this.tracker_input = page.locator('#input-device-id-0');
        this.my_profile_container = page.locator('tcommon-tile[ui-sref="^.userProfile.profile"]');
        this.sign_out_button = page.getByRole('banner').getByText('Sign Out');

    }

    async backToProfile(){

        this.back_button.click();

    }
}