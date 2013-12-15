'use strict';

require('prototypes');

var mongoose = require('mongoose'),
	uristring =	process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/boot-express',
	mongoOptions = { db: { safe: true } },
	artifacts = require('../artifacts'),
	path = require('path');


var loadModels = function() {

	console.log('\nLoading models...');

	artifacts.modelsPath.forEach(function(modelPath) {
		require(path.join('../../lib/', modelPath));
		console.log('%s loaded', modelPath);
	});

	console.log('\nModels loaded\n');

};

var createDummyUsers = function() {
	console.log('\nLoading dummy users...');
	require('./dummyUsers');
};


var setupMongoose = function() {

	var checkForHexRegExp = new RegExp('^[0-9a-fA-F]{24}$');
	mongoose.plugin( function (schema) {
		schema.statics.isObjectId = function(id) {
			if (id) { return checkForHexRegExp.test(id); }
			return false;
		};
	});
};


setupMongoose();
loadModels();

mongoose.connect(uristring, mongoOptions, function (err) {

	if (err) {
		console.log ('\nERROR connecting to: ' + uristring + '. ' + err);
	} else {
		console.log ('\nSuccessfully connected to: ' + uristring);
		createDummyUsers();
	}

});


