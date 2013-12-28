'use strict';

require('prototypes');

var	log = require('./log');


function loadRoutes(app) {

	var arfifacts = require('./artifacts'),
		path = require('path');

	log.info('Loading routes...');

	arfifacts.routesPath.forEach(function(routePath) {
		require(path.join('../lib/', routePath))(app);
		log.info('%s loaded', routePath);
	});

	log.info('Routes loaded');

}

function existModel(req, res, next) {

	var artifacts = require('./artifacts'),
		defaultRoutesModel = artifacts.defaultRoutesModel();

	if (!defaultRoutesModel.hasOwnProperty(req.params.model)) {
		res.json(404, {'code': 'collection-not-found', 'message' : 'Collection Not Found'});
	}
	else {
		next();
	}

}


function loadDefaultRoutesModel(app) {

	var baseController = require('../lib/base/baseController');

	app.get('/api/:model/:modelId', baseController.findById);
	app.get('/api/:model', existModel, baseController.list);
	app.put('/api/:model/:modelId', baseController.update);
	app.post('/api/:model', baseController.create);
	app.del('/api/:model/:modelId', baseController.delete);

	app.param('modelId', baseController.load);

}

module.exports = function (app) {
	loadRoutes(app);
	loadDefaultRoutesModel(app);
};

