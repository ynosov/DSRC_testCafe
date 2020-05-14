import { openComparisonScreenById } from '../helpers/openComparisonScreenById.js';

fixture`RFI suit`
    .page`https://autostandard72.determine.com/t/dsim_spa/`;

test('Open RFI comparison analysis screen', async browser => {
    await openComparisonScreenById({ id: '3511', browser });
});