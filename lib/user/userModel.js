'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
    
var UserSchema = new Schema({
	name: { type: String, required: true },
	surname: String,
	age: { type: Number, min: 1, max: 100 },
	email: String
});

// Validations
UserSchema.path('email').validate(function (email) {
	var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
	return emailRegex.test(email);
}, 'Invalid email');

mongoose.model('User', UserSchema);
