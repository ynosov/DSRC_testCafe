const axios = require('axios')
const querystring = require('querystring')

export function getToken() {
    // variables initialization

    return axios({
        method: 'post',
        url: 'https://autostandard72.determine.com/t/dsim_spa/api/t/oauth2/token',
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
            return new Map([
                ['access_token', response.data["access_token"]],
                ['refresh_token', response.data["refresh_token"]]
            ]);
        })
}