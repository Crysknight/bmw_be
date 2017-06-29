var Region = require('../models/region');

module.exports = function(req, res) {
	Region.findOne({ code: req.body.code })
		.then(region => {
			region = region.toObject();
			region.id = region._id;
			delete region._id;
			delete region.admin;
			delete region.gifts;
			res.json(region);
		})
		.catch(err => {
			res.status(500).send('Unidentified error');
		});
};