var Admin = require('../models/admin');
var TokenGenerator = require('token-generator')({
	salt: 'its just trade-app, who fuck you up',
	timestampMap: 'yeahitstru'
});
var crypto = require('crypto');
var passwordHash = require('password-hash');

module.exports = function(req, res) {
	var query = { login: req.body.login };
	var update = { $set: {
		token: TokenGenerator.generate() + (crypto.randomBytes(256).toString('hex').slice(0, 15))
	}};
	Admin.findOne(query)
		.then(admin => {
			if (!admin) {
				res.status(401).send('wrong user or password');
			} else if (!passwordHash.verify(req.body.pass, admin.pass)) {
				res.status(401).send('wrong user');
			} else {
				return Admin.findOneAndUpdate(query, update, { new: true });
			}
		})
		.then(admin => {
			if (!admin) {
				return;
			} else {
				res.cookie('login', admin.login);
				res.cookie('token', admin.token);
				res.cookie('role', admin.role);
				res.cookie('id', admin._id.toString());
				res.redirect('/admin/index.html');			
			}
		})
		.catch(err => {
			console.log(err);
			res.status(500).send('Unidentified error');
		});
};
