'use strict';

var userController = require('./userController');

module.exports = function (app) {

	app.get('/api/users/:userId', userController.findById);
	app.get('/api/users', userController.list);
	app.put('/api/users/:userId', userController.update);

	app.param('userId', userController.load);

};
