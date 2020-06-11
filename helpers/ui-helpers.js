import { ClientFunction, Selector, t } from 'testcafe';
import page from '../page-model';
import env from '../environment';
import { sleep } from '../helpers/api-helpers';

let getLocation = ClientFunction(() => document.location.href);
let browser = t;

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


export async function waitPricingMatrixPageToLoad () {
    const getPageUrl = ClientFunction(() => window.location.href.toString());
    for ( let i = 0; i <= 10; i++ ) {
    try {
        if ( await browser.expect(getPageUrl()).contains(env.url + 'webapps/' + env.vrp + '/sourcing/#/matrixPricing') ) {
            break;
        }} catch (e) {
            await sleep(3000);
            continue;
        }};
}