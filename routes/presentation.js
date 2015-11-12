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
	addressBook = require("../js_modules/address-book.js");

router.get('/', function(req, res) {
	res.redirect('/show');
});

router.get('/show', function(req, res) {
	var isShow = false;
	var result;
	if (req.query.sid) {
		result = tools.base64decode(req.query.result);
		console.log("result=" + JSON.stringify(result));
		isShow = true;
	}

	var data = {};
	data.isShow = isShow;
	if (isShow) {
		var verifier_url = JSON.parse(result).verifier_url;
		data.result = req.query.result;
		data.verifier_url = encodeURIComponent(verifier_url);
	}
	data.show = true;
	data.base_url_credentialwallet = addressBook.getCredentialWalletUrl();
	res.render('showpage', data);
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

	var verifier_identity_url =
			req.protocol +
			'://' +
			req.get('host') +
			'/resource/' +
			encodeURIComponent(policyId) +
			'&sid=' +
			uid;

	servicePresentation.requestPresentation(
		policyId,
		verifier_identity_url,
		callback_url,
		function (error, result, code) {
			if(error !== null){
				res.status(500).send(error);
			} else {
				res.status(code).send(result);
			}
		});
});

router.post('/resource/:id', function(req, res) {
	var uid = req.query.sid;
	var result = JSON.parse(tools.base64decode(req.body.result));

	if (result.permit !== true) {
		res.status(401).send("Wrong data");
		return;
	}

	if(result.permit) {
		res.status(200).send("Access is granted");
	} else if(result.deny)	{
		res.status(403).send("Access is forbidden");
	}
});



module.exports = router;
