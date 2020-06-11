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
		this.DefaultPricingMatrixColumnsList = [
            new PricingMatrixColumn('Line Item', false ),
            new PricingMatrixColumn('Unit of measure', false),
			new PricingMatrixColumn('Quantity', false ),
			new PricingMatrixColumn('Baseline price', true ),
			new PricingMatrixColumn('Unit price', false ),
			new PricingMatrixColumn('Currency', false ),
			new PricingMatrixColumn('Commodity', false ),
			new PricingMatrixColumn('Extended baseline price', true ),
			new PricingMatrixColumn('Extended unit price', true ),
			new PricingMatrixColumn('Savings', true )
		];
			this.allPricingMatrixColumns = Selector('span').withAttribute('class', 'single-column-wrapper');
	}
}

	class PricingMatrixColumn {
		constructor ( columnName, removable ) {
			this.columnName = columnName;
			this.header    = XPathSelector('//span[@class="single-column-wrapper"]//span[contains(text(), "' + columnName + '")]');
			this.removable = removable;
			this.removeButton = this.header.find('button');
		}
	}


export default new Page();