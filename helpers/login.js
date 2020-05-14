import { Selector } from 'testcafe';
import page from '../page-model.js';

export const login = async ({ login, password, browser }) => {
    await browser
        .typeText(page.login.loginField, login)
        .typeText(page.login.passwordField, password)
        .click(page.login.submitButton)
        .expect(Selector("title").innerText).eql('Home Page');
}