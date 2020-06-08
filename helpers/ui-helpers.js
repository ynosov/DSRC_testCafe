import { ClientFunction, Selector } from 'testcafe';
import page from '../page-model.js';
import env from '../environment.js';
import { browser } from 'testcafe';

let getLocation = ClientFunction(() => document.location.href);

export async function login ( user, browser ) {
    await browser
        .typeText(page.login.loginField, user.login)
        .typeText(page.login.passwordField, user.password)
        .click(page.login.submitButton)
        .expect(Selector("title").innerText).eql('Home Page');
}

export const logout = async () => {
    await browser
        .click(page.topPanel.userOptions)
        .click(page.topPanel.userOptionsLogout)
        .expect(getUrl().eql(env.url + 'protected/login.php?page=%2Fh%2F' + env.appli + '%2F'));
}

export const openComparisonScreenById = async ({ id, browser }) => {
    await login({ login: env.assignedTo.login, password: env.assignedTo.password, browser });
    await browser.navigateTo(''.concat(env.host, 'common/record_edit.php?rkey=RFXID&&MM_edit=0&rid=', id, '&RFXID=', id))
        .click(page.sourcingEventDetails.analysisTab)
        .click(page.sourcingEventDetails.analysisButton)
        .wait(90000)
        .expect(getLocation()).eql(env.host + 'webapps/t/sourcing/#/sourcing/' + id + '/survey');
}

export const openSourcingEventRfxDetailsById = async ({ id, browser }) => {
    try{
    await login({ login: env.assignedTo.login, password: env.assignedTo.password, browser });
    await browser.navigateTo(''.concat(env.host, 'common/record_edit.php?rkey=RFXID&&MM_edit=0&rid=', id, '&RFXID=', id))
        .click(page.sourcingEventDetails.rfxDetailsTab)
    } catch (e) { console.log('Opening Sourcing Event => RFX DETAILS tab: failed. Error: ' (e))}
    }

