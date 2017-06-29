var User = require('../models/user');
var mongoose = require('mongoose');

module.exports = function(req, res) {
	var error = [];
	console.log(req.body.termsAgree);
	console.log(!req.body.termsAgree);
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
			gift: req.body.giftId
		},
		$unset: {
			code: ''
		}
	};
	if (req.body.carModel) {
		update.$set['car.model'] = req.body.carModel;
	}
	if (req.body.patronymic) {
		update.$set['fullname.patronymic'] = req.body.patronymic;
	}
	if (req.body.email) {
		update.$set.email = req.body.email;
	}
	User.findByIdAndUpdate(req.body.id, update)
		.then(user => {
			res.send('ok');
		})
		.catch(err => {
			res.status(500).send('Unidentified error');
		})
};