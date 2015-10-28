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
// service-presentation.js
//
// The purpose of this object is to separate interaction
// with Verificaation Service and the application routes.
// It's done mostly for the demonstration reasons.
//

var servicePresentation = {},
	addressBook = require("./address-book"),
	tools = require('idmx-tools').Tools,
	caller = new (require('idmx-tools').Caller)(),
	util = require('util');

servicePresentation.requestPresentation = function(id, verifierUrl, callbackUrl, callback) {
	// First we need to get the Issuance Service details, like hostname and port
	var serviceDetails = addressBook.getCryptoServiceDetails();

	// Using this details we need to create 'options' JSON object
	// 'options' object should have structure similar to the
	// same name object from the http(s).request(...) node.js method
	// For more information see: js_modules/tools.js->tools.callEndpoint
	// method description
	var options = {};
	options.method= 'GET';

	options.path =
		'/presentation?id=' + id +
		"&verifier_url=" + encodeURIComponent(verifierUrl) +
		"&callback_url=" + encodeURIComponent(callbackUrl);

	// Creating authorization header entry based on credentials
	// gathered from the line above
	options.headers= {
			"authorization": tools.makeBasicAuthHeader(
								serviceDetails.userid,
								serviceDetails.password)
		};

	console.log("requestPresentation options: " + util.inspect(options));

	// Finally after all the preparations call the Issuance Service endpoint
	caller.callEndpoint(serviceDetails.url, options, null, callback);
};

module.exports = servicePresentation;
