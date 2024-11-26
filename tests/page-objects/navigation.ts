import { BrowserContext, Locator, Page } from '@playwright/test';

export class Navigation{

    readonly page: Page;
    readonly base_url: string;
    readonly context: BrowserContext;
    readonly accept_cookies_button: Locator;

    constructor(page: Page, context: BrowserContext){

        this.page = page;
        this.context = context;
        this.context.addCookies([{
            name: 'interview',
            value: 'insert-cookie-here',
            domain: '.tractive.com',
            path: '/'
        }]);
        this.base_url = 'https://my-stage.tractive.com/';
        this.accept_cookies_button = page.getByRole('button', { name: 'OK' });

    }

    async navigateToLogin(){

        await this.page.goto(this.base_url);
        await this.accept_cookies_button.click();

    }

    async navigateToRegistration(){
        await this.page.goto(this.base_url+'#/signup');
        await this.accept_cookies_button.click();
    }

    async endSession(){

        await this.page.close();
        await this.context.close();

    }
}