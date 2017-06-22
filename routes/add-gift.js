var Gift = require('../models/gift');

module.exports = function(req, res) {
	var gift = new Gift(req.body);
	gift.save()
		.then(gift => {
			gift = gift.toObject();
			gift.id = gift._id;
			delete gift._id;
			res.json(gift);
		})
		.catch(err => {
			console.log(err);
			if (err.code === 11000) {
				res.status(500).send('Unique name required');
			} else {
				res.status(500).send('Unidentified error from register');
			}
		});
};