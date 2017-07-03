var Admin = require('../models/admin');
var passwordHash = require('password-hash');

module.exports = function(req, res) {
	let { id, pass } = req.body;
	Admin.findOneAndUpdate({ _id: id }, { $set: { pass: passwordHash.generate(pass) } }, { new: true })
		.then(admin => {
			res.send('ok');
		})
		.catch(err => {
			res.status(500).send('Unidentified error');
		});
};