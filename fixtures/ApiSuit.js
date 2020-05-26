import { ClientFunction, Selector } from 'testcafe';
import { getSession, getUserId, getUserInfo, createRfqSourcingEvent, startImportRfx, completeImportRfq, nextToStateSuppliers } from '../helpers/api-helpers';
import env from '../environment'

fixture`Api Scenarios`;

test('Create RFQ Sourcing Event', async () => {

    var sv = {
      /*  cookie: 'tDTRMdsim_spa=vk0b7fkne71sk6q36imhd8juqf',
        userId: '5332',
        userInfo: {
          userId: '5332',
          userLastName: 'Nosov',
          userFirstName: 'Eugene',
          userName: 'Eugene Nosov',
          userCompanyId: '5',
          _token: 'MmU4MzU1N2E1NzA3OGNkNGJkYzg3NjU4YjI3ZDEzMjE2YTQ3MmUyYmNmODg3ZjUx',
          cookie: 'tDTRMdsim_spa=vk0b7fkne71sk6q36imhd8juqf',
          userDepartmentId: '78',
          userDepartmentName: 'Health and Safety ',
          userCompanyName: 'Amazon'
        },*/
        rfxDetails: {
          rfxid: '3599',
          rfx_docnum: 'DSE20203608',
          rfx_name: 'SPA_AT_RFQ_061893899',
          bat: '4bcb62ffeb60ac4298762aa1804e2597',
          openingDate: '2020-05-26 12:01:18',
          answerDate: '2021-05-26 12:01:18'
        },
        rfqImportFile: 'C:/Users/ynosov.PROVECTUS/Desktop/SPA/Ynosov SPA AT/RFQ_import_generated_200_(1578224651474).xlsx',
        uploadedFile: '[1590483689-20404]_rfq_import_generated_200_(1578224651474).xlsx'
      } // session vars

    try{
    sv.cookie = await getSession().then(res => res.cookie)
    sv.userId = await getUserId(sv.cookie);
    sv.userInfo = await getUserInfo(sv.cookie, sv.userId);
   /* sv.rfxDetails = await createRfqSourcingEvent(sv.userInfo)
    sv.rfqImportFile = env.rfqImrort200
    sv.uploadedFile = await startImportRfx(sv.userInfo, sv.rfqImportFile)
    await completeImportRfq(sv.userInfo, sv.rfxDetails, sv.uploadedFile)*/
    var res = await nextToStateSuppliers(sv.userInfo, sv.rfxDetails)
    console.log(res)
    } catch (e) {
        console.error(e)
    }
});