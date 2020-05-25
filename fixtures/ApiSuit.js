import { ClientFunction, Selector } from 'testcafe';
import { getSession, getUserId, getUserInfo, createRfqSourcingEvent, startImportRfx, completeImportRfq } from '../helpers/api-helpers';
import env from '../environment'

fixture`Api Scenarios`;

test('Create RFQ Sourcing Event', async () => {

    var sv = {} // session vars

    try{
    sv.cookie = await getSession().then(res => res.cookie)
    sv.userId = await getUserId(sv.cookie);
    sv.userInfo = await getUserInfo(sv.cookie, sv.userId);
    sv.rfxDetails = await createRfqSourcingEvent(sv.cookie, sv.userInfo._token, sv.userInfo.userName, sv.userId)
    sv.rfqImportFile = env.rfqImrort200
    sv.uploadedFile = await startImportRfx(sv.cookie, sv.userInfo._token, sv.rfqImportFile)
    sv.importResult = await completeImportRfq(sv.cookie, sv.userInfo._token, sv.rfxDetails.rfxid, sv.rfxDetails.rfx_name, sv.uploadedFile)
    console.log(sv.importResult)
    } catch (e) {
        console.error(e)
    }
});