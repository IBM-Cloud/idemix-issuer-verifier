/*
    Copyright 2015 IBM Corp. All Rights Reserved
    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/

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
