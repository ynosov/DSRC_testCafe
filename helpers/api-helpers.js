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

export function 
env.link
    + 'webapps/t/sourcing/#access_token='
    + (tokens.get('access_token')
        + '&token_type=Bearer&expires_in=3600&scope=data&refresh_token='
        + tokens.get('refresh_token')
        + '&state=eyJhcHAiOiJzb3VyY2luZ19zcGEiLCJyb3V0ZSI6eyJya2V5IjoiUkZYSUQiLCJyaWQiOjM1MTEsImxldmVsIjoiZGV0YWlsIn19&audience=https%3A%2F%2F'
        + env.host
        + '%2F' + env.appli + '%2Fapi%2F'
        + env.apitoken
        + '%2Frestful'