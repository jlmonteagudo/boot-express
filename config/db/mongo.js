'use strict';

require('prototypes');

var mongoose = require('mongoose'),
	uristring =	process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/boot-express',
	mongoOptions = { db: { safe: true } };


var loadModels = function() {

	var wrench = require('wrench'),
		path = require('path'),
		files = wrench.readdirSyncRecursive(path.join(__dirname, '../../lib'));

	console.log('\nLoading models...');

	files.forEach(function(model) {
		if (model.endsWith('Model.js')) {
			require(path.join('../../lib/', model));
			console.log('%s loaded', model);
		}
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


