var mongoose = require('mongoose');
var passwordHash = require('password-hash');
var connection = require('../mongo-connection');

//User Schema
var userSchema = mongoose.Schema({
	login: {
		type: String,
		unique: true,
		required: true
	},
	pass: {
		type: String,
		required: true
	},
	role: {
		type: String,
		required: true
	},
	token: String
});

var User = module.exports = connection.model('User', userSchema);