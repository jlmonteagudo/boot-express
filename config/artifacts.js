'use strict';

require('prototypes');

var mongoose = require('mongoose'),
	morph = require('morph');


var	modelsPath = [],
	routesPath = [];


exports.findArtifacts = function() {

	var wrench = require('wrench'),
		path = require('path'),
		files = wrench.readdirSyncRecursive(path.join(__dirname, '../lib'));


	console.log('\nFinding artifacts...');

	files.forEach(function(artifactPath) {
		if (artifactPath.endsWith('Model.js')) {
			modelsPath.push(artifactPath);
			console.log('found model ' + artifactPath);
		} else if (artifactPath.endsWith('Routes.js')) {
			routesPath.push(artifactPath);
			console.log('found route ' + artifactPath);
		}
	});

};

exports.modelsPath = modelsPath;

exports.routesPath = routesPath;

exports.defaultRoutesModel = function() {

	var modelNames;
	var defaultRoutesModel = {};

	console.log('\nConfiguring default routes per model...');

	modelNames = mongoose.modelNames();
	modelNames.forEach(function(modelName) {
		defaultRoutesModel[morph.toDashed(modelName) + 's'] = modelName;
	});

	console.log(defaultRoutesModel);

	console.log('\nConfigured default routes per model');

	return defaultRoutesModel;

};

