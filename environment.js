class Environment { 
    constructor() {
        //Evnironment variables
        this.host = 'autostandard72.determine.com';
        this.appli = 'dsim_spa';
        this.vrp = 't';
        this.url = 'https://' + this.host + '/' + this.vrp + '/' + this.appli + '/';
        this.path = '/' + this.vrpt + '/' + this.appli;
        this.apitoken = '55118a102daf46ab8d9fc17a42515bfb';

        //Users
        this.assignedTo = { login: 'ynosov', password: 'qwerty77A' };   //Sourcing event manager from "Assigned to" field
	}
}

export default new Environment();