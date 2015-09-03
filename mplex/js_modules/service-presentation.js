//
// service-presentation.js
//
// The purpose of this object is to separate interaction
// with Verificaation Service and the application routes.
// It's done mostly for the demonstration reasons.
//

var servicePresentation = new Object();
var addressBook = require("./address-book");
var tools = require('./tools');
var util = require('util');

servicePresentation.requestPresentation = function(id, verifierUrl, callbackUrl, callback) {
	// First we need to get the Issuance Service details, like hostname and port
	var serviceDetails = addressBook.getIssuanceServiceHostnameDetails();

	// Using this details we need to create 'options' JSON object
	// 'options' object should have structure similar to the
	// same name object from the http(s).request(...) node.js method
	// For more information see: js_modules/tools.js->tools.callEndpoint
	// method description
	var options = {};
	options.host = serviceDetails.host;
	options.port = serviceDetails.port;
	options.method= 'GET';

	options.path =
		'/presentation?id=' + id
		+ "&verifier_url=" + encodeURIComponent(verifierUrl)
		+ "&callback_url=" + encodeURIComponent(callbackUrl);

	// Gathering user credentials for the Issuance Service
	var userDetails = addressBook.getUserCredentialsDetails();

	// Creating authorization header entry based on credentials
	// gathered from the line above
	options.headers= {
        	"authorization": tools.makeBasicAuthHeader(
								userDetails.login,
								userDetails.password)
        };

	console.log("requestPresentation options: " + util.inspect(options));

	// Finally after all the preparations call the Issuance Service endpoint
	tools.callEndpoint(options, null, callback);
};

module.exports = servicePresentation;
