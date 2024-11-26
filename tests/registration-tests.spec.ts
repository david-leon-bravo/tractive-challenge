import { test, expect } from "@playwright/test";
import { faker } from '@faker-js/faker/locale/en';
import { Navigation } from "./page-objects/navigation";
import { RegistrationForm } from "./page-objects/registration-form";
import { ProfilePage } from "./page-objects/profile-page";

//Page Objects
let navigate;
let registration_form;
let profile_page;
//User data
let first_name;
let last_name;
let email;
let password;

test.beforeEach(async ({page, context}) => {

    navigate = new Navigation(page, context);
    registration_form = new RegistrationForm(page);
    profile_page = new ProfilePage(page);
    first_name = faker.person.firstName();
    last_name = faker.person.lastName();
    password = faker.string.symbol(8);
    email = faker.internet.email({ firstName: first_name.toLowerCase(), lastName: last_name.toLowerCase(), provider: 'demo.tractive.com' }) 
    await navigate.navigateToRegistration();
    await registration_form.registration_form.isVisible();
    await expect(registration_form.create_account_button).toBeDisabled();

});

test.describe('When registration details are correct', async () => {

    test('Register new user account', async ({page}) => {

        await registration_form.enterFirstName(first_name);
        await registration_form.enterLastName(last_name);
        await registration_form.enterEmail(email);
        await registration_form.enterPassword(password);
        await expect(registration_form.create_account_button).toBeEnabled();
        await registration_form.attemptRegistration();

        await expect(profile_page.tracker_id_title).toBeVisible();
        await expect(profile_page.back_button).toBeEnabled();
        await expect(profile_page.tracker_input).toBeEditable();
        
        await profile_page.backToProfile();
        await expect(profile_page.my_profile_container).toContainText(first_name);
        await expect(profile_page.my_profile_container).toContainText(last_name);
        await expect(profile_page.my_profile_container).toContainText(email);

    });
    
    test('Sign up for Tractive newsletter on registration ', async ({page}) => {

        await registration_form.newsletter_check.click();
        await expect(registration_form.newsletter_check_input).toBeChecked();

    });

});

test.describe('When registration details are incorrect', async () => {

    test('Registration with an email of invalid format', async ({page}) => {

        await registration_form.enterFirstName(first_name);
        await registration_form.enterLastName(last_name);
        await registration_form.enterEmail('goku@doggo');
        await registration_form.enterPassword(password);
        await expect(registration_form.invalid_email_error).toBeVisible();
        await expect(registration_form.create_account_button).toBeDisabled();

    });

    test('Registration with a password under 8 characters', async ({page}) => {

        await registration_form.enterPassword('test');
        await registration_form.enterFirstName(first_name);
        await registration_form.enterLastName(last_name);
        await registration_form.enterEmail(email);
        await expect(registration_form.invalid_password_error).toBeVisible();
        await expect(registration_form.create_account_button).toBeDisabled();

    });

    test('Registration attempt with missing first name', async ({page}) => {

        await registration_form.enterFirstName('');
        await registration_form.enterLastName(last_name);
        await registration_form.enterEmail(email);
        await registration_form.enterPassword(password);
        await expect(registration_form.missing_field_error).toBeVisible();
        await expect(registration_form.create_account_button).toBeDisabled();

    });

} );

test.afterEach(async () => {

    await navigate.endSession();

});