import { Locator, Page } from "@playwright/test";

export class SignInForm{

    readonly page: Page;
    readonly sign_in_form: Locator;
    readonly email_input: Locator;
    readonly password_input: Locator;
    readonly sign_in_button: Locator;
    readonly forgot_password_link: Locator;
    readonly create_account_link: Locator;
    readonly sign_in_error_alert: Locator;
    
    constructor (page: Page){

        this.page = page;
        this.sign_in_form = page.locator('[name="loginForm"]');
        this.email_input = page.locator('input[type="email"]');
        this.password_input = page.locator('input[type="password"]');
        this.sign_in_button = page.locator('button[type="submit"]');
        this.forgot_password_link = page.getByText('Forgot password?');
        this.create_account_link = page.getByRole('link', { name: 'Create Account' });
        this.sign_in_error_alert = page.locator('.toast-error');

    }

    async enterCredentials(email:string, password:string){

        await this.email_input.fill(email);
        await this.password_input.fill(password);

    }

    async attemptSignIn(){
        await this.sign_in_button.click();
    }

}