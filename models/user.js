var mongoose = require('mongoose');
var connection = require('../mongo-connection');
var ObjectId = mongoose.Schema.Types.ObjectId;

//User Schema
var userSchema = mongoose.Schema({
	code: String,
	phone: String,
	car: {
		brand: String,
		model: String
	},
	region: {
		type: ObjectId,
		ref: 'Region'
	},
	city: String,
	email: String,
	fullName: {
		name: String,
		lastName: String,
		patronymic: String
	},
	gender: String,
	gift: {
		type: ObjectId,
		ref: 'Gift'
	}
});

var User = module.exports = connection.model('User', userSchema);

//d20000;