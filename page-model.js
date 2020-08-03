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
		//"Edit pricing matrix" form
		this.editPricingMatrix = new PricingMatrixEditPricingMatrixForm();
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
		this.columnByName = columnName => XPathSelector('//span[@class="single-column-wrapper"]//span[contains(text(), "' + columnName + '")]');
		this.columnByOrderNumber = orderNumber => XPathSelector('//span[@class="single-column-wrapper"][' + orderNumber + ']//span[@class="v-chip__content"]')
		this.removeColumnButton = columnName => this.columnByName( columnName ).find('button');
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
		this.checkboxAttribute = label => Selector('*').withText( label ).parent('div').withAttribute('class', 'row field-attrs-row').find('input');
	}
}

class PricingMatrixEditPricingMatrixForm {
	constructor() {
		this.form = XPathSelector( '//div[@class="pricing-grid"]' );
		this.addLotButton = this.form.find('button').withAttribute('title', 'Add lot');
		this.saveGridButton = this.form.find('button').withAttribute('title', 'Save grid');
		this.table = new PricingMatrixTable();
	}
}

class PricingMatrixTable {
	constructor() {
		this.grid = XPathSelector('//div[@class="pricing-grid"]//div[@class="pr-grid-cont"]');
		this.header = new PricingMatrixTableHeaders( this.grid );
		this.cell = ( row, column ) => XPathSelector('//div[@row-index="' + row + '"]//div[@aria-colindex="' + column + '"]//div | //div[@row-index="' + row + '"]//div[@aria-colindex="' + column + '"]//span | //div[@row-index="' + row + '"]//div[@aria-colindex="' + column + '"]//input');
	}
}

class PricingMatrixTableHeaders {
	constructor( grid ) {
		this.lots = grid.find('div').withAttribute('class', 'ag-pinned-left-header').find('div').withAttribute('class', 'header').withText('Lots');
		this.lineItem = grid.find('div').withAttribute('class', 'header').withText('Line Item').sibling('div').withAttribute('class', 'actions-renderer-header');
		this.column = columnName => grid.find('div').withAttribute('class', 'required-header').find('span').withText( columnName );
	}
}

export default new Page();