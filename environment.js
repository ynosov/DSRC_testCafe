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

        //Files
        this.rfqImrort200 = 'C:/Users/ynosov.PROVECTUS/Desktop/SPA/Ynosov SPA AT/RFQ_import_generated_200_(1578224651474).xlsx';
	}
}

export default new Environment();