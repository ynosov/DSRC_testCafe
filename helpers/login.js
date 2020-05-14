import { Selector } from 'testcafe';
import page from '../page-model.js';

export const login = async ({ login, password, browser }) => {
    await browser.typeText(page.login.loginField, login);
    await browser.typeText(page.login.passwordField, password);
    await browser.click(page.login.submitButton);
    await browser.expect(Selector("title").innerText).eql('Home Page');
}