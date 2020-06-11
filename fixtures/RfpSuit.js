import page from '../page-model';
import env from '../environment';
import { logIn, getUserId, getUserInfo, createRfpSourcingEvent } from '../helpers/api-helpers';
import { waitPricingMatrixPageToLoad } from '../helpers/ui-helpers';
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
    .expect( page.sourcingEventDetails.pricingMatrixButton.exists ).ok('Check that "Pricing matrix" button exists')
    .expect( page.sourcingEventDetails.questionsButton.exists ).ok('Check that "Questions" button exists')
    .expect( page.sourcingEventDetails.questionnaireButton.exists ).ok('Check that "Questionnaire" button exists');

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
    .expect( page.pricingMatrix.eventActions.exists ).ok('Check that "Event actions" menu item exists' )
    .click( page.pricingMatrix.eventActions )
    .expect( page.pricingMatrix.backToEvent.exists ).ok( 'Check that "Back to event" menu item exists' )
    .click( page.pricingMatrix.backToEvent )
    .expect( page.sourcingEventDetails.title.innerText ).eql( 'Sourcing Event "' + sv.rfxDetails.rfx_name + ' (' + sv.rfxDetails.rfx_docnum + ')"', 'Check title of the page' )
    .expect( page.sourcingEventDetails.descriptionTab.exists ).ok( 'Check that redirection to "Description" tab works' );

});