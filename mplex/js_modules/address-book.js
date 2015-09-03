//
// address-book.js
//
// This a utility to
// store default variable values
//

var addressBook = new Object();
var url = require('url');

addressBook.getIssuanceServiceHostnameDetails = function() {
	// service in Bluemix as a service
	if (process.env.VCAP_SERVICES) {
		var services = JSON.parse(process.env.VCAP_SERVICES);
		return {
			host: url.parse(services.idemixservice[0].credentials.url,true).host
		};
	}
	//local service
	else {
		return {
			host: 'localhost',
			port:'3004'
		};
	}
};

addressBook.getIssuanceServiceHostnameUrl = function() {

	if (process.env.VCAP_SERVICES) {
		var services = JSON.parse(process.env.VCAP_SERVICES);
		return "https://"+url.parse(services.idemixservice[0].credentials.url,true).host;
	} else {
		return 'http://localhost:3004';
	}
};

addressBook.getCredentialWalletUrl = function() {
	//wallet in Bluemix
	if(process.env.VCAP_APP_HOST) {
		return 'https://idmx-wallet.mybluemix.net';
		//local wallet
	} else {
		return 'http://localhost:3001';
	}
};


addressBook.getUserCredentialsDetails = function() {
	//get user credentials from Bluemix service
	if (process.env.VCAP_SERVICES) {
		var services = JSON.parse(process.env.VCAP_SERVICES);
		return {
			login: services.idemixservice[0].credentials.userid,
			password: services.idemixservice[0].credentials.password
		}
	} else {
		//some default user credentials
		return {
			login: "fopm95huw14mmgs3o8ymyyh37f78qo0db9",
			password: "gfiz13iuugbocy15mnx15sxy7ml8cgnetj"
		}
	}
};

module.exports = addressBook;
