import { ClientFunction, Selector } from 'testcafe';
import '../helpers/ui-helpers.js';
import page from '../page-model.js';
import env from '../environment.js';
import { logIn, getUserId, getUserInfo, createRfpSourcingEvent } from '../helpers/api-helpers';
import { assignedTo } from '../roles.js';




fixture`RFP Sourcing event`
.page(env.url)
    .before( async ctx => {
        ctx.sv = {
            rfxDetails: { rfxid: '3293'}
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


test('Check buttons on "Rfx details" tab ', async browser => {
    
    const sv = browser.fixtureCtx.sv;

    await browser
    .useRole(assignedTo)
    .navigateTo( page.sourcingEventDetails.getPageById( sv.rfxDetails.rfxid ) )
    .click( page.sourcingEventDetails.rfxDetailsTab )
    .expect( page.sourcingEventDetails.pricingMatrixButton.exists ).ok()
    .expect( page.sourcingEventDetails.questionsButton.exists ).ok()
    .expect( page.sourcingEventDetails.questionnaireButton.exists ).ok();

});