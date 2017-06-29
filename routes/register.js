var Admin = require('../models/admin');
var passwordHash = require('password-hash');

module.exports = function(req, res) {
	delete req.body.token;
	var admin = new Admin(req.body);
	admin.pass = passwordHash.generate(admin.pass);
	admin.save()
		.then(admin => {
			admin = admin.toObject();
			admin.id = admin._id;
			delete admin._id;
			res.json(admin);
		})
		.catch(err => {
			console.log(err);
			if (err.code === 11000) {
				res.status(500).send('Unique login required');
			} else {
				res.status(500).send('Unidentified error from register');
			}
		});
};