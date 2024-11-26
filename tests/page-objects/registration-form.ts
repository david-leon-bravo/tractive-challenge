import { Locator, Page } from "@playwright/test";

export class RegistrationForm{

    readonly page: Page;
    readonly registration_form: Locator;
    readonly first_name_input: Locator;
    readonly last_name_input: Locator;
    readonly email_input: Locator;
    readonly password_input: Locator;
    readonly newsletter_check: Locator;
    readonly newsletter_check_input: Locator;
    readonly create_account_button: Locator;
    readonly invalid_email_error: Locator;
    readonly invalid_password_error: Locator;
    readonly missing_field_error:Locator;

    constructor (page: Page){

        this.page = page;
        this.registration_form = page.locator('[name="signUpForm"]');
        this.first_name_input = page.locator('input[name="firstName"]');
        this.last_name_input = page.locator('input[name="lastName"]');
        this.email_input = page.locator('input[name="email"]');
        this.password_input = page.locator('input[name="password"]');
        this.newsletter_check = page.locator('tcommon-check div');
        this.newsletter_check_input = page.locator('#newsletter');
        this.create_account_button = page.locator('button[type="submit"]');
        this.invalid_email_error = page.getByText('The email address is invalid.');
        this.invalid_password_error = page.getByText('Minimum length is 8');
        this.missing_field_error = page.getByText('This field is required.');

    }

    async enterFirstName(name: string){

        await this.first_name_input.fill(name);

    }

    async enterLastName(name: string){

        await this.last_name_input.fill(name);

    }

    async enterEmail(email: string){

        await this.email_input.fill(email);

    }

    async enterPassword(password: string){

        await this.password_input.fill(password);

    }

    async enterAccountInfo(first_name: string, last_name: string, email: string, password: string){

        await this.last_name_input.fill(last_name);
        await this.email_input.fill(email);
        await this.password_input.fill(password);

    }

    async attemptRegistration(){
        await this.create_account_button.click();
    }
      
}