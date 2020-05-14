import { openComparisonScreenById } from '../helpers/openComparisonScreenById.js';
import env from '../environment.js';

fixture`RFI suit`
    .page(env.host);

test('Open RFI comparison analysis screen', async browser => {
    await openComparisonScreenById({ id: '3511', browser });
});