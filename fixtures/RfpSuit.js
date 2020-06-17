import page from '../page-model';
import { FieldAttributeText, FieldAttributeCheckbox } from '../page-model';
import pricingMatrix_td from '../testData/pricingMartrix_td';
import env from '../environment';
import { logIn, getUserId, getUserInfo, createRfpSourcingEvent } from '../helpers/api-helpers';
import { waitPricingMatrixPageToLoad, checkDefaultColumnFieldAttributes } from '../helpers/ui-helpers';
import { assignedTo } from '../roles';



fixture`RFP Sourcing event`
.page(env.url)
    .before( async ctx => {

        ctx.sv = {
            rfxDetails: {
                rfxid: '3296',
                rfx_name: 'SPA_AT_RFP_348099436',
                rfx_docnum: 'DSE20203305'
            }
        };
        /*try{
            await logIn( env.assignedTo ).then( cookie => ctx.sv.cookie = cookie);
            await getUserId( ctx.sv.cookie ).then( userId => ctx.sv.userId = userId);
            await getUserInfo( ctx.sv.cookie, ctx.sv.userId ).then( userInfo => ctx.sv.userInfo = userInfo);
            await createRfpSourcingEvent( ctx.sv.userInfo ).then( rfxDetails => ctx.sv.rfxDetails = rfxDetails);
            console.log( 'Preconditions done:' + ctx.sv.rfxDetails.rfx_name + ' is created' );
            } catch (e) {
                console.error('Preconditions failed:' + e);
            }*/

    });


test('Check buttons set on Rfx details tab', async browser => {
    
    const sv = browser.fixtureCtx.sv;

    await browser
    .useRole(assignedTo)
    .navigateTo( page.sourcingEventDetails.getPageById( sv.rfxDetails.rfxid ) )
    .click( page.sourcingEventDetails.rfxDetailsTab )
    .expect( page.sourcingEventDetails.pricingMatrixButton.visible ).ok('"Pricing matrix" button doesnt exist')
    .expect( page.sourcingEventDetails.questionsButton.visible ).ok('"Questions" button doesnt exist')
    .expect( page.sourcingEventDetails.questionnaireButton.visible ).ok('"Questionnaire" button doesnt exist');

});


test('Check Pricing matrix - Back to event button', async browser => {
    
    const sv = browser.fixtureCtx.sv;

    await browser
    .useRole(assignedTo)
    .navigateTo( page.sourcingEventDetails.getPageById( sv.rfxDetails.rfxid ) )
    .click( page.sourcingEventDetails.rfxDetailsTab )
    .click( page.sourcingEventDetails.pricingMatrixButton );
    await waitPricingMatrixPageToLoad();
    await browser
    .expect( page.pricingMatrix.eventActions.visible ).ok('"Event actions" menu is not displayed on the screen' )
    .click( page.pricingMatrix.eventActions )
    .expect( page.pricingMatrix.backToEvent.visible ).ok( '"Back to event" menu item is not displayed on the screen' )
    .click( page.pricingMatrix.backToEvent )
    .expect( page.sourcingEventDetails.title.innerText ).eql( 'Sourcing Event "' + sv.rfxDetails.rfx_name + ' (' + sv.rfxDetails.rfx_docnum + ')"', 'Incorrect title of the Sourcing Details page' )
    .expect( page.sourcingEventDetails.descriptionTab.exists ).ok( 'Redirection to "Description" tab doesnt work' );

});


test('Check default Pricing Matrix columns set', async browser => {
    
    const sv = browser.fixtureCtx.sv;

    await browser
    .useRole( assignedTo )
    .navigateTo( page.sourcingEventDetails.getPageById( sv.rfxDetails.rfxid ) )
    .click( page.sourcingEventDetails.rfxDetailsTab )
    .click( page.sourcingEventDetails.pricingMatrixButton );
    await waitPricingMatrixPageToLoad();
    // Check that all Default columns are displayed in Arrange columns section
    for (const column of pricingMatrix_td.defaultColumnsList) {
        await browser
            .expect( column.locator.visible ).ok( '"' + column.columnName + '"' + ' is not displayed in "Arrange columns" section' );
    }
    // Check that there is no odd columns in Arrange columns section
    await browser
    .expect( page.pricingMatrix.allColumns.count ).eql( pricingMatrix_td.defaultColumnsList.length, 'There are odd columns or some columns are missed in "Arrange columns" section' );
   
});


test('Check which default Pricing Matrix columns can be removed', async browser => {
    
    const sv = browser.fixtureCtx.sv;

    await browser
    .useRole(assignedTo)
    .navigateTo( page.sourcingEventDetails.getPageById( sv.rfxDetails.rfxid ) )
    .click( page.sourcingEventDetails.rfxDetailsTab )
    .click( page.sourcingEventDetails.pricingMatrixButton );
    await waitPricingMatrixPageToLoad();
    for ( const column of pricingMatrix_td.defaultColumnsList ) {
        if ( column.isRemovable == true ) {
            await browser
                .expect( column.removeButton.visible ).ok( '"' + column.columnName + '"' + ' from "Arrange columns" section has no "Remove" button' );
        } else if ( column.isRemovable == false ) {
            await browser
                .expect( column.removeButton.exists ).notOk( '"' + column.columnName + '"' + ' from "Arrange columns" section has "Remove" button' );
        } else throw new Error( '"' + column.columnName + '"' + ' has no properly defined "isRemovable" parameter in page-model' );
    }

});


test.meta('label', 'default_columns')
('Check values and editing state for Field attributes of Line Item column', async browser => {
await checkDefaultColumnFieldAttributes( 'Line Item' );
});

test.meta('label', 'default_columns')
('Check values and editing state for Field attributes of Unit of measure column', async browser => {
    await checkDefaultColumnFieldAttributes( 'Unit of measure' );
    });

test.meta('label', 'default_columns')
('Check values and editing state for Field attributes of Quantity column', async browser => {
    await checkDefaultColumnFieldAttributes( 'Quantity' );
    });

test.meta('label', 'default_columns')
('Check values and editing state for Field attributes of Baseline price column', async browser => {
    await checkDefaultColumnFieldAttributes( 'Baseline price' );
    });

test.meta('label', 'default_columns')
('Check values and editing state for Field attributes of Unit price column', async browser => {
    await checkDefaultColumnFieldAttributes( 'Unit price' );
    });

test.meta('label', 'default_columns')
('Check values and editing state for Field attributes of Currency column', async browser => {
    await checkDefaultColumnFieldAttributes( 'Currency' );
    });

test.meta('label', 'default_columns')
('Check values and editing state for Field attributes of Commodity column', async browser => {
    await checkDefaultColumnFieldAttributes( 'Commodity' );
    });

test.meta('label', 'default_columns')
('Check values and editing state for Field attributes of Extended baseline price column', async browser => {
    await checkDefaultColumnFieldAttributes( 'Extended baseline price' );
    });

test.meta('label', 'default_columns')
('Check values and editing state for Field attributes of Extended unit price column', async browser => {
    await checkDefaultColumnFieldAttributes( 'Extended unit price' );
    });

test.meta('label', 'default_columns')
('Check values and editing state for Field attributes of Savings column', async browser => {
    await checkDefaultColumnFieldAttributes( 'Savings' );
    });