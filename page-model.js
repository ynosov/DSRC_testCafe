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

//Login page
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

//Top panel on Material design
class TopPanel {
	constructor() {
		this.userOptions = Selector('#topright_container_userOptions');
		this.userOptionsLogout = Selector(() => { return document.getElementByXpath("//li[@id='topright_userOptions']//li[@data-action='logout']")});    
	}
}

//Pricing matrix page
class PricingMatrix {
	constructor() {
		//Page header
		this.header = new PricingMatrixHeader();
		//"Arrange columns" form
		this.arrangeColumns = new PricingMatrixArrangeColumnsForm();
		//"Field attribute" form
		this.fieldAttributes = new PricingMatrixFieldAttributesForm();
	}
}

class PricingMatrixHeader {
	constructor() {
		this.eventActions = XPathSelector('//button[@title="Event actions"]');
		this.backToEvent = XPathSelector('//div[contains(text(), "Back to event")]');
	}
}

class PricingMatrixArrangeColumnsForm {
	constructor() {
		this.addNewColumnButton = XPathSelector( '//button[@title="Add new column"]' );
		this.column = columnName => XPathSelector('//span[@class="single-column-wrapper"]//span[contains(text(), "' + columnName + '")]');
		this.removeColumnButton = columnName => this.column( columnName ).find('button');
		this.allColumns = Selector( 'span' ).withAttribute( 'class', 'single-column-wrapper' );
	}
}

class PricingMatrixFieldAttributesForm {
	constructor() {
		this.form = XPathSelector( '//div[@class="field-attrs-wrapper"]' );
		this.formTitle = this.form.find( 'span' );
		this.saveFieldButton = this.form.find('button').withAttribute('title', 'Save field');
		this.discardChangesButton = this.form.find('button').withAttribute('title', 'Discard changes');
		this.expandButton = XPathSelector('//div[@class="field-attrs-wrapper"]//button[not(@title)]');
		this.textAttribute = label => Selector('span').withText( label ).parent('div.v-text-field__slot').find('input');
		this.checkboxAttribute = label => Selector('*').withText( label ).parent('div.v-input__slot').find('input');
	}
}


export default new Page();