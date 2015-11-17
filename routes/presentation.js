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

var express = require('express'),
	router = express.Router(),
	servicePresentation = require("../js_modules/service-presentation.js"),
	tools = require('idmx-tools').Tools,
	addressBook = require("../js_modules/address-book.js"),
	secret = "SecretDefinesState";

router.get('/', function(req, res) {
    res.render('showpage', {base_url_credentialwallet: addressBook.getCredentialWalletUrl()});
});

router.post('/show', function(req, res) {
	console.log("SID: " + req.query.sid);
    console.log("Body: " + req.body);
    if (req.query.sid !== undefined && req.body !== undefined) {
		var walletAnswer = req.body;
		var tokenStatus = JSON.parse(tools.base64decode(walletAnswer.result));

		// The same secret as sent in parameters
		// of presentation request query
		if(tokenStatus.permit && walletAnswer.verifier_url == secret) {
			res.status(200).send("Access is granted");
			return;
		}
	}
	res.status(403).send("Access is forbidden");

});

//save data in idemix service and get link to it
router.get('/resource/:id', function(req, res) {
	console.log(policyId);
	var policyId = decodeURIComponent(req.params.id);
	var uid = tools.uid();

	var callback_url =
			req.protocol +
			'://' +
			req.get('host') +
			'/show?sid=' +
			uid;

	servicePresentation.requestPresentation(
		policyId,
		secret,
		callback_url,
		function (error, result, code) {
			if(error !== null){
				res.status(500).send(error);
			} else {
				res.status(code).send(result);
			}
		});
});

module.exports = router;
