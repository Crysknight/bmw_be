var User = require('../models/user');

module.exports = function(req, res) {
	// console.log('hello');
	User.remove({ 'fullName.name': { $exists: false } })
		.then(result => {
			// console.log(result);
		})
		.catch(err => {
			// console.log(err);
		});
};