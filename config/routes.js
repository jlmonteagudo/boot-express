'use strict';

require('prototypes');

function loadRoutes(app) {

	var wrench = require('wrench'),
		path = require('path'),
		files = wrench.readdirSyncRecursive(path.join(__dirname, '../lib'));

	console.log('\nLoading routes...');

	files.forEach(function(route) {
		if (route.endsWith('Routes.js')) {
			require(path.join('../lib/', route))(app);
			console.log('%s loaded', route);
		}
	});

}


module.exports = function (app) {

	app.get('/api/test', function(req, res) {
		res.send('test information');
	});

	loadRoutes(app);

};

