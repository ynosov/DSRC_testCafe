import page from '../page-model';
import env from '../environment';
import { logIn, getUserId, getUserInfo, createRfpSourcingEvent } from '../helpers/api-helpers';
import { waitPricingMatrixPageToLoad } from '../helpers/ui-helpers';
import { assignedTo } from '../roles';
import { debug } from 'request-promise';


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
    .expect( page.sourcingEventDetails.pricingMatrixButton.exists ).ok('"Pricing matrix" button doesnt exist')
    .expect( page.sourcingEventDetails.questionsButton.exists ).ok('"Questions" button doesnt exist')
    .expect( page.sourcingEventDetails.questionnaireButton.exists ).ok('"Questionnaire" button doesnt exist');

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
    .expect( page.pricingMatrix.eventActions.exists ).ok('"Event actions" menu item doesnt exist' )
    .click( page.pricingMatrix.eventActions )
    .expect( page.pricingMatrix.backToEvent.exists ).ok( '"Back to event" menu item doesnt exist' )
    .click( page.pricingMatrix.backToEvent )
    .expect( page.sourcingEventDetails.title.innerText ).eql( 'Sourcing Event "' + sv.rfxDetails.rfx_name + ' (' + sv.rfxDetails.rfx_docnum + ')"', 'Incorrect title of the Sourcing Details page' )
    .expect( page.sourcingEventDetails.descriptionTab.exists ).ok( 'Redirection to "Description" tab doesnt work' );

});


test('Check default Pricing Matrix columns set', async browser => {
    
    const sv = browser.fixtureCtx.sv;

    await browser
    .useRole(assignedTo)
    .navigateTo( page.sourcingEventDetails.getPageById( sv.rfxDetails.rfxid ) )
    .click( page.sourcingEventDetails.rfxDetailsTab )
    .click( page.sourcingEventDetails.pricingMatrixButton );
    await waitPricingMatrixPageToLoad();
    // Check that all Default columns are displayed in Arrange columns section
    for (const column of page.pricingMatrix.defaultColumnsList) {
        await browser
            .expect(column.locator.exists).ok('"' + column.columnName + '"' + ' is absent in "Arrange columns" section');
    }
    // Check that there is no odd columns in Arrange columns section
    await browser
    .expect(page.pricingMatrix.allColumns.count).eql(page.pricingMatrix.defaultColumnsList.length, 'There are odd columns in "Arrange columns" section');
   
});


test('Check which default Pricing Matrix columns can be removed', async browser => {
    
    const sv = browser.fixtureCtx.sv;

    await browser
    .useRole(assignedTo)
    .navigateTo( page.sourcingEventDetails.getPageById( sv.rfxDetails.rfxid ) )
    .click( page.sourcingEventDetails.rfxDetailsTab )
    .click( page.sourcingEventDetails.pricingMatrixButton );
    await waitPricingMatrixPageToLoad();
    for (const column of page.pricingMatrix.defaultColumnsList) {
        if ( column.isRemovable == true ) {
            await browser
                .expect(column.removeButton.exists).ok('"' + column.columnName + '"' + ' from "Arrange columns" section has no "Remove" button');
        } else if ( column.isRemovable == false ) {
            await browser
                .expect(column.removeButton.exists).notOk('"' + column.columnName + '"' + ' from "Arrange columns" section has "Remove" button');
        } else throw new Error('"' + column.columnName + '"' + ' has no properly defined "isRemovable" parameter in page-model');
    }

});


test('Check field attributes of Default columns', async browser => {
    
    const sv = browser.fixtureCtx.sv;

    await browser
    .useRole(assignedTo)
    .navigateTo( page.sourcingEventDetails.getPageById( sv.rfxDetails.rfxid ) )
    .click( page.sourcingEventDetails.rfxDetailsTab )
    .click( page.sourcingEventDetails.pricingMatrixButton );
    await waitPricingMatrixPageToLoad();
    for ( const column of page.pricingMatrix.defaultColumnsList ) {
        //CHECK "FIELD HEADER" ATTRIBUTE
    await browser
        .click( column.locator )
        //Check text
        .expect( column.fieldAttributes.fieldHeader.textField.value ).eql( column.fieldAttributes.fieldHeader.text );
        //Check that the field is not editable for specific columns
        if ( column.fieldAttributes.fieldHeader.isEditable == false ) {
        await browser.expect( column.fieldAttributes.fieldHeader.textField.hasAttribute('disabled') ).ok( '"' + column.columnName + '" column attribute "' + column.fieldAttributes.fieldHeader.label + '" is editable' )
        //Check that the field is editable for specific columns
    } else if ( column.fieldAttributes.fieldHeader.isEditable == true ) {
        await browser.expect( column.fieldAttributes.fieldHeader.textField.hasAttribute('disabled') ).notOk( '"' + column.columnName + '" column attribute "' + column.fieldAttributes.fieldHeader.label + '" is not editable' )
    } else throw new Error('"' + column.columnName + '" column attribute "' + column.fieldAttributes.fieldHeader.label + '" is not defined in test case' )
    }
});