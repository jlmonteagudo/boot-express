'use strict';

var mongoose = require('mongoose'),
	User = mongoose.model('User'),
	_ = require('lodash');

var LIMIT_ROWS_DEFAULT = 10,
	LIMIT_ROWS = 100;

exports.load = function(req, res, next, id) {
	
	if (User.isObjectId(id)) {

		User.findById(id, function (err, user) {

			if (err) { return next(err); }
			else {
				req.user = user;
				next();
			}
		});

	}
	else {
		res.json(404, {'code': 'not-found', 'message' : 'Not Found'});
	}

};


exports.findById = function(req, res) {
	res.json(req.user);
};

exports.list = function(req, res) {

	var conditions, fields, options;

	try {

		conditions = req.query.conditions ? JSON.parse(req.query.conditions) : null;
		fields = req.query.fields ? JSON.parse(req.query.fields) : null;
		options = req.query.options ? JSON.parse(req.query.options) : {};

		if (!options.limit) { options.limit = LIMIT_ROWS_DEFAULT; }
		if (options.limit > LIMIT_ROWS) { options.limit = LIMIT_ROWS; }

		User.find(conditions, fields, options, function (err, users) {
			if (err) { res.json(400, {'code': 'list-error', 'message' : err.message}); }
			else { res.json(users); }
		});

	}
	catch (err) {
		res.send(400, err);
	}

};


exports.update = function(req, res) {

	var user = req.user;

	user = _.extend(user, req.body);
	user.save(function (err, user) {
		if (err) { res.json(400, {'code': 'update-error', 'message' : err.message}); }
		else { res.json(user); }
	});

};


exports.create = function(req, res) {

	var user = new User(req.body);

	user.save(function (err, user) {
		if (err) { res.json(400, {'code': 'create-error', 'message' : err.message}); }
		else { res.json(user); }
	});

};


exports.delete = function(req, res) {

	var user = req.user;

	user.remove(function (err, user) {
		if (err) { res.json(400, {'code': 'delete-error', 'message' : err.message}); }
		else { res.json(user); }
	});
	
};






/*


exports.find = function (req, res) {

	//parse query (if any) for filtering search results
    var conditions = req.query.conditions ? JSON.parse(req.query.conditions) : null;
    var fields = req.query.fields ? JSON.parse(req.query.fields) : null;
    var options = req.query.options ? JSON.parse(req.query.options) : null;

    userModel.find(conditions, fields, options, function (err, user) {
		if (err) res.send(500, err);
        else res.json(user);
    });
};


exports.findById = function (req, res) {

	//parse query (if any) for filtering search results
    var conditions = req.query.conditions ? JSON.parse(req.query.conditions) : null;
    var fields = req.query.fields ? JSON.parse(req.query.fields) : null;
    var options = req.query.options ? JSON.parse(req.query.options) : null;

    userModel.find(conditions, fields, options, function (err, user) {
		if (err) res.send(500, err);
        else res.json(user);
    });
};


exports.upsert = function (req, res) {
    var conditions = req.body.conditions;
    var data = req.body.data;

    model.update(conditions, data, {upsert: true}, function (err, numberAffected, raw) {
        if (err) res.send(500, err);
        else {
            res.send(raw);
            socket.io.sockets.emit('user:update');
        }
    });
};

exports.save = function (req, res) {
    var data = req.body;
    var model = getModel(req.params.collection);

    if (!model) res.send(500, 'invalid collection!');
    else {
        var m = new model(data);
        m.save(function (err) {
            if (err) res.send(500, 'document save failed!');
            else {
                res.send(200);
                socket.io.sockets.emit(req.params.collection + ':update');
            }
        });
    }
};

exports.remove = function (req, res) {
    var data = req.body;
    var model = getModel(req.params.collection);
    if (!model) res.send(500, 'invalid collection!');

    else {
        if (!data) res.send(500, 'must have conditions for remove operation');
        else {
            model.remove(data, function (err) {
                if (err) res.send(500, 'unable to remove documents');
                else {
                    res.send(200);
                    socket.io.sockets.emit(req.params.collection + ':update');
                }
            });
        }
    }
};

*/