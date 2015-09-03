var express = require('express');
var router = express.Router();
var serviceIssuance = require("../js_modules/service-issuance.js");
var addressBook = require("../js_modules/address-book.js");
var util = require('util');

// Request to Crypto service to store credentail policy data
// and get back link to this data for wallet
router.get('/service/issuance', function(req, res) {

	// Get Policy ID from request parameters
	var policyId = req.query.id;

	// Collect attributes that came from the issuance form from UI
	var attrs = req.query.attrs;

	if(policyId == undefined || attrs == undefined) {
		res.status(500).send('Policy ID or issuance attribute was not properly provided');
		return;
	}

	// Generate success callback url for mobile wallet (Web wallet uses postMessage instead)
	var issuer_success_callback_url =
		req.protocol + '://' + req.get('host') + "/issuance/success";

	// Generate fail callback url for mobile wallet
	var issuer_fail_callback_url =
		req.protocol + '://' + req.get('host') + "/issuance/fail";

	// Call the service. For more inforamtion about this call
	// see js_modules/service-issuance.js
	serviceIssuance.serviceIssuance(
		policyId,
		attrs,
		encodeURIComponent(issuer_success_callback_url),
		encodeURIComponent(issuer_fail_callback_url),
		function (code,result){
			if (code) {
				res.send(code, result);
			}
			res.send(200, result);
	});
});

// Show success result page for mobile wallet
router.get('/issuance/success', function(req, res) {
	res.render('result', {result: 'success'});
});

// Show fail result page for mobile wallet
router.get('/issuance/fail', function(req, res) {
	res.render('result', {result: 'fail'});
});

// Show issuance UI form page. Data attributes collected from this form
// will be passed to the 'service/issuance' route (see above).
router.get('/issuanceform/voucher', function(req, res){
	var form_data = {
		base_url_service: addressBook.getIssuanceServiceHostnameUrl(),
		base_url_credentialwallet: addressBook.getCredentialWalletUrl(),
	};
	res.render('voucher', form_data);
});

module.exports = router;
