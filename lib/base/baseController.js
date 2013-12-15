'use strict';

var mongoose = require('mongoose'),
	artifacts = require('../../config/artifacts'),
	defaultRoutesModel = artifacts.defaultRoutesModel(),
	_ = require('lodash');


var LIMIT_ROWS_DEFAULT = 10,
	LIMIT_ROWS = 100;


var getModel = function (collection) {
	return mongoose.model(defaultRoutesModel[collection]);
};

exports.load = function(req, res, next, id) {

	try {

		var Model = getModel(req.params.model);
		if (!Model) { res.send(500, 'invalid collection!'); }

		if (!Model.isObjectId(id)) { throw new Error(); }

		Model.findById(id, function (err, model) {
			if (err) { throw new Error(); }
			req.model = model;
			next();
		});
	}
	catch (err) {
		res.json(404, {'code': 'not-found', 'message' : 'Not Found'});
	}


};


exports.findById = function(req, res) {
	res.json(req.model);
};

exports.list = function(req, res) {

	var conditions, fields, options;

	try {

		console.info('******** LIST');

		var Model = getModel(req.params.model);

		console.info('******** SIGO EN LIST');


		conditions = req.query.conditions ? JSON.parse(req.query.conditions) : null;
		fields = req.query.fields ? JSON.parse(req.query.fields) : null;
		options = req.query.options ? JSON.parse(req.query.options) : {};

		if (!options.limit) { options.limit = LIMIT_ROWS_DEFAULT; }
		if (options.limit > LIMIT_ROWS) { options.limit = LIMIT_ROWS; }

		console.info('******** SIGO EN LIST 2');


		Model.find(conditions, fields, options, function (err, models) {

			console.info('******** SIGO EN LIST 3');


			if (err) { throw new Error(); }
			res.json(models);
		});

		console.info('******** SIGO EN LIST 4');


	}
	catch (err) {

		console.info('******** SIGO EN LIST 5');

		res.json(400, {'code': 'list-error', 'message' : err.message});
	}

	console.info('******** SIGO EN LIST 6');


};


exports.update = function(req, res) {

	var Model = getModel(req.params.model);
	if (!Model) { res.send(500, 'invalid collection!'); }

	var model = req.model;

	model = _.extend(model, req.body);
	model.save(function (err, model) {
		if (err) { res.json(400, {'code': 'update-error', 'message' : err.message}); }
		else { res.json(model); }
	});

};


exports.create = function(req, res) {

	var Model = getModel(req.params.model);
	if (!Model) { res.send(500, 'invalid collection!'); }

	var model = new Model(req.body);

	model.save(function (err, model) {
		if (err) { res.json(400, {'code': 'create-error', 'message' : err.message}); }
		else { res.json(model); }
	});

};


exports.delete = function(req, res) {

	var Model = getModel(req.params.model);
	if (!Model) { res.send(500, 'invalid collection!'); }

	var model = req.model;

	model.remove(function (err, model) {
		if (err) { res.json(400, {'code': 'delete-error', 'message' : err.message}); }
		else { res.json(model); }
	});
	
};

