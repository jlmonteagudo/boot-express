'use strict';

var mongoose = require('mongoose'),
	User = mongoose.model('User');

User.find({}).remove(function() {
	User.create(
		{
			name : 'Diego',
			surname : 'Simeone',
			age: 40,
			email: 'cholo@atm.com'
		},
		{
			name : 'Thibaut',
			surname : 'Courtois',
			age: 21,
			email: 'courtois@atm.com'
		},
		{
			name : 'Daniel',
			surname : 'Aranzubia',
			age: 34,
			email: 'aranzubia@atm.com'
		},
		{
			name : 'Diego',
			surname : 'Godin',
			age: 27,
			email: 'godin@atm.com'
		},
		{
			name : 'Filipe Luis',
			surname : 'Kasmirski',
			age: 28,
			email: 'filipe@atm.com'
		},
		{
			name : 'Juanfran',
			surname : 'Torres',
			age: 28,
			email: 'juanfran@atm.com'
		},
		{
			name : 'Miranda',
			surname : 'Souza',
			age: 29,
			email: 'miranda@atm.com'
		},
		{
			name : 'Tiago',
			surname : 'Cardoso',
			age: 32,
			email: 'taigo@atm.com'
		},
		{
			name : 'Mario',
			surname : 'Suarez',
			age: 26,
			email: 'mario@atm.com'
		},
		{
			name : 'Koke',
			surname : 'Resurrecion',
			age: 21,
			email: 'koke@atm.com'
		},
		{
			name : 'Gabi',
			surname : 'Fernandez',
			age: 30,
			email: 'gabi@atm.com'
		},
		{
			name : 'Arda',
			surname : 'Turan',
			age: 26,
			email: 'arda@atm.com'
		},
		{
			name : 'Oliver',
			surname : 'Torres',
			age: 19,
			email: 'oliver@atm.com'
		},
		{
			name : 'Adrian',
			surname : 'Lopez',
			age: 25,
			email: 'adrian@atm.com'
		},
		{
			name : 'Diego',
			surname : 'Costa',
			age: 25,
			email: 'costa@atm.com'
		},
		{
			name : 'David',
			surname : 'Villa',
			age: 32,
			email: 'villa@atm.com'
		},
		{
			name : 'Leo',
			surname : 'Baptistao',
			age: 21,
			email: 'leo@atm.com'
		},
		function(err) {
				if (err) {
					console.log('Error loading dummy users: ' + err);
				}
				else {
					console.log('\nFinished populating dummy users');
				}
			}
		);
});
