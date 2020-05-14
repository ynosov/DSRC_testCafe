import { ClientFunction } from 'testcafe';
import page from '../page-model.js';
import { login } from './login.js';
import env from '../environment.js';

let getLocation = ClientFunction(() => document.location.href);

export const openComparisonScreenById = async ({ id, browser }) => {
    await login({ login: 'ynosov', password: 'qwerty77A', browser });
    await browser.navigateTo(''.concat(env.host, 'common/record_edit.php?rkey=RFXID&&MM_edit=0&rid=', id, '&RFXID=', id))
        .click(page.sourcingEventDetails.analysisTab)
        .click(page.sourcingEventDetails.analysisButton)
        .wait(90000)
        .expect(getLocation()).eql(env.host + 'webapps/t/sourcing/#/sourcing/' + id + '/survey');
}