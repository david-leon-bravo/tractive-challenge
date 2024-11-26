import { test, expect } from "@playwright/test";
import { Navigation } from "./page-objects/navigation";
import { SignInForm } from "./page-objects/sign-in-form";
import { ProfilePage } from "./page-objects/profile-page";

let navigate;
let sign_in_form;
let profile_page;

test.beforeEach(async ({page, context}) => {

    navigate = new Navigation(page, context);
    sign_in_form = new SignInForm(page);
    profile_page = new ProfilePage(page);
    await navigate.navigateToLogin();
    await sign_in_form.sign_in_form.isVisible();
    await expect(sign_in_form.sign_in_button).toBeDisabled();

});

test.describe('When sucessfully signing in', async () => {
    test('Sign in with email and password', async ({page}) =>{
        
        await sign_in_form.enterCredentials('goku@demo.tractive.com', 'nL!8o#utrE');
        await expect(sign_in_form.sign_in_button).toBeEnabled();
        await sign_in_form.attemptSignIn();

        await expect(profile_page.my_profile_container).toContainText('Goku Doggo');
        await expect(profile_page.my_profile_container).toContainText('goku@demo.tractive.com');

    });
});

test.describe('When sign in fails', async () => {
    test('Sign in with not registered email and password', async ({page}) => {

        await sign_in_form.enterCredentials('not.registered@demo.tractive.com', 'tractivetest');
        await expect(sign_in_form.sign_in_button).toBeEnabled();
        await sign_in_form.attemptSignIn();
        await expect(sign_in_form.sign_in_error_alert).toContainText('Looks like you entered a wrong email or password.');

    });

    test('Sign in entering an email with an invalid format', async ({page}) => {

        await sign_in_form.enterCredentials('sample@demo.tractive.', 'tractivetest');
        await expect(sign_in_form.sign_in_button).toBeDisabled();

    });

    test('Sign in with a password shorter than 8 characters', async ({page}) => {

        await sign_in_form.enterCredentials('sample@demo.tractive.com', 'tracti');
        await expect(sign_in_form.sign_in_button).toBeDisabled();

    });
});

test.afterEach(async () => {

    await navigate.endSession();

});