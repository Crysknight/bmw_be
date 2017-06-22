var mongoose = require('mongoose');
var connection = require('../mongo-connection');
var ObjectId = mongoose.Schema.Types.ObjectId;

//Region Schema
var regionSchema = mongoose.Schema({
	name: {
		type: String,
		unique: true,
		required: true
	},
	admin: {
		type: ObjectId,
		ref: 'User',
		required: true
	},
	code: {
		type: String,
		required: true
	},
	gifts: [
		{
			gift: {
				type: ObjectId,
				ref: 'Gift'
			},
			quantity: {
				type: Number,
				default: 0
			}
		}
	]
});

var Region = module.exports = connection.model('Region', regionSchema);