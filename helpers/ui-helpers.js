import { ClientFunction, Selector, t } from 'testcafe';
import page from '../page-model';
import pricingMatrix_td from '../testData/pricingMartrix_td';
import { FieldAttributeText, FieldAttributeCheckbox } from '../testData/pricingMartrix_td';
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

    for ( const defaultColumn of pricingMatrix_td.defaultColumnsList ) {
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

            //CHECK TEXT ATTRIBUTES
            if ( attributeDetails instanceof FieldAttributeText ) {
                //Check that specific attributes are not displayed
                if ( attributeDetails.textField.value == null ) {
                    await browser
                    .expect( attributeDetails.textField.visible ).notOk( '"' + column.columnName + '" column attribute "' + attributeDetails.label + '" is displayed on the screen' )
                    .expect( attributeDetails.textField.value ).eql( '',  '"' + column.columnName + '" column attribute "' + attributeDetails.label + '" is not displayed on the screen but contais not null value' );
                //Check specific attributes that are displayed
                } else {
                    //Check that the attribute is visible
                    await browser
                    .expect( attributeDetails.textField.visible ).ok( '"' + column.columnName + '" column attribute "' + attributeDetails.label + '" is not displayed on the screen' );
                    //Check text attributes values
                    await browser
                    .expect( attributeDetails.textField.visible ).ok( '"' + column.columnName + '" column attribute "' + attributeDetails.label + '" is not displayed on the screen' )
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
                }

            //CHECK CHECKBOX ATTRIBUTES   
            } else if ( attributeDetails instanceof FieldAttributeCheckbox ) {
                //Check that the attribute is displayed on the screen
                await browser
                .expect( attributeDetails.checkbox.visible ).ok( '"' + column.columnName + '" column attribute "' + attributeDetails.label + '" is not displayed on the screen' );
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



export async function checkAllPossibleAttributeCombinations( attributeName ) {

    const fa = page.pricingMatrix.fieldAttributes;

    let compatibleAttributes = [ ...pricingMatrix_td.possibleCheckboxAttributesCombinations[ attributeName ] ];
    const allAttributes = pricingMatrix_td.possibleCheckboxAttributesCombinations[ 'Default' ];
    let activeAttributes = [];
    let inactiveAttributes = [];
    let enabledAttributes = [];
    let disabledAttibutes = [];

    async function defineAttributesInitialState() {
        activeAttributes = [ attributeName ];
        inactiveAttributes = allAttributes.filter( el => !activeAttributes.includes( el ) );
        enabledAttributes = [ ...pricingMatrix_td.possibleCheckboxAttributesCombinations[ attributeName ] ];
        enabledAttributes.push( attributeName );
         //Add paired attributes of the attribute
        if ( pricingMatrix_td.pairedCheckboxAttributes[ attributeName ] ) {
            activeAttributes.concat( pricingMatrix_td.pairedCheckboxAttributes[ attributeName ] );
        }
        disabledAttibutes = allAttributes.filter( el => !enabledAttributes.includes( el ) );
    }

    async function updateAttributesState( attr ) {
        enabledAttributes = enabledAttributes.filter( element => pricingMatrix_td.possibleCheckboxAttributesCombinations[ attr ].includes( element ) );
        enabledAttributes.push( attr );
        disabledAttibutes = allAttributes.filter(el => !enabledAttributes.includes( el ));
        activeAttributes.push( attr );
        //Add paired attributes for just ticked attribute
        if ( pricingMatrix_td.pairedCheckboxAttributes[ attr ] ) {
            for ( const pairedAttr of pricingMatrix_td.pairedCheckboxAttributes[ attr ] ) {
                activeAttributes.push( pairedAttr );
            }
        }
        inactiveAttributes = allAttributes.filter( el => !activeAttributes.includes( el ));
    }

    async function checkAllAttributesState() {
        //Check attributes that should be editable
        for ( const attr of enabledAttributes ) {
            await browser
            .expect( fa.checkboxAttribute( attr ).hasAttribute('disabled') ).notOk( 'Attribute "' + attr + '" is not editable' );
        }
        //Check attributes that should be not editable
        for ( const attr of disabledAttibutes ) {
            await browser
            .expect( fa.checkboxAttribute( attr ).hasAttribute('disabled') ).ok( 'Attribute "' + attr + '" is editable' );
        }
        //Check attributes that should be active
        for ( const attr of activeAttributes ) {
            await browser
            .expect( fa.checkboxAttribute( attr ).getAttribute('aria-checked') ).eql( 'true', 'Column attribute "' + attr + '" is not active' );
        }
        //Check attributes that should be inactive
        for ( const attr of inactiveAttributes ) {
            await browser
            .expect( fa.checkboxAttribute( attr ).getAttribute('aria-checked') ).eql( 'false', 'Column attribute "' + attr + '" is active' );
        }
    }
	
	await browser
    .click( page.pricingMatrix.arrangeColumns.addNewColumnButton )
    .expect( fa.form.visible ).ok( '"Field attributes" form is not visible' );

    let i = 0;

    //Check all possible attributes combinations
    while ( i < pricingMatrix_td.possibleCheckboxAttributesCombinations[ attributeName ].length ) {

        await browser.click( fa.checkboxAttribute( attributeName ) );


        await defineAttributesInitialState();
        await checkAllAttributesState();

        attributeIterator: for ( const attr of compatibleAttributes ) {

            //Skip attribute if it is not enabled
            if ( !(enabledAttributes.includes( attr )) ) {
                continue attributeIterator;
            }

            await browser.click( fa.checkboxAttribute( attr ) );

            await updateAttributesState( attr );
            await checkAllAttributesState();
        }

    //Start next iteration from different attribute
    compatibleAttributes.push( await compatibleAttributes.shift() );

    i++;

    await browser
    .click( fa.discardChangesButton );

    //Check that all attributes values are reset
    for ( const attr of allAttributes ) {
        await browser
        .expect( fa.checkboxAttribute( attr ).hasAttribute('disabled') ).notOk( 'Attribute "' + attr + '" is not editable' )
        .expect( fa.checkboxAttribute( attr ).getAttribute('aria-checked') ).eql( 'false', 'Column attribute "' + attr + '" is active' );
    }

    }

}