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

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var issuance = require('./routes/issuance');
var presentation = require('./routes/presentation');

var app = express();
if (process.env.VCAP_APP_HOST) {
	require('loganalysis');
	app.enable('trust proxy'); // required when app is running on proxy (such as Bluemix) so that, e.g., req.protocol uses the info from the X-Forwarded-Proto header
}

// view engine setup
app.engine('html', require('hogan-express'));
app.enable('view cache');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.set('partials', {
	header: 'header',
	footer: 'footer',
	voucher: 'voucher',
	scripts: 'scripts',
	error: 'error'
});

app.set('env', 'development');

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/issuance'));
app.use('/', require('./routes/presentation'));

// There are many useful environment variables available in process.env,
// please refer to the following document for detailed description:
// http://ng.w3.bluemix.net/docs/FAQ.jsp#env_var

// VCAP_APPLICATION contains useful information about a deployed application.
var appInfo = JSON.parse(process.env.VCAP_APPLICATION || "{}");
// TODO: Get application information and use it in your app.

// VCAP_SERVICES contains all the credentials of services bound to
// this application. For details of its content, please refer to
// the document or sample of each service.

var services = JSON.parse(process.env.VCAP_SERVICES || "{}");
// TODO: Get service credentials and communicate with bluemix services.

// The IP address of the Cloud Foundry DEA (Droplet Execution Agent) that hosts this application:
//var host = (process.env.VCAP_APP_HOST || '9.156.37.97');
var host = (process.env.VCAP_APP_HOST || 'localhost');

// The port on the DEA for communication with the application:
var port = (process.env.PORT || 3005);

// Start server
app.listen(port, host, function(){
	console.log('Server started at ' + host + ':' + port);
});
