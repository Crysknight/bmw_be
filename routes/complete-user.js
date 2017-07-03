var User = require('../models/user');
var Gift = require('../models/gift');
var mongoose = require('mongoose');

module.exports = function(req, res) {
	var error = [];
	for (field in req.body) {
		if (
			field === 'gender' ||
			field === 'lastName' ||
			field === 'city' ||
			field === 'phone' ||
			field === 'firstName' ||
			field === 'carBrand' ||
			field === 'termsAgree'
		) {
			if (
				!req.body[field] || 
				(field === 'carBrand' && req.body[field] === 'Выберите марку') ||
				(field === 'termsAgree' && req.body[field] === '__false') ||
				(field === 'gender' && req.body[field] === '__unchecked')
			) {
				error.push(field);
			}
		}
	}
	if (error.length) {
		res.status(400).json(error);
		return;
	}
	var update = {
		$set: {
			phone: req.body.phone.replace(/\D/g, ''),
			'car.brand': req.body.carBrand,
			// 'car.model': req.body.carModel,
			'fullName.name': req.body.firstName,
			'fullName.lastName': req.body.lastName,
			// 'fullName.patronymic': req.body.patronymic || '',
			city: req.body.city,
			// email: req.body.email,
			gender: req.body.gender,
			gift: req.body.giftId,
			region: req.body.region
		},
		$unset: {
			code: ''
		}
	};
	if (req.body.carModel) {
		update.$set['car.model'] = req.body.carModel;
	}
	if (req.body.patronymic) {
		update.$set['fullName.patronymic'] = req.body.patronymic;
	}
	if (req.body.email) {
		update.$set.email = req.body.email;
	}
	User.findByIdAndUpdate(req.body.id, update)
		.then(user => {
			if (!user) {
				res.status(500).send('Unidentified error');
				return 'end';
			} else {
				return Gift.findByIdAndUpdate(req.body.giftId, { $inc: { quantity: -1 } });
			}
		})
		.then(gift => {
			if (gift === 'end') {
				return 'end';
			} else if (!gift) {
				res.status(500).send('Unidentified error');
			} else {
				res.send('ok');
			}
		})
		.catch(err => {
			res.status(500).send('Unidentified error');
		})
};