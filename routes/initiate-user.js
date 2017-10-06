var User = require('../models/user');
var SMSru = require('sms_ru');
var crypto = require('crypto');
var mongoose = require('mongoose');

module.exports = function(req, res) {
	let phone = req.body.phone.replace(/\D/g, '');
	if (phone.length !== 11) {
		res.status(400).send('wrong phone');
		return;
	}
	let sms = new SMSru('489A3B24-396D-FEFB-DFF9-593FB9C4A6B3');
	// let code = crypto.randomBytes(256).toString('hex').slice(0, 5).replace(/0/g, '1').toUpperCase();
	let code = 'AB455';
	let user = new User({ code, phone });
	user.save()
		.then(user => {
			user = user.toObject();
			user = {
				id: user._id
			};
			// sms.sms_send({
			// 	to: phone,
			// 	text: code
			// }, function(e) {
			// 	console.log(e);
				res.json(user);
			// });
			setTimeout(() => {
				User.remove({
					_id: user.id,
					fullName: { $exists: false }
				})
					.then(res => {

					})
					.catch(err => {
						console.log(err);
					});
			}, 3600000);
		})
		.catch(err => {
			console.log(err);
			res.status(500).send('Unidentified error');
		});
};