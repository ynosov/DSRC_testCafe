import { ClientFunction, Selector } from 'testcafe';
import { getToken } from '../helpers/api-helpers';
import env from '../environment';

fixture`Api Scenarios`;

test('Get token', async () => {
    let tokens = await getToken();
    await console.log(tokens.get('access_token') + ', ' + tokens.get('refresh_token'));
});