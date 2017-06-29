var mongoose = require('mongoose');
var connection = require('../mongo-connection');

//Admin Schema
var adminSchema = mongoose.Schema({
	login: {
		type: String,
		unique: true
	},
	pass: String,
	role: {
		type: String,
		default: 'user'
	},
	token: String
});

var Admin = module.exports = connection.model('Admin', adminSchema);