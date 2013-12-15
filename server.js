'use strict';

var express = require('express'),
	app = express(),
	async = require('async'),
	artifacts = require('./config/artifacts');


artifacts.findArtifacts();
require('./config/db/mongo');
require('./config/express')(app);
require('./config/routes')(app);


// Start server
var port = process.env.PORT || 3000;
app.listen(port, function () {
	console.log('\nExpress server listening on port %d in %s mode', port, app.get('env'));
});
