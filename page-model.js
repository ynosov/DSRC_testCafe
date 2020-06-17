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

// Login page
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
		this.eventActions = XPathSelector('//button[@title="Event actions"]');
		this.backToEvent = XPathSelector('//div[contains(text(), "Back to event")]');
		this.column = columnName => XPathSelector('//span[@class="single-column-wrapper"]//span[contains(text(), "' + columnName + '")]');
		this.removeColumnButton = columnName => this.column( columnName ).find('button');
		this.textFieldAttribute = label => Selector('span').withText( label ).parent('div.v-text-field__slot').find('input');
		this.checkboxFieldAttribute = label => Selector('span').withText( label ).parent('div.v-input__slot').find('input');
		this.allColumns = Selector('span').withAttribute('class', 'single-column-wrapper');
	}
}


export default new Page();