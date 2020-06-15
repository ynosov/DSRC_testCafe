import { ClientFunction, Selector, t } from 'testcafe';
import page from '../page-model';
import { FieldAttributeText, FieldAttributeCheckbox } from '../page-model';
import { assignedTo } from '../roles';
import env from '../environment';
import { sleep } from '../helpers/api-helpers';

let getLocation = ClientFunction(() => document.location.href);
let browser = t;

export async function login ( user, browser ) {
    await browser
        .typeText(page.login.loginField, user.login)
        .typeText(page.login.passwordField, user.password)
        .click(page.login.submitButton)
        .expect(Selector("title").innerText).eql('Home Page');
}

export const logout = async () => {
    await browser
        .click(page.topPanel.userOptions)
        .click(page.topPanel.userOptionsLogout)
        .expect(getUrl().eql(env.url + 'protected/login.php?page=%2Fh%2F' + env.appli + '%2F'));
}

export const openComparisonScreenById = async ({ id, browser }) => {
    await login({ login: env.assignedTo.login, password: env.assignedTo.password, browser });
    await browser.navigateTo(''.concat(env.host, 'common/record_edit.php?rkey=RFXID&&MM_edit=0&rid=', id, '&RFXID=', id))
        .click(page.sourcingEventDetails.analysisTab)
        .click(page.sourcingEventDetails.analysisButton)
        .wait(90000)
        .expect(getLocation()).eql(env.host + 'webapps/t/sourcing/#/sourcing/' + id + '/survey');
}

export const openSourcingEventRfxDetailsById = async ({ id, browser }) => {
    try{
    await login({ login: env.assignedTo.login, password: env.assignedTo.password, browser });
    await browser.navigateTo(''.concat(env.host, 'common/record_edit.php?rkey=RFXID&&MM_edit=0&rid=', id, '&RFXID=', id))
        .click(page.sourcingEventDetails.rfxDetailsTab)
    } catch (e) { console.log('Opening Sourcing Event => RFX DETAILS tab: failed. Error: ' (e))}
    }


export async function waitPricingMatrixPageToLoad () {
    const getPageUrl = ClientFunction(() => window.location.href.toString());
    for ( let i = 0; i <= 10; i++ ) {
    try {
        if ( await browser.expect(getPageUrl()).contains(env.url + 'webapps/' + env.vrp + '/sourcing/#/matrixPricing') ) {
            break;
        }} catch (e) {
            await sleep(3000);
            continue;
        }};
}

export async function checkDefaultColumnFieldAttributes( defaultColumnName ) {
    
    const sv = browser.fixtureCtx.sv;

    for ( const defaultColumn of page.pricingMatrix.defaultColumnsList ) {
        if ( defaultColumn.columnName == defaultColumnName ) {
           var column = defaultColumn;
        }
    }

    await browser
    .useRole(assignedTo)
    .navigateTo( page.sourcingEventDetails.getPageById( sv.rfxDetails.rfxid ) )
    .click( page.sourcingEventDetails.rfxDetailsTab )
    .click( page.sourcingEventDetails.pricingMatrixButton );
    await waitPricingMatrixPageToLoad();
    await browser.click( column.locator );

        for ( const attribute of Object.keys(column.fieldAttributes.list) ) {
            let attributeDetails = column.fieldAttributes.list[attribute];

            //Check text attributes
            if ( attributeDetails instanceof FieldAttributeText ) {
                //Check text attributes values
                await browser
                .expect( attributeDetails.textField.value ).eql( attributeDetails.text, '"' + column.columnName + '" column attribute "' + attributeDetails.label + '" text doesnt correspond to defined in test data' );
                //Check that the attribute is not editable for specific columns
                if ( attributeDetails.isEditable == false ) {
                    await browser
                    .expect( attributeDetails.textField.hasAttribute( 'disabled' ) )
                    .ok( '"' + column.columnName + '" column attribute "' + attributeDetails.label + '" is editable' )
                //Check that the attribute is editable for specific columns
                } else if ( attributeDetails.isEditable == true ) {
                    await browser.expect( attributeDetails.textField.hasAttribute('disabled') ).notOk( '"' + column.columnName + '" column attribute "' + attributeDetails.label + '" is not editable' )
                } else throw new Error('"' + column.columnName + '" column attribute "' + attributeDetails.label + '" editable state is not defined in test case' )
            
            //Check checkbox attributes    
            } else if ( attributeDetails instanceof FieldAttributeCheckbox ) {
                //Check checkbox state
                if ( attributeDetails.isActive == false ) {
                    await browser
                    .expect( attributeDetails.checkbox.getAttribute('aria-checked') ).eql( 'false', '"' + column.columnName + '" column attribute "' + attributeDetails.label + '" is active' );
                } else if ( attributeDetails.isActive == true ) {
                    await browser
                    .expect( attributeDetails.checkbox.getAttribute('aria-checked') ).eql( 'true', '"' + column.columnName + '" column attribute "' + attributeDetails.label + '" is not active' );
                } else throw new Error( '"' + column.columnName + '" column attribute "' + attributeDetails.label + '" has not correctly defined checkbox state in test case' );
               //Check that the attribute is not editable for specific columns
               if ( attributeDetails.isEditable == false ) {
                await browser
                .expect( attributeDetails.checkbox.hasAttribute( 'disabled' ) )
                .ok( '"' + column.columnName + '" column attribute "' + attributeDetails.label + '" is editable' )
                //Check that the field is editable for specific columns
                } else if ( attributeDetails.isEditable == true ) {
                    await browser.expect( attributeDetails.checkbox.hasAttribute('disabled') ).notOk( '"' + column.columnName + '" column attribute "' + attributeDetails.label + '" is not editable' );
                } else throw new Error('"' + column.columnName + '" column attribute "' + attributeDetails.label + '" editable state is not defined in test case' );
        }
}
};