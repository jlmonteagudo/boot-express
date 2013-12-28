'use strict';

require('prototypes');

var mongoose = require('mongoose'),
	morph = require('morph'),
	log = require('./log');


var	modelsPath = [],
	routesPath = [],
	defaultRoutesModel = null;


exports.findArtifacts = function() {

	var wrench = require('wrench'),
		path = require('path'),
		files = wrench.readdirSyncRecursive(path.join(__dirname, '../lib'));


	log.info('Finding artifacts...');

	files.forEach(function(artifactPath) {
		if (artifactPath.endsWith('Model.js')) {
			modelsPath.push(artifactPath);
			log.info('found model ' + artifactPath);
		} else if (artifactPath.endsWith('Routes.js')) {
			routesPath.push(artifactPath);
			log.info('found route ' + artifactPath);
		}
	});

};

exports.modelsPath = modelsPath;

exports.routesPath = routesPath;

exports.defaultRoutesModel = function() {

	var modelNames;
	
	if (defaultRoutesModel !== null) { return defaultRoutesModel; }

	log.info('Configuring default routes per model...');

	defaultRoutesModel = {};
	modelNames = mongoose.modelNames();
	modelNames.forEach(function(modelName) {
		defaultRoutesModel[morph.toDashed(modelName) + 's'] = modelName;
	});

	log.info(defaultRoutesModel);
	log.info('Configured default routes per model');

	return defaultRoutesModel;

};

