var Region = require('../models/region');

module.exports = function(req, res) {
	var region = new Region(req.body);
	region.save()
		.then(region => {
			region = region.toObject();
			region.id = region._id;
			delete region._id;
			res.json(region);
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