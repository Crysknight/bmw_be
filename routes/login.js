var User = require('../models/user');
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
	User.findOne(query)
		.then(user => {
			if (!user) {
				res.status(401).send('wrong user or password');
			} else if (!passwordHash.verify(req.body.pass, user.pass)) {
				res.status(401).send('wrong user or password');
			} else {
				return User.findOneAndUpdate(query, update, { new: true });
			}
		})
		.then(user => {
			if (!user) {
				return;
			} else {
				user = user.toObject();
				user.id = user._id;
				delete user._id;
				res.cookie('login', user.login);
				res.cookie('token', user.token);
				res.cookie('role', user.role);
				res.redirect('/admin/index.html');			
			}
		})
		.catch(err => {
			console.log(err);
			res.status(500).send('Unidentified error');
		});
};
