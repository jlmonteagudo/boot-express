'use strict';

var request = require('supertest');

request = request('http://localhost:3000');

describe('User API', function () {

	describe('GET /users - list', function() {

		it('returns a list of users', function (done) {

			request
				.get('/api/users')
				.expect(200)
				.end(function(err, res) {
					if (err) { return done(err); }
					expect(res.body.length).toEqual(10);
					done();
				});

		});


		it('filters the list of users', function (done) {

			request
				.get('/api/users?conditions={"age":{"$gt":30}}&fields={"_id":0,"__v":0}&options={"limit":2}')
				.expect(200)
				.end(function(err, res) {
					if (err) { return done(err); }
					expect(res.body.length).toEqual(2);
					done();
				});

		});


		it('returns status 400 when a malformed query', function (done) {

			request
				.get('/api/users?conditions=xxxxx')
				.expect(400)
				.end(function(err) {
					if (err) { return done(err); }
					done();
				});

		});


	});



	describe('GET /users - findById', function() {

		it('returns the user if the user id exists', function (done) {

			var id;

			request
				.get('/api/users?conditions={"surname":"Simeone"}')
				.end(function(err, res) {

					id = res.body[0]._id;

					request
						.get('/api/users/' + id)
						.expect(200)
						.end(function(err, res) {
							if (err) { return done(err); }
							expect(res.body.surname).toEqual('Simeone');
							done();
						});

				});
		});



		it('returns not-found error if the user id is wrong', function (done) {

			var id = 'not-found';

			request
				.get('/api/users/' + id)
				.expect(404)
				.end(function(err, res) {
					if (err) { return done(err); }
					expect(res.body.error).toEqual('not-found');
					done();
				});

		});


		it('returns not-found error if the user id does not exist', function (done) {

			var id = 'xxa49eb764e2a1315d000001';

			request
				.get('/api/users/' + id)
				.expect(404)
				.end(function(err, res) {
					if (err) { return done(err); }
					expect(res.body.error).toEqual('not-found');
					done();
				});

		});



	});




	describe('PUT /users', function() {

		it('retrieves and updates a user', function (done) {

			var simeone;

			request
				.get('/api/users?conditions={"surname":"Simeone"}')
				.end(function(err, res) {

					simeone = res.body[0];
					simeone.age = 41;

					request
						.put('/api/users/' + simeone._id)
						.send(simeone)
						.end(function(err, res) {
							if (err) { return done(err); }
							expect(res.body.age).toEqual(41);
							done();
						});

				});

		});


		it('fails updading wrong age', function (done) {

			var simeone;

			request
				.get('/api/users?conditions={"surname":"Simeone"}')
				.end(function(err, res) {

					simeone = res.body[0];
					simeone.age = 'abc';

					request
						.put('/api/users/' + simeone._id)
						.send(simeone)
						.expect(400)
						.end(function(err, res) {
							if (err) { return done(err); }
							expect(res.body.name).toEqual('CastError');
							done();
						});

				});

		});


		it('fails updading an user id that does not exist', function (done) {

			var simeone;

			request
				.get('/api/users?conditions={"surname":"Simeone"}')
				.end(function(err, res) {

					simeone = res.body[0];
					simeone.age = 'abc';

					request
						.put('/api/users/xxa49eb764e2a1315d000001')
						.send(simeone)
						.expect(404)
						.end(function(err, res) {
							if (err) { return done(err); }
							expect(res.body.error).toEqual('not-found');
							done();
						});

				});

		});



	});



});