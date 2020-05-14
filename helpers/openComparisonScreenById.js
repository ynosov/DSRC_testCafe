import { ClientFunction } from 'testcafe';
import page from '../page-model.js';
import { login } from './login';

let getLocation = ClientFunction(() => document.location.href);

export const openComparisonScreenById = async ({ id, browser }) => {
    await login({ login: 'ynosov', password: 'qwerty77A', browser });
    await browser.navigateTo(''.concat('https://autostandard72.determine.com/t/dsim_spa/common/record_edit.php?rkey=RFXID&&MM_edit=0&rid=', id, '&RFXID=', id))
        .click(page.sourcingEventDetails.analysisTab)
        .click(page.sourcingEventDetails.analysisButton)
        .wait(60000)
        .expect(getLocation()).eql('https://autostandard72.determine.com/t/dsim_spa/webapps/t/sourcing/#/sourcing/' + id + '/survey');
}