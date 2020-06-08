import { Role } from 'testcafe';
import env from './environment';
import page from './page-model';

export const assignedTo = Role(env.url + 'protected/login.php?page=%2Fh%2F' + env.appli + '%2F', async browser => {
    await browser
        .typeText(page.login.loginField, env.assignedTo.login )
        .typeText(page.login.passwordField, env.assignedTo.password )
        .click(page.login.submitButton);
});