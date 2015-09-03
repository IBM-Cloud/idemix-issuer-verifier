//
// tools.js
//
// This a utility helper class that helps
// service template perform casual operations
//

var tools = {};
var http = require('http');

//
// Method for generate 16 symbols length random identifier
//
tools.uid = function() {
    return Math.floor((1 + Math.random()) * 0x1000010001000)
               .toString(16);
};

tools.base64encode = function(data){
	return new Buffer(data).toString('base64');
};

tools.base64decode = function(data) {
    return new Buffer(data, 'base64').toString('utf8');
};

//
// Method for parsing HTTP authorization header entry
// Input: express.js Request object
//
tools.parseBasicAuthCredentials = function(req) {
    var fullHeader = req.headers['authorization']
    if (fullHeader) {
        var credentials = {};
        var authPattern = RegExp(/Basic (.*)/);
        var matches = fullHeader.match(authPattern);
        var headerVal = tools.base64decode(matches[1]);
        var parts = headerVal.split(':');
        credentials.login = parts[0];
        credentials.password = parts[1];
        return credentials;
    }
    return null;
}

//
// Method for creating HTTP authorization header entry
//
tools.makeBasicAuthHeader = function(user, password) {
    var tok = user + ':' + password;
    var hash = this.base64encode(tok);
    return "Basic " + hash;
};

//
// Method for universal request/resopnce HTTP endpoint handling
//
// Input: options as an object that can be used in node.js http.request(...) method
// Input: payload, in case it's not null it will be written to request pipeline
//
// Callback: callback(status_code, received_data), in case of error received_data
// contains error message
//
tools.callEndpoint = function(options, payload, callback) {
var req = http.request(
	options,
	function (res) {
		res.body = '';
		res.setEncoding('utf8');
		res.on('data', function (read_data) {
			res.body += read_data;
		});
		res.on('end', function() {
			callback(res.statusCode, res.body);
		});
		res.on('error', function(e) {
			callback(res.statusCode, e);
		});
	});

	req.on('error', function(e){
		console.error(e.message);
		callback(500, e.message);
	});

	if(payload != null && payload != undefined && payload != '') {
		req.write(payload);
	}

	req.end();
};

module.exports = tools;
