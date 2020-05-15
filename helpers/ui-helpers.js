import { ClientFunction, Selector } from 'testcafe';
import page from '../page-model.js';
import env from '../environment.js';

let getLocation = ClientFunction(() => document.location.href);

export const login = async ({ login, password, browser }) => {
    await browser
        .typeText(page.login.loginField, login)
        .typeText(page.login.passwordField, password)
        .click(page.login.submitButton)
        .expect(Selector("title").innerText).eql('Home Page');
}

export const openComparisonScreenById = async ({ id, browser }) => {
    await login({ login: env.assignedTo.login, password: env.assignedTo.password, browser });
    await browser.navigateTo(''.concat(env.host, 'common/record_edit.php?rkey=RFXID&&MM_edit=0&rid=', id, '&RFXID=', id))
        .click(page.sourcingEventDetails.analysisTab)
        .click(page.sourcingEventDetails.analysisButton)
        .wait(90000)
        .expect(getLocation()).eql(env.host + 'webapps/t/sourcing/#/sourcing/' + id + '/survey');
}

