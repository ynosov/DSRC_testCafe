import { ClientFunction, Selector } from 'testcafe';
import { getSession, getUserId, getUserInfo, createRfqSourcingEvent, startImportRfx, completeImportRfq, nextToStateSuppliers, sleep, logIn } from '../helpers/api-helpers';
import env from '../environment'


fixture`Api Scenarios`;

test('Create RFQ Sourcing Event', async () => {

    var sv = {} // session vars

    try{
    await logIn( env.assignedTo ).then( cookie => sv.cookie = cookie);
    await getUserId( sv.cookie ).then( userId => sv.userId = userId);
    await getUserInfo( sv.cookie, sv.userId ).then( userInfo => sv.userInfo = userInfo);
    await createRfqSourcingEvent( sv.userInfo ).then( rfxDetails => sv.rfxDetails = rfxDetails);
    sv.rfqImportFile = env.rfqImrort200;
    await startImportRfx( sv.userInfo, sv.rfqImportFile ).then( uploadedFile => sv.uploadedFile = uploadedFile).then( async () => await sleep( 10000 ));
    await completeImportRfq( sv.userInfo, sv.rfxDetails, sv.uploadedFile ).then( async () => await sleep( 10000 ));
    await nextToStateSuppliers( sv.userInfo, sv.rfxDetails )
    console.log( sv.rfxDetails.rfx_name + ' is created' )
    } catch (e) {
        console.error(e)
    }
});