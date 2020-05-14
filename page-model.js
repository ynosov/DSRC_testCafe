import { Selector } from 'testcafe';

class Page { 
	constructor () {
		this.login = new Login();
		this.sourcingEventDetails = new SourcingEventDetails();
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
		this.analysisButton = Selector(() => { return document.getElementsByName('form_sourcing_spa')});
		this.analysisTab	= Selector('#COMPARISONBLOC');
	}
}

export default new Page();