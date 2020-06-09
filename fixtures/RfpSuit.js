import { ClientFunction, Selector } from 'testcafe';
import '../helpers/ui-helpers.js';
import page from '../page-model.js';
import env from '../environment.js';
import { logIn, getUserId, getUserInfo, createRfpSourcingEvent, sleep } from '../helpers/api-helpers';
import { assignedTo } from '../roles.js';


var getUrl   = ClientFunction(() => document.location.href);


fixture`RFP Sourcing event`
.page(env.url)
    .before( async ctx => {
        ctx.sv = {
            rfxDetails: { rfxid: '3293', rfx_docnum: 'DSE20203302', rfx_name: 'SPA_AT_RFP_405293555'}
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


/*test('Check buttons set on "Rfx details" tab', async browser => {
    
    const sv = browser.fixtureCtx.sv;

    await browser
    .useRole(assignedTo)
    .navigateTo( page.sourcingEventDetails.getPageById( sv.rfxDetails.rfxid ) )
    .click( page.sourcingEventDetails.rfxDetailsTab )
    .expect( page.sourcingEventDetails.pricingMatrixButton.exists ).ok('Check that "Pricing matrix" button exists')
    .expect( page.sourcingEventDetails.questionsButton.exists ).ok('Check that "Questions" button exists')
    .expect( page.sourcingEventDetails.questionnaireButton.exists ).ok('Check that "Questionnaire" button exists');

});*/


test('Check "Pricing matrix": "Back to event" button', async browser => {
    
    const sv = browser.fixtureCtx.sv;

    await browser
    .useRole(assignedTo)
    .navigateTo( page.sourcingEventDetails.getPageById( sv.rfxDetails.rfxid ) )
    .click( page.sourcingEventDetails.rfxDetailsTab )
    .click( page.sourcingEventDetails.pricingMatrixButton );

    for ( let i = 0; i <= 10; i++ ) {
        try {
           if ( await browser.expect(getUrl()).contains(env.url + 'webapps/' + env.vrp + '/sourcing/#/matrixPricing/' + sv.rfxDetails.rfxid + '/create') ) {
             break; 
         }} catch (e) {
             await sleep(5000);
             continue;
         }};

    await browser
    .expect( page.pricingMatrix.eventActions.exists).ok('Check that "Event actions" menu exists')
    .click( page.pricingMatrix.eventActions)
    .expect( page.pricingMatrix.backToEvent.exists ).ok('Check that "Back to event" menu item exists')
    .click( page.pricingMatrix.backToEvent )
    .expect( page.sourcingEventDetails.title.innerText ).eql('Sourcing Event "' + sv.rfxDetails.rfx_name + ' (' + sv.rfxDetails.rfx_docnum + ')"', 'Check title of the page')
    .expect( page.sourcingEventDetails.descriptionTab.exists ).ok('Check that redirection to "Description" tab works');

});