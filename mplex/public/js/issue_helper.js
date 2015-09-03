var issueHelper = new Object();

issueHelper.startIssuance = function() {
	var policyId = issue_config.issuer_data.specifications[0].policyUid;
	var current_date = new Date();
	var voucher_expires = new Date();
	var str_period = $( '#period' ).val().split(' ');

	if (str_period[1] == 'Minutes'){
		var minute = parseInt(str_period[0]);
		voucher_expires.setMinutes(voucher_expires.getMinutes() + minute);
	} else if (str_period[1] == 'Year'){
		var year = parseInt(str_period[0]);
		voucher_expires.setFullYear(voucher_expires.getFullYear() + year);
	} else {
		var month = parseInt(str_period[0]);
		voucher_expires.setMonth(voucher_expires.getMonth() + month);
	}

	var payload={};
	payload[issue_config.issuer_data.specifications[0].params[0].type] = current_date.toJSON();
	payload[issue_config.issuer_data.specifications[0].params[1].type] = voucher_expires.toJSON();

	var serviceURL = $('#ServiceURL').val();

	//call server side to start issuance
	$.ajax({
		url: '/service/issuance?id=' + encodeURIComponent(policyId),
		type: 'GET',
		data: {attrs:payload},
		cache: false,
		async: false,
		success: function(result, status, xhr) {
			result = JSON.parse(result);
			var issuance_url = result.issuance_url;
			var cwURL = $( '#credentialsWalletURL' ).val();
			var width = 450;
			var height = 550;
			var left = (screen.width / 2) - (width / 2);
			var top = (screen.height / 2) - (height / 2);
			//open popup with wallet (or start mobile wallet app)
			var loginPopup = window.open(
				cwURL +
				'/issuanceconsentform?issuance_url=' +
				issuance_url,
				"", // MUST be empty (see note above)
				'location=yes,width=' + width + ',height=' + height + ',left=' + left + ',top=' + top);
			//checking whether web wallet window was closed
			var timer = window.setInterval(function() {
				try {
					if (loginPopup == null || loginPopup.closed) {
						clearInterval(timer);
						if(issueHelper.isSuccess != true) {
							issueHelper.showError("Sorry, something went wrong. Please try again!");
						}
					}
				}
				catch (e) {
				}
			}, 1000);
			//waiting for result from Web wallet
			window.onmessage = function(msg_event) {
				if(msg_event.data != 'undefined') {
					var ida = msg_event.data;
					if(ida) {
						var response = msg_event.data.response;
						if(response) {
							issueHelper.isSuccess = true;
							issueHelper.showSuccess("Voucher is successfully issued!");
						} else {
							issueHelper.showError("Sorry, something went wrong. Please try again!");
						}
					}
				}
			}
			$( "#issueBtn" ).addClass('disabled');
			$( '#credentialsWalletURL' ).prop("readonly",true);
		},
		error: function(result, status, xhr) {
			$( "#error" ).text(result.responseText);
			$( "#error" ).removeClass("hidden");
		}
	});
};

issueHelper.showResultMessage = function(type, message) {
	if(type == "info") {
		$('#placeHolder').html(
			"<div class='row'>" +
				"<div class='col-md-4 col-md-offset-4'>" +
					"<div class='alert alert-success' role='alert'>" +
						"<p class='text-center'><strong>Congratulations!</strong> " +
						message +
						"</p>" +
					"</div>" +
				"</div>" +
			"</div>"
		);
	} else if (type == "error") {
		$('#placeHolder').html(
			"<div class='row'>" +
				"<div class='col-md-4 col-md-offset-4'>" +
					"<div class='alert alert-danger' role='alert'>" +
						"<p class='text-center'><strong>Error!</strong> " +
						message +
						"</p>" +
					"</div>" +
				"</div>" +
			"</div>"
		);
	}
}

issueHelper.showError = function(message) {
	issueHelper.showResultMessage("error", message);
};

issueHelper.showSuccess = function(message) {
	issueHelper.showResultMessage("info", message);
};
