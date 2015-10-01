//
// address-book.js
//
// This a utility to
// store default variable values
//

var addressBook = {};
var url = require('url');

addressBook.getCryptoServiceDetails = function() {
	// service in Bluemix as a service
	if (process.env.VCAP_SERVICES) {
		var services = JSON.parse(process.env.VCAP_SERVICES);
		return {
			url: services.idemixservice[0].credentials.url,
			userid: services.idemixservice[0].credentials.userid,
			password: services.idemixservice[0].credentials.password
		};
	}
	//local service
	else {
		return {
			url: 'http://localhost:3004',
			userid: "havvbyexlr9o4wtlvm8rc76fmxbvwsnvnu",
			password: "holdn1n54sw0mrixuffgwvrl88upqd93cl"
		};
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

module.exports = addressBook;
