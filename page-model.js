import { Selector } from 'testcafe';
import XPathSelector from './selectors/xpath-selector';
import env from './environment';

class Page { 
	constructor () {
		this.login = new Login();
		this.sourcingEventDetails = new SourcingEventDetails();
		this.pricingMatrix = new PricingMatrix();
		this.topPanel = new TopPanel();
	}
}

// Login Page
class Login {
	constructor () {
		this.loginField		= Selector('#user');
		this.passwordField  = Selector('#password');
		this.submitButton	= Selector('#form_login');
	}
}

//Sourcing Event details page
class SourcingEventDetails {
	constructor () {
		this.getPageById = id => { return ''.concat(env.url, 'common/record_edit.php?rkey=RFXID&&MM_edit=0&rid=', id, '&RFXID=', id)};
		this.title = Selector('title');
		this.analysisButton = Selector(() => { return document.getElementsByName('form_sourcing_spa')});
		this.analysisTab	= Selector('#COMPARISONBLOC');
		this.rfxDetailsTab  = Selector('#RFX_DETAILS_BLOC');
		this.descriptionTab  = Selector('#RFXBLOC');
		this.pricingMatrixButton = Selector(() => { return document.getElementsByName('form_pricing_matrix')});
		this.questionsButton = Selector(() => { return document.getElementsByName('form_questions')});
		this.questionnaireButton = Selector(() => { return document.getElementsByName('form_questionnaires')});
	}
}

class TopPanel {
	constructor() {
		this.userOptions = Selector('#topright_container_userOptions');
		this.userOptionsLogout = Selector(() => { return document.getElementByXpath("//li[@id='topright_userOptions']//li[@data-action='logout']")});    
	}
}

class PricingMatrix {
	constructor() {
		this.eventActions = XPathSelector('//button[@title="Event actions"]');
		this.backToEvent = XPathSelector('//div[contains(text(), "Back to event")]');
		this.defaultColumnsList = [
			new Column( 'Line Item', false,
				new FieldAttributes(
	                //                         Label           Editable   Required    Text/Active
					new FieldAttributeText(   'Field header',  false,     true,       'Line Item' ),
					new FieldAttributeText(   'Char limit',    true,      true,       '255' ),
					new FieldAttributeCheckbox( 'Attachment',    false,     false,      false ),//
					new FieldAttributeCheckbox( 'Date',          false,     false,      false ),
					new FieldAttributeCheckbox( 'Number',        false,     false,      false ),
					new FieldAttributeCheckbox( 'Currency',      false,     false,      false ),
					new FieldAttributeCheckbox( 'Percent',       false,     false,      false ),
					new FieldAttributeCheckbox( 'Internal only', false,     false,      false ),
					new FieldAttributeCheckbox( 'Read only',     false,     false,      true  ),
					new FieldAttributeCheckbox( 'Response',      false,     false,      false ),
					new FieldAttributeCheckbox( 'Required',      false,     false,      true  ),
					new FieldAttributeCheckbox( 'Calculation',   false,     false,      false )
			) ),
			new Column( 'Unit of measure', false,
				new FieldAttributes(
	                //                         Label           Editable   Required    Text/Active
					new FieldAttributeText(   'Field header',  false,     true,       'Unit of measure' ),
					new FieldAttributeText(   'Char limit',    true,      true,       '255' ),
					new FieldAttributeCheckbox( 'Attachment',    false,     false,      false ),
					new FieldAttributeCheckbox( 'Date',          false,     false,      false ),
					new FieldAttributeCheckbox( 'Number',        false,     false,      false ),
					new FieldAttributeCheckbox( 'Currency',      false,     false,      false ),
					new FieldAttributeCheckbox( 'Percent',       false,     false,      false ),
					new FieldAttributeCheckbox( 'Internal only', false,     false,      false ),
					new FieldAttributeCheckbox( 'Read only',     false,     false,      true  ),
					new FieldAttributeCheckbox( 'Response',      false,     false,      false ),
					new FieldAttributeCheckbox( 'Required',      false,     false,      true  ),
					new FieldAttributeCheckbox( 'Calculation',   false,     false,      false )
			)),
			new Column( 'Quantity', false,
				new FieldAttributes(
					//                         Label           Editable   Required    Text/Active
					new FieldAttributeText(   'Field header',  false,     true,       'Quantity' ),
					new FieldAttributeText(   'Char limit',    true,      true,       '15'  ),
					new FieldAttributeCheckbox( 'Attachment',    false,     false,      false ),
					new FieldAttributeCheckbox( 'Date',          false,     false,      false ),
					new FieldAttributeCheckbox( 'Number',        false,     false,      true  ),
					new FieldAttributeCheckbox( 'Currency',      false,     false,      false ),
					new FieldAttributeCheckbox( 'Percent',       false,     false,      false ),
					new FieldAttributeCheckbox( 'Internal only', false,     false,      false ),
					new FieldAttributeCheckbox( 'Read only',     false,     false,      true  ),
					new FieldAttributeCheckbox( 'Response',      false,     false,      false ),
					new FieldAttributeCheckbox( 'Required',      false,     false,      true  ),
					new FieldAttributeCheckbox( 'Calculation',   false,     false,      false )
			)),
			new Column( 'Baseline price', true,
				new FieldAttributes(
					//                         Label           Editable   Required    Text/Active
					new FieldAttributeText(   'Field header',  false,     true,       'Baseline price' ),
					new FieldAttributeText(   'Char limit',    true,      true,       '15'  ),
					new FieldAttributeCheckbox( 'Attachment',    false,     false,      false ),
					new FieldAttributeCheckbox( 'Date',          false,     false,      false ),
					new FieldAttributeCheckbox( 'Number',        false,     false,      true  ),
					new FieldAttributeCheckbox( 'Currency',      false,     false,      true  ),
					new FieldAttributeCheckbox( 'Percent',       false,     false,      false ),
					new FieldAttributeCheckbox( 'Internal only', false,     false,      true  ),
					new FieldAttributeCheckbox( 'Read only',     false,     false,      false ),
					new FieldAttributeCheckbox( 'Response',      false,     false,      false ),
					new FieldAttributeCheckbox( 'Required',      false,     false,      false ),
					new FieldAttributeCheckbox( 'Calculation',   false,     false,      false )
			)),
			new Column( 'Unit price', false,
				new FieldAttributes(
					//                         Label           Editable   Required    Text/Active
					new FieldAttributeText(   'Field header',  false,     true,       'Unit price' ),
					new FieldAttributeText(   'Char limit',    true,      true,       '15'  ),
					new FieldAttributeCheckbox( 'Attachment',    false,     false,      false ),
					new FieldAttributeCheckbox( 'Date',          false,     false,      false ),
					new FieldAttributeCheckbox( 'Number',        false,     false,      true  ),
					new FieldAttributeCheckbox( 'Currency',      false,     false,      true  ),
					new FieldAttributeCheckbox( 'Percent',       false,     false,      false ),
					new FieldAttributeCheckbox( 'Internal only', false,     false,      false ),
					new FieldAttributeCheckbox( 'Read only',     false,     false,      false ),
					new FieldAttributeCheckbox( 'Response',      false,     false,      true  ),
					new FieldAttributeCheckbox( 'Required',      false,     false,      true  ),
					new FieldAttributeCheckbox( 'Calculation',   false,     false,      false )
			)),
			new Column( 'Currency', false,
				new FieldAttributes(
					//                         Label           Editable   Required    Text/Active
					new FieldAttributeText(   'Field header',  false,     true,       'Currency' ),
					new FieldAttributeText(   'Char limit',    false,     true,       ''    ),
					new FieldAttributeCheckbox( 'Attachment',    false,     false,      false ),
					new FieldAttributeCheckbox( 'Date',          false,     false,      false ),
					new FieldAttributeCheckbox( 'Number',        false,     false,      false ),
					new FieldAttributeCheckbox( 'Currency',      false,     false,      false ),
					new FieldAttributeCheckbox( 'Percent',       false,     false,      false ),
					new FieldAttributeCheckbox( 'Internal only', false,     false,      false ),
					new FieldAttributeCheckbox( 'Read only',     false,     false,      true  ),
					new FieldAttributeCheckbox( 'Response',      false,     false,      false ),
					new FieldAttributeCheckbox( 'Required',      false,     false,      false ),
					new FieldAttributeCheckbox( 'Calculation',   false,     false,      false )
			)),
			new Column( 'Commodity', false,
				new FieldAttributes(
					//                         Label           Editable   Required    Text/Active
					new FieldAttributeText(   'Field header',  false,     true,       'Commodity' ),
					new FieldAttributeText(   'Char limit',    false,     true,       ''    ),
					new FieldAttributeCheckbox( 'Attachment',    false,     false,      false ),
					new FieldAttributeCheckbox( 'Date',          false,     false,      false ),
					new FieldAttributeCheckbox( 'Number',        false,     false,      false ),
					new FieldAttributeCheckbox( 'Currency',      false,     false,      false ),
					new FieldAttributeCheckbox( 'Percent',       false,     false,      false ),
					new FieldAttributeCheckbox( 'Internal only', false,     false,      true  ),
					new FieldAttributeCheckbox( 'Read only',     false,     false,      false ),
					new FieldAttributeCheckbox( 'Response',      false,     false,      false ),
					new FieldAttributeCheckbox( 'Required',      false,     false,      false ),
					new FieldAttributeCheckbox( 'Calculation',   false,     false,      false )
			)),
			new Column( 'Extended baseline price', true,
				new FieldAttributes(
					//                         Label           Editable   Required    Text/Active
					new FieldAttributeText(   'Field header',  false,     true,       'Extended baseline price' ),
					new FieldAttributeText(   'Char limit',    false,     true,       ''    ),
					new FieldAttributeCheckbox( 'Attachment',    false,     false,      false ),
					new FieldAttributeCheckbox( 'Date',          false,     false,      false ),
					new FieldAttributeCheckbox( 'Number',        false,     false,      true  ),
					new FieldAttributeCheckbox( 'Currency',      false,     false,      true  ),
					new FieldAttributeCheckbox( 'Percent',       false,     false,      false ),
					new FieldAttributeCheckbox( 'Internal only', false,     false,      true  ),
					new FieldAttributeCheckbox( 'Read only',     false,     false,      false ),
					new FieldAttributeCheckbox( 'Response',      false,     false,      false ),
					new FieldAttributeCheckbox( 'Required',      false,     false,      false ),
					new FieldAttributeCheckbox( 'Calculation',   false,     false,      true  )
			)),
			new Column( 'Extended unit price', true,
				new FieldAttributes(
					//                         Label           Editable   Required    Text/Active
					new FieldAttributeText(   'Field header',  false,     true,       'Extended unit price' ),
					new FieldAttributeText(   'Char limit',    false,     true,       ''    ),
					new FieldAttributeCheckbox( 'Attachment',    false,     false,      false ),
					new FieldAttributeCheckbox( 'Date',          false,     false,      false ),
					new FieldAttributeCheckbox( 'Number',        false,     false,      true  ),
					new FieldAttributeCheckbox( 'Currency',      false,     false,      true  ),
					new FieldAttributeCheckbox( 'Percent',       false,     false,      false ),
					new FieldAttributeCheckbox( 'Internal only', false,     false,      false ),
					new FieldAttributeCheckbox( 'Read only',     false,     false,      true  ),
					new FieldAttributeCheckbox( 'Response',      false,     false,      false ),
					new FieldAttributeCheckbox( 'Required',      false,     false,      false ),
					new FieldAttributeCheckbox( 'Calculation',   false,     false,      true  )
			)),
			new Column( 'Savings', true,
				new FieldAttributes(
					//                         Label           Editable   Required    Text/Active
					new FieldAttributeText(   'Field header',  false,     true,       'Savings' ),
					new FieldAttributeText(   'Char limit',    false,     true,       ''    ),
					new FieldAttributeCheckbox( 'Attachment',    false,     false,      false ),
					new FieldAttributeCheckbox( 'Date',          false,     false,      false ),
					new FieldAttributeCheckbox( 'Number',        false,     false,      true  ),
					new FieldAttributeCheckbox( 'Currency',      false,     false,      true  ),
					new FieldAttributeCheckbox( 'Percent',       false,     false,      false ),
					new FieldAttributeCheckbox( 'Internal only', false,     false,      true  ),
					new FieldAttributeCheckbox( 'Read only',     false,     false,      false ),
					new FieldAttributeCheckbox( 'Response',      false,     false,      false ),
					new FieldAttributeCheckbox( 'Required',      false,     false,      false ),
					new FieldAttributeCheckbox( 'Calculation',   false,     false,      true  )
			))
		];
			this.allColumns = Selector('span').withAttribute('class', 'single-column-wrapper');
	}
}

	class Column {
		constructor ( columnName, isRemovable, fieldAttributes ) {
			this.columnName = columnName;
			this.locator    = XPathSelector('//span[@class="single-column-wrapper"]//span[contains(text(), "' + columnName + '")]');
			this.isRemovable = isRemovable;
			this.removeButton = this.locator.find('button');
			this.fieldAttributes = fieldAttributes;
		}
	}

	class FieldAttributes {
		constructor (
			fieldHeader,
			charLimit,
			attachment,
			date,
			number,
			currency,
			percent,
			internalOnly,
			readOnly,
			response,
			required,
			calculation
			 ) {
		this.list = {
			fieldHeader:	fieldHeader, 
			charLimit: 		charLimit, 
			attachment: 	attachment, 
			date: 			date, 
			number:			number, 
			currency: 		currency, 
			percent: 		percent, 
			internalOnly: 	internalOnly, 
			readOnly: 		readOnly, 
			response: 		response, 
			required: 		required, 
			calculation:	calculation }
	}
}


    export class FieldAttributeText {
		constructor ( label, isEditable, isRequired, text ) {
			this.label = label;
			this.isEditable = isEditable;
			this.isRequired = isRequired;
			this.text = text;
			this.textField = Selector('span').withText(label).parent('div.v-text-field__slot').find('input');
		}
	}

	export class FieldAttributeCheckbox {
		constructor ( label, isEditable, hasTooltip, isActive ) {
			this.label = label;
			this.isEditable = isEditable;
			this.hasTooltip = hasTooltip;
			this.isActive = isActive;
			this.checkbox = Selector('span').withText(label).parent('div.v-input__slot').find('input');
		}
	}

export default new Page();