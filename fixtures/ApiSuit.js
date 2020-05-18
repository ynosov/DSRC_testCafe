import { ClientFunction, Selector } from 'testcafe';
import { getSession, getUserId, getUserInfo, createRfqSourcingEvent, importRfq } from '../helpers/api-helpers';
//import { Environment } from '../environment';

fixture`Api Scenarios`;

test('Create RFQ Sourcing Event', async () => {

    /*getToken().then( session => { myId = getUserId(session.get('cookie')) }).then(console.log(myId));*/

    var session = await getSession();
    var userId = await getUserId(session.get('cookie'));
    var userInfo = await getUserInfo(session.get('cookie'), userId);

   // var sourcingEvent = await createRfqSourcingEvent(session.get('cookie'), userInfo._token, userInfo.userName, userInfo.userId);
   await console.log(session.get('cookie') + '   ' + userInfo._token)

  // await console.log ( await importRfq(3566, 'SPA AT RFQ 680420138',  userInfo._token));

    //await console.log(sourcingEvent.rfxid + ' ' + sourcingEvent.rfx_name);
});



  //  await console.log(tokens.get('access_token') + ', ' + tokens.get('refresh_token') + ', ' + tokens.get('cookie') + ', ' + tokens.get('setcookie'));