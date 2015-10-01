//
// service-issuance.js
//
// The purpose of this object is to separate interaction
// with Issuance Service from the application routes.
// It's done mostly for the demonstration reasons.
//

var serviceIssuance = {},
	addressBook = require("./address-book"),
	tools = require('idmx-tools').Tools,
	caller = new (require('idmx-tools').Caller)();

//
// Method that actually calls the Issuance Service
//
// Input: policy identifier
// Input: policy attributes that came from UI form
// Input: success callback URL that will be called at the issuance process end by mobile wallet
// Input: fail callback URL that will be called at the issuance process end by mobile wallet
//
// Callback: callback never called in this method it's only passed
// to referred methods.
//
serviceIssuance.serviceIssuance = function(id, attrs, issuer_success_callback_url, issuer_fail_callback_url, callback) {

	// First we need to get the Issuance Service details, like hostname and port
	var serviceDetails = addressBook.getCryptoServiceDetails();

	// Using this details we need to create 'options' JSON object
	// 'options' object should have structure similar to the
	// same name object from the http(s).request(...) node.js method
	// For more information see: js_modules/tools.js->tools.callEndpoint
	// method description
	var options = {};
	options.method = 'GET';

	// Now we construct path with all specified input parameters
	options.path =
		'/issuance?id=' + id +
		"&attrs=" + JSON.stringify(attrs) +
		"&issuer_success_callback_url=" + issuer_success_callback_url +
		"&issuer_fail_callback_url=" + issuer_fail_callback_url;

	// Creating authorization header entry based on credentials
	// gathered from the line above
	options.headers= {
			"authorization": tools.makeBasicAuthHeader(
								serviceDetails.userid,
								serviceDetails.password)
		};

	// Finally after all the preparations call the Issuance Service endpoint
	caller.callEndpoint(serviceDetails.url, options, null, callback);
};

module.exports = serviceIssuance;
