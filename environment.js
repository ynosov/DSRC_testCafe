class Environment { 
    constructor() {
        //Evnironment variables
        this.link = 'https://' + this.hostname + '/' + this.vrp + '/' + this.appli + '/';
        this.appli = 'dsim_spa';
        this.host = 'autostandard72.determine.com';
        this.vrp = 't'; // Version relative path
        this.apitoken = '55118a102daf46ab8d9fc17a42515bfb';

        //Users
        this.assignedTo = { login: 'ynosov', password: 'qwerty77A' };   //Sourcing event manager from "Assigned to" field
	}
}

export default new Environment();