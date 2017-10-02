var mongoose = require('mongoose');
var connection = require('../mongo-connection');

//Gift Schema
var giftSchema = mongoose.Schema({
	name: {
		type: String,
		unique: true,
		required: true
	},
	description: {
		type: String
	},
	quantity: {
		type: Number,
		min: 0
	},
	image: String
});

var Gift = module.exports = connection.model('Gift', giftSchema);