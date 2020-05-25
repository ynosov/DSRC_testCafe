import env from '../environment'
var querystring = require('querystring');
const axios = require('axios')
var rp = require('request-promise');
var fs = require('fs');


export function getSession() {

    return axios({
        method: 'post',
        url: env.url + 'api/t/oauth2/token',
        data: querystring.stringify({
            client_id: 'sourcing_spa',
            client_secret: '99408cb1d987f952dcbb',
            code: 'ynosov77A',
            grant_type: 'authorization_code'
        }),
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        }
    })
        .then(response => {
            let cookieValue = '';
            var setcookie   = response.headers["set-cookie"];
        
            if (setcookie) {
                setcookie.forEach(
                    function (cookiestr) {
                        if (cookiestr.indexOf('tDTRMdsim_spa=') !== -1) {
                            cookieValue = cookiestr.substring(14, cookiestr.indexOf(';'))
                        }
                    }
                );
            }

            let session = {
                access_token: response.data["access_token"],
                refresh_token: response.data["refresh_token"],
                cookie: "tDTRMdsim_spa=" + cookieValue };

            return session;
        })
        .catch(error => {
            console.log("getSession request failed: " + error.response)
        });
}

export function getUserId(cookie) {

    return axios({
        method: 'get',
        url: env.url + 'common/home.php',
        headers: {
            'Cookie': cookie,
            'Content-type': 'application/x-www-form-urlencoded'
        }
    })
        .then(response => {
            let body = response.data;
            let userId = body.match("rkey=ORGAPPROVERS&rid=([0-9]*)")[1];

            return userId;
        })
        .catch(error => {
            console.log("getUserId request failed: " + error.response)
        });
}

export function getUserInfo(cookie, userId) {

    return axios({
        method: 'get',
        url: env.url + 'common/record_edit.php',
        headers: {
            'Cookie': cookie,
            'Content-type': 'application/x-www-form-urlencoded'
        },
        params: {
            'rkey': 'USERID',
            'USERID': userId,
            'rid': userId
        }
    })
        .then(response => {

            var body = response.data;

            var userInfo = {
                userId: userId,
                userLastName: body.match('([a-zA-Z]*)","uid":"USERID_LASTNAME')[1],
                userFirstName: body.match('([a-zA-Z]*)","uid":"USERID_FIRSTNAME')[1],
                userName: function() { return this.userFirstName + ' ' + this.userLastName },
                _token: body.match('"csrf-token" content="([a-zA-Z0-9]*)')[1]
            }
  
            return userInfo;
        })
        .catch(error => {
            console.log("getUserInfo request failed: " + error.response)
        });
}


export function createRfqSourcingEvent(cookie, _token, userName, userId) {


    const date = new Date()
    const dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }) 
    const [{ value: month },,{ value: day },,{ value: year },,{ value: hour },,{ value: minute },,{ value: second }] = dateTimeFormat .formatToParts(date ) 

    const openingDate = `${year}-${month}-${day} ${hour}:${minute}:${second}`
    const answerDate = `${Number(year) + 1}-${month}-${day} ${hour}:${minute}:${second}`


    return axios({
        method: 'post',
        url: env.url + 'common/record_edit.php',
        params: { rkey: 'RFXID', MM_edit: '-1', MM_action: 'new'},
        data: querystring.stringify({
            _token:	_token,
            ACCEPTDATE:	'',
            ANSWERDATE:	answerDate,
            APPROVDATE:	'',
            ASENTDATE:	'',
            AWARDDATE:	'',
            AWARDERID:	'0',
            BIDACCEPTDELAY:	'0',
            BIDSTATUS:	'0',
            BUYERID:	userId,
            BUYERID_NAME:	userName,
            CATID:	'',
            CATID_NAME:	'',
            CCURID:	'USD',
            CHANGECLOSE:	'30',
            CLOSINGDATE:	answerDate,
            CONFIDENTIAL:	'0',
            COPYFROMID:	'0',
            CURID:	'USD',
            CURRENTAPPROBID:	'0',
            DAYSTOANSWERDATE:	'0',
            DELETED:	'0',
            DOCISTATUS:	'0',
            DOCNUM:	'',
            DOCSTATUS:	'',
            DPTID:	'78',
            DPTID_NAME:	'Health and Safety',
            ESTIMATED_AMOUNT:	'0',
            FLAGBIDITEMMODIF:	'',
            focus:	'RFXBLOC',
            FormName:	'Edit',
            HIGHBID:	'0',
            INCOTERM:	'',
            INCOTERM_NAME:	'',
            INITID:	'0',
            INITID_NAME:	'',
            INITUSERID:	userId,
            INITUSERID_NAME:	userName,
            INVCOMPANYID:	'5',
            ISHELP:	'0',
            ISTATUS:	'1',
            LASTACTIONAPPROBID:	'0',
            LASTAPPROBID:	'0',
            LASTAPPROVALDATE:	'',
            LASTUPDATED:	'',
            LINKID:	'0',
            LOWBID:	'0',
            MANAGERID:	'0',
            MANAGERID_NAME:	'',
            MINOPENING:	'0',
            MISSINGSUPPLIERS:	'0',
            MM_action:	'add',
            MM_edit:	'-1',
            MM_from:	'',
            MODUSERID:	'0',
            NBACCEPTED:	'0',
            NBANSWERED:	'0',
            NBMINSUPPLIERS:	'2',
            NDAFILE:	'',
            NDAFILE:	'',
            noMenu:	'0',
            OLD_CURID:	'USD',
            OLD_RFXATTR:	'',
            OLD_RFXCLASS:	'RFQ',
            OLD_RFXTYPE:	'2',
            OLD_SUPPLIERID:	'',
            ONLINE_CHECK:	'',
            ONLINEDESC:	'',
            ONLINETITLE:	'',
            OPENINGDATE:	openingDate,
            RECORDNAME:	'',
            RECORDZOOM:	'0',
            REF_RFXID:	'0',
            'RFXATTR[1024]':	'1024',
            'RFXATTR[64]':	'64',
            'RFXATTR[8]':	'8',
            RFXATTR_CHECK:	'1096',
            RFXCLASS:	'RFQ',
            RFXCLASS_NAME:	'RFQ',
            RFXDESCRIPTION:	'',
            RFXID:	'0',
            RFXLABEL:	'SPA_AT_RFQ_' + Math.random().toString().slice(2, 11),
            RFXROUND:	'0',
            RFXTYPE:	'2',
            rid:	'0',
            rkey:	'RFXID',
            SelectQuote:	'0',
            SENTDATE:	'',
            STATUS:	'filled',
            SUPPLIERID:	'',
            SUPPLIERS:	'',
            UPDATEBIDSDATE:	'',
            USTAMPDATE:	'',
            WAPPROVER:	'0',
            WORKFLOWID_FromContext:	'',
            WORKFLOWID_WCOMMENTS:	'',
            WORKFLOWID_WORKFLOWID:	'0',
            WORKFLOWID_WREJECTREASON_CODE:	''
        }),
        headers: {
            'Cookie': cookie,
            'Content-type': 'application/x-www-form-urlencoded'
        }
    })
        .then(response => {

            let body = response.data;

            let rfxDetails = {
                rfxid: body.match('rkey=RFXID&RFXID=([0-9]*)')[1],
                rfx_docnum: body.match('([A-Z0-9]*)","uid":"RFXID_DOCNUM')[1],
                rfx_name: 'SPA_AT_RFQ_' + body.match('Sourcing Event "SPA_AT_RFQ_([0-9]*)')[1],
                bat: body.match('&bat=([a-z0-9]*)')[1]
            }

            return rfxDetails;
        }).catch(error => {
            console.log("createRfqSourcingEvent request failed: " + error.response)
        });
}

export async function startImportRfx( cookie, _token, filePath ) {

            var fileUploadParams = {
                method: 'POST',
                url: env.url + 'common/record_callback.php',
                qs: {
                  flashUpload: '1',
                  FromVar: 'ImportFile',
                  path: 'import/',
                  rkey: 'IMPORT',
                  rid: '0',
                  Timestamp: '0'
                },
                headers: {
                  'Cookie': cookie,
                  'Content-Type': 'multipart/form-data; boundary=--------------------------676127358152040587455180'
                },
                formData: {
                  'ImportFile': {
                    'value': fs.createReadStream(filePath),
                    'options': {
                      'filename': filePath,
                      'contentType': null
                    }
                  }
                }
                };
        
                  try {
                  var uploadedFile = await rp(fileUploadParams)
                  var uploadedFileName = await JSON.parse(uploadedFile).uploadFile.name
                  return uploadedFileName }
                  catch (error) {
                    console.log("startImportRfx requests failed: " + error)
                };;

        }
        
export async function completeImportRfq( cookie, _token, rfxid, rfx_name, uploadedFileName ) {
        
                var completeImportParams = {
                    'method': 'POST',
                    'url': env.url + 'common/record_edit.php',
                    qs: {
                        Return:	'',
                        ikey:	'RFXITEMID',
                        MM_update:	'1',
                        RECORDNAME:	'',
                        rkey:	'IMPORT',
                        rid:	'0',
                        FormName:	'Edit',
                        MM_action:	'form_import',
                        MM_from:	'',
                        MM_edit:	'1',
                        focus:	'',
                        noMenu:	'0',
                        SetRFXID:	rfxid,
                        RFXID_NAME:	rfx_name,
                        IOTemplate:	'',
                        OLD_IOTemplate:	'',
                        ImportFile:	uploadedFileName,
                        Data:	'',
                        MM_separator:	';',
                        importDateFmt:	'Y-m-d',
                        ImportEncoding:	"UTF-8",
                        MM_firstline:	'1',
                        SYNCMODE:	'3',
                        IgnoreKey_CHECK:	'0',
                        NoPK_CHECK:	'0',
                        IgnoreRequired_CHECK:	'0',
                        SetStatus_CHECK:	'0',
                        _token:	_token },
                    headers: {
                      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                      'Accept-Encoding': 'gzip, deflate, br',
                      'Accept-Language': 'ru-RU,ru;q=0.8,en-US;q=0.5,en;q=0.3',
                      'Cookie': cookie,
                      'Content-type': 'application/x-www-form-urlencoded',
                      'Upgrade-Insecure-Requests': 'ru-RU,ru;q=0.8,en-US;q=0.5,en;q=0.3',
                      'Connection': 'keep-alive',
                      'Host': 'autostandard72.determine.com'
                    },
                    form: {
                    }
                  };
        
                  try {
                  var importResult = await rp(completeImportParams)
                  return importResult }
                  catch (error) {
                    console.log("completeImportRfq requests failed: " + error)
                }}



// OPEN SPA page of sourcing event
/*export function 
env.url
    + 'webapps/t/sourcing/#access_token='
    + (tokens.get('access_token')
        + '&token_type=Bearer&expires_in=3600&scope=data&refresh_token='
        + tokens.get('refresh_token')
        + '&state=eyJhcHAiOiJzb3VyY2luZ19zcGEiLCJyb3V0ZSI6eyJya2V5IjoiUkZYSUQiLCJyaWQiOjM1MTEsImxldmVsIjoiZGV0YWlsIn19&audience=https%3A%2F%2F'
        + env.host
        + '%2F' + env.appli + '%2Fapi%2F'
        + env.apitoken
        + '%2Frestful'*/