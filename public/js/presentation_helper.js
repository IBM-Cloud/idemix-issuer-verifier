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

var presentationHelper = {};

presentationHelper.showModalPopup = function(inner_html_code){
	$('#errorCode').html(inner_html_code);
	$('#modalMessage').modal('show');
};

presentationHelper.requestResourceCode = function(callback_url, data) {
	$.ajax({
		url: decodeURIComponent(callback_url),
		type: 'POST',
		cache: false,
		async: true,
		data: data,
		success: function(result, status, xhr) {
			$( '#msg' ).removeClass('hidden');
			$( '#msg' ).text(result);
		},
		error: function(result, textStatus, errorThrown ) {
			if(result.status == 401){
				$( '#msg' ).removeClass('hidden');
				$( '#msg' ).text(result);
			} else {
				presentationHelper.alert("No presenation information!");
			}
		}
	});
};

presentationHelper.accessResource = function(walletUrl, policyId) {

	if(walletUrl === undefined) {
		//somethig bad here
		return;
	}
	// Note: on iOS, all Javascript execution is stopped for windows that are not in the foreground, thus a location.href
	// call is _only_ executed if the AJAX calls to /resource and /presentationinfo are done _syncronously_ (--> async: false).
	var isiOS = /(iPad|iPhone|iPod)/g.test( navigator.userAgent );
	$.ajax({
		url: '/resource/' + policyId,
		type: 'GET',
		cache: false,
		async: true,
		success: function(result, status, xhr) {
			if(xhr.status == '200') {
				result = JSON.parse(result);
				var verifier_url = result.verifier_url;
				$("#loginbtn").addClass('disabled');
				var width = 520;
				var height = 520;
				var left = (screen.width / 2) - (width / 2);
				var top = (screen.height / 2) - (height / 2);

				var loginPopup = window.open(
					walletUrl +
					'/presentationconsentform?verifier_url=' +
						verifier_url,
						"", // MUST be empty (see note above)
					'location=yes,scrollbars=yes,width=' +
						width +
						',height=' +
						height +
						',left=' +
						left +
						',top=' +
						top
				);

					// Enable the 'Stream' button once the loginPopup is closed.
					// Note: this timeout is necessary because the popup may be closed
					// by pressing the popup windows 'X' button.
					var timer = window.setInterval(function() {
						try {
							if (loginPopup === null || loginPopup.closed) {
								window.clearInterval(timer);
							}
						}
						catch (e) {
						}
					}, 5000);

					window.onmessage = function(msg_event) {
						if(msg_event.data !== undefined) {
							var ida = msg_event.data.ida;
							if (ida) {
								presentationHelper.ensureLoginPopupIsClosed(loginPopup);
								presentationHelper.requestResourceCode(msg_event.data.result.callback_url,
									msg_event.data.result.result);
								} else if (msg_event.data.idaCancel) {
									$("#loginbtn").removeClass('disabled');
									presentationHelper.ensureLoginPopupIsClosed(loginPopup);
								}
							}
						};
					} else {

						presentationHelper.alert("Fail to request Authentication Header");
					}
				},
				error: function(result, status, xhr) {
					// No code here yet
				}
			});

		};

		presentationHelper.ensureLoginPopupIsClosed = function(loginPopup) {
			if (loginPopup !== null && !loginPopup.closed) {
				// Typically, the entity who opened the login popup should also close it. However, the
				// loginPopup.close() call does not work on all browsers (e.g., iOS Chrome). Thus, the
				// login popup closes itself. However, in case this was not successfull for whatever
				// reason, we close it here.
				loginPopup.close();
			}
			$("#loginbtn").removeClass('disabled');
		};

		presentationHelper.alert = function(message) {
			var options = {
				content: 'ERROR! ' + message,
				placement: 'bottom'

			};
			$('#loginbtn').popover(options);
			$('#loginbtn').popover('show');
		};

		presentationHelper.info = function(message) {
			var options = {
				content: message,
				placement: 'bottom'

			};
			$('#loginbtn').popover(options);
			$('#loginbtn').popover('show');
		};
