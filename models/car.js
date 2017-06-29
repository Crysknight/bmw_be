var mongoose = require('mongoose');
var connection = require('../mongo-connection');

//Car Schema
var carSchema = mongoose.Schema({
	brand: {
		type: String,
		unique: true,
		required: true
	},
	models: [String]
});

var Car = module.exports = connection.model('Car', carSchema);