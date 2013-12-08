'use strict';

module.exports = function (grunt) {

	// Load grunt tasks automatically
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({

		jshint: {

			options: {
				jshintrc: '.jshintrc',
				reporter: require('jshint-stylish')
			},

			all: ['Gruntfile.js', 'config/**/*.js', 'lib/**/*.js', 'test/**/*.js']
		},


		express: {

			options: {
				// Override defaults here
			},

			dev: {
				options: {
					script: 'server.js',
					node_env: 'development',
					debug: true
				}
			},

			prod: {
				options: {
					script: 'server.js',
					node_env: 'production'
				}
			},

			test: {
				options: {
					script: 'server.js',
					node_env: 'test'
				}
			}
		},


		watch: {
			express: {
				files:  [ 'server.js', 'lib/**/*.js', 'config/**/*.js' ],
				tasks:  [ 'express:dev' ],
				options: {
					spawn: false // Without this option specified express won't be reloaded
				}
			}
		},



		jasmine_node: {
			options: {
				forceExit: true,
				match: '.',
				matchall: false,
				extensions: 'js',
				specNameMatcher: 'spec',
				jUnit: {
					report: false,
					savePath : './build/reports/jasmine/',
					useDotNotation: true,
					consolidate: true
				}
			},
			all: ['spec/']
		}



	});


	grunt.registerTask('default', [ 'jshint', 'jasmine_node' ]);

	grunt.registerTask('server', [ 'jshint', 'express:dev', 'watch' ]);


};
