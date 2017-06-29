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
	console.log('query: ', query);
	Admin.findOne(query)
		.then(admin => {
			if (!admin) {
				res.status(401).send('wrong user or password');
			} else if (!passwordHash.verify(req.body.pass, admin.pass)) {
				res.status(401).send('wrong user or password');
			} else {
				return Admin.findOneAndUpdate(query, update, { new: true });
			}
		})
		.then(admin => {
			console.log('admin: ', admin);
			if (!admin) {
				return;
			} else {
				admin = admin.toObject();
				admin.id = admin._id;
				delete admin._id;
				res.cookie('login', admin.login);
				res.cookie('token', admin.token);
				res.cookie('role', admin.role);
				res.redirect('/admin/index.html');			
			}
		})
		.catch(err => {
			console.log(err);
			res.status(500).send('Unidentified error');
		});
};
